// 땅땅땅 인트로 — 법전(절차적). 책 로컬 좌표: 면의 법선 +y, 책등 = z축(x=0), +z가 읽는 사람 쪽.
import * as THREE from "three";
import { codex as codexT, pageFlip, seal as sealT, looks, rng, SEAL_T } from "./timeline.js";
import { mergeStatic } from "./merge.js";

const W = 0.31, H = 0.46, COVER = 0.012, BLOCK = 0.04, PW = 0.29, PH = 0.44;
const TOP = COVER + BLOCK; // 펼친 면 높이(0.052)
const OPEN = 178 * Math.PI / 180;  // 다 펼친 각도(표지와 같은 면에 눕도록)

// 펼친 면용 평면: 위를 보고, 텍스처 위쪽이 -z(먼 쪽)
function pagePlane(u0, u1, faceDown = false) {
  const g = new THREE.PlaneGeometry(PW, PH);
  if (faceDown) { g.rotateX(Math.PI / 2); g.rotateY(Math.PI); } else g.rotateX(-Math.PI / 2);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, u0 + uv.getX(i) * (u1 - u0));
  return g;
}

export function buildCodex(mat, tex, tier) {
  const hi = tier === 1;
  const g = new THREE.Group(); g.name = "Codex";
  const add = (geo, m, parent = g) => { const o = new THREE.Mesh(geo, m); o.castShadow = false; o.receiveShadow = true; parent.add(o); return o; };

  // 뒤표지 + 오른쪽 페이지 묶음 + 오른쪽 면(제2조)
  add(new THREE.BoxGeometry(W, COVER, H), mat.leatherPlain).position.set(W / 2, COVER / 2, 0);
  add(new THREE.BoxGeometry(PW, BLOCK, PH), mat.pageBlock).position.set(0.01 + PW / 2, COVER + BLOCK / 2, 0);
  const right = add(pagePlane(0.5, 1), mat.spread);
  right.position.set(0.01 + PW / 2, TOP + 0.0004, 0);

  // 앞표지 그룹(책등 쪽 모서리 힌지). 닫힌 상태: 왼쪽 묶음이 오른쪽 묶음 위에, 그 위에 표지.
  const hinge = new THREE.Group(); hinge.position.set(0, TOP, 0); hinge.userData.anim = true; g.add(hinge);
  add(new THREE.BoxGeometry(PW, BLOCK, PH), mat.pageBlock, hinge).position.set(0.01 + PW / 2, BLOCK / 2, 0);
  const left = add(pagePlane(0, 1, true), mat.sheetFlat, hinge); // 아래 깔린 면은 줄 종이(제1조는 마지막 장 뒷면)
  left.position.set(0.01 + PW / 2, -0.0004, 0); // 닫힌 상태에선 아래를 보고, 펼치면 위를 봄
  left.renderOrder = 1;
  // 앞표지: 재질 배열(면마다 드로우 콜 1개) 대신 가죽 상자 + 제목 면 한 장
  add(new THREE.BoxGeometry(W, COVER, H), mat.leatherPlain, hinge).position.set(W / 2, BLOCK + COVER / 2, 0);
  const titleGeo = new THREE.PlaneGeometry(W, H); titleGeo.rotateX(-Math.PI / 2);
  const title = add(titleGeo, mat.leatherTitle, hinge); title.position.set(W / 2, BLOCK + COVER + 0.0005, 0);

  // 책등(반원통). 표지가 열린 각도의 절반만 돌아 페이지 아래로 말려 들어감
  const spinePivot = new THREE.Group(); spinePivot.position.set(0, TOP, 0); spinePivot.userData.anim = true; g.add(spinePivot);
  const spine = add(new THREE.CylinderGeometry(0.05, 0.05, H, hi ? 16 : 10, 1, true, Math.PI, Math.PI), mat.leatherPlain, spinePivot);
  spine.rotation.x = Math.PI / 2;
  spine.material.side = THREE.DoubleSide;

  // 모서리 장식(황동 삼각 기둥) — 표지당 4개
  const tri = new THREE.CylinderGeometry(0.029, 0.029, COVER + 0.004, 3);
  const corners = (parent, y) => {
    for (const [x, z, r] of [[W - 0.016, -H / 2 + 0.016, 0], [W - 0.016, H / 2 - 0.016, 0], [0.03, -H / 2 + 0.016, 0], [0.03, H / 2 - 0.016, 0]]) {
      const c = add(tri, mat.brass, parent);
      c.position.set(x, y, z);
      c.rotation.y = Math.atan2(z, x - W / 2) + Math.PI / 6 + r;
    }
  };
  corners(g, COVER / 2);
  corners(hinge, BLOCK + COVER / 2);

  // 걸쇠: 앞표지 끝에서 내려오는 가죽끈 + 황동 버클
  const strapA = add(new THREE.BoxGeometry(0.07, 0.006, 0.06), mat.leatherPlain, hinge);
  strapA.position.set(W + 0.02, BLOCK + COVER - 0.002, 0);
  const buckle = new THREE.Group(); buckle.position.set(W + 0.055, BLOCK + COVER / 2, 0); buckle.userData.anim = hi; hinge.add(buckle); // 2단계는 버클을 합쳐 드로우 콜 절약(튀는 동작 생략)
  add(new THREE.BoxGeometry(0.016, 0.03, 0.05), mat.brass, buckle).position.set(0, -0.012, 0);
  const strapB = add(new THREE.BoxGeometry(0.008, TOP + 0.01, 0.056), mat.leatherPlain);
  strapB.position.set(W + 0.054, (TOP + 0.01) / 2 - 0.004, 0);

  // 넘기는 페이지(가로 16분할) — 앞면은 줄 종이, 마지막 장의 뒷면은 제1조
  const n = hi ? 7 : 3, SEG = 16;
  const sheets = [];
  for (let i = 0; i < n; i++) {
    const pos = new THREE.BufferAttribute(new Float32Array((SEG + 1) * 2 * 3), 3);
    const nor = new THREE.BufferAttribute(new Float32Array((SEG + 1) * 2 * 3), 3);
    const idx = [];
    for (let s = 0; s < SEG; s++) { const a = s * 2, b = a + 1, c = a + 2, d = a + 3; idx.push(a, b, c, c, b, d); }
    const uvF = new Float32Array((SEG + 1) * 4), uvB = new Float32Array((SEG + 1) * 4);
    for (let s = 0; s <= SEG; s++) {
      const u = s / SEG;
      // 정점 2개: z = -PH/2(먼 쪽, v=1), +PH/2(가까운 쪽, v=0)
      uvF.set([u, 1, u, 0], s * 4);
      uvB.set([0.5 - u * 0.5, 1, 0.5 - u * 0.5, 0], s * 4);
    }
    const front = new THREE.BufferGeometry(), back = new THREE.BufferGeometry();
    for (const [geo, uv] of [[front, uvF], [back, uvB]]) {
      geo.setAttribute("position", pos); geo.setAttribute("normal", nor);
      geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2)); geo.setIndex(idx);
    }
    // 마지막 장만 앞(줄 종이)·뒤(제1조)를 따로 그리고, 나머지는 양면 한 장(드로우 콜 절약)
    const last = i === n - 1;
    const mf = new THREE.Mesh(front, last ? mat.sheet : mat.sheetBoth);
    mf.receiveShadow = true; mf.userData.dyn = true; mf.frustumCulled = false;
    g.add(mf);
    let mb = null;
    if (last) { mb = new THREE.Mesh(back, mat.pageLeftBack); mb.receiveShadow = true; mb.userData.dyn = true; mb.frustumCulled = false; g.add(mb); }
    sheets.push({ pos, front, mf, mb, i });
  }
  function bendSheet(sh, p) {
    const i = sh.i;
    const yR = TOP + 0.0009 * (n - i), yL = TOP + 0.0009 * (i + 1);
    const y0 = yR + (yL - yR) * p;
    const a = p * OPEN;
    const curl = 1.1 * Math.sin(Math.PI * p);
    const L = PW, ds = L / SEG;
    let x = 0.005, y = y0;
    const arr = sh.pos.array;
    for (let s = 0; s <= SEG; s++) {
      if (s > 0) {
        const th = a - curl * ((s - 0.5) / SEG) * (1 - 0.35 * p);
        x += Math.cos(th) * ds; y += Math.sin(th) * ds;
      }
      arr[s * 6] = x; arr[s * 6 + 1] = y; arr[s * 6 + 2] = -PH / 2;
      arr[s * 6 + 3] = x; arr[s * 6 + 4] = y; arr[s * 6 + 5] = PH / 2;
    }
    sh.pos.needsUpdate = true;
    sh.front.computeVertexNormals();
  }

  // 붉은 인장(7.4s 전까지 보이지 않음) — 오른쪽 면 아래쪽 인장 자리
  const sealGeo = new THREE.PlaneGeometry(0.11, 0.11); sealGeo.rotateX(-Math.PI / 2);
  const sealMesh = new THREE.Mesh(sealGeo, mat.seal);
  const sealPos = new THREE.Vector3(0.213, TOP + 0.0016, 0.106);
  sealMesh.position.copy(sealPos); sealMesh.rotation.y = 6 * Math.PI / 180;
  sealMesh.visible = false; sealMesh.renderOrder = 3;
  g.add(sealMesh);

  // 인장 먼지
  const dustN = hi ? 120 : 40, r = rng(31);
  const dDir = new Float32Array(dustN * 3), dPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    const a = r() * Math.PI * 2, up = 0.15 + r() * 0.5, sp = 0.6 * (0.5 + r() * 0.8);
    dDir.set([Math.cos(a) * sp, up * sp, Math.sin(a) * sp], i * 3);
  }
  const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
  const dust = new THREE.Points(dGeo, mat.sealDust); dust.visible = false; dust.frustumCulled = false;
  dust.position.copy(sealPos); g.add(dust);

  // 페이지 사이 빛기둥(납작한 원뿔, 가산 혼합)
  const shaftGeo = new THREE.CylinderGeometry(0.42, 0.2, 0.9, 24, 1, true);
  shaftGeo.translate(0, 0.45, 0);
  const shaft = new THREE.Mesh(shaftGeo, mat.bookShaft);
  shaft.scale.set(0.75, 1, 1); shaft.position.set(0, TOP, 0); shaft.renderOrder = 4;
  g.add(shaft);
  const glow = new THREE.Sprite(mat.bookGlow); glow.position.set(0, TOP + 0.22, 0); glow.scale.set(0.8, 0.8, 1); glow.renderOrder = 5;
  g.add(glow);

  mergeStatic(g); mergeStatic(hinge);

  const light = new THREE.PointLight(0xffcf8a, 0, 2.5, 2);
  light.position.set(0, TOP + 0.4, 0);
  g.add(light);

  function update(t, tierNow = tier) {
    const c = codexT(t), L = looks(t);
    hinge.rotation.z = c.cover;
    spinePivot.rotation.z = c.cover / 2;
    buckle.rotation.z = c.buckle;
    for (const sh of sheets) bendSheet(sh, pageFlip(t, sh.i, n));
    // 빛
    light.visible = L.bookLight > 0.001;
    mat.bookShaft.uniforms.uOpacity.value = L.bookShaft;
    shaft.visible = L.bookShaft > 0.002;
    const glowA = (tierNow === 1 ? 0.14 : 0.45) * Math.min(1, L.bookLight / 3.5);
    mat.bookGlow.opacity = glowA; glow.visible = glowA > 0.003;
    const warm = Math.min(1, L.bookLight / 3.5) * c.leak;
    for (const m of [mat.spread, mat.sheetFlat, mat.pageLeftBack, mat.sheet, mat.sheetBoth]) m.emissiveIntensity = 0.15 * warm;
    // 인장
    const s = sealT(t);
    sealMesh.visible = s.on;
    sealMesh.scale.set(s.scale, 1, s.scale);
    mat.seal.opacity = s.alpha;
    mat.seal.color.setScalar(0.94 + 0.12 * L.seal); // emissive 0.6 → 1.01배, 0.25 → 0.97배
    // 인장 먼지
    const dt = t - SEAL_T;
    dust.visible = dt >= 0 && dt < 0.8;
    if (dust.visible) {
      for (let i = 0; i < dustN; i++) {
        dPos[i * 3] = dDir[i * 3] * dt; dPos[i * 3 + 1] = dDir[i * 3 + 1] * dt - 0.4 * dt * dt; dPos[i * 3 + 2] = dDir[i * 3 + 2] * dt;
      }
      dGeo.attributes.position.needsUpdate = true;
      mat.sealDust.opacity = 0.75 * (1 - dt / 0.8);
    }
  }
  update(0);
  return { group: g, update, light, sheets: n };
}
