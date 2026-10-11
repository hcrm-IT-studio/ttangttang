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

  const ERRORS = {
    room_not_found: "없는 방 코드예요.",
    room_started: "이미 재판이 시작된 방이에요.",
    room_full: "방이 꽉 찼어요. (최대 6명)",
    role_taken: "이미 다른 사람이 고른 역할이에요.",
    need_players: "2명 이상 모여야 재판을 열 수 있어요.",
    need_parties: "원고와 피고가 모두 있어야 해요.",
    roles_missing: "아직 역할을 고르지 않은 사람이 있어요.",
    not_host: "방장만 재판을 시작할 수 있어요.",
    retrial_limit: "재심은 3번까지만 가능해요.",
    vote_open: "이미 재심 투표가 진행 중이에요.",
    unauthorized: "참가 정보가 만료됐어요. 다시 입장해 주세요.",
    bad_length: `변론은 1~${MAX_ARG}자로 써 주세요.`,
  };

  // ───────── 유틸 ─────────
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function errMsg(e) {
    const m = String(e?.message ?? e ?? "");
    for (const k of Object.keys(ERRORS)) if (m.includes(k)) return ERRORS[k];
    return "문제가 생겼어요. 잠시 후 다시 시도해 주세요.";
  }

  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  const baseUrl = () => location.origin + location.pathname;
  const inviteUrl = (code) => `${baseUrl()}?room=${code}`;
  const verdictUrl = (code) => `${baseUrl()}?v=${code}`;

  async function copyOrShare(url, title) {
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch { /* 취소 */ }
    }
    try { await navigator.clipboard.writeText(url); toast("링크를 복사했어요! 카톡에 붙여넣으세요"); }
    catch { prompt("이 링크를 복사하세요", url); }
  }

  // 방별 참가 정보 (브라우저에만 저장)
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

  // 광고 자리. 애드센스 승인 후 이 함수 안에서 광고 단위를 넣으면 된다.
  function adSlot(name) {
    return `<div class="ad-slot" data-slot="${name}"></div>`;
  }
  // 휴정 전면광고 (H5 게임 광고 Ad Placement API)
  const shownBreaks = new Set();
  function recessAd(round) {
    if (shownBreaks.has(round)) return;
    shownBreaks.add(round);
    if (typeof window.adBreak === "function") {
      window.adBreak({ type: "next", name: `recess-${round}` });
    }
  }

  // ───────── 상태 ─────────
  const state = {
    sess: null,      // { room_id, code, player_id, token }
    room: null,
    players: [],
    channel: null,
    poll: null,
    pollMs: 3000,
    judgeTimer: null,
    lastKey: "",
    draft: "",
    busy: false,
    refreshing: false,
  };

  const me = () => state.players.find((p) => p.id === state.sess?.player_id);
  const auth = () => ({ p_player: state.sess.player_id, p_token: state.sess.token });

  // ───────── 홈 ─────────
  function renderHome(prefillCode = "") {
    app.innerHTML = `
      <section class="card">
        <img class="hero-logo" src="assets/logo.png" alt="땅땅땅" />
        <div class="eyebrow">사건 접수</div>
        <h1>억울한 일, 판사님께 맡기세요</h1>
        <p class="muted">사건을 접수하고 친구를 부르면, 각자 변론을 쓰고 AI 판사가 판결과 벌칙을 내려요.</p>
        ${adSlot("home")}
        <form id="create">
          <label for="title">사건명</label>
          <input id="title" maxlength="60" required placeholder="예) 치킨 마지막 조각 무단 섭취 사건" />
          <label for="nick1">내 닉네임</label>
          <input id="nick1" maxlength="12" required placeholder="최대 12자" />
          <button class="btn primary" type="submit">사건 접수하기</button>
        </form>
      </section>
      <div class="divider">초대받았나요?</div>
      <section class="card">
        <form id="join">
          <label for="code">방 코드</label>
          <input id="code" maxlength="6" required placeholder="6자리 코드" value="${esc(prefillCode)}"
                 style="text-transform:uppercase;letter-spacing:.2em" />
          <label for="nick2">내 닉네임</label>
          <input id="nick2" maxlength="12" required placeholder="최대 12자" />
          <button class="btn" type="submit">입장하기</button>
        </form>
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
        <section class="card">
          <h2>이미 재판이 시작됐어요</h2>
          <p class="muted">「${esc(room.title)}」 재판은 입장이 마감됐어요.</p>
          <a class="btn" href="${verdictUrl(code)}">판결 보러 가기</a>
          <a class="btn primary" href="./">새 사건 접수하기</a>
        </section>`;
      return;
    }
    app.innerHTML = `
      <section class="card">
        <div class="eyebrow">법정 소환장</div>
        <h2>「${esc(room.title)}」</h2>
        <p class="muted">친구가 당신을 법정에 불렀어요. 닉네임을 정하고 입장하세요.</p>
        <form id="join">
          <label for="nick">내 닉네임</label>
          <input id="nick" maxlength="12" required placeholder="최대 12자" autofocus />
          <button class="btn primary" type="submit">법정 입장</button>
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
      .subscribe((status) => {
        // 실시간 연결이 되면 폴링을 느리게, 안 되면(동접 초과 등) 빠르게
        setPoll(status === "SUBSCRIBED" ? 10000 : 3000);
      });
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
      if (!room) { toast("방을 찾을 수 없어요."); return renderHome(); }
      state.room = room;
      state.players = players ?? [];

      // 판결이 나오면 실시간 연결을 끊고 폴링만 유지 (동시 접속 절약)
      if (room.status === "done" && state.channel) { unsubscribe(); setPoll(3000); }

      render();
      maybeJudge();
    } finally {
      state.refreshing = false;
    }
  }

  // 판결 요청: 방장은 바로, 나머지는 방장이 없을 때를 대비해 늦게
  function maybeJudge() {
    if (state.room.status !== "judging" || state.judgeTimer) return;
    const delay = me()?.is_host ? 0 : 12000;
    state.judgeTimer = setTimeout(async () => {
      state.judgeTimer = null;
      if (state.room.status !== "judging") return;
      await callJudge();
    }, delay);
  }

  async function callJudge() {
    try {
      await sb.functions.invoke("judge", { body: { room_id: state.room.id } });
    } catch { /* 결과는 refresh로 확인 */ }
    refresh();
  }

  // 화면이 실제로 바뀔 때만 다시 그림 (입력 중인 글이 날아가지 않게)
  function viewKey() {
    const r = state.room, m = me();
    const base = [r.status, r.round, r.vote_open, r.vote_result, m?.role, m?.submitted, m?.vote];
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

  function playerList(extra = () => "") {
    return `<ul class="players">${state.players.map((p) => `
      <li>
        <span>${esc(p.nickname)}${p.is_host ? " 👑" : ""}${p.id === state.sess.player_id ? '<span class="me">나</span>' : ""}</span>
        ${extra(p)}
      </li>`).join("")}</ul>`;
  }

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
      <section class="card">
        <div class="eyebrow">대기실</div>
        <h2>「${esc(r.title)}」</h2>
        <p class="muted">친구에게 코드나 링크를 보내세요. 2~6명까지 들어올 수 있어요.</p>
        <div class="code-box">${esc(r.code)}</div>
        <button class="btn" id="invite">📤 초대 링크 보내기</button>
      </section>

      <section class="card">
        <h3>내 역할 고르기</h3>
        <div class="roles">
          ${PARTY_ROLES.map((role) => `
            <button class="role-btn ${m?.role === role ? "sel" : ""}" data-role="${role}" ${taken(role) ? "disabled" : ""}>${role}</button>`).join("")}
          ${EXTRA_ROLES.map((role) => `
            <button class="role-btn ${m?.role === role ? "sel" : ""}" data-role="${role}" ${extraOpen ? "" : "disabled"}>${role}</button>`).join("")}
        </div>
        <p class="muted" style="margin-top:10px">원고·피고는 한 명씩. ${extraOpen ? "증인·배심원 등은 여러 명 가능해요." : "3명부터 증인·배심원 등이 열려요."}</p>
      </section>

      <section class="card">
        <h3>참여자 ${state.players.length}/6</h3>
        ${playerList((p) => `<span class="tag ${p.role ? "on" : ""}">${esc(p.role ?? "역할 고르는 중")}</span>`)}
        ${m?.is_host
          ? `<button class="btn primary" id="start" ${ready ? "" : "disabled"}>⚖ 재판 시작</button>
             ${ready ? "" : '<p class="muted" style="margin-top:8px">원고·피고가 정해지고 모두 역할을 고르면 시작할 수 있어요.</p>'}`
          : `<p class="muted" style="margin-top:12px">방장이 재판을 시작하길 기다리는 중<span class="dots"></span></p>`}
      </section>
      ${adSlot("lobby")}`;

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

  function submitList() {
    const done = state.players.filter((p) => p.submitted).length;
    return `<h3>제출 현황 ${done}/${state.players.length}</h3>` +
      playerList((p) => `<span class="tag ${p.submitted ? "done" : ""}">${p.submitted ? "제출 완료" : "작성 중"}</span>`);
  }

  function renderArguing() {
    const r = state.room, m = me();
    if (m?.submitted) {
      app.innerHTML = `
        <section class="card">
          <div class="eyebrow">변론 제출 완료</div>
          <h2>다른 사람들을 기다리는 중<span class="dots"></span></h2>
          <p class="muted">모두 제출하면 판사님이 입장해요. 다른 사람 변론은 판결 때 공개돼요.</p>
        </section>
        <section class="card" id="submit-status">${submitList()}</section>
        ${adSlot("waiting")}`;
      return;
    }
    // 변론 작성 화면에는 광고를 넣지 않음 (오터치 방지)
    app.innerHTML = `
      <section class="card">
        <div class="eyebrow">변론 작성 · ${esc(m?.role)}</div>
        <h2>「${esc(r.title)}」</h2>
        <p class="muted">${esc(m?.role)} 입장에서 판사님을 설득하세요. 다른 사람 변론은 판결 때까지 안 보여요.</p>
        <textarea id="arg" maxlength="${MAX_ARG}" placeholder="예) 존경하는 재판장님, 저는 억울합니다...">${esc(state.draft)}</textarea>
        <div class="counter"><span id="cnt">${state.draft.length}</span>/${MAX_ARG}</div>
        <button class="btn primary" id="submit">변론 제출</button>
      </section>
      <section class="card" id="submit-status">${submitList()}</section>`;

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

  function renderRecess() {
    recessAd(state.room.round);
    const retrial = state.room.round > 1;
    app.innerHTML = `
      <section class="card recess">
        <div class="gavel">🔨</div>
        <div class="eyebrow" style="margin-top:12px">${retrial ? `제${state.room.round - 1}차 재심 · 휴정` : "휴정"}</div>
        <h2>판사님이 숙고 중입니다<span class="dots"></span></h2>
        <p class="muted">${retrial ? "새 판사님이 사건 기록을 다시 읽고 있어요." : "모든 변론이 접수됐어요. 곧 판결이 선고됩니다."}</p>
      </section>
      ${adSlot("recess")}`;
  }

  function renderQueued() {
    app.innerHTML = `
      <section class="card recess">
        <div class="gavel" style="animation:none">🏛</div>
        <h2>오늘 법원 업무가 마감됐어요</h2>
        <p class="muted">오늘 판결 가능 건수가 모두 찼어요. 변론은 안전하게 접수돼 있으니 내일 다시 눌러 주세요.</p>
        <button class="btn primary" id="retry">판결 다시 요청하기</button>
      </section>
      ${adSlot("queued")}`;
    document.getElementById("retry").onclick = callJudge;
  }

  function partiesLine(players) {
    const of = (role) => players.filter((p) => p.role === role).map((p) => esc(p.nickname)).join(", ");
    const parts = [`원고 ${of("원고") || "-"}`, `피고 ${of("피고") || "-"}`];
    for (const role of EXTRA_ROLES) { const n = of(role); if (n) parts.push(`${role} ${n}`); }
    return parts.join(" · ");
  }

  function verdictCard(room, players) {
    const v = room.verdict ?? {};
    return `
      <article class="verdict" id="verdict-card">
        <div class="stamp">판결<br/>완료</div>
        <div class="eyebrow">땅땅땅 · AI 친구 재판</div>
        <h2 style="font-size:26px">${room.round > 1 ? `재심 판결문` : "판결문"}</h2>
        <div class="meta"><span>사건번호 ${esc(room.code)}</span><span>${esc(v.judge ?? "AI 판사")}</span></div>
        <div class="eyebrow">최종 판결</div>
        <div class="headline">${esc(v.headline)}</div>
        <span class="ruling">${esc(v.ruling)}</span>
        <div class="parties">${partiesLine(players)}</div>
        <div class="section"><h4>사건 개요</h4><p>${esc(v.summary)}</p></div>
        <div class="section"><h4>판단 이유</h4><p>${esc(v.reasoning)}</p></div>
        <div class="sentence"><h4>선고 형량</h4><p>${esc(v.sentence)}</p></div>
        <div class="quote"><h4 class="muted" style="margin:0 0 4px;font-size:13px">재판장 한마디</h4><p>${esc(v.judge_quote)}</p></div>
        <div class="fine">이 판결은 재미를 위한 가상 판결이며 법적 효력이 없습니다.</div>
      </article>`;
  }

  function historyBlock(room) {
    const hist = (room.verdict_history ?? []).slice(0, -1);
    if (!hist.length) return "";
    return `
      <details class="card history">
        <summary>이전 판결 ${hist.length}건 보기</summary>
        ${hist.map((h) => `
          <p style="margin-top:12px"><b>${h.round > 1 ? `제${h.round - 1}차 재심` : "원심"} · ${esc(h.judge)}</b><br/>
          ${esc(h.headline)} — ${esc(h.ruling)}</p>`).join("")}
      </details>`;
  }

  function renderVerdict() {
    const r = state.room, m = me();
    const canRetry = r.round < MAX_ROUND && !r.vote_open;

    app.innerHTML = `
      ${r.vote_result === "rejected" && !r.vote_open
        ? `<div class="banner bad"><b>재심 기각!</b> 전원 동의를 얻지 못해 원심이 확정됐어요.</div>` : ""}
      ${verdictCard(r, state.players)}
      ${adSlot("verdict")}
      <button class="btn ok" id="share">📤 판결 링크 보내기</button>
      <button class="btn" id="save">📷 이미지로 저장</button>
      ${canRetry ? `<button class="btn" id="retrial">⚖ 재심 신청 (전원 동의 필요)</button>` : ""}
      ${r.round >= MAX_ROUND ? `<p class="muted" style="margin-top:12px">재심은 3번까지예요. 이 판결이 최종 확정입니다.</p>` : ""}
      <a class="btn primary" href="./">새 사건 접수하기</a>
      ${historyBlock(r)}
      ${r.vote_open ? voteModal() : ""}`;

    document.getElementById("share").onclick = () => copyOrShare(verdictUrl(r.code), `판결: ${r.verdict?.headline ?? r.title}`);
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
    void m;
  }

  function voteModal() {
    const m = me();
    const agreed = state.players.filter((p) => p.vote === true).length;
    return `
      <div class="modal-back">
        <div class="modal">
          <div class="eyebrow">재심 투표</div>
          <h2>재심을 열까요?</h2>
          <p class="muted">모두 찬성해야 재심이 열려요. 재심이 열리면 새 판사님이 다시 판결해요. 한 명이라도 반대하면 원심 확정!</p>
          <h3 style="margin-top:12px">찬성 ${agreed}/${state.players.length}</h3>
          ${playerList((p) => `<span class="tag ${p.vote === true ? "done" : ""}">${p.vote === true ? "찬성" : p.vote === false ? "반대" : "고민 중"}</span>`)}
          ${m && m.vote === null
            ? `<div class="row"><button class="btn ok" data-vote="yes">찬성</button><button class="btn" data-vote="no">반대</button></div>`
            : `<p class="muted" style="margin-top:12px">다른 사람들의 투표를 기다리는 중<span class="dots"></span></p>`}
        </div>
      </div>`;
  }

  async function saveImage() {
    const card = document.getElementById("verdict-card");
    if (!card || !window.html2canvas) return toast("이미지 저장을 지원하지 않는 브라우저예요.");
    try {
      const canvas = await window.html2canvas(card, { backgroundColor: "#ffffff", scale: 2 });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `땅땅땅_${state.room?.code ?? "판결"}.png`;
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
        <section class="card">
          <h2>아직 판결 전이에요</h2>
          <p class="muted">「${esc(room.title)}」 재판이 진행 중이에요.</p>
          <a class="btn primary" href="./">우리도 재판 열기</a>
        </section>`;
      return;
    }
    const { data: players } = await sb.from("players").select("nickname,role").eq("room_id", room.id).order("created_at");
    app.innerHTML = `
      ${verdictCard(room, players ?? [])}
      ${adSlot("shared")}
      <a class="btn primary" href="./">⚖ 우리도 재판 열기</a>
      ${historyBlock(room)}`;
  }

  // ───────── 시작 ─────────
  const params = new URLSearchParams(location.search);
  const roomCode = (params.get("room") || "").toUpperCase();
  const viewCode = (params.get("v") || "").toUpperCase();

  if (!SUPABASE_URL || SUPABASE_URL.includes("YOUR-PROJECT")) {
    app.innerHTML = `<section class="card"><h2>설정이 필요해요</h2><p class="muted">config.js에 Supabase 주소와 키를 넣어 주세요.</p></section>`;
  } else if (viewCode) {
    renderShared(viewCode);
  } else if (roomCode) {
    enterRoom(roomCode);
  } else {
    renderHome();
  }
})();
