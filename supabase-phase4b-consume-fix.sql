-- Existing Phase 4B databases: replace only the consume RPC.
create or replace function public.consume_daily_fragment(p_fragment_id uuid, p_pet_id uuid)
returns table (status text, fragment_id uuid, pet_id uuid, growth_points integer, consumed_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare fragment_row public.fragment_events;
declare pet_row public.pets;
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
  update public.fragment_events as f
    set pet_id = pet_row.id, consumed_at = now()
    where f.id = fragment_row.id
    returning f.* into fragment_row;
  return query select 'consumed', fragment_row.id, pet_row.id, pet_row.growth_points, fragment_row.consumed_at;
end;
$$;

revoke all on function public.consume_daily_fragment(uuid, uuid) from public, anon;
grant execute on function public.consume_daily_fragment(uuid, uuid) to authenticated;
