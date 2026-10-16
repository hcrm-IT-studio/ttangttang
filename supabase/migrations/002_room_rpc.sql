-- 방 조회를 RPC로 옮긴다 (공개 읽기 차단 준비 단계: 추가만 한다)
-- 참가자: 본인 토큰으로 자기 방만 조회 / 링크로 온 사람: 방 코드를 알아야 조회

create or replace function public.get_room_state(p_player uuid, p_token uuid)
returns json
language plpgsql stable security definer set search_path = public as $$
declare p public.players; r public.rooms;
begin
  p := public._auth_player(p_player, p_token);
  select * into r from public.rooms where id = p.room_id;
  if not found then return null; end if;
  return json_build_object(
    'room', json_build_object(
      'id', r.id, 'code', r.code, 'title', r.title, 'status', r.status,
      'persona', r.persona, 'round', r.round, 'verdict', r.verdict,
      'verdict_history', r.verdict_history, 'vote_open', r.vote_open,
      'vote_result', r.vote_result),
    'players', coalesce((
      select json_agg(json_build_object(
        'id', x.id, 'nickname', x.nickname, 'role', x.role,
        'is_host', x.is_host, 'submitted', x.submitted, 'vote', x.vote)
        order by x.created_at)
      from public.players x where x.room_id = r.id), '[]'::json));
end $$;

-- 입장 화면·공유 판결 화면용: 방 코드를 아는 사람만
create or replace function public.get_room_public(p_code text)
returns json
language plpgsql stable security definer set search_path = public as $$
declare r public.rooms;
begin
  select * into r from public.rooms where code = upper(trim(p_code));
  if not found then return null; end if;
  return json_build_object(
    'id', r.id, 'code', r.code, 'title', r.title, 'status', r.status,
    'round', r.round, 'verdict', r.verdict, 'verdict_history', r.verdict_history,
    'players', coalesce((
      select json_agg(json_build_object('nickname', x.nickname, 'role', x.role)
        order by x.created_at)
      from public.players x where x.room_id = r.id), '[]'::json));
end $$;

revoke execute on function public.get_room_state(uuid, uuid), public.get_room_public(text)
  from public, anon, authenticated;
grant execute on function public.get_room_state(uuid, uuid) to anon, authenticated;
grant execute on function public.get_room_public(text)      to anon, authenticated;
