// 땅땅땅 인트로 — 정의의 여신상(절차적 생성). 단위 m, 받침대 윗면 = 이 그룹의 y 0.
import * as THREE from "three";
import { beamAngle, statueSpeed, DEG } from "./timeline.js";
import { mergeStatic } from "./merge.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z);

// Lathe 정점 손보기: 단면을 타원으로(z 납작), 로브 주름
function shapeLathe(geo, { sx = 1, sz = 0.82, fold = 0 } = {}) {
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const r = Math.hypot(x, z);
    if (fold && r > 1e-4) {
      const th = Math.atan2(x, z);
      const k = 1 + (fold * Math.sin(14 * th + 3 * y) * Math.max(0, 1 - y / 1.6)) / r;
      x *= k; z *= k;
    }
    p.setXYZ(i, x * sx, y, z * sz);
  }
  geo.computeVertexNormals();
  return geo;
}

// 두께가 줄어드는 팔
function taperTube(points, r0, r1, seg) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, seg, r0, 10, false);
  const p = geo.attributes.position, c = new THREE.Vector3(), v = new THREE.Vector3();
  for (let j = 0; j <= seg; j++) {
    curve.getPointAt(j / seg, c);
    const k = (r0 + (r1 - r0) * (j / seg)) / r0;
    for (let i = 0; i <= 10; i++) {
      const idx = j * 11 + i;
      v.fromBufferAttribute(p, idx).sub(c).multiplyScalar(k).add(c);
      p.setXYZ(idx, v.x, v.y, v.z);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

export function buildStatue(mat, tier) {
  const hi = tier === 1;
  const g = new THREE.Group();     // 받침대째 회전하는 그룹
  g.name = "JusticeProcedural";
  const body = new THREE.Group();  // 여신(받침대 블록 위)
  body.userData.anim = true;
  g.add(body);
  const add = (geo, m, parent = body, cast = true) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.castShadow = cast; mesh.receiveShadow = true;
    parent.add(mesh); return mesh;
  };
  const radial = hi ? 48 : 24;

  // 받침대 블록(회전) + 위 몰딩
  const block = add(new THREE.BoxGeometry(1.1, 0.55, 1.1), mat.pedestal, g);
  block.position.y = -0.55 / 2 - 0.05;
  const cap = add(new THREE.BoxGeometry(1.22, 0.05, 1.22), mat.pedestal, g);
  cap.position.y = -0.025;
  const foot = add(new THREE.BoxGeometry(1.22, 0.06, 1.22), mat.pedestal, g);
  foot.position.y = -0.57;

  // 발판
  add(new THREE.CylinderGeometry(0.38, 0.4, 0.06, radial), mat.marble).position.y = 0.03;

  // 로브 (주름)
  const robe = new THREE.LatheGeometry(
    [V(0, 0.03, 0), V(0.36, 0.03, 0), V(0.345, 0.2, 0), V(0.28, 0.7, 0), V(0.215, 1.2, 0), V(0.185, 1.42, 0), V(0.17, 1.56, 0)].map((v) => new THREE.Vector2(v.x, v.y)),
    radial
  );
  add(shapeLathe(robe, { sz: 0.8, fold: 0.02 }), mat.marble);
  // 허리끈
  const belt = add(new THREE.TorusGeometry(0.2, 0.014, 6, radial), mat.marble);
  belt.rotation.x = Math.PI / 2; belt.scale.set(1.0, 0.8, 1); belt.position.y = 1.36;

  // 상체(어깨 넓게)
  const torso = new THREE.LatheGeometry(
    [new THREE.Vector2(0.145, 1.55), new THREE.Vector2(0.18, 1.7), new THREE.Vector2(0.175, 1.84), new THREE.Vector2(0.12, 1.94), new THREE.Vector2(0.06, 1.99)],
    radial
  );
  add(shapeLathe(torso, { sx: 1.18, sz: 0.74 }), mat.marble);
  // 어깨에 걸친 천(사선 띠) — 대리석 몸에 결을 하나 더
  const drape = add(new THREE.TorusGeometry(0.2, 0.022, 6, radial, Math.PI * 1.05), mat.marble);
  drape.position.set(0.0, 1.72, 0.0); drape.rotation.set(Math.PI / 2 - 0.2, 0.55, 0.3); drape.scale.set(1.15, 0.78, 1);
  for (const sx of [-1, 1]) add(new THREE.SphereGeometry(0.068, 16, 12), mat.marble).position.set(sx * 0.2, 1.84, 0);
  // 겉옷(히마티온): 왼쪽 어깨에서 등 뒤로 걸쳐 흘러내림, 밑단은 사선 — 원뿔 실루엣을 깬다
  const CL0 = 0.15 * Math.PI, CLN = 1.25 * Math.PI;
  const cloak = new THREE.LatheGeometry(
    [[0.315, 0.6], [0.3, 0.8], [0.275, 1.0], [0.255, 1.2], [0.24, 1.4], [0.238, 1.6], [0.226, 1.78], [0.16, 1.92]].map(([r, y]) => new THREE.Vector2(r, y)),
    hi ? 40 : 20, CL0, CLN
  );
  {
    const p = cloak.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i); let y = p.getY(i);
      const th = Math.atan2(x, z), r = Math.hypot(x, z);
      const u = (((th - CL0) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) / CLN; // 0(앞 왼쪽) → 1(등 오른쪽)
      const hem = 0.6 + 0.8 * Math.pow(Math.min(1, u), 1.3);
      if (y < hem) y = hem + (y - 0.6) * 0.05;
      const k = 1 + (0.026 * Math.sin(9 * th + 2.2 * y) * Math.max(0, 1.75 - y)) / Math.max(r, 0.05);
      p.setXYZ(i, x * k * 1.1, y, z * k * 0.86);
    }
    cloak.computeVertexNormals();
  }
  add(cloak, mat.marbleDS || mat.marble);
  // 소매: 어깨에서 위팔로 넓게 늘어진 천
  for (const [x, y, rz] of [[-0.27, 1.795, -0.91], [0.25, 1.77, 0.51]]) {
    const sl = add(new THREE.CylinderGeometry(0.068, 0.084, 0.18, 14, 1, true), mat.marbleDS || mat.marble);
    sl.position.set(x, y, 0.015); sl.rotation.z = rz;
  }

  // 목·머리·머리카락·묶음·코
  add(new THREE.CylinderGeometry(0.05, 0.055, 0.1, 16), mat.marble).position.y = 2.02;
  const head = add(new THREE.SphereGeometry(0.115, hi ? 32 : 18, hi ? 24 : 14), mat.marble);
  head.position.y = 2.12; head.scale.set(1, 1.15, 1.05);
  const hair = add(new THREE.SphereGeometry(0.118, hi ? 28 : 16, hi ? 20 : 12), mat.marble);
  hair.position.set(0, 2.135, -0.022); hair.scale.set(1.04, 1.13, 1.06);
  add(new THREE.SphereGeometry(0.07, 18, 14), mat.marble).position.set(0, 2.17, -0.135);
  const jaw = add(new THREE.SphereGeometry(0.075, 18, 12), mat.marble); // 턱선: 머리를 달걀이 아닌 얼굴형으로
  jaw.position.set(0, 2.07, 0.018); jaw.scale.set(1, 0.95, 1);
  const nose = add(new THREE.ConeGeometry(0.016, 0.05, 8), mat.marble);
  nose.position.set(0, 2.085, 0.118); nose.rotation.x = Math.PI * 0.62;

  // 눈가리개: 짙은 천 띠 + 뒤 매듭 + 끈 2가닥
  const blind = new THREE.Group(); blind.name = "Blindfold"; blind.userData.anim = true;
  blind.position.set(0, 2.135, 0); blind.rotation.x = -6 * DEG; blind.scale.set(1, 1, 1.07);
  body.add(blind);
  add(new THREE.CylinderGeometry(0.1235, 0.1235, 0.05, radial, 1, true), mat.cloth, blind);
  add(new THREE.SphereGeometry(0.026, 12, 10), mat.cloth, blind).position.set(0, -0.004, -0.128);
  const straps = [];
  for (const s of [-1, 1]) {
    const geo = new THREE.PlaneGeometry(0.04, 0.32, 1, 16);
    geo.translate(0, -0.16, 0);
    const m = add(geo, mat.cloth, blind);
    m.position.set(s * 0.012, -0.008, -0.138);
    m.rotation.set(0.15, 0, s * 0.12);
    m.userData.base = Float32Array.from(geo.attributes.position.array);
    m.userData.dyn = true;
    m.userData.side = s;
    straps.push(m);
  }

  // 팔(오른팔 = 저울, 왼팔 = 검). 여신 기준 오른쪽은 -x
  const armR = [V(-0.2, 1.85, 0), V(-0.34, 1.74, 0.05), V(-0.46, 1.76, 0.13), V(-0.55, 1.95, 0.17), V(-0.6, 2.18, 0.18)];
  const armL = [V(0.2, 1.85, 0), V(0.29, 1.68, 0.03), V(0.33, 1.5, 0.07), V(0.33, 1.38, 0.11), V(0.31, 1.29, 0.13)];
  add(taperTube(armR, 0.058, 0.04, hi ? 28 : 14), mat.marble);
  add(taperTube(armL, 0.058, 0.04, hi ? 28 : 14), mat.marble);
  // 손: 주먹(눌린 구) + 엄지
  for (const [h, sx] of [[armR[4], -1], [armL[4], 1]]) {
    const fist = add(new THREE.SphereGeometry(0.048, 14, 10), mat.marble);
    fist.position.copy(h); fist.scale.set(0.9, 1.15, 1.0);
    add(new THREE.SphereGeometry(0.02, 8, 6), mat.marble).position.set(h.x - sx * 0.03, h.y + 0.02, h.z + 0.03);
  }
  // 가슴·허리: 원통 같은 몸통에 형태를 줌
  for (const sx of [-1, 1]) {
    const b = add(new THREE.SphereGeometry(0.07, 16, 12), mat.marble);
    b.position.set(sx * 0.07, 1.665, 0.06); b.scale.set(1, 0.85, 0.6);
  }

  // 저울
  const hand = armR[4];
  const rod = add(new THREE.BoxGeometry(0.02, 0.13, 0.02), mat.brass);
  rod.position.set(hand.x, hand.y + 0.075, hand.z);
  const beamPivot = new THREE.Group(); beamPivot.name = "Scales"; beamPivot.userData.anim = true;
  beamPivot.position.set(hand.x, hand.y + 0.14, hand.z);
  body.add(beamPivot);
  add(new THREE.BoxGeometry(0.56, 0.018, 0.018), mat.brass, beamPivot);
  add(new THREE.ConeGeometry(0.018, 0.05, 8), mat.brass, beamPivot).position.y = 0.03;
  const hangers = [];
  const rings = hi ? 8 : 5, chainLen = 0.28, panR = 0.12;
  const ringGeo = new THREE.TorusGeometry(0.012, 0.0028, 5, 10);
  const chain = new THREE.InstancedMesh(ringGeo, mat.brass, 2 * 3 * rings);
  chain.castShadow = true;
  const panGeo = new THREE.LatheGeometry(
    [new THREE.Vector2(0.0, -0.035), new THREE.Vector2(0.05, -0.033), new THREE.Vector2(0.095, -0.022), new THREE.Vector2(0.12, 0), new THREE.Vector2(0.124, 0.004)],
    hi ? 32 : 16
  );
  for (const s of [-1, 1]) {
    add(new THREE.SphereGeometry(0.016, 10, 8), mat.brass, beamPivot).position.x = s * 0.28;
    const h = new THREE.Group(); h.userData.anim = true;
    h.position.x = s * 0.28;
    beamPivot.add(h);
    const pan = new THREE.Mesh(panGeo, mat.brass);
    pan.position.y = -chainLen; pan.castShadow = true;
    h.add(pan);
    hangers.push(h);
  }
  // 사슬: 들보 끝에서 접시 테두리 3곳으로(90°씩 교차한 고리)
  const dummy = new THREE.Object3D();
  let n = 0;
  hangers.forEach(() => {
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + 0.3;
      const end = V(Math.cos(a) * panR * 0.95, -chainLen, Math.sin(a) * panR * 0.95);
      for (let j = 0; j < rings; j++) {
        const f = (j + 0.5) / rings;
        dummy.position.copy(end).multiplyScalar(f);
        dummy.lookAt(end);
        dummy.rotateX(Math.PI / 2);
        dummy.rotateY(j % 2 ? Math.PI / 2 : 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        chain.setMatrixAt(n++, dummy.matrix);
      }
    }
  });
  // 사슬은 각 행거 좌표계 기준 → 행거 행렬을 곱해 매 프레임 갱신
  const chainLocal = [];
  for (let i = 0; i < n; i++) { const m = new THREE.Matrix4(); chain.getMatrixAt(i, m); chainLocal.push(m); }
  body.add(chain);

  // 검(왼손, 칼끝 아래·바깥으로 8°)
  const sword = new THREE.Group();
  sword.position.copy(armL[4]); sword.rotation.z = 8 * DEG;
  body.add(sword);
  const sh = new THREE.Shape();
  sh.moveTo(-0.02, 0); sh.lineTo(0.02, 0); sh.lineTo(0.017, -0.66); sh.lineTo(0, -0.8); sh.lineTo(-0.017, -0.66); sh.closePath();
  const blade = add(new THREE.ExtrudeGeometry(sh, { depth: 0.008, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 1 }), mat.steel, sword);
  blade.position.set(0, -0.08, -0.004);
  add(new THREE.BoxGeometry(0.16, 0.02, 0.03), mat.brass, sword).position.y = -0.07;
  add(new THREE.CylinderGeometry(0.014, 0.016, 0.12, 10), mat.brass, sword).position.y = 0;
  add(new THREE.SphereGeometry(0.025, 12, 10), mat.brass, sword).position.y = 0.07;

  // 드로우 콜 줄이기: 고정된 부분을 재질별로 합침
  mergeStatic(body); mergeStatic(g); mergeStatic(beamPivot); mergeStatic(blind);

  // ── 매 프레임 ──
  const tmp = new THREE.Matrix4();
  function update(t) {
    const b = beamAngle(t);
    beamPivot.rotation.z = b;
    for (const h of hangers) h.rotation.z = -b; // 접시는 늘 수직으로 매달림
    // 사슬 인스턴스: 행거 기준 행렬 → body 기준
    beamPivot.updateMatrix(); hangers.forEach((h) => h.updateMatrix());
    let i = 0;
    for (let hi2 = 0; hi2 < 2; hi2++) {
      const base = new THREE.Matrix4().multiplyMatrices(beamPivot.matrix, hangers[hi2].matrix);
      for (let k = 0; k < 3 * rings; k++, i++) chain.setMatrixAt(i, tmp.multiplyMatrices(base, chainLocal[i]));
    }
    chain.instanceMatrix.needsUpdate = true;
    // 눈가리개 끈: 회전 중에는 뒤로 날리고, 멈추면 처진다
    const sp = statueSpeed(t);
    for (const m of straps) {
      const p = m.geometry.attributes.position, base0 = m.userData.base;
      for (let v = 0; v < p.count; v++) {
        const y = base0[v * 3 + 1];
        const s = -y / 0.32; // 0(매듭) → 1(끝)
        const lift = sp * 0.9 * s;                       // 회전 반대 방향(+x 쪽 뒤)으로 날림
        const wave = (0.006 + 0.03 * sp) * s * Math.sin(10 * s - t * 14 + m.userData.side);
        const ang = lift;
        p.setXYZ(v,
          base0[v * 3] + Math.sin(ang) * (-y) * 0.9 + wave * 0.4,
          y * Math.cos(ang * 0.8),
          -Math.sin(ang * 0.5) * (-y) * 0.6 + wave);
      }
      p.needsUpdate = true;
      m.geometry.computeVertexNormals();
    }
  }
  update(0);
  return { group: g, body, update, beamPivot, straps };
}

// 외부 GLB(선택): 높이 2.4m로 맞추고 받침대 위에. Scales·Blindfold 노드가 있으면 움직임을 건다.
export function fitModel(root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const k = 2.4 / Math.max(1e-6, size.y);
  root.scale.multiplyScalar(k);
  const box2 = new THREE.Box3().setFromObject(root);
  const c = box2.getCenter(new THREE.Vector3());
  root.position.x -= c.x; root.position.z -= c.z; root.position.y -= box2.min.y;
  let tris = 0;
  root.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = o.receiveShadow = true;
      const gg = o.geometry;
      tris += (gg.index ? gg.index.count : gg.attributes.position.count) / 3;
    }
  });
  return { tris, scales: root.getObjectByName("Scales"), blindfold: root.getObjectByName("Blindfold") };
}
