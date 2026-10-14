// 땅땅땅 — 천창 빛 속 먼지(홈 히어로·휴정 화면에서만). canvas 하나, 입자 ≤ 36, 30fps, DPR 1.
(() => {
  "use strict";
  const cv = document.getElementById("ambient");
  if (!cv || !cv.getContext) return;
  const get = (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const c = navigator.connection || {};
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || c.saveData || /^[34]$/.test(get("ttt_intro_tier") || "")) return;

  const start = () => {
    const g = cv.getContext("2d");
    const N = 36, P = [];
    let W = 0, H = 0, raf = 0, last = 0, on = false, heroSeen = false;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const seed = (p, anyY) => {
      p.x = rnd(0.32, 0.68); p.y = anyY ? Math.random() : 1.05; p.s = rnd(1, 2);
      p.a = rnd(0.15, 0.4); p.v = rnd(4, 10); p.w = rnd(0, 6.28);
    };
    for (let i = 0; i < N; i++) { const p = {}; seed(p, true); P.push(p); }
    const size = () => { W = cv.width = innerWidth; H = cv.height = Math.round(innerHeight * 0.7); };
    size();
    addEventListener("resize", size);

    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (t - last < 33) return; // 30fps 제한
      const dt = Math.min(0.1, (t - last) / 1000); last = t;
      g.clearRect(0, 0, W, H);
      g.fillStyle = "#e6dfcc";
      for (const p of P) {
        p.y -= (p.v * dt) / H; p.w += dt * 0.6;
        if (p.y < -0.02) seed(p, false);
        const x = p.x * W + Math.sin(p.w) * 6, d = Math.abs(p.x - 0.5) / 0.18; // 천창 원뿔 안에서만 보이게
        g.globalAlpha = p.a * Math.max(0, 1 - d * d) * Math.min(1, p.y * 3);
        g.fillRect(x, p.y * H, p.s, p.s);
      }
    }
    const run = (v) => {
      if (v === on) return;
      on = v; cv.style.display = v ? "block" : "none";
      if (v && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf);
    };
    // 홈 히어로가 화면에 보이거나 휴정 화면일 때만 켬
    const io = window.IntersectionObserver ? new IntersectionObserver((es) => { heroSeen = es.some((e) => e.isIntersecting); check(); }) : null;
    let watched = null;
    function check() {
      const hero = document.querySelector("#app .hero");
      if (io && hero !== watched) { if (watched) io.unobserve(watched); watched = hero; if (hero) io.observe(hero); else heroSeen = false; }
      run(!!document.querySelector("#app .recess") || (!!hero && (heroSeen || !io)));
    }
    new MutationObserver(check).observe(document.getElementById("app"), { childList: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else if (on) { last = performance.now(); raf = requestAnimationFrame(frame); } });
    check();
  };
  (window.requestIdleCallback || ((f) => setTimeout(f, 300)))(start);
})();
