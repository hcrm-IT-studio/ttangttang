// 땅땅땅 인트로 — 소리(Web Audio 합성, 파일 없음)
// AudioContext와 OfflineAudioContext 둘 다에서 같은 코드가 돈다(오프라인 렌더로 레벨 검사).
import { statueSpeed, rng } from "./timeline.js";

export const MASTER_MAX = 0.25; // 마스터 상한(약 -12dBFS)
const cents = (c) => Math.pow(2, c / 1200);

function noiseBuffer(ctx, sec, seed, pink = false) {
  const len = Math.floor(ctx.sampleRate * sec);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  const r = rng(seed);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < len; i++) {
    const w = r() * 2 - 1;
    if (!pink) { d[i] = w; continue; }
    // Paul Kellet 핑크 노이즈
    b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856;
    b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
    d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
    b6 = w * 0.115926;
  }
  return buf;
}

// 큰 석조 법정: 스테레오 백색잡음 × 지수 감쇠 3.2s, 프리딜레이 30ms
function impulse(ctx, seed) {
  const sr = ctx.sampleRate, len = Math.floor(sr * 3.2), pre = Math.floor(sr * 0.03);
  const buf = ctx.createBuffer(2, len, sr);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c), r = rng(seed + c * 101);
    for (let i = pre; i < len; i++) {
      const x = (i - pre) / (len - pre);
      d[i] = (r() * 2 - 1) * Math.pow(1 - x, 2.2) * Math.exp(-x * 3.2);
    }
  }
  // 에너지 정규화(Σh² = 1): 정규화하지 않으면 잔향이 약 +35dB로 커져 리미터가 계속 눌림
  let e = 0;
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) e += d[i] * d[i]; }
  const k = 1 / Math.sqrt(e / 2);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] *= k; }
  return buf;
}

// 엔진: ctx에 마스터 체인을 만들고, 큐시트를 예약한다.
export function createEngine(ctx, opts = {}) {
  const seed = opts.seed ?? 7;
  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor(); // 리미터로 사용
  comp.threshold.value = -6; comp.ratio.value = 12; comp.knee.value = 0;
  comp.attack.value = 0.003; comp.release.value = 0.25;
  const verb = ctx.createConvolver();
  verb.normalize = false;
  verb.buffer = impulse(ctx, seed + 3);
  verb.connect(comp);
  comp.connect(master);
  master.connect(ctx.destination);

  const white = noiseBuffer(ctx, 2.0, seed + 11);
  const pink = noiseBuffer(ctx, 4.0, seed + 23, true);
  const nodes = []; // 정지용
  const track = (n) => (nodes.push(n), n);

  // 레이어 출력: 드라이 + 리버브 센드
  function out(send = 0.28) {
    const g = ctx.createGain();
    g.connect(comp);
    if (send > 0) { const s = ctx.createGain(); s.gain.value = send; g.connect(s); s.connect(verb); }
    return g;
  }
  function osc(type, f, when, stop, dest, detune = 1) {
    const o = track(ctx.createOscillator());
    o.type = type; o.frequency.value = f * detune;
    o.connect(dest); o.start(when); o.stop(stop);
    return o;
  }
  function noise(buf, when, dur, dest, loop = false) {
    const s = track(ctx.createBufferSource());
    s.buffer = buf; s.loop = loop;
    s.connect(dest);
    const off = loop ? 0 : (when * 0.37) % Math.max(0.01, buf.duration - dur - 0.01);
    s.start(when, off); s.stop(when + dur);
    return s;
  }
  // 저주파 변조: param += depth × sin
  function lfo(f, depth, when, stop, param) {
    const d = ctx.createGain(); d.gain.value = depth; d.connect(param);
    return osc("sine", f, when, stop, d);
  }
  function filt(type, f, q, dest) {
    const b = ctx.createBiquadFilter();
    b.type = type; b.frequency.value = f; b.Q.value = q; b.connect(dest);
    return b;
  }
  // 엔벌로프(시작이 늦으면 0.3s 페이드로 중간부터 합류)
  function env(g, a, peak, attack, rel0, rel, late) {
    g.gain.setValueAtTime(0, a);
    g.gain.linearRampToValueAtTime(peak, a + (late ? 0.3 : attack));
    g.gain.setValueAtTime(peak, Math.max(a + (late ? 0.3 : attack), rel0));
    g.gain.linearRampToValueAtTime(0, rel0 + rel);
  }

  // ── 효과음(나중에 판결 slam에서도 재사용할 수 있게 분리) ──
  const sfx = {
    drum(when, gain = 0.55) {
      const o = out(0.3);
      const g = ctx.createGain(); g.connect(o);
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(gain, when + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0008, when + 1.2);
      const s = osc("sine", 90, when, when + 1.25, g);
      s.frequency.setValueAtTime(90, when);
      s.frequency.exponentialRampToValueAtTime(58, when + 0.12);
      const ng = ctx.createGain(); ng.connect(o);
      ng.gain.setValueAtTime(gain * 0.8, when);
      ng.gain.exponentialRampToValueAtTime(0.0008, when + 0.03);
      noise(white, when, 0.05, filt("lowpass", 300, 0.7, ng));
    },
    gavel(strength = 0.55, when = ctx.currentTime) {
      const o = out(0.4);
      const ng = ctx.createGain(); ng.connect(o);
      ng.gain.setValueAtTime(strength * 1.6, when);
      ng.gain.exponentialRampToValueAtTime(0.0008, when + 0.09);
      noise(white, when, 0.12, filt("bandpass", 900, 2, ng));
      const tg = ctx.createGain(); tg.connect(o);
      tg.gain.setValueAtTime(0, when);
      tg.gain.linearRampToValueAtTime(strength * 1.4, when + 0.003);
      tg.gain.exponentialRampToValueAtTime(0.0008, when + 0.15);
      const s = osc("sine", 180, when, when + 0.17, tg);
      s.frequency.setValueAtTime(180, when);
      s.frequency.exponentialRampToValueAtTime(120, when + 0.15);
    },
    ping(f, when, gain) {
      const g = ctx.createGain(); g.connect(out(0.35));
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(gain, when + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0005, when + 0.4);
      osc("sine", f, when, when + 0.42, g);
    },
    bell(when, gain = 0.2) {
      const o = out(0.35);
      [[1, 1], [2.76, 0.5], [5.4, 0.25], [8.93, 0.12]].forEach(([m, a], i) => {
        const g = ctx.createGain(); g.connect(o);
        g.gain.setValueAtTime(0, when);
        g.gain.linearRampToValueAtTime(gain * a, when + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0005, when + 3.0 / (1 + i * 0.6));
        osc("sine", 220 * m, when, when + 3.05, g);
      });
    },
    click(f, q, when, dur, gain) {
      const g = ctx.createGain(); g.connect(out(0.2));
      g.gain.setValueAtTime(gain, when);
      g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
      noise(white, when, dur + 0.01, filt("bandpass", f, q, g));
    },
    boom(when, gain = 0.35) {
      const g = ctx.createGain(); g.connect(out(0.2));
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(gain, when + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0005, when + 1.5);
      osc("sine", 40, when, when + 1.55, g);
    },
  };

  // ── 큐시트 예약: t=0이 ctx 시간 T0, fromT 이전의 단발음은 건너뜀 ──
  function schedule(T0, fromT = 0, timeScale = 1) {
    const at = (t) => T0 + (t - fromT) * timeScale;
    const now = at(fromT);
    const late = (t) => t < fromT;
    const S = (t) => Math.max(now, at(t));
    const one = (t, fn) => { if (!late(t)) fn(at(t)); };

    // 드론 0.0–4.6 (어택 2.0s, 릴리즈 0.8s)
    if (fromT < 4.6) {
      const g = ctx.createGain(); g.connect(out(0.3));
      env(g, S(0), 0.18 / 3, 2.0 * timeScale, at(4.6), 0.8 * timeScale, late(0));
      const lp = filt("lowpass", 200, 0.7, g);
      lp.frequency.setValueAtTime(200, S(0));
      lp.frequency.exponentialRampToValueAtTime(1200, at(4.6));
      [55, 82.4].forEach((f) => [-7, 7].forEach((c) => osc("sawtooth", f, S(0), at(5.5), lp, cents(c))));
    }
    // 현악 패드 0.8–7.4 (A단조 add9, 트레몰로 5Hz 3%)
    if (fromT < 7.4) {
      const g = ctx.createGain(); g.connect(out(0.35));
      const trem = ctx.createGain(); trem.connect(g); trem.gain.value = 1;
      lfo(5, 0.03, S(0.8), at(7.8), trem.gain);
      env(g, S(0.8), 0.12 / 5, 2.5 * timeScale, at(7.4), 0.3 * timeScale, late(0.8));
      const lp = filt("lowpass", 1800, 0.7, trem);
      [110, 130.8, 164.8, 246.9].forEach((f) => [-5, 5].forEach((c) => osc("sawtooth", f, S(0.8), at(7.8), lp, cents(c))));
    }
    one(1.6, (w) => sfx.drum(w, 0.55));
    // 회전 바람 1.8–4.4: 회전 속도를 따라 대역·크기 변화
    if (fromT < 4.4) {
      const g = ctx.createGain(); g.connect(out(0.25));
      const bp = filt("bandpass", 600, 0.8, g);
      const n = 64, s0 = Math.max(1.8, fromT), dur = (4.4 - s0) * timeScale;
      if (dur > 0.05) {
        const gc = new Float32Array(n), fc = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          const v = statueSpeed(s0 + ((4.4 - s0) * i) / (n - 1));
          gc[i] = 0.06 * v; fc[i] = 400 + 500 * v;
        }
        g.gain.setValueCurveAtTime(gc, at(s0), dur);
        bp.frequency.setValueCurveAtTime(fc, at(s0), dur);
        noise(pink, at(s0), dur + 0.05, bp, true);
      }
    }
    // 저울 안정 4.4: 짤랑 3번
    [0, 0.04, 0.08].forEach((d, i) => one(4.4 + d, (w) => sfx.ping(i % 2 ? 3700 : 2400, w, 0.05)));
    one(4.6, (w) => { sfx.drum(w, 0.55); sfx.bell(w, 0.2); });
    one(4.8, (w) => sfx.click(3000, 4, w, 0.015, 0.1));
    // 가죽 삐걱 4.9–5.6: 대역 노이즈 × 8Hz AM
    if (fromT < 5.6) {
      const g = ctx.createGain(); g.connect(out(0.25));
      env(g, S(4.9), 0.08, 0.08 * timeScale, at(5.45), 0.15 * timeScale, late(4.9));
      const am = ctx.createGain(); am.gain.value = 0.5; am.connect(g);
      lfo(8, 0.5, S(4.9), at(5.65), am.gain);
      noise(white, S(4.9), at(5.65) - S(4.9), filt("bandpass", 400, 2, am));
    }
    // 브라스 스택 5.0–6.4 (필터 300 → 2,500Hz, 어택 80ms, 릴리즈 0.6s)
    if (fromT < 6.4) {
      const g = ctx.createGain(); g.connect(out(0.35));
      env(g, S(5.0), 0.14 / 5, 0.08 * timeScale, at(6.4), 0.6 * timeScale, late(5.0));
      const lp = filt("lowpass", 300, 0.9, g);
      lp.frequency.setValueAtTime(300, S(5.0));
      lp.frequency.exponentialRampToValueAtTime(2500, Math.max(S(5.0) + 0.05, at(5.8)));
      [110, 165, 220].forEach((f) => osc("sawtooth", f, S(5.0), at(7.1), lp));
    }
    // 종이 넘김 ×7
    const pr = rng(seed + 41);
    for (let i = 0; i < 7; i++) { const v = 0.07 * (0.8 + pr() * 0.4); one(5.6 + i * 0.1, (w) => sfx.click(2500, 1, w, 0.06, v)); }
    // 나무망치 세 번 + 저음 붐
    [[6.6, 0.45], [7.0, 0.55], [7.4, 0.7]].forEach(([t, s]) => one(t, (w) => sfx.gavel(s, w)));
    one(7.4, (w) => sfx.boom(w, 0.35));
    // 7.8–9.2: 침묵(리버브 꼬리만)
  }

  return {
    ctx, master, sfx,
    start(fromT = 0, timeScale = 1, lead = 0.05) {
      const T0 = ctx.currentTime + lead;
      schedule(T0, fromT, timeScale);
      master.gain.cancelScheduledValues(0);
      master.gain.setValueAtTime(0, T0);
      master.gain.linearRampToValueAtTime(this.muted ? 0 : MASTER_MAX, T0 + 0.4); // 400ms 페이드인
      return T0;
    },
    muted: false,
    setMuted(m) {
      this.muted = m;
      const n = ctx.currentTime;
      master.gain.cancelScheduledValues(n);
      master.gain.setValueAtTime(master.gain.value, n);
      master.gain.linearRampToValueAtTime(m ? 0 : MASTER_MAX, n + 0.08); // 80ms
    },
    // 건너뛰기: 300ms 페이드아웃 후 suspend
    fadeOut(ms = 300) {
      const n = ctx.currentTime;
      master.gain.cancelScheduledValues(n);
      master.gain.setValueAtTime(master.gain.value, n);
      master.gain.linearRampToValueAtTime(0, n + ms / 1000);
      return new Promise((res) => setTimeout(() => {
        try { ctx.state !== "closed" && ctx.suspend && ctx.suspend(); } catch (e) { /* 무시 */ }
        res();
      }, ms + 20));
    },
    stopAll() {
      for (const n of nodes) { try { n.stop(); } catch (e) { /* 이미 멈춤 */ } try { n.disconnect(); } catch (e) { /* 무시 */ } }
      nodes.length = 0;
    },
  };
}

// 오프라인 렌더(QA용): 같은 합성 코드로 WAV 데이터를 만든다
export async function renderOffline(sec = 10.5, sampleRate = 44100) {
  const ctx = new OfflineAudioContext(2, Math.ceil(sec * sampleRate), sampleRate);
  const eng = createEngine(ctx);
  eng.start(0, 1, 0);
  const buf = await ctx.startRendering();
  return buf;
}
