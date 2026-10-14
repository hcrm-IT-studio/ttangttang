// 땅땅땅 인트로 — 실행 중 만드는 텍스처(캔버스). 이미지 파일을 쓰지 않는다.
import { rng } from "./timeline.js";

const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
const SERIF = '"Noto Serif KR", "Noto Serif CJK KR", "Nanum Myeongjo", "Batang", serif';
const DISPLAY = '"Black Han Sans", "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';

// 대리석: 흰 바탕 + 2옥타브 얼룩 + 굽은 회색 결 3줄(투명도 0.35)
export function marble(size = 1024, seed = 5) {
  const c = mk(size, size), g = c.getContext("2d"), r = rng(seed);
  g.fillStyle = "#e8e3d6"; g.fillRect(0, 0, size, size);
  // 옥타브 1·2: 흐린 얼룩(큰 것 → 작은 것)
  for (const [n, rad, a] of [[60, 0.16, 0.05], [260, 0.05, 0.05]]) {
    for (let i = 0; i < n; i++) {
      const x = r() * size, y = r() * size, rr = rad * size * (0.5 + r());
      const gr = g.createRadialGradient(x, y, 0, x, y, rr);
      const tone = r() < 0.5 ? "185,179,166" : "250,248,240";
      gr.addColorStop(0, `rgba(${tone},${a})`); gr.addColorStop(1, `rgba(${tone},0)`);
      g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    }
  }
  // 결: 굽은 선 3줄 + 가는 가지
  g.lineCap = "round";
  for (let v = 0; v < 3; v++) {
    let x = r() * size, y = -20;
    const pts = [[x, y]];
    while (y < size + 20) { y += 30 + r() * 50; x += (r() - 0.5) * 140; pts.push([x, y]); }
    for (const [w, a] of [[7, 0.08], [2.4, 0.35], [1, 0.25]]) {
      g.strokeStyle = `rgba(150,143,128,${a})`; g.lineWidth = w * (size / 1024);
      g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
        g.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      g.stroke();
    }
  }
  return c;
}

// 가죽 표지: 짙은 병녹색 + 결 + 음각 이중 테두리 + "법전"
export function leather(size = 512, seed = 9, title = true) {
  const c = mk(size, size), g = c.getContext("2d"), r = rng(seed);
  g.fillStyle = "#23302a"; g.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i++) {
    const x = r() * size, y = r() * size, s = 1 + r() * 2.5;
    g.fillStyle = r() < 0.5 ? "rgba(0,0,0,0.18)" : "rgba(80,100,88,0.10)";
    g.fillRect(x, y, s, s);
  }
  if (title) {
    const emboss = (draw) => {
      g.save(); g.translate(0, 1.5); g.strokeStyle = g.fillStyle = "rgba(120,140,126,0.35)"; draw(); g.restore();
      g.save(); g.strokeStyle = g.fillStyle = "rgba(6,10,8,0.85)"; draw(); g.restore();
    };
    const m = size * 0.07;
    emboss(() => { g.lineWidth = 3; g.strokeRect(m, m, size - 2 * m, size - 2 * m); });
    emboss(() => { g.lineWidth = 1.5; g.strokeRect(m + 12, m + 12, size - 2 * m - 24, size - 2 * m - 24); });
    emboss(() => { g.font = `${Math.round(size * 0.16)}px ${DISPLAY}`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("법전", size / 2, size / 2); });
    emboss(() => { g.lineWidth = 2; g.beginPath(); g.moveTo(size * 0.38, size * 0.62); g.lineTo(size * 0.62, size * 0.62); g.stroke(); });
  }
  return c;
}

// 펼친 면: 1024×512, 왼쪽 제1조 / 오른쪽 제2조(인장 자리)
export function spread(w = 1024, h = 512) {
  const c = mk(w, h), g = c.getContext("2d"), r = rng(13);
  g.fillStyle = "#e6dfcc"; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 1800; i++) { g.fillStyle = `rgba(120,100,70,${0.02 + r() * 0.03})`; g.fillRect(r() * w, r() * h, 1.5, 1.5); }
  // 책등 쪽 그늘
  const gut = g.createLinearGradient(w / 2 - 60, 0, w / 2 + 60, 0);
  gut.addColorStop(0, "rgba(90,70,40,0)"); gut.addColorStop(0.5, "rgba(90,70,40,0.28)"); gut.addColorStop(1, "rgba(90,70,40,0)");
  g.fillStyle = gut; g.fillRect(w / 2 - 60, 0, 120, h);
  const ink = "#2b2620";
  const page = (x0, head, lines) => {
    g.fillStyle = ink; g.textAlign = "left"; g.textBaseline = "alphabetic";
    g.font = `46px ${DISPLAY}`; g.fillText(head, x0, 118);
    g.fillStyle = "rgba(43,38,32,0.6)"; g.fillRect(x0, 138, 64, 3);
    g.fillStyle = ink; g.font = `600 31px ${SERIF}`;
    lines.forEach((l, i) => g.fillText(l, x0, 205 + i * 50));
  };
  page(64, "제1조", ["억울한 사람은 누구나", "친구를 법정에", "부를 수 있다."]);
  page(w / 2 + 52, "제2조", ["판결은 웃으며", "받아들인다."]);
  // 오른쪽 아래: 인장 자리(빈 칸 표시)
  g.strokeStyle = "rgba(43,38,32,0.25)"; g.lineWidth = 1.5; g.setLineDash([5, 5]);
  g.strokeRect(w - 220, h - 200, 132, 132); g.setLineDash([]);
  g.fillStyle = "rgba(43,38,32,0.55)"; g.font = `20px ${SERIF}`; g.fillText("재판장", w - 214, h - 216);
  return c;
}

// 넘기는 종이: 흐린 줄
export function sheet(w = 256, h = 384) {
  const c = mk(w, h), g = c.getContext("2d"), r = rng(17);
  g.fillStyle = "#e9e2cf"; g.fillRect(0, 0, w, h);
  g.fillStyle = "rgba(60,50,35,0.13)";
  for (let y = 70; y < h - 40; y += 22) g.fillRect(26, y, w - 52 - r() * 60, 2);
  return c;
}

// 페이지 묶음 옆면: 촘촘한 줄무늬
export function pageEdge(w = 64, h = 256) {
  const c = mk(w, h), g = c.getContext("2d"), r = rng(19);
  g.fillStyle = "#ddd5bf"; g.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(110,95,70,${0.08 + r() * 0.12})`; g.fillRect(0, y, w, 1); }
  return c;
}

// 붉은 인장: "땅땅땅 / 재판소"(음각 = 글자는 종이색), 인주 번짐
export function seal(size = 256) {
  const c = mk(size, size), g = c.getContext("2d"), r = rng(23);
  const red = "#b3302f";
  g.fillStyle = red;
  const m = size * 0.06;
  g.fillRect(m, m, size - 2 * m, size - 2 * m);
  g.globalCompositeOperation = "destination-out";
  g.strokeStyle = "#000"; g.lineWidth = size * 0.035;
  g.strokeRect(m + size * 0.06, m + size * 0.06, size - 2 * m - size * 0.12, size - 2 * m - size * 0.12);
  g.fillStyle = "#000"; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = `${Math.round(size * 0.25)}px ${DISPLAY}`; g.fillText("땅땅땅", size / 2, size * 0.39);
  g.font = `${Math.round(size * 0.2)}px ${DISPLAY}`; g.fillText("재판소", size / 2, size * 0.66);
  // 인주가 덜 묻은 자리
  for (let i = 0; i < 260; i++) { const s = 1 + r() * 5; g.globalAlpha = 0.3 + r() * 0.5; g.fillRect(r() * size, r() * size, s, s); }
  g.globalAlpha = 1; g.globalCompositeOperation = "source-over";
  return c;
}

// 둥근 부드러운 점(먼지·빛 스프라이트)
export function softDot(size = 64, inner = "rgba(255,255,255,1)") {
  const c = mk(size, size), g = c.getContext("2d");
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gr.addColorStop(0, inner); gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return c;
}
