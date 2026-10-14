// 땅땅땅 인트로 — 무대(DOM 오버레이)와 재생기. 게이트(gate.js)에서 탭한 뒤 동적으로 불러온다.
import { LENGTH, overlay } from "./timeline.js";
import { createEngine, renderOffline, MASTER_MAX } from "./audio.js";
import { createScene2D } from "./intro2d.js";

const TIER3_SCALE = 6 / LENGTH; // 2D는 약 6초
const LOAD_TIMEOUT = 6000;

let cssP = null, scene3dP = null;
export function loadCss() {
  if (!cssP) cssP = new Promise((ok) => {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = new URL("./intro.css", import.meta.url).href;
    l.onload = l.onerror = () => ok();
    document.head.appendChild(l);
  });
  return cssP;
}
// 홈이 뜬 뒤 쉬는 시간에 미리 받기(1·2단계만 three.js 요청)
export function preload(tier) {
  loadCss();
  if (tier <= 2 && !scene3dP) scene3dP = import("./scene3d.js");
  return scene3dP;
}
const timeout = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error("timeout")), ms))]);
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

function buildStage() {
  const el = document.createElement("div");
  el.className = "intro-stage";
  el.setAttribute("role", "region");
  el.setAttribute("aria-label", "땅땅땅 인트로 연출");
  el.innerHTML = `
    <div class="intro-view"></div>
    <div class="intro-words" aria-hidden="true"><span>땅</span><span>땅</span><span>땅</span></div>
    <div class="intro-flash" aria-hidden="true"></div>
    <div class="intro-cover" aria-hidden="true"></div>
    <div class="intro-ctrl">
      <button type="button" class="intro-btn" data-a="mute" aria-pressed="false">소리 끄기</button>
      <button type="button" class="intro-btn" data-a="skip">건너뛰기</button>
    </div>
    <p class="intro-sr">인트로 연출이 재생되고 있어요. 건너뛰기 버튼이나 Esc 키로 바로 홈으로 갈 수 있어요.</p>`;
  return el;
}

const BONE = [230, 223, 204], METAL = [28, 34, 39];
function paintOverlay(st, t) {
  const o = overlay(t);
  o.words.forEach((w, i) => {
    const s = st.words[i];
    s.style.opacity = w.alpha.toFixed(3);
    s.style.transform = `scale(${w.scale.toFixed(3)})`;
  });
  st.flash.style.opacity = o.flash;
  const k = o.toMetal, mix = BONE.map((b, i) => Math.round(b + (METAL[i] - b) * k));
  st.cover.style.backgroundColor = `rgb(${mix.join(",")})`;
  st.cover.style.opacity = o.coverA.toFixed(3);
  const gone = t >= 9.0;
  st.view.style.visibility = gone ? "hidden" : "visible";
  st.el.classList.toggle("is-out", gone);
  st.ctrl.style.visibility = t >= 8.6 ? "hidden" : "visible";
}

// opts: { tier, audioCtx, sound, model, debugT, hooks, onReady(), onEnd(kind) }
export async function run(opts) {
  let { tier } = opts;
  await loadCss();
  const el = buildStage();
  const st = {
    el, view: el.querySelector(".intro-view"), words: [...el.querySelectorAll(".intro-words span")],
    flash: el.querySelector(".intro-flash"), cover: el.querySelector(".intro-cover"), ctrl: el.querySelector(".intro-ctrl"),
  };
  document.body.appendChild(el);
  const debug = opts.debugT != null;
  if (debug) el.classList.add("is-debug");

  // 세계(3D → 실패하면 2D)
  let world = null;
  if (tier <= 2) {
    try {
      const mod = await timeout(preload(tier), LOAD_TIMEOUT);
      world = await timeout(mod.createScene3D({ container: st.view, tier, model: opts.model }), LOAD_TIMEOUT + 4000);
    } catch (e) {
      st.view.innerHTML = "";
      world = null; tier = 3;
    }
  }
  if (!world) { tier = 3; world = createScene2D({ container: st.view, goddessSvg: (window.TTTIntro && window.TTTIntro.svg.goddess) || "" }); }
  const scale = tier === 3 ? TIER3_SCALE : 1;
  const onResize = () => world.resize();
  window.addEventListener("resize", onResize);

  // ── 디버그: 정해진 시각의 프레임만 그리고 멈춤(소리 없음) ──
  if (debug) {
    const seek = async (t) => { world.render(t); paintOverlay(st, t); await nextFrame(); await nextFrame(); return world.stats(); };
    await seek(opts.debugT);
    window.__tttIntro = { ready: true, tier, seek, stats: () => world.stats(), wav: wavBase64, MASTER_MAX };
    if (opts.onReady) opts.onReady();
    return;
  }

  // ── 소리 ──
  let engine = null, ctx = opts.audioCtx || null;
  const startAudio = (fromT) => {
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      engine = createEngine(ctx);
      return engine.start(fromT, scale);
    } catch (e) { engine = null; return null; }
  };
  if (opts.hooks) window.__tttIntro = { get audio() { return ctx ? { state: ctx.state, masterGain: engine ? engine.master.gain.value : 0, max: MASTER_MAX } : null; }, stats: () => world.stats(), tier };

  let ended = false, raf = 0, t0 = 0, tNow = 0;
  const muteBtn = el.querySelector('[data-a="mute"]');
  const setMuteLabel = (muted) => { muteBtn.textContent = muted ? "소리 켜기" : "소리 끄기"; muteBtn.setAttribute("aria-pressed", String(muted)); };
  setMuteLabel(!opts.sound);

  function finish(kind) {
    if (ended) return;
    ended = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("keydown", onKey, true);
    const closeAudio = () => (engine ? engine.fadeOut(300) : Promise.resolve()).then(() => {
      try { engine && engine.stopAll(); } catch (e) { /* 무시 */ }
      try { ctx && ctx.state !== "closed" && ctx.close(); } catch (e) { /* 무시 */ }
    });
    closeAudio();
    const cleanup = () => { try { world.dispose(); } catch (e) { /* 무시 */ } el.remove(); };
    if (kind === "skip") { // 250ms 크로스페이드
      el.classList.add("is-leaving");
      if (opts.onEnd) opts.onEnd(kind);
      setTimeout(cleanup, 260);
    } else {
      cleanup();
      if (opts.onEnd) opts.onEnd(kind);
    }
  }
  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); finish("skip"); }
  }
  document.addEventListener("keydown", onKey, true);
  el.querySelector('[data-a="skip"]').addEventListener("click", () => finish("skip"));
  muteBtn.addEventListener("click", () => {
    if (!engine) { startAudio(tNow); setMuteLabel(false); try { localStorage.setItem("ttt_sound", "on"); } catch (e) { /* 무시 */ } return; }
    const m = !engine.muted; engine.setMuted(m); setMuteLabel(m);
    try { localStorage.setItem("ttt_sound", m ? "off" : "on"); } catch (e) { /* 무시 */ }
  });

  // 첫 프레임을 그린 뒤 게이트를 걷고 시작
  world.render(0); paintOverlay(st, 0);
  await nextFrame();
  if (opts.onReady) opts.onReady();
  el.querySelector('[data-a="skip"]').focus({ preventScroll: true });
  const T0 = opts.sound ? startAudio(0) : null;
  t0 = performance.now() + (T0 != null && ctx ? Math.max(0, (T0 - ctx.currentTime) * 1000) : 0);

  // 1단계 워밍업: 처음 30프레임 평균이 28ms를 넘으면 2단계로 낮춤
  const warm = []; let last = 0;
  function frame(now) {
    if (ended) return;
    tNow = Math.max(0, (now - t0) / 1000 / scale);
    if (tier === 1 && warm.length < 31) {
      if (last) warm.push(now - last);
      if (warm.length === 30 && warm.slice(1).reduce((a, b) => a + b, 0) / 29 > 28) world.degrade();
    }
    last = now;
    if (tNow < 9.0) world.render(Math.min(tNow, LENGTH));
    paintOverlay(st, tNow);
    if (tNow >= LENGTH) { finish("done"); return; }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
}

// QA: 같은 합성 코드를 오프라인으로 렌더 → 16비트 WAV(base64)
export async function wavBase64(sec = 10.5) {
  const buf = await renderOffline(sec);
  const ch = [buf.getChannelData(0), buf.getChannelData(1)], n = buf.length, sr = buf.sampleRate;
  const out = new DataView(new ArrayBuffer(44 + n * 4));
  const w = (o, s) => { for (let i = 0; i < s.length; i++) out.setUint8(o + i, s.charCodeAt(i)); };
  w(0, "RIFF"); out.setUint32(4, 36 + n * 4, true); w(8, "WAVE"); w(12, "fmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 2, true);
  out.setUint32(24, sr, true); out.setUint32(28, sr * 4, true); out.setUint16(32, 4, true); out.setUint16(34, 16, true);
  w(36, "data"); out.setUint32(40, n * 4, true);
  let peak = 0;
  for (let i = 0; i < n; i++) for (let c = 0; c < 2; c++) {
    const v = ch[c][i]; peak = Math.max(peak, Math.abs(v));
    out.setInt16(44 + (i * 2 + c) * 2, Math.max(-1, Math.min(1, v)) * 32767, true);
  }
  const bytes = new Uint8Array(out.buffer); let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return { b64: btoa(s), peakFloat: peak, sampleRate: sr };
}
