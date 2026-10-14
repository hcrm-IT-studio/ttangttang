// 땅땅땅 인트로 — 타임라인(시간 → 값). three.js·DOM에 의존하지 않는 순수 함수만 둔다.
// 같은 t를 넣으면 항상 같은 값이 나온다(디버그 시킹·QA 프레임 캡처가 결정적이도록).

export const LENGTH = 9.2;            // 전체 길이(초)
export const HITS = [6.6, 7.0, 7.4];  // 망치 세 번
export const SEAL_T = 7.4;            // 붉은 인장(붉은색은 이때 처음 나온다)
export const CUTS = [1.6, 4.6, 6.4];  // 샷이 바뀌는 지점(하드 컷)
export const DEG = Math.PI / 180;

export const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const lerp = (a, b, k) => a + (b - a) * k;
export const prog = (t, a, b) => clamp((t - a) / (b - a));
export const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
export const easeInCubic = (x) => x * x * x;
export const smooth = (x) => x * x * (3 - 2 * x);

// (t, 시작, 끝, a, b, 보간) — 구간 밖에서는 끝값 유지
export const ramp = (t, t0, t1, a, b, ease = easeInOutCubic) => lerp(a, b, ease(prog(t, t0, t1)));

// 키프레임 [[t, v], ...] 선형(또는 지정 보간)
export function keys(t, ks, ease = smooth) {
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 1; i < ks.length; i++) {
    if (t <= ks[i][0]) {
      const [t0, v0] = ks[i - 1], [t1, v1] = ks[i];
      return lerp(v0, v1, ease((t - t0) / (t1 - t0)));
    }
  }
  return ks[ks.length - 1][1];
}

// 결정적 난수(시드 고정)
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// ── 여신 회전 (1.8–4.4s, +360°, easeInOutCubic) ──
const ROT0 = 1.8, ROT1 = 4.4;
export const FACE_YAW = -40 * DEG; // 4.4s에 궤도 끝(-40°)의 카메라를 정면으로 본다
export function statueYaw(t) {
  return FACE_YAW - 2 * Math.PI * (1 - easeInOutCubic(prog(t, ROT0, ROT1)));
}
// 회전 속도 0~1(최대 속도 = 1). 끈 펄럭임·바람 소리에 같이 쓴다.
export function statueSpeed(t) {
  if (t <= ROT0 || t >= ROT1) return 0;
  const x = (t - ROT0) / (ROT1 - ROT0);
  const d = x < 0.5 ? 12 * x * x : 3 * Math.pow(-2 * x + 2, 2);
  return d / 3;
}
// 저울 들보: 회전 중 ±6° 감쇠 진동, 4.4s에 정확히 수평
export function beamAngle(t) {
  if (t <= ROT0 || t >= ROT1 + 0.0001) return 0;
  const x = (t - ROT0) / (ROT1 - ROT0);
  const env = Math.pow(Math.sin(Math.PI * x), 1.2) * (1 - 0.55 * x);
  return 6 * DEG * env * Math.sin(2 * Math.PI * 1.35 * (t - ROT0));
}

// ── 카메라 ──
// 반환: pos[3], target[3], fov, w(세로 화면에서 꼭 보여야 하는 가로 폭, m), roll
export function camera(t) {
  let pos, target, fov, w;
  if (t < 1.6) { // S1 어둠
    const k = easeInOutCubic(prog(t, 0, 1.6));
    pos = [0, lerp(0.6, 0.9, k), lerp(4.2, 3.8, k)];
    target = [0, 2.6, 0];
    fov = 34;
    w = 1.8;
  } else if (t < 4.6) { // S2 회전 — 카메라는 여신과 반대 방향으로 궤도
    const k = easeInOutCubic(prog(t, 1.6, 4.6));
    const a = lerp(0, -40 * DEG, k);
    const r = 3.6;
    pos = [r * Math.sin(a), lerp(1.6, 2.4, k), r * Math.cos(a)];
    target = [lerp(-0.12, -0.18, k), lerp(2.4, 2.8, k), 0];
    fov = lerp(34, 30, k);
    w = lerp(1.7, 2.0, k);
  } else if (t < 6.4) { // S3 법전 — 크레인 다운
    const k = easeInOutCubic(prog(t, 4.6, 5.0));
    const drift = easeInOutCubic(prog(t, 5.0, 6.4));
    pos = [0, lerp(2.0, 1.75, k) - 0.04 * drift, lerp(3.2, 2.55, k) - 0.08 * drift];
    target = [0, 1.1, 1.7];
    fov = lerp(30, 38, easeInOutCubic(prog(t, 4.6, 6.4)));
    w = lerp(1.0, 0.68, k);
  } else if (t < 7.8) { // S4 땅땅땅 — 위에서 내려다봄, 미세한 숨쉬기
    const b = 0.005 * Math.sin((t - 6.4) * 2.1);
    pos = [b * 0.6, 2.2 + b, 1.95];
    target = [0, 1.1, 1.58]; // 책이 화면 아래쪽에 놓여 위의 "땅" 글자와 겹치지 않게
    fov = 40;
    w = 0.7;
  } else { // S5 전환 — 페이지 속으로
    const k = easeInOutCubic(prog(t, 7.8, 8.7));
    pos = [0, lerp(2.2, 1.3, k), lerp(1.95, 1.75, k)];
    target = [lerp(0, 0.06, k), 1.1, lerp(1.58, 1.7, k)];
    fov = lerp(40, 24, k);
    w = lerp(0.7, 0.05, easeInOutCubic(prog(t, 7.8, 8.4)));
  }
  return { pos, target, fov, w, shake: shake(t) };
}

// 망치 흔들림(회전 오프셋만, 위치는 흔들지 않음). 감쇠 180ms.
const SHAKE = [[6.6, 0.004], [7.0, 0.007], [7.4, 0.012]];
export function shake(t) {
  let x = 0, z = 0;
  for (const [h, a] of SHAKE) {
    const d = t - h;
    if (d < 0 || d > 0.9) continue;
    const e = a * Math.exp(-d / 0.18);
    x += e * Math.sin(d * 2 * Math.PI * 11);
    z += e * 0.6 * Math.sin(d * 2 * Math.PI * 7 + 1.3);
  }
  return [x, z];
}

// ── 조명·후처리 (상대값) ──
export function looks(t) {
  return {
    sky: ramp(t, 0.3, 1.4, 0, 1, easeOutCubic),
    rim: t < 4.6 ? 0.6 : 0.3,
    hemi: 0.15,
    env: 0.03 + 0.22 * ramp(t, 0.3, 1.6, 0, 1),
    bookLight: t < 4.9 ? 0 : t < 6.4 ? ramp(t, 4.9, 5.6, 0, 3.5, easeOutCubic) : ramp(t, 6.4, 6.8, 3.5, 1.8),
    bookShaft: keys(t, [[5.0, 0], [5.4, 0.35], [6.4, 0.12]]),
    fog: ramp(t, 1.6, 2.4, 0.11, 0.07),
    exposure: ramp(t, 4.6, 5.0, 0.85, 1.0),
    bloom: keys(t, [[0, 0.35], [4.6, 0.35], [5.4, 0.9], [6.4, 0.5]]),
    shaft: 0.08 * ramp(t, 0.3, 1.4, 0, 1, easeOutCubic),
    seal: t < SEAL_T ? 0 : keys(t, [[SEAL_T, 0.6], [7.8, 0.25]]),
  };
}

// ── 법전 ──
export function codex(t) {
  const buckle = ramp(t, 4.8, 4.9, 0, 30 * DEG, easeOutCubic);
  // 앞표지 0 → 178°, 5.6–5.75 사이 181°까지 넘어갔다 178°로 안착
  let cover = ramp(t, 4.9, 5.6, 0, 178 * DEG, easeOutCubic);
  if (t > 5.6) cover = 178 * DEG + 3 * DEG * Math.sin(Math.PI * prog(t, 5.6, 5.75));
  return { buckle, cover, leak: ramp(t, 5.0, 5.4, 0, 1) };
}
// 넘기는 페이지 i(0..n-1): 0(오른쪽에 누움) → 1(왼쪽에 누움)
export function pageFlip(t, i, n = 7) {
  const step = n === 7 ? 0.07 : 0.2;   // 7장: 70ms 간격(명세 100ms로는 마지막 장이 6.46s에 끝나 6.3s를 넘김) / 3장: 같은 시간 안에 나눔
  const dur = n === 7 ? 0.26 : 0.3;
  return easeInOutCubic(prog(t, 5.6 + i * step, 5.6 + i * step + dur));
}
// 인장: 1.6 → 1.0 / 70ms, 투명도 0 → 1
export function seal(t) {
  if (t < SEAL_T) return { on: false, scale: 1.6, alpha: 0 };
  const k = easeOutCubic(prog(t, SEAL_T, SEAL_T + 0.07));
  return { on: true, scale: lerp(1.6, 1.0, k), alpha: lerp(0.35, 1, k) }; // 7.4s 첫 프레임부터 보이게
}

// ── DOM 오버레이 ──
export function overlay(t) {
  const words = HITS.map((h) => {
    if (t < h) return { on: false, scale: 1.5, alpha: 0 };
    const k = easeOutCubic(prog(t, h, h + 0.09));
    const out = 1 - prog(t, 8.1, 8.5);
    return { on: true, scale: lerp(1.5, 1.0, k), alpha: Math.min(1, 0.35 + k) * out };
  });
  const flash = t >= SEAL_T && t < SEAL_T + 0.06 ? 0.2 : 0; // 단 한 번, 60ms
  // 8.45–8.6 뼈색 종이로 덮임 → 8.6–9.0 건메탈로 → 9.0–9.2 걷힘
  const coverA = t < 9.0 ? prog(t, 8.45, 8.6) : 1 - prog(t, 9.0, 9.2);
  const toMetal = prog(t, 8.6, 9.0);
  return { words, flash, coverA, toMetal };
}
