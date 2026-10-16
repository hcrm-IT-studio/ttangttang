// 땅땅땅 — 3D 법정 무대(휴정 화면과 '땅! 땅! 땅!' 연출에서 같은 무대를 쓴다)
// 판사 캐릭터(persona별 모습) · 법대 · 펼쳐지는 법전 · 판사봉. 기존 인트로와 같은 재질(대리석·가죽·황동)을 쓴다.
// 무대는 하나만 만들어 화면 사이로 옮겨 다닌다(WebGL 컨텍스트를 새로 만들지 않기 위해).
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as TX from "../intro/textures.js";

export const HITS = [300, 660, 1020]; // 판사봉이 법대에 닿는 시각(ms). app.js의 타격 연출과 같은 값
const DEG = Math.PI / 180;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const easeOut = (x) => 1 - (1 - x) ** 3;

const HAMMER_UP = -0.3, HAMMER_DOWN = -1.62, HAMMER_REST = -0.65;

// 이 기기가 3D를 돌릴 수 있는지(느린 기기·데이터 절약이면 2D 그대로)
export function canRun() {
  try {
    const n = navigator, c = n.connection || {};
    if (c.saveData || /2g$/.test(c.effectiveType || "")) return false;
    if ((n.deviceMemory && n.deviceMemory <= 2) || (n.hardwareConcurrency && n.hardwareConcurrency <= 2)) return false;
    const cv = document.createElement("canvas");
    const gl = cv.getContext("webgl2") || cv.getContext("webgl");
    if (!gl) return false;
    const lose = gl.getExtension("WEBGL_lose_context"); if (lose) lose.loseContext();
    return true;
  } catch { return false; }
}

// persona별 모습: 옷 색, 소품
const LOOKS = {
  sato:      { robe: 0x7a1f1c, trim: 0xc19a4b, skin: 0xc9ad92 },
  tsundere:  { robe: 0x22303a, trim: 0xb3302f, skin: 0xd8bfa6 },
  rapper:    { robe: 0x161a1d, trim: 0xc19a4b, skin: 0xa77d5c },
  drama:     { robe: 0x4a2342, trim: 0xdcbd70, skin: 0xd8bfa6 },
  sleepy:    { robe: 0x2b3d4a, trim: 0x9aa29c, skin: 0xd0b79e },
};

// 판사봉 소리(합성). 인트로에서 소리를 켠 사람(ttt_sound=on)에게만 난다. 상한은 인트로 마스터와 같은 약 -12dBFS
let actx = null;
export function thud(n = 1) {
  try {
    if (localStorage.getItem("ttt_sound") !== "on") return;
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    const t = actx.currentTime, out = actx.createGain();
    out.gain.value = 0.9; out.connect(actx.destination);
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(175 - n * 12, t); o.frequency.exponentialRampToValueAtTime(46, t + 0.2);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.16 + n * 0.03, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0008, t + 0.34);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + 0.36);
    const len = Math.floor(actx.sampleRate * 0.05), buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const nz = actx.createBufferSource(), hp = actx.createBiquadFilter(), ng = actx.createGain();
    nz.buffer = buf; hp.type = "highpass"; hp.frequency.value = 1400; ng.gain.value = 0.1 + n * 0.02;
    nz.connect(hp); hp.connect(ng); ng.connect(out); nz.start(t);
  } catch { /* 소리는 없어도 됨 */ }
}

export function createCourt({ persona = "sato" } = {}) {
  const el = document.createElement("div");
  el.className = "stage3d";
  el.setAttribute("aria-hidden", "true");

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x000000, 0);
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d1114, 0.075);
  const cam = new THREE.PerspectiveCamera(36, 1, 0.1, 60);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new RoomEnvironment();
  const envRT = pmrem.fromScene(envScene, 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.28;
  envScene.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
  pmrem.dispose();

  // ── 재질 ──
  const tex = (c, repeat) => {
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  };
  const T = { marble: tex(TX.marble(512), true), leather: tex(TX.leather(256, 3, false), true), seal: tex(TX.seal(256)), dot: tex(TX.softDot(64), false) };
  T.marble.repeat.set(3, 3);
  const M = {
    marble: new THREE.MeshStandardMaterial({ map: T.marble, roughness: 0.45, color: 0xb9b4a8 }),
    floor: new THREE.MeshStandardMaterial({ color: 0x14191c, roughness: 0.28, metalness: 0.15 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x3a2a20, roughness: 0.55 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x241913, roughness: 0.6 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xc19a4b, metalness: 1, roughness: 0.32 }),
    leather: new THREE.MeshStandardMaterial({ map: T.leather, roughness: 0.7 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xe4dcc8, roughness: 0.9 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x1b2228, roughness: 0.85 }),
    banner: new THREE.MeshStandardMaterial({ color: 0x3b1214, roughness: 0.8 }),
    seal: new THREE.MeshBasicMaterial({ color: 0xb3302f, toneMapped: false }),
    skin: new THREE.MeshStandardMaterial({ color: 0xd8bfa6, roughness: 0.75 }),
    robe: new THREE.MeshStandardMaterial({ color: 0x7a1f1c, roughness: 0.8 }),
    trim: new THREE.MeshStandardMaterial({ color: 0xc19a4b, metalness: 0.9, roughness: 0.4 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.7 }),
    white: new THREE.MeshStandardMaterial({ color: 0xe6dfcc, roughness: 0.8 }),
    glow: new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false }),
  };
  const geoms = [];
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = scene, cast = true) => {
    geoms.push(geo);
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; parent.add(m); return m;
  };
  const box = (w, h, d, mat, x, y, z, parent) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent);
  const cyl = (rt, rb, h, mat, x, y, z, parent, seg = 28) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat, x, y, z, parent);

  // ── 법정: 바닥·기둥·뒷벽·휘장 ──
  const floor = new THREE.PlaneGeometry(40, 40); floor.rotateX(-Math.PI / 2); geoms.push(floor);
  const fm = new THREE.Mesh(floor, M.floor); fm.position.y = -0.32; fm.receiveShadow = true; scene.add(fm); // 대리석 바닥(윗면 y=0)과 겹치면 줄무늬가 깜빡여서 아래로
  box(40, 0.3, 40, M.marble, 0, -0.15, 0); // 카메라가 멀리 물러나도 대리석 끝이 안 보이게
  box(30, 6, 0.3, M.wall, 0, 3, -3.2);
  [-3.4, -2.2, 2.2, 3.4].forEach((x) => {
    cyl(0.24, 0.24, 5.4, M.marble, x, 2.7, -2.4);
    cyl(0.36, 0.36, 0.22, M.brass, x, 0.11, -2.4);
    cyl(0.34, 0.34, 0.2, M.brass, x, 5.35, -2.4);
  });
  box(2.6, 4.6, 0.12, M.banner, 0, 2.7, -3.0);
  const ring = mesh(new THREE.TorusGeometry(0.62, 0.04, 14, 64), M.brass, 0, 4.45, -2.92);
  ring.castShadow = false;
  // 저울 문양(휘장 위 황동 막대)
  box(1.1, 0.05, 0.05, M.brass, 0, 4.45, -2.9).castShadow = false;
  box(0.05, 0.9, 0.05, M.brass, 0, 4.15, -2.9).castShadow = false;

  // ── 법대 ──
  box(4.6, 0.24, 1.7, M.wood, 0, 0.34, 0.3);
  box(4.4, 0.9, 0.2, M.woodDark, 0, -0.02 + 0.2, 1.1);
  box(4.0, 0.04, 0.03, M.brass, 0, 0.5, 1.21).castShadow = false;
  box(4.8, 1.0, 0.5, M.wood, 0, 0.5, -0.78); // 판사 뒤 턱

  // ── 판사 ──
  const judge = new THREE.Group(); judge.position.set(0, 0.46, -0.45); scene.add(judge);
  const head = new THREE.Group(); head.position.set(0, 2.05, 0); judge.add(head);
  const robeBody = mesh(new THREE.CylinderGeometry(0.46, 0.92, 1.6, 18), M.robe, 0, 0.92, 0, judge);
  const collar = mesh(new THREE.TorusGeometry(0.46, 0.07, 10, 28), M.trim, 0, 1.68, 0, judge); collar.rotation.x = Math.PI / 2;
  const sash = box(0.22, 1.1, 0.06, M.white, 0, 1.15, 0.5, judge); sash.rotation.x = -0.12;
  [-1, 1].forEach((s) => {
    const arm = mesh(new THREE.CapsuleGeometry(0.2, 0.72, 6, 12), M.robe, s * 0.62, 1.15, 0.18, judge);
    arm.rotation.z = s * 0.55; arm.rotation.x = -0.35;
  });
  const skinMeshes = [];
  skinMeshes.push(mesh(new THREE.SphereGeometry(0.36, 28, 24), M.skin, 0, 0, 0, head));
  // 눈·입
  const eyeMat = M.dark, eyes = [];
  [-1, 1].forEach((s) => {
    const e = mesh(new THREE.SphereGeometry(0.045, 12, 10), eyeMat, s * 0.13, 0.04, 0.32, head, false); eyes.push(e);
  });
  const mouth = box(0.13, 0.025, 0.03, new THREE.MeshStandardMaterial({ color: 0x8a3a2e }), 0, -0.14, 0.34, head); mouth.castShadow = false;
  const brows = [-1, 1].map((s) => { const b = box(0.13, 0.025, 0.03, M.dark, s * 0.13, 0.13, 0.33, head); b.castShadow = false; return b; });
  // persona 소품 묶음(바꿀 때 통째로 지움)
  const props = new THREE.Group(); head.add(props);
  const zs = []; // sleepy: 떠오르는 z

  function buildProps(key) {
    props.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); } });
    props.clear(); zs.length = 0;
    const L = LOOKS[key] ?? LOOKS.sato;
    M.robe.color.setHex(L.robe); M.trim.color.setHex(L.trim); M.skin.color.setHex(L.skin);
    const add = (g, m, x, y, z, rx = 0, ry = 0, rz = 0) => { const o = mesh(g, m, x, y, z, props); o.rotation.set(rx, ry, rz); return o; };
    const hair = new THREE.MeshStandardMaterial({ color: key === "drama" ? 0x6b3a22 : 0x15171a, roughness: 0.85 });
    add(new THREE.SphereGeometry(0.375, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.55), hair, 0, 0.02, -0.03, -0.25);
    brows.forEach((b) => { b.rotation.z = 0; b.position.y = 0.13; });
    eyes.forEach((e) => { e.scale.set(1, 1, 1); });
    mouth.scale.set(1, 1, 1);
    if (key === "sato") { // 갓
      add(new THREE.CylinderGeometry(0.62, 0.62, 0.025, 30), M.dark, 0, 0.3, 0);
      add(new THREE.CylinderGeometry(0.24, 0.3, 0.42, 20), M.dark, 0, 0.52, 0);
      add(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 20), new THREE.MeshStandardMaterial({ color: 0x8c3a1c, roughness: 0.6 }), 0, 0.33, 0);
      add(new THREE.BoxGeometry(0.28, 0.14, 0.04), hair, 0, -0.28, 0.3); // 수염
      brows.forEach((b, i) => { b.rotation.z = (i ? 1 : -1) * 0.35; });
    } else if (key === "tsundere") { // 못 마땅한 눈썹, 붉은 스카프
      brows.forEach((b, i) => { b.rotation.z = (i ? -1 : 1) * 0.4; b.position.y = 0.15; });
      mouth.scale.set(0.6, 1, 1);
      const sc = add(new THREE.TorusGeometry(0.4, 0.07, 10, 28), new THREE.MeshStandardMaterial({ color: 0xb3302f, roughness: 0.7 }), 0, -0.4, 0.02, Math.PI / 2);
      sc.castShadow = false;
      add(new THREE.BoxGeometry(0.06, 0.16, 0.03), M.brass, 0.3, 0.2, 0.2, 0, 0, 0.5); // 머리핀
    } else if (key === "rapper") { // 선글라스·캡·금목걸이
      add(new THREE.BoxGeometry(0.2, 0.09, 0.05), M.dark, -0.13, 0.05, 0.34);
      add(new THREE.BoxGeometry(0.2, 0.09, 0.05), M.dark, 0.13, 0.05, 0.34);
      add(new THREE.BoxGeometry(0.1, 0.02, 0.04), M.dark, 0, 0.06, 0.34);
      add(new THREE.SphereGeometry(0.385, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.42), M.dark, 0, 0.04, 0);
      add(new THREE.BoxGeometry(0.5, 0.04, 0.4), M.dark, 0, 0.14, 0.4);
      const ch = add(new THREE.TorusGeometry(0.42, 0.028, 8, 32), M.brass, 0, -0.55, 0.12, Math.PI / 2.4);
      ch.castShadow = false;
      add(new THREE.SphereGeometry(0.07, 12, 10), M.brass, 0, -0.78, 0.46);
    } else if (key === "drama") { // 놀란 눈, 눈물
      eyes.forEach((e) => e.scale.set(1.5, 1.9, 1));
      brows.forEach((b, i) => { b.rotation.z = (i ? 1 : -1) * 0.3; b.position.y = 0.2; });
      mouth.scale.set(0.8, 4, 1);
      [-1, 1].forEach((s) => { const t = add(new THREE.SphereGeometry(0.035, 10, 8), new THREE.MeshStandardMaterial({ color: 0x9fd3ff, emissive: 0x3a7aa8, roughness: 0.2 }), s * 0.2, -0.05, 0.3); t.scale.set(1, 1.7, 1); });
      add(new THREE.SphereGeometry(0.1, 12, 10), hair, 0.28, 0.3, 0.05); // 머리 장식
    } else if (key === "sleepy") { // 감은 눈, 잠옷 모자, z
      eyes.forEach((e) => e.scale.set(1.6, 0.18, 1));
      mouth.scale.set(0.6, 1.6, 1);
      add(new THREE.ConeGeometry(0.34, 0.6, 18), new THREE.MeshStandardMaterial({ color: 0x4a6a8a, roughness: 0.8 }), 0.1, 0.55, -0.02, 0, 0, -0.25);
      add(new THREE.SphereGeometry(0.07, 10, 8), M.white, 0.28, 0.82, -0.02);
      const mk = (s) => { const c = document.createElement("canvas"); c.width = c.height = 64; const g = c.getContext("2d"); g.fillStyle = "#e6dfcc"; g.font = "bold 48px sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("z", 32, 34); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); sp.scale.setScalar(s); props.add(sp); return sp; };
      for (let i = 0; i < 3; i++) zs.push({ sp: mk(0.3), i });
    }
  }
  buildProps(persona);

  // ── 법전 ──
  const book = new THREE.Group(); book.position.set(-1.0, 0.5, 0.55); book.rotation.set(0.1, 0.18, 0); scene.add(book);
  box(0.8, 0.07, 1.0, M.leather, 0.4, 0, 0, book);
  box(0.72, 0.12, 0.92, M.paper, 0.4, 0.09, 0, book);
  const cover = new THREE.Group(); cover.position.set(0.04, 0.17, 0); book.add(cover);
  box(0.8, 0.05, 1.0, M.leather, 0.4, 0, 0, cover);
  box(0.24, 0.012, 0.32, M.brass, 0.4, 0.03, 0, cover).castShadow = false;
  const lamp = new THREE.PointLight(0xffcf8a, 0, 3.2, 2); lamp.position.set(0.4, 0.5, 0); book.add(lamp);

  // ── 판사봉과 받침 ──
  cyl(0.44, 0.48, 0.14, M.wood, 1.15, 0.53, 0.55);
  cyl(0.38, 0.38, 0.04, M.brass, 1.15, 0.62, 0.55);
  const hammer = new THREE.Group(); hammer.position.set(0.25, 0.75, 0.55); scene.add(hammer);
  cyl(0.065, 0.075, 0.95, M.wood, 0, 0.43, 0, hammer, 14);
  const hh = cyl(0.19, 0.19, 0.72, M.woodDark, 0, 0.9, 0, hammer, 24); hh.rotation.z = Math.PI / 2;
  [-0.28, 0.28].forEach((x) => { const r = cyl(0.205, 0.205, 0.08, M.brass, x, 0.9, 0, hammer, 24); r.rotation.z = Math.PI / 2; });

  // ── 먼지 입자와 조명 ──
  const N = 70, pPos = new Float32Array(N * 3), pSeed = [];
  for (let i = 0; i < N; i++) { pPos.set([(Math.random() - 0.5) * 6, Math.random() * 4.5, (Math.random() - 0.3) * 5], i * 3); pSeed.push(Math.random() * 6.28); }
  const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3)); geoms.push(pGeo);
  const dust = new THREE.Points(pGeo, new THREE.PointsMaterial({ map: T.dot, color: 0xdfe7ee, size: 0.05, transparent: true, opacity: 0.45, depthWrite: false }));
  scene.add(dust);

  scene.add(new THREE.HemisphereLight(0x8fa3b4, 0x0a0c0e, 0.35));
  const key = new THREE.SpotLight(0xffe6b8, 140, 0, 34 * DEG, 0.7, 1.6);
  key.position.set(-2.4, 6.5, 4.2); key.target.position.set(0, 1.2, 0); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
  scene.add(key, key.target);
  const rim = new THREE.PointLight(0xb3302f, 14, 9, 2); rim.position.set(3, 2.2, -1.6); scene.add(rim);
  const cool = new THREE.PointLight(0x9fb3c4, 8, 9, 2); cool.position.set(-3, 1.6, 2); scene.add(cool);

  // ── 상태 ──
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let strikeT0 = null, raf = 0, alive = true, w = 0, h = 0, seen = performance.now();
  const clock = new THREE.Clock();
  let shakeX = 0, shakeY = 0;

  function hammerAngle(ms) {
    if (ms < 0) return HAMMER_REST;
    if (ms < 100) return lerp(HAMMER_REST, HAMMER_UP, easeOut(ms / 100)); // 시작: 번쩍 들어올림
    for (let i = 0; i < HITS.length; i++) {
      const t = HITS[i], start = Math.max(t - 200, i ? HITS[i - 1] + 120 : 100); // 내려치는 구간은 200ms
      if (ms < start) return i ? lerp(HAMMER_DOWN, HAMMER_UP, easeOut(clamp((ms - HITS[i - 1]) / 120))) : HAMMER_UP; // 튕겨 오름
      if (ms <= t) return lerp(HAMMER_UP, HAMMER_DOWN, ((ms - start) / (t - start)) ** 3);
    }
    return lerp(HAMMER_DOWN, -1.2, easeOut(clamp((ms - HITS[HITS.length - 1]) / 260))); // 마지막 타 뒤 살짝 튕김
  }

  function frame() {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    if (document.hidden) return;
    if (!el.isConnected) { if (performance.now() - seen > 15000) dispose(); return; }
    seen = performance.now();
    const cw = el.clientWidth, ch = el.clientHeight;
    if (cw && ch && (cw !== w || ch !== h)) { w = cw; h = ch; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    if (!w) return;
    const t = clock.getElapsedTime();
    const ms = strikeT0 == null ? -1 : performance.now() - strikeT0;
    const aspect = w / h;
    // 카메라: 화면이 좁을수록 뒤로 물러나 법대 전체가 보이게. 타격 연출 중에는 판사봉 쪽으로 다가간다
    const striking = ms >= 0;
    const base = striking ? [0.55, 2.2, 5.3] : [0.25, 2.5, 6.3];
    const tgt = striking ? [0.45, 1.4, 0.5] : [0.1, 1.35, 0.2];
    // 세로 화면에서도 판사+판사봉(타격 때 약 4.2, 평소 법대 약 5.6 폭)이 가로로 다 들어오도록 거리를 계산
    const needW = striking ? 4.2 : 5.6;
    const d0 = Math.hypot(base[0] - tgt[0], base[1] - tgt[1], base[2] - tgt[2]);
    const tanH = Math.tan((36 * Math.PI) / 360);
    const dNeed = Math.max((needW / 2) / (tanH * aspect), 1.75 / tanH); // 가로 폭, 그리고 세로로 판사 모자까지(약 3.5)
    const back = clamp(dNeed / d0, 1, 4);
    let sx = 0, sy = 0, punch = 0;
    if (striking && !reduced) {
      for (const [i, th] of HITS.entries()) {
        const d = ms - th;
        if (d >= 0 && d < 380) { const a = [0.05, 0.085, 0.14][i] * Math.exp(-d / 85); sx += Math.sin(d * 0.11 + i) * a; sy += Math.cos(d * 0.13) * a * 0.7; punch = Math.max(punch, [1.2, 2.2, 3.6][i] * Math.exp(-d / 110)); }
      }
    }
    cam.position.set(tgt[0] + (base[0] - tgt[0]) * back + sx, tgt[1] + (base[1] - tgt[1]) * back + sy, tgt[2] + (base[2] - tgt[2]) * back);
    cam.lookAt(tgt[0], tgt[1], tgt[2]);
    cam.fov = 36 - punch;
    cam.updateProjectionMatrix();
    if (!reduced) cam.position.x += Math.sin(t * 0.25) * 0.15;
    // 판사: 숨 쉬듯 흔들리고, 사건에 따라 고개를 끄덕인다
    judge.rotation.y = reduced ? 0 : Math.sin(t * 0.35) * 0.09;
    head.rotation.z = reduced ? 0 : Math.sin(t * 0.5) * 0.05;
    head.rotation.x = reduced ? 0 : Math.sin(t * 0.7) * 0.03 + (persona === "sleepy" ? 0.15 + Math.sin(t * 0.8) * 0.12 : 0);
    // 법전: 열린 채로 둥둥
    cover.rotation.z = reduced ? 2.6 : Math.min(1, t / 1.8) * 2.6 + Math.sin(t * 0.6) * 0.03;
    book.position.y = 0.5 + (reduced ? 0 : Math.sin(t * 0.8) * 0.04);
    lamp.intensity = Math.min(1, t / 1.8) * (2.2 + (reduced ? 0 : Math.sin(t * 1.3) * 0.25));
    // 판사봉
    hammer.rotation.z = striking && !reduced ? hammerAngle(ms) : HAMMER_REST + (reduced ? 0 : Math.sin(t * 0.7) * 0.12);
    // 붉은 조명: 타격마다 번쩍(서서히 사라짐)
    let boost = 0;
    if (striking) for (const th of HITS) { const d = ms - th; if (d >= 0 && d < 320) boost = Math.max(boost, Math.exp(-d / 90)); }
    rim.intensity = 14 + boost * 70;
    // 먼지
    if (!reduced) {
      const a = pGeo.attributes.position;
      for (let i = 0; i < N; i++) { a.array[i * 3 + 1] += 0.0025 + Math.sin(t + pSeed[i]) * 0.0008; a.array[i * 3] += Math.sin(t * 0.3 + pSeed[i]) * 0.0009; if (a.array[i * 3 + 1] > 4.6) a.array[i * 3 + 1] = 0.2; }
      a.needsUpdate = true;
    }
    // z
    zs.forEach(({ sp, i }) => { const k = ((t * 0.35 + i / zs.length) % 1); sp.position.set(0.5 + k * 0.35, 0.5 + k * 0.9, 0.2); sp.material.opacity = Math.sin(k * Math.PI) * 0.9; sp.scale.setScalar(0.18 + k * 0.28); });
    renderer.render(scene, cam);
  }
  raf = requestAnimationFrame(frame);

  function dispose() {
    if (!alive) return;
    alive = false; cancelAnimationFrame(raf);
    geoms.forEach((g) => g.dispose());
    Object.values(T).forEach((t) => t.dispose());
    Object.values(M).forEach((m) => m.dispose());
    envRT.dispose();
    renderer.dispose();
    renderer.forceContextLoss?.();
    el.remove();
  }

  return {
    el,
    get alive() { return alive; },
    setPersona(p) { persona = p; buildProps(p); },
    // 판사봉 세 번 내려치기 시작(app.js의 타격 타이머와 같은 순간에 부른다)
    startStrike() { strikeT0 = performance.now(); },
    stopStrike() { strikeT0 = null; },
    dispose,
  };
}
