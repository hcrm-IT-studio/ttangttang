-- 방 생성 남용 방지: 한 시간에 만들 수 있는 방 수에 전체 상한을 둔다.
create or replace function public.create_room(p_title text, p_nickname text)
returns json
language plpgsql security definer set search_path = public as $$
declare r public.rooms; p public.players; t uuid;
begin
  if (select count(*) from public.rooms where created_at > now() - interval '1 hour') >= 300 then
    raise exception 'busy';
  end if;
  insert into public.rooms(code, title, persona)
    values (public._gen_code(), trim(p_title), public._random_persona())
    returning * into r;
  insert into public.players(room_id, nickname, is_host)
    values (r.id, trim(p_nickname), true) returning * into p;
  insert into public.player_secrets(player_id) values (p.id) returning token into t;
  return json_build_object('room_id', r.id, 'code', r.code, 'player_id', p.id, 'token', t);
end $$;
