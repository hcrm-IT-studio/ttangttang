// 드로우 콜 줄이기: 같은 재질의 고정 메시를 컨테이너 좌표계로 구워 하나로 합친다.
// userData.anim = true 인 그룹 안으로는 내려가지 않는다(따로 움직이므로 그 그룹을 따로 합친다).
import * as THREE from "three";

function bakeMerge(items) {
  let nv = 0, ni = 0;
  const geos = items.map(({ geo, m }) => {
    const g = (geo.index ? geo : geo.toNonIndexed()).clone();
    if (!g.index) { const idx = []; for (let i = 0; i < g.attributes.position.count; i++) idx.push(i); g.setIndex(idx); }
    g.applyMatrix4(m);
    nv += g.attributes.position.count; ni += g.index.count;
    return g;
  });
  const pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), uv = new Float32Array(nv * 2);
  const index = nv > 65535 ? new Uint32Array(ni) : new Uint16Array(ni);
  let ov = 0, oi = 0;
  for (const g of geos) {
    const c = g.attributes.position.count;
    pos.set(g.attributes.position.array.subarray(0, c * 3), ov * 3);
    if (g.attributes.normal) nor.set(g.attributes.normal.array.subarray(0, c * 3), ov * 3);
    if (g.attributes.uv) uv.set(g.attributes.uv.array.subarray(0, c * 2), ov * 2);
    const ix = g.index.array;
    for (let i = 0; i < ix.length; i++) index[oi + i] = ix[i] + ov;
    ov += c; oi += ix.length;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(index, 1));
  out.computeBoundingSphere();
  return out;
}

export function mergeStatic(container) {
  container.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(container.matrixWorld).invert();
  const groups = new Map();
  const visit = (o) => {
    for (const c of [...o.children]) {
      if (c.userData.anim) continue;
      if (c.isMesh && !c.isInstancedMesh && !c.userData.dyn && !Array.isArray(c.material) && c.visible) {
        const key = c.material.uuid + (c.castShadow ? "s" : "n");
        if (!groups.has(key)) groups.set(key, { mat: c.material, cast: c.castShadow, items: [] });
        groups.get(key).items.push({ geo: c.geometry, m: new THREE.Matrix4().multiplyMatrices(inv, c.matrixWorld), mesh: c });
      }
      visit(c);
    }
  };
  visit(container);
  for (const { mat, cast, items } of groups.values()) {
    if (items.length < 2) continue;
    const geo = bakeMerge(items);
    items.forEach(({ mesh }) => { mesh.parent.remove(mesh); mesh.geometry.dispose(); });
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = cast; m.receiveShadow = true;
    container.add(m);
  }
  // 비게 된 빈 그룹 정리
  const prune = (o) => { for (const c of [...o.children]) { prune(c); if (c.isGroup && !c.userData.anim && c.children.length === 0) o.remove(c); } };
  prune(container);
}
