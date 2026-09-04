-- Daily Write shared-room backend. Run this in the Supabase SQL editor before
-- adding the public project URL and publishable key to backend-config.js.
create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text check (char_length(nickname) between 1 and 20),
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
  created_at timestamptz not null default now(),
  unique (user_id, species, variant)
);

create table if not exists public.fragment_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  pet_id uuid references public.pets(id) on delete cascade,
  date date not null,
  source text not null check (source in ('solo', 'room')),
  fragment_index integer not null check (fragment_index > 0),
  consumed_at timestamptz,
  growth_result jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, date)
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
create policy "users read pets" on public.pets for select to authenticated using (user_id = auth.uid());
create policy "users read fragments" on public.fragment_events for select to authenticated using (user_id = auth.uid());

-- Data API access is explicit: anonymous JWT users run as `authenticated`,
-- while unauthenticated callers receive no table or function privileges.
revoke all on table public.users, public.rooms, public.room_members, public.room_daily_questions, public.room_answers, public.pets, public.fragment_events from public, anon;
grant select, insert, update on table public.users to authenticated;
grant select on table public.rooms, public.room_members, public.room_daily_questions to authenticated;
grant select, insert on table public.room_answers to authenticated;
grant select on table public.pets to authenticated;
grant select on table public.fragment_events to authenticated;

revoke all on function public.is_room_member(uuid) from public, anon;
revoke all on function public.has_answered_room_day(uuid, date) from public, anon;
revoke all on function public.new_invite_code() from public, anon;
revoke all on function public.create_room() from public, anon;
revoke all on function public.join_room_by_code(varchar) from public, anon;
revoke all on function public.ensure_room_daily_question(uuid, date, text) from public, anon;
revoke all on function public.room_member_daily_status(uuid, date) from public, anon;
revoke all on function public.claim_daily_fragment(date, text) from public, anon;
revoke all on function public.ensure_active_pet(text, text) from public, anon;
revoke all on function public.consume_daily_fragment(uuid, uuid) from public, anon;
grant execute on function public.is_room_member(uuid) to authenticated;
grant execute on function public.has_answered_room_day(uuid, date) to authenticated;
grant execute on function public.create_room() to authenticated;
grant execute on function public.join_room_by_code(varchar) to authenticated;
grant execute on function public.ensure_room_daily_question(uuid, date, text) to authenticated;
grant execute on function public.room_member_daily_status(uuid, date) to authenticated;
grant execute on function public.claim_daily_fragment(date, text) to authenticated;
grant execute on function public.ensure_active_pet(text, text) to authenticated;
grant execute on function public.consume_daily_fragment(uuid, uuid) to authenticated;
