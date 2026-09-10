-- Room v3 question admission registry (forward migration only).
create table if not exists public.room_question_registry (
  question_id text primary key,
  source_type text not null check (source_type in ('legacy_shared_v1','solo_linked','room_only')),
  is_enabled boolean not null default false,
  created_at timestamptz not null default now()
);
revoke all on table public.room_question_registry from public, anon, authenticated;
insert into public.room_question_registry (question_id, source_type, is_enabled) values
 ('best-food','legacy_shared_v1',true),('most-seen','legacy_shared_v1',true),('comfortable','legacy_shared_v1',true),('word','legacy_shared_v1',true),('animal-day','legacy_shared_v1',true),('weather-choice','legacy_shared_v1',true),('inside-out','legacy_shared_v1',true),('replay','legacy_shared_v1',true),('smell','legacy_shared_v1',true)
on conflict (question_id) do update set source_type=excluded.source_type,is_enabled=true;
create or replace function public.ensure_room_daily_question(p_room_id uuid, p_date date, p_question_id text)
returns public.room_daily_questions language plpgsql security definer set search_path = public as $$
declare question_row public.room_daily_questions; selected_question_id text;
begin
  if auth.uid() is null or not public.is_room_member(p_room_id) then raise exception 'room membership required'; end if;
  select * into question_row from public.room_daily_questions where room_id=p_room_id and date=p_date;
  if question_row.room_id is not null then return question_row; end if;
  if not exists (select 1 from public.room_question_registry r where r.question_id=trim(p_question_id) and r.is_enabled) then raise exception 'invalid question'; end if;
  selected_question_id := case when p_date >= date '2026-09-08' then public.shared_room_question_id(p_date) else trim(p_question_id) end;
  insert into public.room_daily_questions(room_id,date,question_id) values(p_room_id,p_date,selected_question_id) on conflict(room_id,date) do nothing;
  select * into question_row from public.room_daily_questions where room_id=p_room_id and date=p_date; return question_row;
end; $$;
revoke all on function public.ensure_room_daily_question(uuid,date,text) from public, anon;
grant execute on function public.ensure_room_daily_question(uuid,date,text) to authenticated;
