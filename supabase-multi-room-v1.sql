-- Daily Write Multi-room v1 capacity enforcement.
-- No table, RLS, PK/FK, answer, or fragment changes.
create or replace function public.create_room()
returns public.rooms language plpgsql security definer set search_path = public as $$
declare room_row public.rooms;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (select 1 from public.users where id = auth.uid() and nickname is not null) then raise exception 'nickname required'; end if;
  perform 1 from public.users where id = auth.uid() for update;
  if (select count(*) from public.room_members where user_id = auth.uid()) >= 10 then raise exception using message = 'ROOM_LIMIT_REACHED'; end if;
  insert into public.rooms (invite_code, owner_user_id) values (public.new_invite_code(), auth.uid()) returning * into room_row;
  insert into public.room_members (room_id, user_id) values (room_row.id, auth.uid());
  return room_row;
end;
$$;

create or replace function public.join_room_by_code(p_invite_code varchar)
returns public.rooms language plpgsql security definer set search_path = public as $$
declare room_row public.rooms;
  member_count integer;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (select 1 from public.users where id = auth.uid() and nickname is not null) then raise exception 'nickname required'; end if;
  select * into room_row from public.rooms where invite_code = upper(p_invite_code);
  if room_row.id is null then raise exception 'room not found'; end if;
  if exists (select 1 from public.room_members where room_id = room_row.id and user_id = auth.uid()) then return room_row; end if;
  perform 1 from public.users where id = auth.uid() for update;
  select * into room_row from public.rooms where id = room_row.id for update;
  if exists (select 1 from public.room_members where room_id = room_row.id and user_id = auth.uid()) then return room_row; end if;
  if (select count(*) from public.room_members where user_id = auth.uid()) >= 10 then raise exception using message = 'ROOM_LIMIT_REACHED'; end if;
  select count(*) into member_count from public.room_members where room_id = room_row.id;
  if member_count >= 5 then raise exception using message = 'ROOM_FULL'; end if;
  insert into public.room_members (room_id, user_id) values (room_row.id, auth.uid());
  return room_row;
end;
$$;

revoke all on function public.create_room() from public, anon;
revoke all on function public.join_room_by_code(varchar) from public, anon;
grant execute on function public.create_room() to authenticated;
grant execute on function public.join_room_by_code(varchar) to authenticated;
