-- Daily Write shared-room backend. Run this in the Supabase SQL editor before
-- adding the public project URL and publishable key to backend-config.js.
create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 20),
  created_at timestamptz not null default now()
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  invite_code varchar(6) not null unique check (invite_code ~ '^[A-HJ-NP-Z2-9]{6}$'),
  owner_user_id uuid not null references public.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.room_members (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists public.room_daily_questions (
  room_id uuid not null references public.rooms(id) on delete cascade,
  date date not null,
  question_id text not null,
  primary key (room_id, date),
  unique (room_id, date, question_id)
);

create table if not exists public.room_answers (
  room_id uuid not null references public.rooms(id) on delete cascade,
  date date not null,
  user_id uuid not null references public.users(id) on delete cascade,
  question_id text not null,
  answer text not null check (char_length(answer) between 1 and 140),
  created_at timestamptz not null default now(),
  primary key (room_id, date, user_id),
  foreign key (room_id, date, question_id) references public.room_daily_questions(room_id, date, question_id) on delete cascade
);

create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  species text not null,
  variant text not null,
  growth_stage text not null default 'BABY' check (growth_stage in ('BABY', 'SMALL', 'GROWING', 'GROWN')),
  growth_points integer not null default 0 check (growth_points >= 0),
  growth_seed text not null default encode(gen_random_bytes(16), 'hex'),
  growth_scale numeric not null default 1 check (growth_scale > 0),
  traits jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.fragment_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  pet_id uuid not null references public.pets(id) on delete cascade,
  date date not null,
  source text not null,
  fragment_index integer not null check (fragment_index > 0),
  consumed_at timestamptz,
  growth_result jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, pet_id, date, source)
);

create or replace function public.is_room_member(p_room_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.room_members where room_id = p_room_id and user_id = auth.uid());
$$;

create or replace function public.has_answered_room_day(p_room_id uuid, p_date date)
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() is not null and exists (
    select 1 from public.room_answers where room_id = p_room_id and date = p_date and user_id = auth.uid()
  );
$$;

create or replace function public.new_invite_code()
returns varchar language plpgsql volatile security definer set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code varchar(6);
begin
  loop
    select string_agg(substr(alphabet, floor(random() * length(alphabet) + 1)::integer, 1), '')::varchar(6)
      into code from generate_series(1, 6);
    exit when not exists (select 1 from public.rooms where invite_code = code);
  end loop;
  return code;
end;
$$;

create or replace function public.create_room()
returns public.rooms language plpgsql security definer set search_path = public as $$
declare room_row public.rooms;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (select 1 from public.users where id = auth.uid()) then raise exception 'nickname required'; end if;
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
  if not exists (select 1 from public.users where id = auth.uid()) then raise exception 'nickname required'; end if;
  select * into room_row from public.rooms where invite_code = upper(p_invite_code);
  if room_row.id is null then raise exception 'room not found'; end if;
  insert into public.room_members (room_id, user_id) values (room_row.id, auth.uid()) on conflict do nothing;
  return room_row;
end;
$$;

alter table public.users enable row level security;
alter table public.rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.room_daily_questions enable row level security;
alter table public.room_answers enable row level security;
alter table public.pets enable row level security;
alter table public.fragment_events enable row level security;

create policy "users read self" on public.users for select to authenticated using (id = auth.uid());
create policy "users write self" on public.users for insert to authenticated with check (id = auth.uid());
create policy "users update self" on public.users for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "members read rooms" on public.rooms for select to authenticated using (public.is_room_member(id));
create policy "members read membership" on public.room_members for select to authenticated using (public.is_room_member(room_id));
create policy "members read daily question" on public.room_daily_questions for select to authenticated using (public.is_room_member(room_id));
create policy "members read answers after own answer" on public.room_answers for select to authenticated using (
  user_id = auth.uid() or public.has_answered_room_day(room_id, date)
);
create policy "members insert own answer" on public.room_answers for insert to authenticated with check (user_id = auth.uid() and public.is_room_member(room_id));
create policy "users manage pets" on public.pets for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users manage fragments" on public.fragment_events for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Data API access is explicit: anonymous JWT users run as `authenticated`,
-- while unauthenticated callers receive no table or function privileges.
revoke all on table public.users, public.rooms, public.room_members, public.room_daily_questions, public.room_answers, public.pets, public.fragment_events from public, anon;
grant select, insert, update on table public.users to authenticated;
grant select on table public.rooms, public.room_members, public.room_daily_questions to authenticated;
grant select, insert on table public.room_answers to authenticated;
grant select, insert, update on table public.pets, public.fragment_events to authenticated;

revoke all on function public.is_room_member(uuid) from public, anon;
revoke all on function public.has_answered_room_day(uuid, date) from public, anon;
revoke all on function public.new_invite_code() from public, anon;
revoke all on function public.create_room() from public, anon;
revoke all on function public.join_room_by_code(varchar) from public, anon;
grant execute on function public.is_room_member(uuid) to authenticated;
grant execute on function public.has_answered_room_day(uuid, date) to authenticated;
grant execute on function public.create_room() to authenticated;
grant execute on function public.join_room_by_code(varchar) to authenticated;
