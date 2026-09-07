-- Daily Write Room Shared Daily Question v1 migration.
-- Run after the existing room schema migrations. No table, FK, or RLS changes.
create or replace function public.shared_room_question_id(p_date date)
returns text language sql immutable strict set search_path = public as $$
  select (array[
    'best-food', 'most-seen', 'comfortable', 'word', 'animal-day',
    'weather-choice', 'inside-out', 'replay', 'smell'
  ])[ (1 + (
    get_byte(decode(md5(p_date::text || ':room-shared-question:v1'), 'hex'), 0)::bigint * 16777216
    + get_byte(decode(md5(p_date::text || ':room-shared-question:v1'), 'hex'), 1)::bigint * 65536
    + get_byte(decode(md5(p_date::text || ':room-shared-question:v1'), 'hex'), 2)::bigint * 256
    + get_byte(decode(md5(p_date::text || ':room-shared-question:v1'), 'hex'), 3)::bigint
  ) % 9)::integer ];
$$;

create or replace function public.ensure_room_daily_question(p_room_id uuid, p_date date, p_question_id text)
returns public.room_daily_questions language plpgsql security definer set search_path = public as $$
declare question_row public.room_daily_questions;
  selected_question_id text;
begin
  if auth.uid() is null or not public.is_room_member(p_room_id) then raise exception 'room membership required'; end if;
  select * into question_row from public.room_daily_questions where room_id = p_room_id and date = p_date;
  if question_row.room_id is not null then return question_row; end if;
  if trim(p_question_id) not in ('best-food', 'most-seen', 'comfortable', 'word', 'animal-day', 'weather-choice', 'inside-out', 'replay', 'smell') then raise exception 'invalid question'; end if;
  selected_question_id := case when p_date >= date '2026-09-08' then public.shared_room_question_id(p_date) else trim(p_question_id) end;
  insert into public.room_daily_questions (room_id, date, question_id)
    values (p_room_id, p_date, selected_question_id)
    on conflict (room_id, date) do nothing;
  select * into question_row from public.room_daily_questions where room_id = p_room_id and date = p_date;
  return question_row;
end;
$$;

revoke all on function public.shared_room_question_id(date) from public, anon;
revoke all on function public.ensure_room_daily_question(uuid, date, text) from public, anon;
grant execute on function public.ensure_room_daily_question(uuid, date, text) to authenticated;
