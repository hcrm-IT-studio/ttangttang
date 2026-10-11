-- 친구 재판소 초기 스키마
-- 로그인 없이 동작: 각 참가자는 비밀 토큰으로 본인임을 증명하고,
-- 모든 쓰기는 아래 RPC 함수를 통해서만 가능하다.

create extension if not exists pgcrypto;

-- ───────────── 테이블 ─────────────

create table public.rooms (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  title           text not null check (char_length(title) between 1 and 60),
  status          text not null default 'lobby'
                  check (status in ('lobby','arguing','judging','judging_now','queued','done')),
  persona         text not null,
  round           int  not null default 1,
  verdict         jsonb,
  verdict_history jsonb not null default '[]'::jsonb,
  vote_open       boolean not null default false,
  vote_result     text check (vote_result in ('approved','rejected')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table public.players (
  id         uuid primary key default gen_random_uuid(),
  room_id    uuid not null references public.rooms(id) on delete cascade,
  nickname   text not null check (char_length(nickname) between 1 and 12),
  role       text,
  is_host    boolean not null default false,
  submitted  boolean not null default false,
  vote       boolean,
  created_at timestamptz not null default now()
);
create index players_room_idx on public.players(room_id);

-- 본인 확인용 비밀 토큰 (아무도 직접 읽을 수 없음)
create table public.player_secrets (
  player_id uuid primary key references public.players(id) on delete cascade,
  token     uuid not null default gen_random_uuid()
);

-- 변론 (판결 전까지 아무도 직접 읽을 수 없음)
create table public.arguments (
  room_id   uuid not null references public.rooms(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  content   text not null check (char_length(content) between 1 and 300),
  primary key (room_id, player_id)
);
create index arguments_player_idx on public.arguments(player_id);

-- 하루 판결 횟수 (비용 상한)
create table public.usage_daily (
  day   date primary key,
  count int  not null default 0
);

-- updated_at 자동 갱신
create or replace function public._touch() returns trigger
language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
create trigger rooms_touch before update on public.rooms
  for each row execute function public._touch();

-- ───────────── 보안 (RLS) ─────────────
-- rooms, players: 누구나 읽기만 가능 (방 상태·닉네임·역할 표시용)
-- player_secrets, arguments, usage_daily: 정책 없음 = 클라이언트 접근 불가

alter table public.rooms          enable row level security;
alter table public.players        enable row level security;
alter table public.player_secrets enable row level security;
alter table public.arguments      enable row level security;
alter table public.usage_daily    enable row level security;

create policy rooms_read   on public.rooms   for select using (true);
create policy players_read on public.players for select using (true);

-- 실시간 변경 알림
alter publication supabase_realtime add table public.rooms, public.players;

-- ───────────── 내부 함수 ─────────────

create or replace function public._gen_code() returns text
language plpgsql set search_path = public as $$
declare chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; c text; i int;
begin
  loop
    c := '';
    for i in 1..6 loop
      c := c || substr(chars, 1 + floor(random() * length(chars))::int, 1);
    end loop;
    exit when not exists (select 1 from public.rooms where code = c);
  end loop;
  return c;
end $$;

create or replace function public._random_persona(p_except text default null) returns text
language plpgsql set search_path = public as $$
declare list text[] := array['sato','tsundere','rapper','drama','sleepy']; pick text;
begin
  loop
    pick := list[1 + floor(random() * array_length(list, 1))::int];
    exit when p_except is null or pick <> p_except;
  end loop;
  return pick;
end $$;

-- 토큰 검증: 맞으면 참가자 행을 돌려주고, 틀리면 에러
create or replace function public._auth_player(p_player uuid, p_token uuid)
returns public.players
language plpgsql security definer set search_path = public as $$
declare p public.players;
begin
  select pl.* into p
    from public.players pl
    join public.player_secrets s on s.player_id = pl.id
   where pl.id = p_player and s.token = p_token;
  if not found then raise exception 'unauthorized'; end if;
  return p;
end $$;

-- 재심 투표 집계
create or replace function public._settle_vote(p_room uuid) returns void
language plpgsql security definer set search_path = public as $$
declare r public.rooms;
begin
  select * into r from public.rooms where id = p_room for update;
  if not r.vote_open then return; end if;

  if exists (select 1 from public.players where room_id = p_room and vote = false) then
    update public.rooms set vote_open = false, vote_result = 'rejected' where id = p_room;
  elsif not exists (select 1 from public.players where room_id = p_room and vote is distinct from true) then
    update public.rooms
       set vote_open = false, vote_result = 'approved',
           round = round + 1, status = 'judging',
           persona = public._random_persona(r.persona)
     where id = p_room;
  end if;
end $$;

-- ───────────── 클라이언트용 RPC ─────────────

create or replace function public.create_room(p_title text, p_nickname text)
returns json
language plpgsql security definer set search_path = public as $$
declare r public.rooms; p public.players; t uuid;
begin
  insert into public.rooms(code, title, persona)
    values (public._gen_code(), trim(p_title), public._random_persona())
    returning * into r;
  insert into public.players(room_id, nickname, is_host)
    values (r.id, trim(p_nickname), true) returning * into p;
  insert into public.player_secrets(player_id) values (p.id) returning token into t;
  return json_build_object('room_id', r.id, 'code', r.code, 'player_id', p.id, 'token', t);
end $$;

create or replace function public.join_room(p_code text, p_nickname text)
returns json
language plpgsql security definer set search_path = public as $$
declare r public.rooms; p public.players; t uuid;
begin
  select * into r from public.rooms where code = upper(trim(p_code)) for update;
  if not found then raise exception 'room_not_found'; end if;
  if r.status <> 'lobby' then raise exception 'room_started'; end if;
  if (select count(*) from public.players where room_id = r.id) >= 6 then
    raise exception 'room_full';
  end if;
  insert into public.players(room_id, nickname) values (r.id, trim(p_nickname)) returning * into p;
  insert into public.player_secrets(player_id) values (p.id) returning token into t;
  return json_build_object('room_id', r.id, 'code', r.code, 'player_id', p.id, 'token', t);
end $$;

create or replace function public.set_role(p_player uuid, p_token uuid, p_role text)
returns void
language plpgsql security definer set search_path = public as $$
declare p public.players; r public.rooms;
begin
  p := public._auth_player(p_player, p_token);
  select * into r from public.rooms where id = p.room_id for update;
  if r.status <> 'lobby' then raise exception 'room_started'; end if;
  if p_role not in ('원고','피고','증인','배심원','검사','변호인') then
    raise exception 'bad_role';
  end if;
  if p_role in ('원고','피고') and exists (
       select 1 from public.players
        where room_id = p.room_id and role = p_role and id <> p.id) then
    raise exception 'role_taken';
  end if;
  update public.players set role = p_role where id = p.id;
end $$;

create or replace function public.start_trial(p_player uuid, p_token uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare p public.players; r public.rooms;
begin
  p := public._auth_player(p_player, p_token);
  if not p.is_host then raise exception 'not_host'; end if;
  select * into r from public.rooms where id = p.room_id for update;
  if r.status <> 'lobby' then raise exception 'room_started'; end if;
  if (select count(*) from public.players where room_id = r.id) < 2 then
    raise exception 'need_players';
  end if;
  if not exists (select 1 from public.players where room_id = r.id and role = '원고')
     or not exists (select 1 from public.players where room_id = r.id and role = '피고') then
    raise exception 'need_parties';
  end if;
  if exists (select 1 from public.players where room_id = r.id and role is null) then
    raise exception 'roles_missing';
  end if;
  update public.rooms set status = 'arguing' where id = r.id;
end $$;

create or replace function public.submit_argument(p_player uuid, p_token uuid, p_content text)
returns json
language plpgsql security definer set search_path = public as $$
declare p public.players; r public.rooms; all_done boolean;
begin
  p := public._auth_player(p_player, p_token);
  select * into r from public.rooms where id = p.room_id for update;
  if r.status <> 'arguing' then raise exception 'not_arguing'; end if;
  if char_length(trim(p_content)) < 1 or char_length(p_content) > 300 then
    raise exception 'bad_length';
  end if;
  insert into public.arguments(room_id, player_id, content)
    values (r.id, p.id, trim(p_content))
    on conflict (room_id, player_id) do update set content = excluded.content;
  update public.players set submitted = true where id = p.id;
  select not exists (select 1 from public.players where room_id = r.id and not submitted)
    into all_done;
  if all_done then
    update public.rooms set status = 'judging' where id = r.id;
  end if;
  return json_build_object('all_submitted', all_done);
end $$;

create or replace function public.request_retrial(p_player uuid, p_token uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare p public.players; r public.rooms;
begin
  p := public._auth_player(p_player, p_token);
  select * into r from public.rooms where id = p.room_id for update;
  if r.status <> 'done' then raise exception 'not_done'; end if;
  if r.vote_open then raise exception 'vote_open'; end if;
  if r.round >= 4 then raise exception 'retrial_limit'; end if;
  update public.players set vote = null where room_id = r.id;
  update public.players set vote = true where id = p.id;
  update public.rooms set vote_open = true, vote_result = null where id = r.id;
  perform public._settle_vote(r.id);
end $$;

create or replace function public.cast_vote(p_player uuid, p_token uuid, p_agree boolean)
returns void
language plpgsql security definer set search_path = public as $$
declare p public.players;
begin
  p := public._auth_player(p_player, p_token);
  if not (select vote_open from public.rooms where id = p.room_id) then
    raise exception 'no_vote';
  end if;
  update public.players set vote = p_agree where id = p.id;
  perform public._settle_vote(p.room_id);
end $$;

-- ───────────── 서버(Edge Function) 전용 ─────────────

-- 하루 상한 안에서 1회 사용. 성공하면 true
create or replace function public.consume_daily(p_limit int) returns boolean
language plpgsql security definer set search_path = public as $$
declare d date := (now() at time zone 'Asia/Seoul')::date; c int;
begin
  insert into public.usage_daily(day, count) values (d, 0) on conflict (day) do nothing;
  update public.usage_daily set count = count + 1
   where day = d and count < p_limit
   returning count into c;
  return c is not null;
end $$;

-- 판결 시작 권한 잡기 (중복 호출 방지). 성공하면 방 행을 돌려줌
create or replace function public.claim_judging(p_room uuid) returns public.rooms
language plpgsql security definer set search_path = public as $$
declare r public.rooms;
begin
  update public.rooms set status = 'judging_now'
   where id = p_room
     and (status in ('judging','queued')
          or (status = 'judging_now' and updated_at < now() - interval '2 minutes'))
   returning * into r;
  return r;
end $$;

-- ───────────── 실행 권한 ─────────────

revoke execute on all functions in schema public from public, anon, authenticated;

grant execute on function public.create_room(text, text)                 to anon, authenticated;
grant execute on function public.join_room(text, text)                   to anon, authenticated;
grant execute on function public.set_role(uuid, uuid, text)              to anon, authenticated;
grant execute on function public.start_trial(uuid, uuid)                 to anon, authenticated;
grant execute on function public.submit_argument(uuid, uuid, text)       to anon, authenticated;
grant execute on function public.request_retrial(uuid, uuid)             to anon, authenticated;
grant execute on function public.cast_vote(uuid, uuid, boolean)          to anon, authenticated;

grant execute on function public.consume_daily(int)   to service_role;
grant execute on function public.claim_judging(uuid)  to service_role;

-- AI 호출 실패 시 하루 사용량 되돌리기
create or replace function public.refund_daily() returns void
language plpgsql security definer set search_path = public as $$
begin
  update public.usage_daily set count = greatest(count - 1, 0)
   where day = (now() at time zone 'Asia/Seoul')::date;
end $$;
revoke execute on function public.refund_daily() from public, anon, authenticated;
grant execute on function public.refund_daily() to service_role;
