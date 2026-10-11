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
  };
  const me = () => state.players.find((p) => p.id === state.sess?.player_id);
  const auth = () => ({ p_player: state.sess.player_id, p_token: state.sess.token });

  // ───────── 홈: 사건 접수 ─────────
  function renderHome(prefillCode = "") {
    app.innerHTML = `
      <section class="hero">
        <div class="hero-seal"><img src="assets/logo.png" alt="땅땅땅" /></div>
        <h1>판사님, 이 사건 좀 봐주세요</h1>
        <p>억울한 일을 접수하고 친구를 법정에 부르세요. 각자 변론하면 AI 판사가 판결과 형량을 선고합니다.</p>
      </section>

      <form class="doc" id="create">
        <div class="doc-title">소장</div>
        <label for="title">사건명</label>
        <input id="title" maxlength="60" required placeholder="치킨 마지막 조각 무단 섭취 사건" />
        <label for="nick1">접수인 이름</label>
        <input id="nick1" maxlength="12" required placeholder="법정에서 불릴 닉네임" />
        <button class="btn brass" type="submit">사건 접수</button>
      </form>

      <p class="or">법정 소환장을 받았다면</p>
      <form class="bench" id="join">
        <h3>사건번호로 입장</h3>
        <div class="doc" style="margin:0;padding:6px 16px 18px;box-shadow:none">
          <label for="code">사건번호 6자리</label>
          <input id="code" class="code-input" maxlength="6" required placeholder="XOXPO1" value="${esc(prefillCode)}" />
          <label for="nick2">이름</label>
          <input id="nick2" maxlength="12" required placeholder="법정에서 불릴 닉네임" />
        </div>
        <button class="btn" type="submit">법정 입장</button>
      </form>
      ${adSlot("home")}`;

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
        <section class="bench">
          <h2>이미 개정된 법정입니다</h2>
          <p class="soft">「${esc(room.title)}」 재판은 입장이 마감됐어요.</p>
          <a class="btn" href="${verdictUrl(code)}">판결문 보기</a>
          <a class="btn brass" href="./">새 사건 접수</a>
        </section>`;
      return;
    }
    app.innerHTML = `
      <form class="doc" id="join">
        <div class="doc-title">소환장</div>
        <table class="parties">
          <tr><th>사건</th><td>${esc(caseNo(code))}</td></tr>
          <tr><th>사건명</th><td>${esc(room.title)}</td></tr>
        </table>
        <p>위 사건에 관하여 귀하를 법정에 소환합니다. 이름을 적고 출석하세요.</p>
        <label for="nick">이름</label>
        <input id="nick" maxlength="12" required placeholder="법정에서 불릴 닉네임" />
        <button class="btn brass" type="submit">출석하기</button>
      </form>
      ${adSlot("join")}`;
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
    const delay = me()?.is_host ? 0 : 12000;
    state.judgeTimer = setTimeout(async () => {
      state.judgeTimer = null;
      if (state.room.status !== "judging") return;
      await callJudge();
    }, delay);
  }

  async function callJudge() {
    try { await sb.functions.invoke("judge", { body: { room_id: state.room.id } }); }
    catch { /* 결과는 refresh로 확인 */ }
    refresh();
  }

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

  function peopleList(badge) {
    return `<ul class="people">${state.players.map((p) => `
      <li>
        <span><span class="name">${esc(p.nickname)}</span>${p.is_host ? '<span class="host">방장</span>' : ""}${p.id === state.sess.player_id ? '<span class="me">나</span>' : ""}</span>
        ${badge(p)}
      </li>`).join("")}</ul>`;
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
      <section class="bench" style="text-align:center">
        <div class="case-no">${esc(caseNo(r.code))}</div>
        <h2 style="color:var(--paper)">${esc(r.title)}</h2>
        <div class="code-plate">${esc(r.code)}</div>
        <p class="soft" style="margin-top:12px">사건번호를 보내 친구를 법정에 소환하세요. 2~6명까지 출석할 수 있어요.</p>
        <button class="btn" id="invite">소환장 보내기</button>
      </section>

      <section class="bench">
        <h3>내 자리</h3>
        <div class="roles">
          ${PARTY_ROLES.map((role) => `
            <button class="role-btn ${m?.role === role ? "sel" : ""}" data-role="${role}" ${taken(role) ? "disabled" : ""}>${role}</button>`).join("")}
          ${EXTRA_ROLES.map((role) => `
            <button class="role-btn ${m?.role === role ? "sel" : ""}" data-role="${role}" ${extraOpen ? "" : "disabled"}>${role}</button>`).join("")}
        </div>
        <p class="soft" style="margin:10px 0 0">원고와 피고는 한 명씩만. ${extraOpen ? "증인, 배심원, 검사, 변호인은 여러 명이 맡을 수 있어요." : "3명부터 증인, 배심원, 검사, 변호인 자리가 열려요."}</p>
      </section>

      <section class="bench">
        <h3>출석 ${state.players.length}/6</h3>
        ${peopleList((p) => `<span class="badge ${p.role ? "on" : ""}">${esc(p.role ?? "자리 고르는 중")}</span>`)}
        ${m?.is_host
          ? `<button class="btn brass" id="start" ${ready ? "" : "disabled"}>개정 선언</button>
             ${ready ? "" : '<p class="soft" style="margin:10px 0 0">원고와 피고가 정해지고 모두 자리를 고르면 개정할 수 있어요.</p>'}`
          : `<p class="soft" style="margin:12px 0 0">방장이 개정을 선언하길 기다리는 중<span class="dots"></span></p>`}
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

  // ───────── 변론 ─────────
  function submitList() {
    const done = state.players.filter((p) => p.submitted).length;
    return `<h3>변론 제출 ${done}/${state.players.length}</h3>` +
      peopleList((p) => `<span class="badge ${p.submitted ? "done" : ""}">${p.submitted ? "제출함" : "작성 중"}</span>`);
  }

  function renderArguing() {
    const r = state.room, m = me();
    if (m?.submitted) {
      app.innerHTML = `
        <section class="bench" style="text-align:center">
          <h2 style="color:var(--paper)">변론서가 접수됐습니다</h2>
          <p class="soft" style="margin:0">모두 제출하면 판사가 입장합니다. 다른 사람의 변론은 판결문에서 공개돼요.</p>
        </section>
        <section class="bench" id="submit-status">${submitList()}</section>
        ${adSlot("waiting")}`;
      return;
    }
    // 변론 작성 화면에는 광고를 넣지 않음 (오터치 방지)
    app.innerHTML = `
      <section class="doc">
        <div class="doc-title">변론서</div>
        <table class="parties">
          <tr><th>사건</th><td>${esc(caseNo(r.code))} ${esc(r.title)}</td></tr>
          <tr><th>${esc(m?.role)}</th><td>${esc(m?.nickname)}</td></tr>
        </table>
        <label for="arg">존경하는 재판장님,</label>
        <textarea id="arg" maxlength="${MAX_ARG}" placeholder="${esc(m?.role)}의 입장에서 판사님을 설득하세요. 다른 사람의 변론은 판결 전까지 보이지 않아요.">${esc(state.draft)}</textarea>
        <div class="counter"><span id="cnt">${state.draft.length}</span>/${MAX_ARG}자</div>
        <button class="btn brass" id="submit">변론서 제출</button>
      </section>
      <section class="bench" id="submit-status">${submitList()}</section>`;

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
  const GAVEL = `
    <svg class="gavel-svg" viewBox="0 0 140 120" aria-hidden="true">
      <rect x="28" y="97" width="84" height="12" rx="3" fill="#5a3824"/>
      <rect x="38" y="88" width="64" height="10" rx="3" fill="#c9a24a"/>
      <g class="gavel-head">
        <rect x="56" y="56" width="70" height="8" rx="4" fill="#6b4329"/>
        <rect x="30" y="34" width="30" height="52" rx="7" fill="#7a4b2e"/>
        <rect x="27" y="39" width="36" height="6" rx="2" fill="#c9a24a"/>
        <rect x="27" y="75" width="36" height="6" rx="2" fill="#c9a24a"/>
      </g>
    </svg>`;

  function renderRecess() {
    recessAd(state.room.round);
    const retrial = state.room.round > 1;
    app.innerHTML = `
      <section class="bench recess">
        ${GAVEL}
        <h2>${retrial ? `제${state.room.round - 1}차 재심, 휴정` : "휴정"}</h2>
        <p class="soft" style="margin:0">${retrial ? "새 판사가 사건 기록을 처음부터 다시 읽고 있습니다" : "판사가 모든 변론서를 검토하고 있습니다"}<span class="dots"></span></p>
      </section>
      ${adSlot("recess")}`;
  }

  function renderQueued() {
    app.innerHTML = `
      <section class="bench recess">
        <h2>오늘 법원 업무가 마감됐습니다</h2>
        <p class="soft">오늘 선고할 수 있는 사건 수가 모두 찼어요. 변론서는 안전하게 보관돼 있으니 내일 다시 선고를 요청해 주세요.</p>
        <button class="btn brass" id="retry">선고 다시 요청</button>
      </section>
      ${adSlot("queued")}`;
    document.getElementById("retry").onclick = callJudge;
  }

  // ───────── 판결문 ─────────
  function partiesTable(room, players) {
    const of = (role) => players.filter((p) => p.role === role).map((p) => esc(p.nickname)).join(", ");
    const rows = [["사건", `${esc(caseNo(room.code))} ${esc(room.title)}`], ["원고", of("원고") || "-"], ["피고", of("피고") || "-"]];
    for (const role of EXTRA_ROLES) { const n = of(role); if (n) rows.push([role, n]); }
    return `<table class="parties">${rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</table>`;
  }

  function verdictCard(room, players, stamping = false) {
    const v = room.verdict ?? {};
    return `
      <article class="doc verdict ${stamping ? "stamping" : ""}" id="verdict-card">
        <div class="court-name">땅땅땅 지방법원</div>
        <div class="doc-title">${room.round > 1 ? "재심판결" : "판결"}</div>
        ${partiesTable(room, players)}
        <div class="ruling-headline">${esc(v.headline)}<span class="ruling-type">${esc(v.ruling)}</span></div>
        <div class="sec order"><div class="sec-title">주문</div><p>${esc(v.sentence)}</p></div>
        <div class="sec"><div class="sec-title">이유</div><p>${esc(v.summary)}</p><p>${esc(v.reasoning)}</p></div>
        <div class="quote"><small>재판장 한마디</small>${esc(v.judge_quote)}</div>
        <div class="sign"><span>판사 ${esc(v.judge ?? "AI 판사")}</span><span class="in">(인)</span><div class="seal">땅땅땅<br/>판사</div></div>
        <div class="disclaimer">재미로 보는 가상 판결이며 법적 효력이 없습니다.</div>
      </article>`;
  }

  function historyBlock(room) {
    const hist = (room.verdict_history ?? []).slice(0, -1);
    if (!hist.length) return "";
    return `
      <details class="bench history">
        <summary>이전 판결 ${hist.length}건</summary>
        ${hist.map((h) => `
          <p style="margin-top:12px"><b style="color:var(--on-wood)">${h.round > 1 ? `제${h.round - 1}차 재심` : "원심"}, ${esc(h.judge)}</b><br/>
          ${esc(h.headline)} (${esc(h.ruling)})</p>`).join("")}
      </details>`;
  }

  // 땅! 땅! 땅! — 이번 세션에서 휴정을 지켜본 사람에게만, 판결마다 한 번
  function slam() {
    if (reduceMotion()) return false;
    const el = document.createElement("div");
    el.className = "slam out";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<span class="slam-word w1">땅!</span><span class="slam-word w2">땅!</span><span class="slam-word w3">땅!</span>`;
    document.body.appendChild(el);
    [150, 650, 1150].forEach((t) => setTimeout(() => {
      document.body.classList.remove("shake"); void document.body.offsetWidth; document.body.classList.add("shake");
      if (navigator.vibrate) navigator.vibrate(60);
    }, t + 120));
    setTimeout(() => { el.remove(); document.body.classList.remove("shake"); }, 2500);
    return true;
  }

  function renderVerdict() {
    const r = state.room;
    const canRetry = r.round < MAX_ROUND && !r.vote_open;
    const fresh = state.sawJudging && state.slammedAt !== r.verdict?.decided_at;
    let stamping = false;
    if (fresh) { state.slammedAt = r.verdict?.decided_at; stamping = slam(); }

    app.innerHTML = `
      ${r.vote_result === "rejected" && !r.vote_open
        ? `<div class="notice"><b>재심 기각.</b> 전원 동의를 얻지 못해 원심이 확정됐습니다.</div>` : ""}
      ${verdictCard(r, state.players, stamping)}
      ${adSlot("verdict")}
      <button class="btn brass" id="share">판결문 보내기</button>
      <button class="btn" id="save">판결문 이미지로 저장</button>
      ${canRetry ? `<button class="btn blood" id="retrial">재심 청구 (전원 동의 필요)</button>` : ""}
      ${r.round >= MAX_ROUND ? `<p class="soft" style="margin-top:12px;text-align:center">재심은 3번까지예요. 이 판결로 확정됩니다.</p>` : ""}
      <a class="btn" href="./">새 사건 접수</a>
      ${historyBlock(r)}
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
        <div class="doc modal">
          <div class="doc-title" id="vote-title">재심청구</div>
          <p>모두 찬성하면 새 판사가 사건을 다시 판결합니다. 한 명이라도 반대하면 원심이 확정돼요.</p>
          <h3>찬성 ${agreed}/${state.players.length}</h3>
          <table class="parties">${state.players.map((p) => `
            <tr><th style="letter-spacing:0;width:auto">${esc(p.nickname)}</th>
                <td style="text-align:right;color:${p.vote === true ? "var(--ok)" : p.vote === false ? "var(--oxblood)" : "var(--ink-soft)"}">${p.vote === true ? "찬성" : p.vote === false ? "반대" : "고민 중"}</td></tr>`).join("")}
          </table>
          ${m && m.vote === null
            ? `<div class="row"><button class="btn brass" data-vote="yes">찬성</button><button class="btn" data-vote="no">반대</button></div>`
            : `<p class="soft" style="margin:0">다른 사람들의 결정을 기다리는 중<span class="dots"></span></p>`}
        </div>
      </div>`;
  }

  async function saveImage() {
    const card = document.getElementById("verdict-card");
    if (!card || !window.html2canvas) return toast("이 브라우저에서는 이미지 저장이 안 돼요. 화면을 캡처해 주세요.");
    try {
      const canvas = await window.html2canvas(card, { backgroundColor: "#f2e8cf", scale: 2 });
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
        <section class="bench">
          <h2>아직 선고 전입니다</h2>
          <p class="soft">「${esc(room.title)}」 재판이 진행 중이에요.</p>
          <a class="btn brass" href="./">우리도 사건 접수하기</a>
        </section>`;
      return;
    }
    const { data: players } = await sb.from("players").select("nickname,role").eq("room_id", room.id).order("created_at");
    app.innerHTML = `
      ${verdictCard(room, players ?? [])}
      ${adSlot("shared")}
      <a class="btn brass" href="./">우리도 사건 접수하기</a>
      ${historyBlock(room)}`;
  }

  // ───────── 시작 ─────────
  const params = new URLSearchParams(location.search);
  const roomCode = (params.get("room") || "").toUpperCase();
  const viewCode = (params.get("v") || "").toUpperCase();

  if (!SUPABASE_URL || SUPABASE_URL.includes("YOUR-PROJECT")) {
    app.innerHTML = `<section class="bench"><h2>설정이 필요해요</h2><p class="soft">config.js에 Supabase 주소와 키를 넣어 주세요.</p></section>`;
  } else if (viewCode) {
    renderShared(viewCode);
  } else if (roomCode) {
    enterRoom(roomCode);
  } else {
    renderHome();
  }
})();
