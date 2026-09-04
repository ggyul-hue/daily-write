-- Phase 4A migration: run after the existing Phase 1-3 schema.
-- This only adds the daily fragment claim path. It does not alter Room data.

alter table public.fragment_events alter column pet_id drop not null;
alter table public.users alter column nickname drop not null;
alter table public.fragment_events drop constraint if exists fragment_events_user_id_pet_id_date_source_key;
alter table public.fragment_events drop constraint if exists fragment_events_user_date_key;
alter table public.fragment_events add constraint fragment_events_user_date_key unique (user_id, date);
alter table public.fragment_events drop constraint if exists fragment_events_source_check;
alter table public.fragment_events add constraint fragment_events_source_check check (source in ('solo', 'room'));

drop policy if exists "users manage fragments" on public.fragment_events;
drop policy if exists "users read fragments" on public.fragment_events;
create policy "users read fragments" on public.fragment_events for select to authenticated using (user_id = auth.uid());

revoke insert, update, delete on table public.fragment_events from authenticated;
grant select on table public.fragment_events to authenticated;

create or replace function public.create_room()
returns public.rooms language plpgsql security definer set search_path = public as $$
declare room_row public.rooms;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (select 1 from public.users where id = auth.uid() and nickname is not null) then raise exception 'nickname required'; end if;
  insert into public.rooms (invite_code, owner_user_id) values (public.new_invite_code(), auth.uid()) returning * into room_row;
  insert into public.room_members (room_id, user_id) values (room_row.id, auth.uid());
  return room_row;
end;
$$;

create or replace function public.join_room_by_code(p_invite_code varchar)
returns public.rooms language plpgsql security definer set search_path = public as $$
declare room_row public.rooms;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (select 1 from public.users where id = auth.uid() and nickname is not null) then raise exception 'nickname required'; end if;
  select * into room_row from public.rooms where invite_code = upper(p_invite_code);
  if room_row.id is null then raise exception 'room not found'; end if;
  insert into public.room_members (room_id, user_id) values (room_row.id, auth.uid()) on conflict do nothing;
  return room_row;
end;
$$;

create or replace function public.claim_daily_fragment(p_date date, p_source text)
returns public.fragment_events language plpgsql security definer set search_path = public as $$
declare fragment_row public.fragment_events;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  insert into public.users (id, nickname) values (auth.uid(), null) on conflict (id) do nothing;
  if p_date <> (timezone('Asia/Seoul', now()))::date then raise exception 'fragment date must be today'; end if;
  if p_source not in ('solo', 'room') then raise exception 'invalid fragment source'; end if;
  if p_source = 'room' and not exists (select 1 from public.room_answers where user_id = auth.uid() and date = p_date) then
    raise exception 'room answer required';
  end if;

  perform pg_advisory_xact_lock(hashtext(auth.uid()::text));
  insert into public.fragment_events (user_id, pet_id, date, source, fragment_index)
    values (
      auth.uid(),
      null,
      p_date,
      p_source,
      coalesce((select max(fragment_index) + 1 from public.fragment_events where user_id = auth.uid()), 1)
    )
    on conflict (user_id, date) do nothing
    returning * into fragment_row;

  if fragment_row.id is null then
    select * into fragment_row from public.fragment_events where user_id = auth.uid() and date = p_date;
  end if;
  return fragment_row;
end;
$$;

revoke all on function public.claim_daily_fragment(date, text) from public, anon;
grant execute on function public.claim_daily_fragment(date, text) to authenticated;
