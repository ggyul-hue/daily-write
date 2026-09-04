-- Daily Write Phase 3 migration. Run after the existing supabase-schema.sql.
create or replace function public.ensure_room_daily_question(p_room_id uuid, p_date date, p_question_id text)
returns public.room_daily_questions language plpgsql security definer set search_path = public as $$
declare question_row public.room_daily_questions;
begin
  if auth.uid() is null or not public.is_room_member(p_room_id) then raise exception 'room membership required'; end if;
  if trim(p_question_id) not in ('best-food', 'most-seen', 'comfortable', 'word', 'animal-day', 'weather-choice', 'inside-out', 'replay', 'smell') then raise exception 'invalid question'; end if;
  insert into public.room_daily_questions (room_id, date, question_id)
    values (p_room_id, p_date, trim(p_question_id))
    on conflict (room_id, date) do nothing;
  select * into question_row from public.room_daily_questions where room_id = p_room_id and date = p_date;
  return question_row;
end;
$$;

create or replace function public.room_member_daily_status(p_room_id uuid, p_date date)
returns table (user_id uuid, nickname text, answered boolean)
language plpgsql stable security definer set search_path = public as $$
begin
  if auth.uid() is null or not public.is_room_member(p_room_id) then raise exception 'room membership required'; end if;
  return query
    select member.user_id, profile.nickname,
      exists (select 1 from public.room_answers answer where answer.room_id = p_room_id and answer.date = p_date and answer.user_id = member.user_id)
    from public.room_members member
    join public.users profile on profile.id = member.user_id
    where member.room_id = p_room_id
    order by member.joined_at;
end;
$$;

revoke all on function public.ensure_room_daily_question(uuid, date, text) from public, anon;
revoke all on function public.room_member_daily_status(uuid, date) from public, anon;
grant execute on function public.ensure_room_daily_question(uuid, date, text) to authenticated;
grant execute on function public.room_member_daily_status(uuid, date) to authenticated;
