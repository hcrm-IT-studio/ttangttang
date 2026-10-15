// 땅땅땅 인트로 — 3D 장면(1단계: 풀 3D / 2단계: 저사양 3D)
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { FXAAPass } from "three/addons/postprocessing/FXAAPass.js"; // SMAA는 룩업 텍스처 때문에 gzip 38.7KB → 예산(260KB) 초과라 FXAA(1.9KB)로 대체
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { camera as camAt, looks, statueYaw, beamAngle, rng, DEG, STILL, HERO_END, prog, easeInOutCubic, lerp } from "./timeline.js";
import { buildStatue, fitModel } from "./statue.js";
import { buildCodex } from "./codex.js";
import { mergeStatic } from "./merge.js";
import * as TX from "./textures.js";

const SKY_POS = new THREE.Vector3(0.4, 7.0, 0.8);
const HEAD = new THREE.Vector3(0, 3.12, 0);
const BOOK = new THREE.Vector3(0, 1.1, 1.7);
const SKY_BASE = 46;   // 천창 '1.0'의 실제 세기(cd)
const RIM_BASE = 1.6;  // 림 '0.6' → 0.96
const BOOK_BASE = 0.065; // 페이지 위 0.4m에서 '3.5'일 때 면 조도 약 1.2

// 빛줄기: 위→아래 그라데이션 + 느린 노이즈 흐름, 가장자리는 시선 각도로 흐리게
const shaftShader = (color) => ({
  uniforms: { uOpacity: { value: 0 }, uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uFall: { value: 1 }, uGain: { value: 1 } },
  vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV; varying vec3 vW;
    void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz;
      vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - w.xyz);
      gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: `uniform float uOpacity; uniform float uTime; uniform vec3 uColor; uniform float uFall; uniform float uGain;
    varying vec2 vUv; varying vec3 vN; varying vec3 vV; varying vec3 vW;
    float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
    float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
      return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
    void main(){
      float edge = pow(abs(dot(normalize(vN), normalize(vV))), 3.5);
      float g = mix(pow(vUv.y, 0.6), 1.0 - vUv.y, uFall) ;
      g *= smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
      float n = n3(vW * vec3(2.2, 0.8, 2.2) + vec3(0.0, -uTime * 0.18, uTime * 0.05));
      gl_FragColor = vec4(uColor * uOpacity * uGain * edge * g * (0.55 + 0.9 * n), 1.0);
    }`,
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
});

// 필름 그레인 0.035 + 비네트 0.25(고정)
const GrainVignette = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uGrain: { value: 0.035 }, uVig: { value: 0.25 }, uAspect: { value: 1 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime, uGrain, uVig, uAspect; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    void main(){ vec4 c = texture2D(tDiffuse, vUv);
      float g = h(vUv * vec2(1271.0, 1979.0) + fract(uTime * 7.31)) - 0.5;
      c.rgb += g * uGrain * (0.35 + 0.65 * (1.0 - dot(c.rgb, vec3(0.299,0.587,0.114))));
      vec2 d = (vUv - 0.5) * vec2(max(uAspect,1.0), max(1.0/uAspect,1.0));
      c.rgb *= 1.0 - uVig * smoothstep(0.3, 0.95, length(d) * 1.25);
      gl_FragColor = c; }`,
};

function tex(canvas, srgb = true, repeat = false) {
  const t = new THREE.CanvasTexture(canvas);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export async function createScene3D({ container, tier, model = null }) {
  const hi = tier === 1;
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance", stencil: false });
  const dpr = window.devicePixelRatio || 1;
  renderer.setPixelRatio(hi ? Math.min(dpr, 2) : Math.min(dpr, 1.25));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = hi;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.info.autoReset = false;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.className = "intro-canvas";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1114);
  scene.fog = new THREE.FogExp2(0x0d1114, 0.11);
  const cam = new THREE.PerspectiveCamera(34, 1, 0.05, 60);

  // 환경맵: RoomEnvironment → PMREM, 세기 0.25
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envRT = pmrem.fromScene(room, 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.25;
  room.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
  pmrem.dispose();

  // ── 재질 ──
  await new Promise((r) => setTimeout(r, 0));
  const T = {
    marble: tex(TX.marble(hi ? 1024 : 512)),
    leather: tex(TX.leather(512)),
    leatherPlain: tex(TX.leather(256, 3, false)),
    spread: tex(TX.spread()),
    sheet: tex(TX.sheet()),
    edge: tex(TX.pageEdge()),
    seal: tex(TX.seal(256)),
    dot: tex(TX.softDot(64), false),
    warm: tex(TX.softDot(128, "rgba(255,207,138,1)"), false),
    blob: tex(TX.softDot(128, "rgba(0,0,0,0.85)"), false),
  };
  await new Promise((r) => setTimeout(r, 0));
  const warmEm = new THREE.Color(0xffcf8a);
  // 종이는 반사광이 없는 Lambert(점광원 하이라이트가 동그랗게 맺히지 않게)
  const paper = (map, extra = {}) => new THREE.MeshLambertMaterial({ map, color: 0xffffff, emissive: warmEm, emissiveMap: map, emissiveIntensity: 0, ...extra });
  const M = {
    marble: new THREE.MeshPhysicalMaterial({ map: T.marble, color: 0xffffff, roughness: 0.42, clearcoat: 0.25, clearcoatRoughness: 0.3 }),
    marbleDS: null,
    pedestal: new THREE.MeshStandardMaterial({ color: 0x9a958a, roughness: 0.5, map: T.marble }),
    cloth: new THREE.MeshStandardMaterial({ color: 0x2a2f33, roughness: 0.9, side: THREE.DoubleSide }),
    brass: new THREE.MeshStandardMaterial({ color: 0xc19a4b, metalness: 1, roughness: 0.35 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xb9bdc0, metalness: 1, roughness: 0.25 }),
    floor: new THREE.MeshStandardMaterial({ color: 0x111518, roughness: 0.25 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x2b211a, roughness: 0.62 }),
    leatherTitle: new THREE.MeshStandardMaterial({ map: T.leather, roughness: 0.7 }),
    leatherPlain: new THREE.MeshStandardMaterial({ map: T.leatherPlain, roughness: 0.7 }),
    pageBlock: new THREE.MeshStandardMaterial({ map: T.edge, color: 0xffffff, roughness: 0.9 }),
    spread: paper(T.spread),
    sheetFlat: paper(T.sheet),
    pageLeftBack: paper(T.spread, { side: THREE.BackSide }),
    sheet: paper(T.sheet, { side: THREE.FrontSide }),
    sheetBoth: paper(T.sheet, { side: THREE.DoubleSide }),
    // 인장: 톤매핑·조명을 받지 않게(ACES가 #b3302f를 분홍빛으로 바래게 함). 'emissive'는 밝기 계수로 흉내
    seal: new THREE.MeshBasicMaterial({ map: T.seal, color: 0xffffff, transparent: true, opacity: 0, toneMapped: false, fog: false, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
    sealDust: new THREE.PointsMaterial({ map: T.dot, color: 0xe6dfcc, size: 0.012, transparent: true, depthWrite: false, opacity: 0 }),
    bookShaft: new THREE.ShaderMaterial(shaftShader(0xffcf8a)),
    bookGlow: new THREE.SpriteMaterial({ map: T.warm, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0, fog: false }),
    skyShaft: new THREE.ShaderMaterial(shaftShader(0xdfe7ee)),
    blob: new THREE.MeshBasicMaterial({ map: T.blob, transparent: true, depthWrite: false }),
  };
  if (hi) { M.marbleDS = M.marble.clone(); M.marbleDS.side = THREE.DoubleSide; } else { M.marble.side = THREE.DoubleSide; M.marbleDS = M.marble; } // 2단계: 한 재질로 합쳐 드로우 콜 절약
  M.bookShaft.uniforms.uFall.value = 1.0; M.bookShaft.uniforms.uGain.value = 1.8; // 아래(페이지)가 밝고 위로 사라짐
  M.skyShaft.uniforms.uFall.value = 0.0;  // 위(천창)가 밝음

  // ── 바닥·계단·독서대 ──
  const meshes = [];
  const put = (geo, m, x, y, z, cast = true, parent = scene) => {
    const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = cast; o.receiveShadow = true; parent.add(o); meshes.push(o); return o;
  };
  // 넓게: 안개 속으로 끝이 사라지게(20m면 수평선이 보임)
  const floorGeo = new THREE.PlaneGeometry(80, 80); floorGeo.rotateX(-Math.PI / 2);
  put(floorGeo, M.floor, 0, 0, 0, false);
  [[2.6, 0.075], [2.1, 0.225], [1.6, 0.375]].forEach(([w, y]) => put(new THREE.BoxGeometry(w, 0.15, w), M.pedestal, 0, y, 0));
  // 독서대: 받침 + 기둥 + 15° 기울어진 판
  put(new THREE.BoxGeometry(0.42, 0.04, 0.32), M.wood, 0, 0.02, 1.76);
  put(new THREE.BoxGeometry(0.09, 0.96, 0.09), M.wood, 0, 0.5, 1.76);
  const board = put(new THREE.BoxGeometry(0.74, 0.03, 0.54), M.wood, 0, 1.03, 1.7);
  board.rotation.x = 15 * DEG;
  if (!hi) { // 2단계: 원형 그림자 텍스처
    const bg = new THREE.PlaneGeometry(1, 1); bg.rotateX(-Math.PI / 2);
    put(bg, M.blob, 0, 0.452, 0, false).scale.set(1.5, 1, 1.5);
    put(bg, M.blob, 0, 0.002, 1.76, false).scale.set(0.9, 1, 0.7);
  }
  const stage = new THREE.Group(); // 계단·독서대·그림자(고정) — 재질별로 합침
  meshes.splice(1).forEach((o) => { scene.remove(o); stage.add(o); });
  scene.add(stage); mergeStatic(stage);

  // ── 여신 ──
  const statue = buildStatue(M, tier);
  statue.group.position.set(0, 1.0, 0);
  scene.add(statue.group);
  let extModel = null;
  if (model) {
    try {
      extModel = await loadModel(model);
      if (extModel) { statue.group.remove(statue.body); disposeTree(statue.body); statue.group.add(extModel.root); }
    } catch (e) { extModel = null; }
  }

  // ── 법전 ──
  const codex = buildCodex(M, T, tier);
  codex.group.position.copy(BOOK).add(new THREE.Vector3(0, -0.035, 0));
  codex.group.rotation.x = 15 * DEG;
  scene.add(codex.group);

  // ── 조명 ──
  const sky = new THREE.SpotLight(0xdfe7ee, 0, 0, 18 * DEG, 0.6, 2);
  sky.position.copy(SKY_POS); sky.target.position.copy(HEAD).add(new THREE.Vector3(0, -0.5, 0));
  sky.castShadow = hi;
  if (hi) {
    sky.shadow.mapSize.set(1024, 1024); sky.shadow.bias = -0.0004; sky.shadow.normalBias = 0.015;
    sky.shadow.camera.near = 1; sky.shadow.camera.far = 12;
  }
  scene.add(sky, sky.target);
  const rim = new THREE.DirectionalLight(0x9fb3c4, 0.6 * RIM_BASE);
  rim.position.set(-2, 4, -3);
  scene.add(rim);
  const hemi = new THREE.HemisphereLight(0x1c2227, 0x0a0c0e, 0.15);
  scene.add(hemi);
  // 법전 쪽 약한 채움빛(천창 반사광 흉내, S3 이후 표지가 완전히 검게 묻히지 않게)
  const fill = new THREE.SpotLight(0xdfe7ee, 0, 0, 22 * DEG, 0.8, 2);
  fill.position.set(0.3, 4.2, 2.6); fill.target.position.copy(BOOK);
  scene.add(fill, fill.target);

  // ── 천창 빛줄기(원뿔, 1단계만) ──
  let skyShaft = null;
  if (hi) {
    const g = new THREE.CylinderGeometry(0.16, 1.0, 7, 40, 1, true);
    g.translate(0, -3.5, 0);
    skyShaft = new THREE.Mesh(g, M.skyShaft);
    skyShaft.position.copy(SKY_POS);
    const dir = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0.1), SKY_POS).normalize();
    skyShaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
    skyShaft.renderOrder = 6;
    scene.add(skyShaft);
  }

  // ── 먼지(빛줄기 안에서만 보임) ──
  const dustMax = hi ? 1500 : 400;
  const r = rng(77);
  const dp = new Float32Array(dustMax * 3), ds = new Float32Array(dustMax);
  for (let i = 0; i < dustMax; i++) {
    const a = r() * Math.PI * 2, rad = Math.sqrt(r()) * 0.9;
    dp.set([Math.cos(a) * rad, 0.4 + r() * 5.8, Math.sin(a) * rad], i * 3);
    ds[i] = r();
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
  dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(ds, 1));
  const dustMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uScale: { value: 400 }, uSky: { value: SKY_POS.clone() }, uMap: { value: T.dot } },
    vertexShader: `attribute float aSeed; uniform float uTime, uScale; uniform vec3 uSky; varying float vA;
      void main(){ vec3 p = position;
        p.y = 0.4 + mod(p.y - 0.4 + 0.02 * uTime, 5.8);
        p.x += 0.03 * sin(uTime * 0.37 + aSeed * 40.0); p.z += 0.03 * cos(uTime * 0.29 + aSeed * 23.0);
        // 빛줄기 축(천창 → 바닥 중앙)까지 거리로 투명도
        vec3 a = uSky, b = vec3(0.0, 0.0, 0.1); vec3 ab = b - a; float k = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
        float d = length(p - (a + ab * k)); float rad = mix(0.16, 1.0, k);
        vA = smoothstep(rad * 0.8, rad * 0.2, d) * (0.15 + 0.85 * pow(fract(aSeed * 7.13), 2.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = max(1.0, 0.012 * uScale / -mv.z * (0.5 + aSeed * 0.7));
        gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uOpacity; uniform sampler2D uMap; varying float vA;
      void main(){ float m = texture2D(uMap, gl_PointCoord).a; gl_FragColor = vec4(vec3(0.87,0.9,0.93) * m * vA * uOpacity, 1.0); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  dust.frustumCulled = false;
  scene.add(dust);

  // ── 후처리(1단계) ──
  let composer = null, bloom = null, grain = null, aa = null;
  const setupPost = () => {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, cam));
    bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.35, 0.35, 0.82);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    grain = new ShaderPass(GrainVignette);
    composer.addPass(grain);
    aa = new FXAAPass();
    composer.addPass(aa);
  };
  if (hi) setupPost();

  let W = 1, H = 1;
  function resize() {
    W = Math.max(1, container.clientWidth); H = Math.max(1, container.clientHeight);
    renderer.setSize(W, H, false);
    cam.aspect = W / H; cam.updateProjectionMatrix();
    if (composer) { composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(W, H); }
    dustMat.uniforms.uScale.value = (H * renderer.getPixelRatio()) / 2 / Math.tan((cam.fov * DEG) / 2);
    if (grain) grain.uniforms.uAspect.value = W / H;
  }
  resize();

  // ── 시간 t의 장면 ──
  const tmpDir = new THREE.Vector3();
  let degraded = false;
  // 타임라인 카메라 + 세로 화면 폭 맞춤(필요한 폭이 보이도록 시선 방향으로 물러남)
  function fitPose(t) {
    const c = camAt(t);
    const target = new THREE.Vector3(...c.target);
    const pos = new THREE.Vector3(...c.pos);
    tmpDir.subVectors(pos, target);
    const d = tmpDir.length();
    const hHalf = Math.atan(Math.tan((c.fov * DEG) / 2) * (W / H));
    const need = c.w / 2 / Math.tan(hHalf);
    if (need > d) pos.copy(target).addScaledVector(tmpDir, need / d);
    return { pos, target, fov: c.fov, shake: c.shake };
  }
  // 히어로 모드(홈 위에서 끝날 때): 7.8–8.8s 법전 → 스틸 카메라. 마지막에는 화면 전체가 아닌
  // '히어로 이미지 상자'가 스틸과 같은 화각이 되도록 비대칭 투영(setViewOffset)으로 맞춘다.
  let heroRect = null;
  function setHeroRect(r) { heroRect = r; }
  function applyView(pos, target, fov, rect, shake) {
    cam.position.copy(pos); cam.lookAt(target);
    if (shake) { cam.rotateX(shake[0]); cam.rotateZ(shake[1]); }
    cam.fov = fov;
    if (rect) { cam.aspect = rect.w / rect.h; cam.setViewOffset(rect.w, rect.h, -rect.x, -rect.y, W, H); }
    else { cam.aspect = W / H; cam.clearViewOffset(); }
    cam.updateProjectionMatrix();
  }
  // 히어로 모드·스틸: 배경·안개 색을 홈 벽색(--bg)으로(이미지 테두리가 벽과 이어지게)
  const BG0 = new THREE.Color(0x0d1114), BG1 = new THREE.Color(0x2c353c); // 톤매핑을 거치면 약 #1c2227(벽색)
  function setBg(k) { scene.background.copy(BG0).lerp(BG1, k); scene.fog.color.copy(scene.background); }
  function setCamera(t) {
    if (t === "still") { setBg(1); return applyView(new THREE.Vector3(...STILL.pos), new THREE.Vector3(...STILL.target), STILL.fov, null); }
    setBg(heroRect && t > 7.8 ? easeInOutCubic(prog(t, 7.8, HERO_END)) : 0);
    if (heroRect && t > 7.8) {
      const a = fitPose(7.8), k = easeInOutCubic(prog(t, 7.8, HERO_END));
      const pos = a.pos.clone().lerp(new THREE.Vector3(...STILL.pos), k);
      const target = a.target.clone().lerp(new THREE.Vector3(...STILL.target), k);
      const R = heroRect;
      // 가상 상자: 화면 전체(세로 FOV a.fov) → 히어로 이미지 상자(세로 FOV 32). 상자 높이에 맞춰 FOV를 환산해 보간
      const rect = { x: lerp(0, R.x, k), y: lerp(0, R.y, k), w: lerp(W, R.w, k), h: lerp(H, R.h, k) };
      const fov = lerp(a.fov, STILL.fov, k);
      return applyView(pos, target, fov, rect, null);
    }
    const p = fitPose(t);
    applyView(p.pos, p.target, p.fov, null, p.shake);
  }
  function setAt(t) {
    const still = t === "still";
    if (still) t = 9.2;
    const L = looks(t);
    setCamera(still ? "still" : t);
    dustMat.uniforms.uScale.value = (H * renderer.getPixelRatio()) / 2 / Math.tan((cam.fov * DEG) / 2);
    // 여신
    statue.group.rotation.y = statueYaw(t);
    if (extModel) { if (extModel.scales) extModel.scales.rotation.z = beamAngle(t); } else statue.update(t);
    codex.update(t, degraded ? 2 : tier);
    // 빛
    sky.intensity = SKY_BASE * L.sky;
    rim.intensity = RIM_BASE * L.rim;
    hemi.intensity = L.hemi;
    fill.intensity = t >= 4.6 ? 2.2 : 0;
    codex.light.intensity = BOOK_BASE * L.bookLight;
    scene.fog.density = L.fog;
    scene.environmentIntensity = L.env;
    renderer.toneMappingExposure = L.exposure;
    if (skyShaft) { M.skyShaft.uniforms.uOpacity.value = L.shaft; M.skyShaft.uniforms.uTime.value = t; }
    M.bookShaft.uniforms.uTime.value = t;
    dustMat.uniforms.uTime.value = t + 30;
    dustMat.uniforms.uOpacity.value = still ? 0 : 0.5 * L.sky;
    if (bloom) bloom.strength = still ? 0.35 : L.bloom;
    if (grain) { grain.uniforms.uTime.value = t; grain.uniforms.uGrain.value = still ? 0 : 0.035; grain.uniforms.uVig.value = still ? 0 : 0.25; } // 스틸은 그레인 없이(압축 효율)
  }
  function render(t) {
    setAt(t);
    renderer.info.reset();
    if (composer && !degraded) composer.render(); else renderer.render(scene, cam);
  }

  // 2단계로 낮추기(1단계 워밍업이 느릴 때): 후처리·그림자 끄고 DPR·먼지 줄임
  function degrade() {
    if (degraded || !hi) return;
    degraded = true;
    renderer.shadowMap.enabled = false; sky.castShadow = false;
    renderer.setPixelRatio(Math.min(dpr, 1.25));
    dustGeo.setDrawRange(0, 400);
    if (skyShaft) skyShaft.visible = false;
    resize();
    scene.traverse((o) => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => (m.needsUpdate = true)); });
  }

  // 셰이더 미리 컴파일(메인 스레드를 길게 막지 않게)
  setAt(0);
  try {
    if (renderer.extensions.has("KHR_parallel_shader_compile")) await renderer.compileAsync(scene, cam);
    else { renderer.compile(scene, cam); await new Promise((r) => setTimeout(r, 0)); }
  } catch (e) { /* 그대로 진행 */ }
  setAt(5.6); // 인장·빛기둥 등 나중에 보이는 것도 컴파일되도록 한 번 그려 둠
  const was = [M.seal.opacity];
  render(7.5); render(0);
  M.seal.opacity = was[0];

  function stats() {
    let tris = 0, objs = 0;
    scene.traverse((o) => {
      if (!(o.isMesh || o.isPoints) || !o.visible) return;
      objs++;
      if (o.isPoints) return;
      const g = o.geometry; let n = (g.index ? g.index.count : g.attributes.position.count) / 3;
      if (o.isInstancedMesh) n *= o.count;
      tris += n;
    });
    return { sceneTriangles: Math.round(tris), objects: objs, calls: renderer.info.render.calls, frameTriangles: renderer.info.render.triangles, textures: renderer.info.memory.textures, geometries: renderer.info.memory.geometries, dpr: renderer.getPixelRatio(), tier: degraded ? 2 : tier, model: extModel ? "glb" : "procedural" };
  }

  // QA용: 드로우 콜 분해(본 패스 / +그림자 / +후처리)
  function drawCalls(t = 4.4) {
    setAt(t);
    const sh = renderer.shadowMap.enabled;
    renderer.shadowMap.enabled = false; renderer.info.reset(); renderer.render(scene, cam);
    const main = renderer.info.render.calls, tris = renderer.info.render.triangles;
    renderer.shadowMap.enabled = sh; renderer.shadowMap.needsUpdate = true; renderer.info.reset(); renderer.render(scene, cam);
    const withShadow = renderer.info.render.calls;
    renderer.info.reset(); render(t);
    return { main, mainTriangles: tris, withShadow, full: renderer.info.render.calls };
  }

  function dispose() {
    try {
      disposeTree(scene);
      Object.values(T).forEach((t) => t.dispose());
      Object.values(M).forEach((m) => m.dispose());
      envRT.dispose();
      if (composer) { composer.passes.forEach((p) => p.dispose && p.dispose()); composer.dispose(); }
      renderer.dispose();
      renderer.forceContextLoss();
    } catch (e) { /* 무시 */ }
    renderer.domElement.remove();
  }

  return { render, resize, dispose, degrade, stats, drawCalls, setHeroRect, scene, camera: cam, canvas: renderer.domElement, get degraded() { return degraded; } };
}

function disposeTree(root) {
  root.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      for (const k in m) { const v = m[k]; if (v && v.isTexture) v.dispose(); }
      m.dispose();
    });
  });
}

// 외부 GLB: config.js의 INTRO_MODEL이 있을 때만. 8MB·15만 삼각형 초과나 실패 시 null(절차적으로)
async function loadModel(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const len = Number(res.headers.get("content-length") || 0);
  if (len > 8 * 1024 * 1024) return null;
  const buf = await res.arrayBuffer();
  if (buf.byteLength > 8 * 1024 * 1024) return null;
  const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
  const gltf = await new Promise((ok, fail) => new GLTFLoader().parse(buf, url.replace(/[^/]*$/, ""), ok, fail));
  const root = gltf.scene;
  const info = fitModel(root);
  if (info.tris > 150000) { disposeTree(root); return null; }
  return { root, scales: info.scales, blindfold: info.blindfold };
}
