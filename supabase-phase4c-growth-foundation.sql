-- Phase 4C-A migration: run after supabase-phase4b-consume-fix.sql.
-- Keeps the Phase 4B RPC signature while persisting stage and milestone data atomically.
create or replace function public.consume_daily_fragment(p_fragment_id uuid, p_pet_id uuid)
returns table (status text, fragment_id uuid, pet_id uuid, growth_points integer, consumed_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare fragment_row public.fragment_events;
declare pet_row public.pets;
declare next_stage text;
declare milestone_value integer;
declare result_json jsonb;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;

  select f.* into fragment_row from public.fragment_events as f
    where f.id = p_fragment_id and f.user_id = auth.uid()
    for update;
  if fragment_row.id is null then raise exception 'fragment not found'; end if;

  select p.* into pet_row from public.pets as p
    where p.id = p_pet_id and p.user_id = auth.uid()
    for update;
  if pet_row.id is null then raise exception 'pet not found'; end if;

  if fragment_row.consumed_at is not null then
    select p.* into pet_row from public.pets as p
      where p.id = fragment_row.pet_id and p.user_id = auth.uid()
      for update;
    return query select 'already_consumed', fragment_row.id, fragment_row.pet_id, pet_row.growth_points, fragment_row.consumed_at;
    return;
  end if;

  update public.pets as p
    set growth_points = p.growth_points + 1
    where p.id = pet_row.id
    returning p.* into pet_row;

  next_stage := case
    when pet_row.growth_points >= 14 then 'GROWN'
    when pet_row.growth_points >= 7 then 'GROWING'
    when pet_row.growth_points >= 3 then 'SMALL'
    else 'BABY'
  end;
  milestone_value := case pet_row.growth_points
    when 3 then 3
    when 7 then 7
    when 14 then 14
    when 30 then 30
    else null
  end;
  result_json := jsonb_build_object(
    'type', case when milestone_value is null then 'no_milestone' else 'milestone' end,
    'growth_points', pet_row.growth_points,
    'stage', next_stage,
    'stage_changed', milestone_value in (3, 7, 14),
    'milestone', milestone_value
  );

  update public.pets as p
    set growth_stage = next_stage
    where p.id = pet_row.id
    returning p.* into pet_row;
  update public.fragment_events as f
    set pet_id = pet_row.id,
        consumed_at = now(),
        growth_result = result_json
    where f.id = fragment_row.id
    returning f.* into fragment_row;
  return query select 'consumed', fragment_row.id, pet_row.id, pet_row.growth_points, fragment_row.consumed_at;
end;
$$;

revoke all on function public.consume_daily_fragment(uuid, uuid) from public, anon;
grant execute on function public.consume_daily_fragment(uuid, uuid) to authenticated;
