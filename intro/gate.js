// 땅땅땅 인트로 게이트 — 처음 로딩에 포함되는 작은 스크립트(연출 본체는 탭한 뒤 동적 import).
// 단계: 1 풀 3D / 2 저사양 3D / 3 2D / 4 정적(prefers-reduced-motion)
(() => {
  "use strict";
  const SHOW_ON_SHARED = true; // 판결 공유 링크(?v=)로 들어온 사람에게도 인트로를 보여 줄지(대표 결정 2026-10-14: 보여 줌)
  const DEBUG_HOSTS = ["localhost", "127.0.0.1"]; // ?intro=frame|debug&t=초&tier=1|2|3 은 이 주소에서만 동작
  const SEEN = "ttt_intro_seen", SOUND = "ttt_sound";
  const BASE = (document.currentScript && document.currentScript.src) || location.href;
  const q = new URLSearchParams(location.search);
  const reduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const get = (s, k) => { try { return window[s].getItem(k); } catch (e) { return null; } };
  const set = (s, k, v) => { try { window[s].setItem(k, v); } catch (e) { /* 개인 모드 등: 무시 */ } };

  const GODDESS = '<svg viewBox="0 0 200 320" focusable="false" aria-hidden="true"><defs><linearGradient id="tttM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3efe5"/><stop offset="1" stop-color="#8e897e"/></linearGradient></defs>'
    + '<g fill="url(#tttM)"><path d="M60 300h80v10H60z"/><path d="M76 148q24 8 48 0l10 150q-34 6-68 0z"/><path d="M78 98q22-10 44 0l2 52q-24 6-48 0z"/><path d="M95 82h10v14H95z"/><ellipse cx="100" cy="68" rx="13" ry="15"/></g>'
    + '<g fill="none" stroke="url(#tttM)" stroke-width="9" stroke-linecap="round"><path d="M82 102q-26 14-32-10l-3-26"/><path d="M118 102q14 22 10 48"/></g>'
    + '<g fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.5"><path d="M88 160l-5 132M100 162v134M112 160l5 132"/></g>'
    + '<g stroke="#c19a4b" fill="none"><path d="M47 64V50M22 50h48" stroke-width="3"/><path d="M22 50l-10 30M22 50l10 30M70 50l-10 30M70 50l10 30" stroke-width="1.1"/><path d="M118 158h22" stroke-width="4"/><path d="M129 146v12" stroke-width="4"/></g>'
    + '<g fill="#c19a4b"><path d="M9 80q13 10 26 0zM57 80q13 10 26 0z"/></g><path fill="#b9bdc0" d="M126 162h8l-1 88-3 18-3-18z"/>'
    + '<g fill="#2a2f33"><rect x="86" y="62" width="28" height="8" rx="2"/><path d="M112 66q11 6 14 22l-4 1q-4-13-12-19z"/></g></svg>';
  window.TTTIntro = {
    svg: { goddess: GODDESS },
    // 4단계(움직임 줄이기) 정적 포스터는 홈 히어로 스틸 이미지로 대체(중복 제거) — 호환용으로 빈 값
    poster: () => "",
  };

  function webgl2() {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
      if (!gl) return false;
      const lose = gl.getExtension("WEBGL_lose_context"); if (lose) lose.loseContext();
      return true;
    } catch (e) { return false; }
  }
  function detectTier() {
    const n = navigator, c = n.connection || {}, mem = n.deviceMemory, cores = n.hardwareConcurrency;
    if (c.saveData || /2g$/.test(c.effectiveType || "")) return 3;
    if ((mem && mem <= 2) || (cores && cores <= 2)) return 3;
    if (!webgl2()) return 3;
    return (mem ? mem >= 4 : cores >= 6) ? 1 : 2;
  }
  let mainP = null;
  const loadMain = () => mainP || (mainP = import(new URL("./main.js", BASE).href));
  const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 300));
  const outside = () => [...document.querySelectorAll("body > header, body > main, body > footer")];
  const setInert = (on) => outside().forEach((e) => (on ? e.setAttribute("inert", "") : e.removeAttribute("inert")));
  const homeFocus = () => {
    const t = document.querySelector('#app .hero-actions .btn-primary') || document.querySelector("#app a, #app button, #app input");
    if (t) t.focus({ preventScroll: true });
  };
  function release(kind) {
    setInert(false);
    document.documentElement.classList.remove("intro-lock");
    document.body.classList.remove("intro-pending");
    if (kind === "done") document.body.classList.add("intro-done");
    homeFocus();
  }

  function showGate(tier) {
    const invite = !!q.get("room");
    document.body.classList.add("intro-pending");
    document.documentElement.classList.add("intro-lock");
    setInert(true);
    const g = document.createElement("div");
    g.className = "ttt-gate";
    g.setAttribute("role", "dialog"); g.setAttribute("aria-modal", "true");
    g.setAttribute("aria-labelledby", "tttGateT"); g.setAttribute("aria-describedby", "tttGateD");
    g.innerHTML = `<div class="ttt-gate-in">
      <h2 id="tttGateT">땅땅땅</h2>
      <p id="tttGateD">${invite ? "친구가 당신을 법정에 불렀어요" : "친구끼리 여는 작은 법정"}</p>
      <div class="ttt-gate-acts">
        <button type="button" class="btn btn-primary" data-a="on">소리 켜고 입장</button>
        <button type="button" class="btn btn-secondary" data-a="off">소리 없이 입장</button>
      </div>
      <button type="button" class="ttt-gate-link" data-a="skip">연출 없이 바로 보기</button>
      <p class="ttt-gate-note">소리가 나요. 볼륨을 확인해 주세요.</p>
      <p class="ttt-gate-load" role="status" hidden><span class="ttt-spin" aria-hidden="true"></span>법정을 준비하고 있어요</p>
    </div>`;
    document.body.appendChild(g);
    const btns = () => [...g.querySelectorAll("button:not([disabled])")];
    btns()[0].focus({ preventScroll: true });
    let busy = false;
    const signal = { cancelled: false };
    const close = () => { document.removeEventListener("keydown", onKey, true); g.remove(); };
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); if (busy) signal.cancelled = true; bypass(); return; }
      if (e.key === "Tab") { // 게이트 안에서만 돈다
        const b = btns(); if (!b.length) return;
        const i = b.indexOf(document.activeElement);
        const n = e.shiftKey ? (i <= 0 ? b.length - 1 : i - 1) : (i + 1) % b.length;
        e.preventDefault(); b[n].focus();
      }
    }
    document.addEventListener("keydown", onKey, true);
    let released = false;
    function bypass() { if (released) return; released = true; set("sessionStorage", SEEN, "skip"); close(); release("skip"); }
    async function enter(sound) {
      if (busy) return; busy = true;
      set("sessionStorage", SEEN, "1");
      set("localStorage", SOUND, sound ? "on" : "off");
      let ctx = null;
      if (sound) { // 오디오 정책: 탭 이벤트 안에서 만들고 resume
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); } catch (e) { ctx = null; }
      }
      g.querySelectorAll("button").forEach((b) => (b.disabled = true));
      const load = g.querySelector(".ttt-gate-load");
      const spin = setTimeout(() => (load.hidden = false), 120);
      try {
        const m = await Promise.race([loadMain(), new Promise((_, no) => setTimeout(() => no(new Error("timeout")), 6000))]);
        await m.run({
          tier, sound: !!ctx, audioCtx: ctx, hooks: DEBUG_HOSTS.includes(location.hostname), signal,
          model: (window.FC_CONFIG && window.FC_CONFIG.INTRO_MODEL) || null,
          onReady: () => { clearTimeout(spin); close(); },
          onEnd: (kind) => { if (kind === "done") set("sessionStorage", SEEN, "done"); release(kind); },
        }).then((r) => { if (r === "cancelled") { try { ctx && ctx.close(); } catch (e) { /* 무시 */ } } });
      } catch (e) { // 문구로 알리지 않고 홈으로
        clearTimeout(spin); close(); if (!released) { released = true; release("skip"); }
        try { ctx && ctx.close(); } catch (e2) { /* 무시 */ }
      }
    }
    g.addEventListener("click", (e) => {
      const a = e.target.closest("[data-a]"); if (!a) return;
      if (a.dataset.a === "skip") bypass(); else enter(a.dataset.a === "on");
    });
    idle(() => loadMain().then((m) => m.preload(tier)).catch(() => {}));
  }

  function debugRun() {
    const t = q.get("t") === "still" ? "still" : Math.max(0, Math.min(9.2, parseFloat(q.get("t")) || 0)); // still = 홈 히어로 스틸 렌더용
    const tier = Math.min(3, Math.max(1, parseInt(q.get("tier"), 10) || 1));
    document.documentElement.classList.add("intro-lock");
    loadMain().then((m) => m.run({ tier, debugT: t, model: (window.FC_CONFIG && window.FC_CONFIG.INTRO_MODEL) || null }))
      .catch((e) => { window.__tttIntro = { ready: true, error: String(e) }; });
  }

  function init() {
    const mode = q.get("intro");
    if ((mode === "frame" || mode === "debug") && DEBUG_HOSTS.includes(location.hostname)) return debugRun();
    if (q.get("v") && !SHOW_ON_SHARED) return;
    const cfg = window.FC_CONFIG || {};
    if (!cfg.SUPABASE_URL || cfg.SUPABASE_URL.includes("YOUR-PROJECT")) return;
    if (reduced()) { set("sessionStorage", "ttt_intro_tier", "4"); return; } // 4단계: 게이트·연출·소리 없음(포스터는 홈 히어로에 이미 들어감)
    const seen = get("sessionStorage", SEEN);
    if (seen) { if (seen === "done") document.body.classList.add("intro-done"); return; }
    const tier = detectTier();
    set("sessionStorage", "ttt_intro_tier", String(tier)); // ambient.js(먼지)가 3·4단계에서 꺼지도록
    showGate(tier);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else setTimeout(init, 0);
})();
