-- Phase 4B migration: run after supabase-phase4a.sql.
-- Pet creation and fragment consumption are RPC-only.

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'pets_user_species_variant_key' and conrelid = 'public.pets'::regclass) then
    alter table public.pets add constraint pets_user_species_variant_key unique (user_id, species, variant);
  end if;
end;
$$;

drop policy if exists "users manage pets" on public.pets;
drop policy if exists "users read pets" on public.pets;
create policy "users read pets" on public.pets for select to authenticated using (user_id = auth.uid());

revoke insert, update, delete on table public.pets from authenticated;
grant select on table public.pets to authenticated;
revoke insert, update, delete on table public.fragment_events from authenticated;
grant select on table public.fragment_events to authenticated;

create or replace function public.ensure_active_pet(p_species text, p_variant text)
returns public.pets language plpgsql security definer set search_path = public as $$
declare pet_row public.pets;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if (p_species, p_variant) not in (
    ('hamster', 'mochi'), ('hamster', 'cream'), ('hamster', 'almond'), ('hamster', 'sugar'),
    ('capybara', 'clover'), ('capybara', 'bookie'), ('capybara', 'tangerine'), ('capybara', 'towel'),
    ('cat', 'orange'), ('cat', 'gray'), ('cat', 'calico'), ('cat', 'cream'),
    ('dog', 'shiba'), ('dog', 'cream'), ('dog', 'brown'), ('dog', 'gray')
  ) then raise exception 'invalid pet identity'; end if;

  insert into public.users (id, nickname) values (auth.uid(), null) on conflict (id) do nothing;
  insert into public.pets (user_id, species, variant, growth_stage, growth_points, growth_scale)
    values (auth.uid(), p_species, p_variant, 'BABY', 0, 1)
    on conflict (user_id, species, variant) do nothing;
  select * into pet_row from public.pets where user_id = auth.uid() and species = p_species and variant = p_variant;
  return pet_row;
end;
$$;

create or replace function public.consume_daily_fragment(p_fragment_id uuid, p_pet_id uuid)
returns table (status text, fragment_id uuid, pet_id uuid, growth_points integer, consumed_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare fragment_row public.fragment_events;
declare pet_row public.pets;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  select * into fragment_row from public.fragment_events
    where id = p_fragment_id and user_id = auth.uid()
    for update;
  if fragment_row.id is null then raise exception 'fragment not found'; end if;

  select * into pet_row from public.pets
    where id = p_pet_id and user_id = auth.uid()
    for update;
  if pet_row.id is null then raise exception 'pet not found'; end if;

  if fragment_row.consumed_at is not null then
    select * into pet_row from public.pets where id = fragment_row.pet_id and user_id = auth.uid() for update;
    return query select 'already_consumed', fragment_row.id, fragment_row.pet_id, pet_row.growth_points, fragment_row.consumed_at;
    return;
  end if;

  update public.pets set growth_points = growth_points + 1 where id = pet_row.id returning * into pet_row;
  update public.fragment_events set pet_id = pet_row.id, consumed_at = now() where id = fragment_row.id returning * into fragment_row;
  return query select 'consumed', fragment_row.id, pet_row.id, pet_row.growth_points, fragment_row.consumed_at;
end;
$$;

revoke all on function public.ensure_active_pet(text, text) from public, anon;
revoke all on function public.consume_daily_fragment(uuid, uuid) from public, anon;
grant execute on function public.ensure_active_pet(text, text) to authenticated;
grant execute on function public.consume_daily_fragment(uuid, uuid) to authenticated;
