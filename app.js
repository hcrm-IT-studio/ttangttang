// 땅땅땅 — 프론트엔드
(() => {
  "use strict";

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.FC_CONFIG;
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });

  const app = document.getElementById("app");
  const PARTY_ROLES = ["원고", "피고"];
  const EXTRA_ROLES = ["증인", "배심원", "검사", "변호인"];
  const MAX_ARG = 200;
  const MAX_ROUND = 4; // 첫 판결 + 재심 3번
  const YEAR = new Date().getFullYear();

  const ERRORS = {
    room_not_found: "없는 사건번호예요. 코드를 다시 확인해 주세요.",
    room_started: "이미 개정된 법정이에요. 입장이 마감됐어요.",
    room_full: "법정이 꽉 찼어요. 최대 6명까지 들어올 수 있어요.",
    role_taken: "이미 다른 사람이 맡은 역할이에요.",
    need_players: "2명 이상 모여야 개정할 수 있어요.",
    need_parties: "원고와 피고가 모두 있어야 개정할 수 있어요.",
    roles_missing: "아직 역할을 고르지 않은 사람이 있어요.",
    not_host: "방장만 개정할 수 있어요.",
    retrial_limit: "재심은 3번까지만 열 수 있어요.",
    vote_open: "이미 재심 투표가 진행 중이에요.",
    unauthorized: "입장 정보가 만료됐어요. 다시 입장해 주세요.",
    bad_length: `변론은 1~${MAX_ARG}자로 써 주세요.`,
  };

  // ───────── 유틸 ─────────
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function errMsg(e) {
    const m = String(e?.message ?? e ?? "");
    for (const k of Object.keys(ERRORS)) if (m.includes(k)) return ERRORS[k];
    return "법원 서버가 잠시 응답하지 않아요. 잠시 후 다시 시도해 주세요.";
  }

  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  const baseUrl = () => location.origin + location.pathname;
  const inviteUrl = (code) => `${baseUrl()}?room=${code}`;
  const verdictUrl = (code) => `${baseUrl()}?v=${code}`;
  const caseNo = (code) => `${YEAR}땅${code}`;

  async function copyOrShare(url, title) {
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch { /* 취소 */ }
    }
    try { await navigator.clipboard.writeText(url); toast("링크를 복사했어요. 카톡에 붙여넣으세요"); }
    catch { prompt("이 링크를 복사하세요", url); }
  }

  const SESS_KEY = "fc_sessions";
  function loadSess(code) {
    try { return JSON.parse(localStorage.getItem(SESS_KEY) || "{}")[code] || null; }
    catch { return null; }
  }
  function saveSess(code, s) {
    try {
      const all = JSON.parse(localStorage.getItem(SESS_KEY) || "{}");
      all[code] = s;
      localStorage.setItem(SESS_KEY, JSON.stringify(all));
    } catch { /* 저장 불가 브라우저 */ }
  }

  async function rpc(name, args) {
    const { data, error } = await sb.rpc(name, args);
    if (error) throw error;
    return data;
  }

  // 광고 자리 (애드센스 승인 후 채움)
  const adSlot = (name) => `<div class="ad-slot" data-slot="${name}"></div>`;
  const shownBreaks = new Set();
  function recessAd(round) {
    if (shownBreaks.has(round)) return;
    shownBreaks.add(round);
    if (typeof window.adBreak === "function") window.adBreak({ type: "next", name: `recess-${round}` });
  }

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ───────── 상태 ─────────
  const state = {
    sess: null, room: null, players: [],
    channel: null, poll: null, pollMs: 3000,
    judgeTimer: null, lastKey: "", draft: "",
    busy: false, refreshing: false,
    sawJudging: false, slammedAt: null,
    judgeFails: 0,
  };
  const me = () => state.players.find((p) => p.id === state.sess?.player_id);
  const auth = () => ({ p_player: state.sess.player_id, p_token: state.sess.token });

  // ───────── 아이콘 ─────────
  const ICONS = {
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    gavel: '<path d="m14 13-8.4 8.4a2 2 0 0 1-2.8-2.8L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    redo: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    door: '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.56v16.24a.5.5 0 0 1-.62.49L5 19.5V5.12a1 1 0 0 1 .76-.97l6-1.5A1 1 0 0 1 13 3.62Z"/>',
  };
  const ic = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

  // ───────── 홈: 사건 접수 ─────────
  let heroPlayed = false; // 홈 히어로의 쾅쾅쾅 등장은 한 번만
  function renderHome(prefillCode = "") {
    const heroPlay = !heroPlayed && !reduceMotion();
    heroPlayed = true;
    app.innerHTML = `
      <section class="hero ${heroPlay ? "play" : ""}">
        <div class="spot" aria-hidden="true"></div>
        <h1>억울한 사건,<br><em><span>땅</span><span>땅</span><span>땅</span> 판결.</em></h1>
        <p class="hero-copy">친구 사이의 애매한 사건을 접수하고 링크로 친구를 법정에 부르세요. 각자 변론하면 AI 판사가 판결과 형량을 선고합니다.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#create">사건 접수하기 ${ic("right")}</a>
          <a class="btn btn-secondary" href="#join">사건번호로 입장</a>
        </div>
        <div class="hero-note">${ic("shield")} 친구끼리 웃고 끝내는 가상 재판</div>
      </section>

      <section class="section">
        <div class="sec-head"><h2>재판은 이렇게 진행됩니다</h2></div>
        <div class="steps">
          <div class="step"><small>접수</small>${ic("file")}<h3>사건 접수</h3><p>사건명을 적고 법정을 열어요.</p></div>
          <div class="step"><small>소환</small>${ic("link")}<h3>링크 공유</h3><p>소환장 링크를 친구에게 보내요.</p></div>
          <div class="step"><small>변론</small>${ic("users")}<h3>각자 변론</h3><p>원고, 피고, 증인이 입장을 써요.</p></div>
          <div class="step"><small>선고</small>${ic("gavel")}<h3>판결 선고</h3><p>AI 판사가 판결과 형량을 내려요.</p></div>
        </div>
      </section>

      <section class="section" style="padding-top:28px">
        <form class="case-form" id="create">
          <div class="form-head"><span class="eyebrow">사건 서류</span><h2>사건을 접수합니다</h2></div>
          <div class="fs">
            <label class="fl" for="title">사건명 <span>필수</span></label>
            <input type="text" id="title" maxlength="60" required placeholder="예: 마지막 치킨 한 조각 사건" />
          </div>
          <div class="fs">
            <label class="fl" for="nick1">내 이름 <span>법정에서 불릴 닉네임</span></label>
            <input type="text" id="nick1" maxlength="12" required placeholder="최대 12자" />
          </div>
          <div class="privacy">${ic("shield")}<p>실명, 전화번호, 학교 정보 같은 개인정보는 쓰지 마세요. 서로 웃고 넘길 수 있는 가벼운 사건만 접수해 주세요.</p></div>
          <button class="btn btn-primary full" type="submit">사건 접수하고 법정 열기 ${ic("right")}</button>
        </form>

        <form class="case-form" id="join">
          <div class="form-head"><span class="eyebrow">소환장</span><h2>소환장을 받았나요?</h2></div>
          <div class="fs">
            <label class="fl" for="code">사건번호 <span>6자리</span></label>
            <input type="text" id="code" class="code-input" maxlength="6" required placeholder="ABC123" value="${esc(prefillCode)}" />
          </div>
          <div class="fs">
            <label class="fl" for="nick2">내 이름 <span>법정에서 불릴 닉네임</span></label>
            <input type="text" id="nick2" maxlength="12" required placeholder="최대 12자" />
          </div>
          <button class="btn btn-secondary full" type="submit">법정 입장 ${ic("door")}</button>
        </form>
        ${adSlot("home")}
      </section>`;

    document.getElementById("create").onsubmit = async (e) => {
      e.preventDefault();
      if (state.busy) return;
      state.busy = true;
      try {
        const r = await rpc("create_room", {
          p_title: document.getElementById("title").value,
          p_nickname: document.getElementById("nick1").value,
        });
        saveSess(r.code, r);
        enterRoom(r.code);
      } catch (err) { toast(errMsg(err)); }
      finally { state.busy = false; }
    };
    document.getElementById("join").onsubmit = (e) => {
      e.preventDefault();
      joinRoom(document.getElementById("code").value, document.getElementById("nick2").value);
    };
  }

  async function renderJoin(code) {
    const { data: room } = await sb.from("rooms").select("title,status").eq("code", code).maybeSingle();
    if (!room) { toast(ERRORS.room_not_found); return renderHome(); }
    if (room.status !== "lobby") {
      app.innerHTML = `
        <section class="narrow">
          <div class="pending">
            <div class="pending-ic">${ic("scale")}</div>
            <span class="eyebrow">개정 중</span>
            <h2>이미 개정된 법정입니다</h2>
            <p>「${esc(room.title)}」 재판은 입장이 마감됐어요.</p>
            <div class="hero-actions" style="justify-content:center">
              <a class="btn btn-secondary" href="${verdictUrl(code)}">판결문 보기</a>
              <a class="btn btn-primary" href="./">새 사건 접수</a>
            </div>
          </div>
        </section>`;
      return;
    }
    app.innerHTML = `
      <section class="narrow">
        <div class="dh"><span class="eyebrow">소환장 · ${esc(caseNo(code))}</span><span class="pill">출석 대기</span></div>
        <h1 class="page-title">${esc(room.title)}</h1>
        <p class="sub">친구가 당신을 이 사건의 법정에 소환했어요. 이름을 적고 출석하세요.</p>
        <form class="case-form" id="join">
          <div class="fs">
            <label class="fl" for="nick">내 이름 <span>법정에서 불릴 닉네임</span></label>
            <input type="text" id="nick" maxlength="12" required placeholder="최대 12자" />
          </div>
          <button class="btn btn-primary full" type="submit">출석하기 ${ic("right")}</button>
        </form>
        ${adSlot("join")}
      </section>`;
    document.getElementById("join").onsubmit = (e) => {
      e.preventDefault();
      joinRoom(code, document.getElementById("nick").value);
    };
  }
  async function joinRoom(code, nickname) {
    if (state.busy) return;
    state.busy = true;
    try {
      const r = await rpc("join_room", { p_code: code, p_nickname: nickname });
      saveSess(r.code, r);
      enterRoom(r.code);
    } catch (err) { toast(errMsg(err)); }
    finally { state.busy = false; }
  }

  // ───────── 방 ─────────
  async function enterRoom(code) {
    state.sess = loadSess(code);
    if (!state.sess) return renderJoin(code);
    history.replaceState(null, "", `?room=${code}`);
    await refresh();
    subscribe();
  }

  function subscribe() {
    const id = state.sess.room_id;
    state.channel = sb
      .channel(`room-${id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "rooms", filter: `id=eq.${id}` }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "players", filter: `room_id=eq.${id}` }, refresh)
      .subscribe((status) => setPoll(status === "SUBSCRIBED" ? 10000 : 3000));
    setPoll(3000);
  }

  function unsubscribe() {
    if (state.channel) { sb.removeChannel(state.channel); state.channel = null; }
  }

  function setPoll(ms) {
    if (state.poll && state.pollMs === ms) return;
    clearInterval(state.poll);
    state.pollMs = ms;
    state.poll = setInterval(refresh, ms);
  }

  async function refresh() {
    if (state.refreshing || !state.sess) return;
    state.refreshing = true;
    try {
      const id = state.sess.room_id;
      const [{ data: room }, { data: players }] = await Promise.all([
        sb.from("rooms")
          .select("id,code,title,status,persona,round,verdict,verdict_history,vote_open,vote_result")
          .eq("id", id).maybeSingle(),
        sb.from("players")
          .select("id,nickname,role,is_host,submitted,vote")
          .eq("room_id", id).order("created_at"),
      ]);
      if (!room) { toast("법정을 찾을 수 없어요."); return renderHome(); }
      state.room = room;
      state.players = players ?? [];
      if (room.status === "judging" || room.status === "judging_now") state.sawJudging = true;

      // 판결이 나오면 실시간 연결을 끊고 폴링만 유지 (동시 접속 절약)
      if (room.status === "done" && state.channel) { unsubscribe(); setPoll(3000); }

      render();
      maybeJudge();
    } finally {
      state.refreshing = false;
    }
  }

  function maybeJudge() {
    if (state.room.status !== "judging" || state.judgeTimer) return;
    if (state.judgeFails >= 3) return; // 자동 재시도 중단, 휴정 화면의 버튼으로 수동 요청
    const backoff = state.judgeFails ? 5000 * 2 ** (state.judgeFails - 1) : 0;
    const delay = (me()?.is_host ? 0 : 12000) + backoff;
    state.judgeTimer = setTimeout(async () => {
      state.judgeTimer = null;
      if (state.room.status !== "judging") return;
      await callJudge();
    }, delay);
  }

  async function callJudge() {
    let ok = false;
    try {
      const { data } = await sb.functions.invoke("judge", { body: { room_id: state.room.id } });
      ok = !!data?.ok || data?.reason === "not_ready" || data?.reason === "daily_limit";
    } catch { ok = false; }
    state.judgeFails = ok ? 0 : state.judgeFails + 1;
    if (state.judgeFails >= 3) { state.lastKey = ""; toast("판사가 잠시 자리를 비웠어요. 잠시 후 다시 요청해 주세요."); }
    refresh();
  }

  function viewKey() {
    const r = state.room, m = me();
    const base = [r.status, r.round, r.vote_open, r.vote_result, m?.role, m?.submitted, m?.vote, state.judgeFails >= 3];
    if (r.status === "lobby") base.push(state.players.map((p) => p.id + p.role).join());
    if (r.status === "done") base.push(state.players.map((p) => p.vote).join(), r.verdict?.decided_at);
    return JSON.stringify(base);
  }

  function render() {
    const key = viewKey();
    if (key === state.lastKey) return renderPartial();
    state.lastKey = key;
    const s = state.room.status;
    if (s === "lobby") return renderLobby();
    if (s === "arguing") return renderArguing();
    if (s === "queued") return renderQueued();
    if (s === "judging" || s === "judging_now") return renderRecess();
    if (s === "done") return renderVerdict();
  }

  function renderPartial() {
    const box = document.getElementById("submit-status");
    if (box) box.innerHTML = submitList();
  }

  function peopleList(badge, sub = (p) => p.role ?? "자리 고르는 중") {
    return `<ul class="people">${state.players.map((p) => `
      <li>
        <span class="row-ic">${esc(p.nickname.slice(0, 1))}</span>
        <span class="row-main">
          <strong>${esc(p.nickname)}${p.id === state.sess.player_id ? " (나)" : ""}</strong>
          <span>${esc(sub(p))}${p.is_host ? " · 방장" : ""}</span>
        </span>
        ${badge(p)}
      </li>`).join("")}</ul>`;
  }

  function caseHead(r, pill, pillClass = "") {
    return `
      <div class="dh"><span class="eyebrow">사건 기록 · ${esc(caseNo(r.code))}</span><span class="pill ${pillClass}">${pill}</span></div>
      <h1 class="page-title">${esc(r.title)}</h1>`;
  }

  // ───────── 대기실 ─────────
  function renderLobby() {
    const r = state.room, m = me();
    const taken = (role) => state.players.some((p) => p.role === role && p.id !== m?.id);
    const ready =
      state.players.length >= 2 &&
      state.players.some((p) => p.role === "원고") &&
      state.players.some((p) => p.role === "피고") &&
      state.players.every((p) => p.role);
    const extraOpen = state.players.length >= 3;

    app.innerHTML = `
      <section class="narrow">
        ${caseHead(r, "출석 중")}
        <p class="sub">소환장 링크를 친구에게 보내세요. 2~6명까지 출석할 수 있어요.</p>
        <div class="code-box">
          <div><span class="label">사건번호</span><strong>${esc(r.code)}</strong></div>
          <button class="btn btn-primary" id="invite">${ic("send")} 소환장 보내기</button>
        </div>

        <div class="case-form">
          <div class="fs">
            <div class="fl">내 자리 <span>원고·피고는 한 명씩</span></div>
            <div class="choices">
              ${PARTY_ROLES.map((role) => `
                <button type="button" class="choice ${m?.role === role ? "sel" : ""}" data-role="${role}" ${taken(role) ? "disabled" : ""}>${role}</button>`).join("")}
              ${EXTRA_ROLES.map((role) => `
                <button type="button" class="choice ${m?.role === role ? "sel" : ""}" data-role="${role}" ${extraOpen ? "" : "disabled"}>${role}</button>`).join("")}
            </div>
            <p class="cc" style="text-align:left">${extraOpen ? "증인, 배심원, 검사, 변호인은 여러 명이 맡을 수 있어요." : "3명부터 증인, 배심원, 검사, 변호인 자리가 열려요."}</p>
          </div>

          <div class="fl">출석 ${state.players.length}/6</div>
          ${peopleList((p) => `<span class="pill ${p.role ? "done" : ""}">${p.role ? "착석" : "대기"}</span>`)}

          ${m?.is_host
            ? `<button class="btn btn-primary full" id="start" style="margin-top:20px" ${ready ? "" : "disabled"}>${ic("gavel")} 개정 선언</button>
               ${ready ? "" : '<p class="cc" style="text-align:center">원고와 피고가 정해지고 모두 자리를 고르면 개정할 수 있어요.</p>'}`
            : `<p class="sub" style="margin-top:18px;text-align:center">방장이 개정을 선언하길 기다리는 중 <span class="spin"></span></p>`}
        </div>
        ${adSlot("lobby")}
      </section>`;

    document.getElementById("invite").onclick = () => copyOrShare(inviteUrl(r.code), `땅땅땅 소환장: ${r.title}`);
    app.querySelectorAll("[data-role]").forEach((b) => {
      b.onclick = async () => {
        try { await rpc("set_role", { ...auth(), p_role: b.dataset.role }); refresh(); }
        catch (err) { toast(errMsg(err)); }
      };
    });
    const start = document.getElementById("start");
    if (start) start.onclick = async () => {
      try { await rpc("start_trial", auth()); refresh(); }
      catch (err) { toast(errMsg(err)); }
    };
  }

  // ───────── 변론 ─────────
  function submitList() {
    const done = state.players.filter((p) => p.submitted).length;
    return `<div class="fl">변론 제출 ${done}/${state.players.length}</div>` +
      peopleList((p) => `<span class="pill ${p.submitted ? "done" : ""}">${p.submitted ? "제출함" : "작성 중"}</span>`);
  }

  function renderArguing() {
    const r = state.room, m = me();
    if (m?.submitted) {
      app.innerHTML = `
        <section class="narrow">
          ${caseHead(r, "변론 중")}
          <div class="pending">
            <div class="pending-ic">${ic("file")}</div>
            <span class="eyebrow">접수 완료</span>
            <h2>변론서가 접수됐습니다</h2>
            <p>모두 제출하면 판사가 입장합니다. 다른 사람의 변론은 판결문에서 공개돼요.</p>
          </div>
          <div class="case-form" id="submit-status">${submitList()}</div>
          ${adSlot("waiting")}
        </section>`;
      return;
    }
    // 변론 작성 화면에는 광고를 넣지 않음 (오터치 방지)
    app.innerHTML = `
      <section class="narrow">
        ${caseHead(r, "변론 중")}
        <p class="sub">${esc(m?.role)} 입장에서 판사님을 설득하세요. 다른 사람의 변론은 판결 전까지 보이지 않아요.</p>
        <div class="case-form">
          <div class="fs">
            <label class="fl" for="arg">${esc(m?.role)} ${esc(m?.nickname)}의 변론 <span>필수</span></label>
            <textarea id="arg" maxlength="${MAX_ARG}" placeholder="존경하는 재판장님, 저는 억울합니다.">${esc(state.draft)}</textarea>
            <div class="cc"><span id="cnt">${state.draft.length}</span>/${MAX_ARG}</div>
          </div>
          <button class="btn btn-primary full" id="submit">변론서 제출 ${ic("right")}</button>
        </div>
        <div class="case-form" id="submit-status">${submitList()}</div>
      </section>`;

    const ta = document.getElementById("arg");
    ta.oninput = () => {
      state.draft = ta.value;
      document.getElementById("cnt").textContent = ta.value.length;
    };
    document.getElementById("submit").onclick = async () => {
      if (!ta.value.trim()) return toast("변론을 써 주세요.");
      if (state.busy) return;
      state.busy = true;
      try {
        await rpc("submit_argument", { ...auth(), p_content: ta.value });
        state.draft = "";
        refresh();
      } catch (err) { toast(errMsg(err)); }
      finally { state.busy = false; }
    };
  }

  // ───────── 휴정 ─────────
  function renderRecess() {
    recessAd(state.room.round);
    const r = state.room;
    const retrial = r.round > 1;
    app.innerHTML = `
      <section class="narrow">
        ${caseHead(r, retrial ? `제${r.round - 1}차 재심` : "휴정")}
        <div class="pending recess">
          <div class="spot" aria-hidden="true"></div>
          <div class="scan" aria-hidden="true"></div>
          <div class="pending-ic"><span class="gavel-tap" style="display:inline-flex">${ic("gavel")}</span></div>
          <span class="eyebrow">휴정 중</span>
          <h2>${retrial ? "새 판사가 사건을 다시 심리합니다" : "판사가 변론을 검토하고 있습니다"}</h2>
          <p>모든 변론서가 접수됐어요. 곧 판결이 선고됩니다. 보통 10초에서 30초 걸려요.</p>
          ${state.judgeFails >= 3
            ? `<button class="btn btn-primary" id="retry">${ic("redo")} 선고 다시 요청</button>`
            : `<p class="cycle" aria-hidden="true"><span>변론을 검토하고 있어요</span><span>쟁점을 정리하고 있어요</span><span>형량을 정하고 있어요</span></p>`}
        </div>
        ${adSlot("recess")}
      </section>`;
    const retry = document.getElementById("retry");
    if (retry) retry.onclick = () => { state.judgeFails = 0; state.lastKey = ""; callJudge(); };
  }

  function renderQueued() {
    const r = state.room;
    app.innerHTML = `
      <section class="narrow">
        ${caseHead(r, "선고 대기")}
        <div class="pending">
          <div class="pending-ic">${ic("scale")}</div>
          <span class="eyebrow">업무 마감</span>
          <h2>오늘 법원 업무가 마감됐습니다</h2>
          <p>오늘 선고할 수 있는 사건 수가 모두 찼어요. 변론서는 안전하게 보관돼 있으니 내일 다시 선고를 요청해 주세요.</p>
          <button class="btn btn-primary" id="retry">${ic("redo")} 선고 다시 요청</button>
        </div>
        ${adSlot("queued")}
      </section>`;
    document.getElementById("retry").onclick = callJudge;
  }

  // ───────── 판결문 ─────────
  function partiesBlock(players) {
    const roles = [...PARTY_ROLES, ...EXTRA_ROLES];
    const cells = roles
      .map((role) => [role, players.filter((p) => p.role === role).map((p) => esc(p.nickname)).join(", ")])
      .filter(([role, n]) => n || PARTY_ROLES.includes(role));
    return `<div class="vparties">${cells.map(([role, n]) => `<div><span class="role">${role}</span><strong>${n || "-"}</strong></div>`).join("")}</div>`;
  }

  // 판결 제목 글자 단위 등장용 (연출할 때만 사용)
  function splitHeadline(text) {
    let i = 0;
    return String(text ?? "").split(/(\s+)/).map((w) => /^\s+$/.test(w) ? " " :
      `<span class="hw">${[...w].map((c) => `<span class="hc" style="--i:${Math.min(i++, 40)}">${esc(c)}</span>`).join("")}</span>`).join("");
  }

  function verdictCard(room, players, stamping = false) {
    const v = room.verdict ?? {};
    const d = new Date(v.decided_at ?? "");
    const date = isNaN(d) ? "" : d.toLocaleDateString("ko-KR");
    return `
      <article class="verdict ${stamping ? "stamping" : ""}" id="verdict-card">
        <div class="vtop">
          <div><span class="eyebrow">땅땅땅 재판소</span><h2>${room.round > 1 ? `제${room.round - 1}차 재심 판결문` : "모의 판결문"}</h2></div>
          <div class="stamp">판결<br>완료</div>
        </div>
        <div class="vmeta"><span>사건번호 ${esc(caseNo(room.code))}</span><span>${esc(v.judge ?? "AI 판사")}${date ? ` · ${date}` : ""}</span></div>
        ${partiesBlock(players)}
        <div class="vres"><span>최종 판결</span><h3>${stamping ? splitHeadline(v.headline) : esc(v.headline)}</h3><strong>${esc(v.ruling)}</strong></div>
        <div class="vblock"><h4>사건 개요</h4><p>${esc(v.summary)}</p></div>
        <div class="vblock"><h4>판단 이유</h4><p>${esc(v.reasoning)}</p></div>
        <div class="sentence"><span class="sl">선고 형량</span><p>${esc(v.sentence)}</p></div>
        <blockquote class="note-q"><span>재판장 한마디</span>${esc(v.judge_quote)}</blockquote>
        <p class="legal">이 판결은 재미를 위한 가상 판결이며 법적 효력이 없습니다.</p>
      </article>`;
  }

  function historyBlock(room) {
    const hist = (room.verdict_history ?? []).slice(0, -1);
    if (!hist.length) return "";
    return `
      <details class="history">
        <summary>이전 판결 ${hist.length}건 보기</summary>
        ${hist.map((h) => `
          <p><b>${h.round > 1 ? `제${h.round - 1}차 재심` : "원심"} · ${esc(h.judge)}</b><br/>
          ${esc(h.headline)} (${esc(h.ruling)})</p>`).join("")}
      </details>`;
  }

  // 땅! 땅! 땅! — 이번 세션에서 휴정을 지켜본 사람에게만, 판결마다 한 번
  // 화면을 탭하면 즉시 최종 화면으로 건너뛴다.
  let fx = null;
  function endFx() {
    if (!fx) return;
    fx.timers.forEach(clearTimeout);
    fx.el.remove();
    document.removeEventListener("pointerdown", endFx);
    document.getElementById("verdict-card")?.classList.remove("stamping");
    fx = null;
  }

  function hitFx(el, stage, n) {
    const add = (cls, ms, style = "") => {
      const d = document.createElement("span");
      d.className = cls;
      if (style) d.style.cssText = style;
      (cls === "flash" ? el : stage).appendChild(d);
      setTimeout(() => d.remove(), ms);
    };
    add("flash", 300);
    add(`ring r${n}`, 900);
    for (let i = 0; i < 6 + n * 3; i++) {
      const ang = Math.random() * Math.PI * 2, dist = 70 + Math.random() * 90 * n;
      add("dust", 900, `--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist * 0.6 - 20}px;--s:${3 + Math.random() * 5}px`);
    }
    stage.style.setProperty("--amp", [4, 8, 14][n - 1]);
    stage.classList.remove("shake"); void stage.offsetWidth; stage.classList.add("shake");
    if (navigator.vibrate) navigator.vibrate(n * 40);
  }

  function slam() {
    if (reduceMotion()) return false;
    endFx();
    const el = document.createElement("div");
    el.className = "slam";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="slam-stage"><span class="slam-word w1">땅!</span><span class="slam-word w2">땅!</span><span class="slam-word w3">땅!</span></div><span class="slam-hint">화면을 탭하면 건너뛰어요</span>`;
    document.body.appendChild(el);
    const stage = el.firstChild;
    const timers = [320, 720, 1120].map((t, i) => setTimeout(() => hitFx(el, stage, i + 1), t));
    timers.push(setTimeout(() => { el.remove(); }, 2100));
    timers.push(setTimeout(endFx, 4300)); // 연출 종료 후 정적 상태로
    fx = { el, timers };
    document.addEventListener("pointerdown", endFx);
    return true;
  }

  function renderVerdict() {
    const r = state.room;
    const canRetry = r.round < MAX_ROUND && !r.vote_open;
    const fresh = state.sawJudging && state.slammedAt !== r.verdict?.decided_at;
    let stamping = false;
    if (fresh) { state.slammedAt = r.verdict?.decided_at; stamping = slam(); }

    app.innerHTML = `
      <section class="narrow">
        ${caseHead(r, "판결 완료", "done")}
        ${r.vote_result === "rejected" && !r.vote_open
          ? `<div class="notice">${ic("alert")}<span><b>재심 기각.</b> 전원 동의를 얻지 못해 원심이 확정됐습니다.</span></div>` : ""}
        ${verdictCard(r, state.players, stamping)}
        <div class="vactions">
          <button class="btn btn-primary" id="share">${ic("link")} 링크 보내기</button>
          <button class="btn btn-secondary" id="save">${ic("image")} 이미지로 저장</button>
          ${canRetry ? `<button class="btn btn-stamp wide" id="retrial">${ic("redo")} 재심 청구 (전원 동의 필요)</button>` : ""}
        </div>
        ${r.round >= MAX_ROUND ? `<p class="cc" style="text-align:center">재심은 3번까지예요. 이 판결로 확정됩니다.</p>` : ""}
        ${adSlot("verdict")}
        ${historyBlock(r)}
        <div class="bottom"><a class="text-button" href="./">${ic("plus")} 새 사건 접수</a></div>
      </section>
      ${r.vote_open ? voteModal() : ""}`;

    document.getElementById("share").onclick = () => copyOrShare(verdictUrl(r.code), `땅땅땅 판결: ${r.verdict?.headline ?? r.title}`);
    document.getElementById("save").onclick = saveImage;
    const retrial = document.getElementById("retrial");
    if (retrial) retrial.onclick = async () => {
      try { await rpc("request_retrial", auth()); refresh(); }
      catch (err) { toast(errMsg(err)); }
    };
    app.querySelectorAll("[data-vote]").forEach((b) => {
      b.onclick = async () => {
        try { await rpc("cast_vote", { ...auth(), p_agree: b.dataset.vote === "yes" }); refresh(); }
        catch (err) { toast(errMsg(err)); }
      };
    });
  }

  function voteModal() {
    const m = me();
    const agreed = state.players.filter((p) => p.vote === true).length;
    return `
      <div class="modal-back" role="dialog" aria-modal="true" aria-labelledby="vote-title">
        <div class="modal">
          <span class="eyebrow">재심 투표</span>
          <h2 id="vote-title">재심을 열까요?</h2>
          <p class="sub">모두 찬성하면 새 판사가 사건을 다시 판결합니다. 한 명이라도 반대하면 원심이 확정돼요.</p>
          <div class="fl" style="margin-top:18px">찬성 ${agreed}/${state.players.length}</div>
          ${peopleList(
            (p) => `<span class="pill ${p.vote === true ? "done" : p.vote === false ? "no" : ""}">${p.vote === true ? "찬성" : p.vote === false ? "반대" : "고민 중"}</span>`,
            (p) => p.role ?? "",
          )}
          ${m && m.vote === null
            ? `<div class="row2"><button class="btn btn-primary" data-vote="yes">찬성</button><button class="btn btn-secondary" data-vote="no">반대</button></div>`
            : `<p class="sub" style="margin-top:16px;text-align:center">다른 사람들의 결정을 기다리는 중 <span class="spin"></span></p>`}
        </div>
      </div>`;
  }

  async function saveImage() {
    const card = document.getElementById("verdict-card");
    if (!card || !window.html2canvas) return toast("이 브라우저에서는 이미지 저장이 안 돼요. 화면을 캡처해 주세요.");
    try {
      const bg = getComputedStyle(card).backgroundColor || "#262e34";
      const canvas = await window.html2canvas(card, { backgroundColor: bg, scale: 2 });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `땅땅땅_판결_${state.room?.code ?? ""}.png`;
      a.click();
    } catch { toast("이미지 저장에 실패했어요. 화면을 캡처해 주세요."); }
  }

  // ───────── 공유 링크로 들어온 판결 보기 ─────────
  async function renderShared(code) {
    const { data: room } = await sb.from("rooms")
      .select("id,code,title,status,round,verdict,verdict_history").eq("code", code).maybeSingle();
    if (!room) { toast(ERRORS.room_not_found); return renderHome(); }
    if (!room.verdict) {
      app.innerHTML = `
        <section class="narrow">
          ${caseHead(room, "심리 중")}
          <div class="pending">
            <div class="pending-ic">${ic("scale")}</div>
            <span class="eyebrow">심리 중</span>
            <h2>아직 선고 전입니다</h2>
            <p>이 재판은 아직 진행 중이에요.</p>
            <a class="btn btn-primary" href="./">우리도 사건 접수하기 ${ic("right")}</a>
          </div>
        </section>`;
      return;
    }
    const { data: players } = await sb.from("players").select("nickname,role").eq("room_id", room.id).order("created_at");
    app.innerHTML = `
      <section class="narrow">
        ${caseHead(room, "판결 완료", "done")}
        ${verdictCard(room, players ?? [])}
        ${adSlot("shared")}
        <div class="vactions"><a class="btn btn-primary wide" href="./">${ic("gavel")} 우리도 사건 접수하기</a></div>
        ${historyBlock(room)}
      </section>`;
  }

  // ───────── 시작 ─────────
  const params = new URLSearchParams(location.search);
  const roomCode = (params.get("room") || "").toUpperCase();
  const viewCode = (params.get("v") || "").toUpperCase();

  if (!SUPABASE_URL || SUPABASE_URL.includes("YOUR-PROJECT")) {
    app.innerHTML = `<section class="narrow"><div class="pending"><h2>설정이 필요해요</h2><p>config.js에 Supabase 주소와 키를 넣어 주세요.</p></div></section>`;
  } else if (viewCode) {
    renderShared(viewCode);
  } else if (roomCode) {
    enterRoom(roomCode);
  } else {
    renderHome();
  }
})();
