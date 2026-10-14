#!/bin/sh
# three.js(r0.186) 필요한 파일만 vendor/three/ 로 복사하고 esbuild로 파일 단위 압축(번들·트리셰이킹 없음, import 경로 그대로).
# 사용: THREE_SRC=/path/to/three.js ESBUILD=/path/to/esbuild sh tools/vendor-three.sh
set -e
SRC="${THREE_SRC:-/home/claude/mrdoob/three.js}"
ESB="${ESBUILD:-esbuild}"
OUT="$(dirname "$0")/../vendor/three"
mkdir -p "$OUT/addons"
cp "$SRC/LICENSE" "$OUT/LICENSE"
min() { "$ESB" "$1" --minify --format=esm --legal-comments=inline --log-level=warning --outfile="$2"; }
min "$SRC/build/three.core.js" "$OUT/three.core.js"
min "$SRC/build/three.module.js" "$OUT/three.module.js"
for f in postprocessing/EffectComposer postprocessing/RenderPass postprocessing/UnrealBloomPass \
         postprocessing/SMAAPass postprocessing/OutputPass postprocessing/ShaderPass postprocessing/Pass \
         postprocessing/MaskPass shaders/CopyShader shaders/LuminosityHighPassShader shaders/SMAAShader \
         shaders/OutputShader environments/RoomEnvironment loaders/GLTFLoader \
         utils/BufferGeometryUtils utils/SkeletonUtils; do
  mkdir -p "$OUT/addons/$(dirname $f)"
  min "$SRC/examples/jsm/$f.js" "$OUT/addons/$f.js"
done
echo "done: $OUT"
