// 땅땅땅 인트로 — 3단계(2D) 폴백. three.js 없이 DOM/CSS/SVG로 같은 흐름을 흉내낸다.
// render(t)의 t는 3D와 같은 타임라인 시각(0–9.2). 실제 길이는 플레이어가 줄여서(약 6초) 재생한다.
import { prog, easeInOutCubic, easeOutCubic, statueYaw, FACE_YAW, codex as codexT, seal as sealT, ramp } from "./timeline.js";

export function createScene2D({ container, goddessSvg }) {
  const root = document.createElement("div");
  root.className = "i2d";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="i2d-spot"></div>
    <div class="i2d-dust"></div>
    <div class="i2d-goddess">${goddessSvg}</div>
    <div class="i2d-book">
      <div class="i2d-page i2d-l"><b>제1조</b><span>억울한 사람은 누구나<br>친구를 법정에<br>부를 수 있다.</span></div>
      <div class="i2d-page i2d-r"><b>제2조</b><span>판결은 웃으며<br>받아들인다.</span><i class="i2d-seal">땅땅땅<br>재판소</i></div>
      <div class="i2d-cover"><em>법전</em></div>
      <div class="i2d-glow"></div>
    </div>`;
  container.appendChild(root);
  const $ = (s) => root.querySelector(s);
  const spot = $(".i2d-spot"), god = $(".i2d-goddess"), book = $(".i2d-book"), cover = $(".i2d-cover"), glow = $(".i2d-glow"), sealEl = $(".i2d-seal"), dust = $(".i2d-dust");

  function render(t) {
    spot.style.opacity = ramp(t, 0.3, 1.4, 0, 1, easeOutCubic).toFixed(3);
    dust.style.opacity = (0.6 * ramp(t, 0.3, 1.4, 0, 1)).toFixed(3);
    dust.style.backgroundPosition = `0 ${(-t * 6).toFixed(1)}px`;
    // 여신: 가로 뒤집기로 회전을 흉내(1 → -1 → 1), 4.6s부터 위로 물러나며 어두워짐
    const turn = statueYaw(t) - FACE_YAW;           // -2π → 0
    const sx = Math.cos(turn);
    const away = easeInOutCubic(prog(t, 4.6, 5.2));
    const back = sx < 0 ? 0.55 : 1;
    god.style.transform = `translate(-50%, ${(-away * 12).toFixed(2)}%) scale(${(1 - 0.25 * away).toFixed(3)}) scaleX(${(Math.sign(sx) * Math.max(0.04, Math.abs(sx))).toFixed(3)})`;
    god.style.filter = `brightness(${(back * (t < 1.6 ? 0.35 + 0.65 * prog(t, 0.6, 1.6) : 1) * (1 - 0.6 * away)).toFixed(3)})`;
    // 법전: 4.6s 등장 → 표지 열림 → 7.8s부터 페이지 속으로
    const c = codexT(t);
    const show = easeOutCubic(prog(t, 4.6, 4.9));
    const zoom = easeInOutCubic(prog(t, 7.8, 8.7));
    book.style.opacity = show.toFixed(3);
    book.style.transform = `translate(-50%, ${(20 - 20 * show).toFixed(1)}px) scale(${(1 + zoom * 3.2).toFixed(3)})`;
    cover.style.transform = `rotateY(${(-c.cover / Math.PI * 180).toFixed(2)}deg)`;
    glow.style.opacity = (Math.min(1, ramp(t, 4.9, 5.6, 0, 1)) * (t < 6.4 ? 1 : 0.55)).toFixed(3);
    const s = sealT(t);
    sealEl.style.opacity = s.alpha.toFixed(3);
    sealEl.style.transform = `rotate(-6deg) scale(${s.scale.toFixed(3)})`;
  }
  return { render, resize() {}, degrade() {}, stats: () => ({ tier: 3 }), dispose() { root.remove(); } };
}
