/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */import{Matrix3 as Fe,Vector2 as ht,Color as $e,Vector3 as Ge,mergeUniforms as vt,Mesh as Gt,BoxGeometry as Sn,ShaderMaterial as qt,BackSide as St,cloneUniforms as Vn,Matrix4 as Yt,ColorManagement as Je,SRGBTransfer as ze,PlaneGeometry as Wn,FrontSide as jt,getUnlitUniformColorSpace as dr,IntType as kn,warn as Ve,HalfFloatType as wt,UnsignedByteType as bt,FloatType as Ot,RGBAFormat as Bt,Plane as ur,WebGLRenderTarget as Pt,CubeTexture as zn,NoBlending as Zt,LinearMipmapLinearFilter as Ht,LinearFilter as At,CubeCamera as En,floorPowerOfTwo as mo,CubeReflectionMapping as ln,CubeRefractionMapping as en,LinearSRGBColorSpace as Xn,EquirectangularReflectionMapping as Mn,EquirectangularRefractionMapping as xn,warnOnce as pr,Uint32BufferAttribute as hr,Uint16BufferAttribute as mr,error as Qe,DataArrayTexture as Kn,Vector4 as mt,BufferGeometry as qn,Float32BufferAttribute as Yn,RawShaderMaterial as _r,OrthographicCamera as gr,DepthTexture as tn,DepthStencilFormat as Vt,UnsignedInt248Type as $t,NoToneMapping as Ut,CustomToneMapping as Zn,NeutralToneMapping as $n,AgXToneMapping as Qn,ACESFilmicToneMapping as Jn,CineonToneMapping as jn,ReinhardToneMapping as ei,LinearToneMapping as ti,Data3DTexture as vr,AlwaysCompare as ni,Texture as Sr,CubeDepthTexture as ii,GLSL3 as ri,VSMShadowMap as nn,PCFShadowMap as cn,AddOperation as Er,MixOperation as Mr,MultiplyOperation as xr,LinearTransfer as ai,UniformsUtils as Tr,DoubleSide as Nt,NormalBlending as fn,TangentSpaceNormalMap as oi,ObjectSpaceNormalMap as Ar,Layers as Rr,RGFormat as Qt,RG11_EAC_Format as Tn,RED_GREEN_RGTC2_Format as An,MeshDepthMaterial as Cr,MeshDistanceMaterial as br,BufferAttribute as Pr,PCFSoftShadowMap as Lr,DepthFormat as rn,NearestFilter as Wt,UnsignedIntType as kt,GreaterEqualCompare as si,LessEqualCompare as li,Frustum as ci,LessEqualDepth as fi,ReverseSubtractEquation as Dr,SubtractEquation as wr,AddEquation as an,OneMinusConstantAlphaFactor as Ur,ConstantAlphaFactor as Nr,OneMinusConstantColorFactor as Ir,ConstantColorFactor as yr,OneMinusDstAlphaFactor as Fr,OneMinusDstColorFactor as Or,OneMinusSrcAlphaFactor as Br,OneMinusSrcColorFactor as Gr,DstAlphaFactor as Hr,DstColorFactor as Vr,SrcAlphaSaturateFactor as Wr,SrcAlphaFactor as kr,SrcColorFactor as zr,OneFactor as Xr,ZeroFactor as Kr,NotEqualDepth as qr,GreaterDepth as Yr,GreaterEqualDepth as Zr,EqualDepth as $r,LessDepth as Qr,AlwaysDepth as Jr,NeverDepth as jr,CullFaceNone as ea,CullFaceBack as di,CullFaceFront as ta,CustomBlending as na,MultiplyBlending as ui,SubtractiveBlending as pi,AdditiveBlending as hi,ReversedDepthFuncs as _o,MinEquation as ia,MaxEquation as ra,MirroredRepeatWrapping as aa,ClampToEdgeWrapping as Rn,RepeatWrapping as oa,LinearMipmapNearestFilter as Cn,NearestMipmapLinearFilter as dn,NearestMipmapNearestFilter as sa,NotEqualCompare as la,GreaterCompare as ca,EqualCompare as fa,LessCompare as da,NeverCompare as ua,NoColorSpace as Jt,getByteLength as pa,UnsignedShortType as un,createElementNS as go,UnsignedShort4444Type as mi,UnsignedShort5551Type as _i,UnsignedInt5999Type as ha,UnsignedInt101111Type as ma,ByteType as _a,ShortType as ga,AlphaFormat as va,RGBFormat as Sa,RedFormat as Ea,RedIntegerFormat as gi,RGIntegerFormat as vi,RGBAIntegerFormat as Si,RGB_S3TC_DXT1_Format as bn,RGBA_S3TC_DXT1_Format as Pn,RGBA_S3TC_DXT3_Format as Ln,RGBA_S3TC_DXT5_Format as Dn,RGB_PVRTC_4BPPV1_Format as Ei,RGB_PVRTC_2BPPV1_Format as Mi,RGBA_PVRTC_4BPPV1_Format as xi,RGBA_PVRTC_2BPPV1_Format as Ti,RGB_ETC1_Format as Ai,RGB_ETC2_Format as Ri,RGBA_ETC2_EAC_Format as Ci,R11_EAC_Format as bi,SIGNED_R11_EAC_Format as Pi,SIGNED_RG11_EAC_Format as Li,RGBA_ASTC_4x4_Format as Di,RGBA_ASTC_5x4_Format as wi,RGBA_ASTC_5x5_Format as Ui,RGBA_ASTC_6x5_Format as Ni,RGBA_ASTC_6x6_Format as Ii,RGBA_ASTC_8x5_Format as yi,RGBA_ASTC_8x6_Format as Fi,RGBA_ASTC_8x8_Format as Oi,RGBA_ASTC_10x5_Format as Bi,RGBA_ASTC_10x6_Format as Gi,RGBA_ASTC_10x8_Format as Hi,RGBA_ASTC_10x10_Format as Vi,RGBA_ASTC_12x10_Format as Wi,RGBA_ASTC_12x12_Format as ki,RGBA_BPTC_Format as zi,RGB_BPTC_SIGNED_Format as Xi,RGB_BPTC_UNSIGNED_Format as Ki,RED_RGTC1_Format as qi,SIGNED_RED_RGTC1_Format as Yi,SIGNED_RED_GREEN_RGTC2_Format as Zi,ExternalTexture as $i,EventDispatcher as Ma,PerspectiveCamera as wn,ArrayCamera as xa,WebXRController as Un,RAD2DEG as vo,DataTexture as Ta,createCanvasElement as Aa,SRGBColorSpace as Ra,REVISION as Ca,log as Qi,FrustumArray as ba,WebGLCoordinateSystem as Ji,probeAsync as So}from"./three.core.js";import{AdditiveAnimationBlendMode as _d,AlwaysStencilFunc as gd,AmbientLight as vd,AnimationAction as Sd,AnimationClip as Ed,AnimationLoader as Md,AnimationMixer as xd,AnimationObjectGroup as Td,AnimationUtils as Ad,ArcCurve as Rd,ArrowHelper as Cd,AttachedBindMode as bd,Audio as Pd,AudioAnalyser as Ld,AudioContext as Dd,AudioListener as wd,AudioLoader as Ud,AxesHelper as Nd,BasicDepthPacking as Id,BasicShadowMap as yd,BatchedMesh as Fd,BezierInterpolant as Od,Bone as Bd,BooleanKeyframeTrack as Gd,Box2 as Hd,Box3 as Vd,Box3Helper as Wd,BoxHelper as kd,BufferGeometryLoader as zd,Cache as Xd,Camera as Kd,CameraHelper as qd,CanvasTexture as Yd,CapsuleGeometry as Zd,CatmullRomCurve3 as $d,CircleGeometry as Qd,Clock as Jd,ColorKeyframeTrack as jd,Compatibility as eu,CompressedArrayTexture as tu,CompressedCubeTexture as nu,CompressedTexture as iu,CompressedTextureLoader as ru,ConeGeometry as au,Controls as ou,CubeTextureLoader as su,CubicBezierCurve as lu,CubicBezierCurve3 as cu,CubicInterpolant as fu,CullFaceFrontBack as du,Curve as uu,CurvePath as pu,CylinderGeometry as hu,Cylindrical as mu,DataTextureLoader as _u,DataUtils as gu,DecrementStencilOp as vu,DecrementWrapStencilOp as Su,DefaultLoadingManager as Eu,DetachedBindMode as Mu,DirectionalLight as xu,DirectionalLightHelper as Tu,DiscreteInterpolant as Au,DodecahedronGeometry as Ru,DynamicCopyUsage as Cu,DynamicDrawUsage as bu,DynamicReadUsage as Pu,EdgesGeometry as Lu,EllipseCurve as Du,EqualStencilFunc as wu,Euler as Uu,ExtrudeGeometry as Nu,FileLoader as Iu,Float16BufferAttribute as yu,Fog as Fu,FogExp2 as Ou,FramebufferTexture as Bu,GLBufferAttribute as Gu,GLSL1 as Hu,GreaterEqualStencilFunc as Vu,GreaterStencilFunc as Wu,GridHelper as ku,Group as zu,HTMLTexture as Xu,HemisphereLight as Ku,HemisphereLightHelper as qu,IcosahedronGeometry as Yu,ImageBitmapLoader as Zu,ImageLoader as $u,ImageUtils as Qu,IncrementStencilOp as Ju,IncrementWrapStencilOp as ju,InstancedBufferAttribute as ep,InstancedBufferGeometry as tp,InstancedInterleavedBuffer as np,InstancedMesh as ip,Int16BufferAttribute as rp,Int32BufferAttribute as ap,Int8BufferAttribute as op,InterleavedBuffer as sp,InterleavedBufferAttribute as lp,Interpolant as cp,InterpolateBezier as fp,InterpolateDiscrete as dp,InterpolateLinear as up,InterpolateSmooth as pp,InterpolationSamplingMode as hp,InterpolationSamplingType as mp,InvertStencilOp as _p,KeepStencilOp as gp,KeyframeTrack as vp,LOD as Sp,LatheGeometry as Ep,LessEqualStencilFunc as Mp,LessStencilFunc as xp,Light as Tp,LightProbe as Ap,LightShadow as Rp,Line as Cp,Line3 as bp,LineBasicMaterial as Pp,LineCurve as Lp,LineCurve3 as Dp,LineDashedMaterial as wp,LineLoop as Up,LineSegments as Np,LinearInterpolant as Ip,LinearMipMapLinearFilter as yp,LinearMipMapNearestFilter as Fp,Loader as Op,LoaderUtils as Bp,LoadingManager as Gp,LoopOnce as Hp,LoopPingPong as Vp,LoopRepeat as Wp,MOUSE as kp,Material as zp,MaterialBlending as Xp,MaterialLoader as Kp,MathUtils as qp,Matrix2 as Yp,MeshBasicMaterial as Zp,MeshLambertMaterial as $p,MeshMatcapMaterial as Qp,MeshNormalMaterial as Jp,MeshPhongMaterial as jp,MeshPhysicalMaterial as eh,MeshStandardMaterial as th,MeshToonMaterial as nh,NearestMipMapLinearFilter as ih,NearestMipMapNearestFilter as rh,NeverStencilFunc as ah,NoNormalPacking as oh,NormalAnimationBlendMode as sh,NormalGAPacking as lh,NormalRGPacking as ch,NotEqualStencilFunc as fh,NumberKeyframeTrack as dh,Object3D as uh,ObjectLoader as ph,OctahedronGeometry as hh,Path as mh,PlaneHelper as _h,PointLight as gh,PointLightHelper as vh,Points as Sh,PointsMaterial as Eh,PolarGridHelper as Mh,PolyhedronGeometry as xh,PositionalAudio as Th,PropertyBinding as Ah,PropertyMixer as Rh,QuadraticBezierCurve as Ch,QuadraticBezierCurve3 as bh,Quaternion as Ph,QuaternionKeyframeTrack as Lh,QuaternionLinearInterpolant as Dh,RGBADepthPacking as wh,RGBDepthPacking as Uh,RGBIntegerFormat as Nh,RGDepthPacking as Ih,Ray as yh,Raycaster as Fh,RectAreaLight as Oh,RenderObjectRefreshType as Bh,RenderTarget as Gh,RenderTarget3D as Hh,ReplaceStencilOp as Vh,RingGeometry as Wh,Scene as kh,ShadowMaterial as zh,Shape as Xh,ShapeGeometry as Kh,ShapePath as qh,ShapeUtils as Yh,Skeleton as Zh,SkeletonHelper as $h,SkinnedMesh as Qh,Source as Jh,Sphere as jh,SphereGeometry as em,Spherical as tm,SphericalHarmonics3 as nm,SplineCurve as im,SpotLight as rm,SpotLightHelper as am,Sprite as om,SpriteMaterial as sm,StaticCopyUsage as lm,StaticDrawUsage as cm,StaticReadUsage as fm,StereoCamera as dm,StreamCopyUsage as um,StreamDrawUsage as pm,StreamReadUsage as hm,StringKeyframeTrack as mm,TOUCH as _m,TetrahedronGeometry as gm,TextureLoader as vm,TextureSource as Sm,TextureUtils as Em,Timer as Mm,TimestampQuery as xm,TorusGeometry as Tm,TorusKnotGeometry as Am,Triangle as Rm,TriangleFanDrawMode as Cm,TriangleStripDrawMode as bm,TrianglesDrawMode as Pm,TubeGeometry as Lm,UVMapping as Dm,Uint8BufferAttribute as wm,Uint8ClampedBufferAttribute as Um,Uniform as Nm,UniformsGroup as Im,VectorKeyframeTrack as ym,VideoFrameTexture as Fm,VideoTexture as Om,WebGL3DRenderTarget as Bm,WebGLArrayRenderTarget as Gm,WebGPUCoordinateSystem as Hm,WireframeGeometry as Vm,WrapAroundEnding as Wm,ZeroCurvatureEnding as km,ZeroSlopeEnding as zm,ZeroStencilOp as Xm,getConsoleFunction as Km,setConsoleFunction as qm}from"./three.core.js";function Pa(){let e=null,n=!1,t=null,i=null;function c(s,u){i=e.requestAnimationFrame(c),t(s,u)}return{start:function(){n!==!0&&t!==null&&e!==null&&(i=e.requestAnimationFrame(c),n=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(s){t=s},setContext:function(s){e=s}}}function Eo(e){const n=new WeakMap;function t(m,N){const b=m.array,W=m.usage,O=b.byteLength,x=e.createBuffer();e.bindBuffer(N,x),e.bufferData(N,b,W),m.onUploadCallback();let E;if(b instanceof Float32Array)E=e.FLOAT;else if(typeof Float16Array<"u"&&b instanceof Float16Array)E=e.HALF_FLOAT;else if(b instanceof Uint16Array)m.isFloat16BufferAttribute?E=e.HALF_FLOAT:E=e.UNSIGNED_SHORT;else if(b instanceof Int16Array)E=e.SHORT;else if(b instanceof Uint32Array)E=e.UNSIGNED_INT;else if(b instanceof Int32Array)E=e.INT;else if(b instanceof Int8Array)E=e.BYTE;else if(b instanceof Uint8Array)E=e.UNSIGNED_BYTE;else if(b instanceof Uint8ClampedArray)E=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+b);return{buffer:x,type:E,bytesPerElement:b.BYTES_PER_ELEMENT,version:m.version,size:O}}function i(m,N,b){const W=N.array,O=N.updateRanges;if(e.bindBuffer(b,m),O.length===0)e.bufferSubData(b,0,W);else{O.sort((E,L)=>E.start-L.start);let x=0;for(let E=1;E<O.length;E++){const L=O[x],F=O[E];F.start<=L.start+L.count+1?L.count=Math.max(L.count,F.start+F.count-L.start):(++x,O[x]=F)}O.length=x+1;for(let E=0,L=O.length;E<L;E++){const F=O[E];e.bufferSubData(b,F.start*W.BYTES_PER_ELEMENT,W,F.start,F.count)}N.clearUpdateRanges()}N.onUploadCallback()}function c(m){return m.isInterleavedBufferAttribute&&(m=m.data),n.get(m)}function s(m){m.isInterleavedBufferAttribute&&(m=m.data);const N=n.get(m);N&&(e.deleteBuffer(N.buffer),n.delete(m))}function u(m,N){if(m.isInterleavedBufferAttribute&&(m=m.data),m.isGLBufferAttribute){const W=n.get(m);(!W||W.version<m.version)&&n.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}const b=n.get(m);if(b===void 0)n.set(m,t(m,N));else if(b.version<m.version){if(b.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(b.buffer,m,N),b.version=m.version}}return{get:c,remove:s,update:u}}var Mo=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xo=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,To=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ao=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ro=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Co=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bo=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Po=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lo=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Do=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,No=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Io=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yo=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fo=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Oo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Go=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ho=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vo=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wo=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ko=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zo=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xo=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ko=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yo=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zo=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$o="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qo=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jo=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,jo=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,es=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ts=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ns=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,is=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rs=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,as=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,os=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ss=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ls=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cs=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fs=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ds=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,us=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ps=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hs=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ms=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_s=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gs=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vs=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ss=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Es=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ms=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xs=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ts=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,As=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rs=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cs=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bs=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ps=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ls=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ds=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ws=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Us=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ns=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Is=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ys=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fs=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Os=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bs=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gs=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ws=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ks=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zs=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ks=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qs=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ys=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zs=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$s=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qs=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Js=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,js=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,el=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nl=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,il=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,al=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ol=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sl=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ll=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cl=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dl=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ul=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pl=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hl=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ml=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_l=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sl=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const El=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ml=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tl=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Al=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rl=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cl=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bl=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pl=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ll=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Dl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ul=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nl=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Il=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,yl=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fl=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ol=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bl=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gl=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hl=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vl=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wl=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kl=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zl=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xl=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kl=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ql=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yl=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zl=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$l=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ql=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jl=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jl=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,De={alphahash_fragment:Mo,alphahash_pars_fragment:xo,alphamap_fragment:To,alphamap_pars_fragment:Ao,alphatest_fragment:Ro,alphatest_pars_fragment:Co,aomap_fragment:bo,aomap_pars_fragment:Po,batching_pars_vertex:Lo,batching_vertex:Do,begin_vertex:wo,beginnormal_vertex:Uo,bsdfs:No,iridescence_fragment:Io,bumpmap_pars_fragment:yo,clipping_planes_fragment:Fo,clipping_planes_pars_fragment:Oo,clipping_planes_pars_vertex:Bo,clipping_planes_vertex:Go,color_fragment:Ho,color_pars_fragment:Vo,color_pars_vertex:Wo,color_vertex:ko,common:zo,defaultnormal_vertex:Xo,displacementmap_pars_vertex:Ko,displacementmap_vertex:qo,emissivemap_fragment:Yo,emissivemap_pars_fragment:Zo,colorspace_fragment:$o,colorspace_pars_fragment:Qo,envmap_fragment:Jo,envmap_common_pars_fragment:jo,envmap_pars_fragment:es,envmap_pars_vertex:ts,envmap_physical_pars_fragment:us,envmap_vertex:ns,fog_vertex:is,fog_pars_vertex:rs,fog_fragment:as,fog_pars_fragment:os,gradientmap_pars_fragment:ss,lightmap_pars_fragment:ls,lights_lambert_fragment:cs,lights_lambert_pars_fragment:fs,lights_pars_begin:ds,lights_toon_fragment:ps,lights_toon_pars_fragment:hs,lights_phong_fragment:ms,lights_phong_pars_fragment:_s,lights_physical_fragment:gs,lights_physical_pars_fragment:vs,lights_fragment_begin:Ss,lights_fragment_maps:Es,lights_fragment_end:Ms,lightprobes_pars_fragment:xs,logdepthbuf_fragment:Ts,logdepthbuf_pars_fragment:As,logdepthbuf_pars_vertex:Rs,logdepthbuf_vertex:Cs,map_fragment:bs,map_pars_fragment:Ps,map_particle_fragment:Ls,map_particle_pars_fragment:Ds,metalnessmap_fragment:ws,metalnessmap_pars_fragment:Us,morphinstance_vertex:Ns,morphcolor_vertex:Is,morphnormal_vertex:ys,morphtarget_pars_vertex:Fs,morphtarget_vertex:Os,normal_fragment_begin:Bs,normal_fragment_maps:Gs,normal_pars_fragment:Hs,normal_pars_vertex:Vs,normal_vertex:Ws,normalmap_pars_fragment:ks,clearcoat_normal_fragment_begin:zs,clearcoat_normal_fragment_maps:Xs,clearcoat_pars_fragment:Ks,iridescence_pars_fragment:qs,opaque_fragment:Ys,packing:Zs,premultiplied_alpha_fragment:$s,project_vertex:Qs,dithering_fragment:Js,dithering_pars_fragment:js,roughnessmap_fragment:el,roughnessmap_pars_fragment:tl,shadowmap_pars_fragment:nl,shadowmap_pars_vertex:il,shadowmap_vertex:rl,shadowmask_pars_fragment:al,skinbase_vertex:ol,skinning_pars_vertex:sl,skinning_vertex:ll,skinnormal_vertex:cl,specularmap_fragment:fl,specularmap_pars_fragment:dl,tonemapping_fragment:ul,tonemapping_pars_fragment:pl,transmission_fragment:hl,transmission_pars_fragment:ml,uv_pars_fragment:_l,uv_pars_vertex:gl,uv_vertex:vl,worldpos_vertex:Sl,background_vert:El,background_frag:Ml,backgroundCube_vert:xl,backgroundCube_frag:Tl,cube_vert:Al,cube_frag:Rl,depth_vert:Cl,depth_frag:bl,distance_vert:Pl,distance_frag:Ll,equirect_vert:Dl,equirect_frag:wl,linedashed_vert:Ul,linedashed_frag:Nl,meshbasic_vert:Il,meshbasic_frag:yl,meshlambert_vert:Fl,meshlambert_frag:Ol,meshmatcap_vert:Bl,meshmatcap_frag:Gl,meshnormal_vert:Hl,meshnormal_frag:Vl,meshphong_vert:Wl,meshphong_frag:kl,meshphysical_vert:zl,meshphysical_frag:Xl,meshtoon_vert:Kl,meshtoon_frag:ql,points_vert:Yl,points_frag:Zl,shadow_vert:$l,shadow_frag:Ql,sprite_vert:Jl,sprite_frag:jl},fe={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Ge},probesMax:{value:new Ge},probesResolution:{value:new Ge}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Lt={basic:{uniforms:vt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:vt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:vt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:vt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:vt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new $e(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:vt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:vt([fe.points,fe.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:vt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:vt([fe.common,fe.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:vt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:vt([fe.sprite,fe.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distance:{uniforms:vt([fe.common,fe.displacementmap,{referencePosition:{value:new Ge},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distance_vert,fragmentShader:De.distance_frag},shadow:{uniforms:vt([fe.lights,fe.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};Lt.physical={uniforms:vt([Lt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Fe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const Nn={r:0,b:0,g:0},ec=new Yt,La=new Fe;La.set(-1,0,0,0,1,0,0,0,1);function tc(e,n,t,i,c,s){const u=new $e(0);let m=c===!0?0:1,N,b,W=null,O=0,x=null;function E(g){let D=g.isScene===!0?g.background:null;if(D&&D.isTexture){const v=g.backgroundBlurriness>0;D=n.get(D,v)}return D}function L(g){let D=!1;const v=E(g);v===null?f(u,m):v&&v.isColor&&(f(v,1),D=!0);const P=e.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(e.autoClear||D)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function F(g,D){const v=E(D);v&&v.isCubeTexture?(b===void 0&&(b=new Gt(new Sn(1,1,1),new qt({name:"BackgroundCubeMaterial",uniforms:Vn(Lt.backgroundCube.uniforms),vertexShader:Lt.backgroundCube.vertexShader,fragmentShader:Lt.backgroundCube.fragmentShader,side:St,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),b.geometry.deleteAttribute("normal"),b.geometry.deleteAttribute("uv"),b.onBeforeRender=function(P,S,o){this.matrixWorld.copyPosition(o.matrixWorld)},Object.defineProperty(b.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(b)),b.material.uniforms.envMap.value=v,b.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,b.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,b.material.uniforms.backgroundRotation.value.setFromMatrix4(ec.makeRotationFromEuler(D.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&b.material.uniforms.backgroundRotation.value.premultiply(La),b.material.toneMapped=Je.getTransfer(v.colorSpace)!==ze,(W!==v||O!==v.version||x!==e.toneMapping)&&(b.material.needsUpdate=!0,W=v,O=v.version,x=e.toneMapping),b.layers.enableAll(),g.unshift(b,b.geometry,b.material,0,0,null)):v&&v.isTexture&&(N===void 0&&(N=new Gt(new Wn(2,2),new qt({name:"BackgroundMaterial",uniforms:Vn(Lt.background.uniforms),vertexShader:Lt.background.vertexShader,fragmentShader:Lt.background.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),N.geometry.deleteAttribute("normal"),Object.defineProperty(N.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(N)),N.material.uniforms.t2D.value=v,N.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,N.material.toneMapped=Je.getTransfer(v.colorSpace)!==ze,v.matrixAutoUpdate===!0&&v.updateMatrix(),N.material.uniforms.uvTransform.value.copy(v.matrix),(W!==v||O!==v.version||x!==e.toneMapping)&&(N.material.needsUpdate=!0,W=v,O=v.version,x=e.toneMapping),N.layers.enableAll(),g.unshift(N,N.geometry,N.material,0,0,null))}function f(g,D){g.getRGB(Nn,dr(e)),t.buffers.color.setClear(Nn.r,Nn.g,Nn.b,D,s)}function l(){b!==void 0&&(b.geometry.dispose(),b.material.dispose(),b=void 0),N!==void 0&&(N.geometry.dispose(),N.material.dispose(),N=void 0)}return{getClearColor:function(){return u},setClearColor:function(g,D=1){u.set(g),m=D,f(u,m)},getClearAlpha:function(){return m},setClearAlpha:function(g){m=g,f(u,m)},render:L,addToRenderList:F,dispose:l}}function nc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},c=x(null);let s=c,u=!1;function m(I,k,$,T,J){let Z=!1;const G=O(I,T,$,k);s!==G&&(s=G,b(s.object)),Z=E(I,T,$,J),Z&&L(I,T,$,J),J!==null&&n.update(J,e.ELEMENT_ARRAY_BUFFER),(Z||u)&&(u=!1,v(I,k,$,T),J!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(J).buffer))}function N(){return e.createVertexArray()}function b(I){return e.bindVertexArray(I)}function W(I){return e.deleteVertexArray(I)}function O(I,k,$,T){const J=T.wireframe===!0;let Z=i[k.id];Z===void 0&&(Z={},i[k.id]=Z);const G=I.isInstancedMesh===!0?I.id:0;let le=Z[G];le===void 0&&(le={},Z[G]=le);let K=le[$.id];K===void 0&&(K={},le[$.id]=K);let te=K[J];return te===void 0&&(te=x(N()),K[J]=te),te}function x(I){const k=[],$=[],T=[];for(let J=0;J<t;J++)k[J]=0,$[J]=0,T[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:$,attributeDivisors:T,object:I,attributes:{},index:null}}function E(I,k,$,T){const J=s.attributes,Z=k.attributes;let G=0;const le=$.getAttributes();for(const K in le)if(le[K].location>=0){const re=J[K];let Me=Z[K];if(Me===void 0&&(K==="instanceMatrix"&&I.instanceMatrix&&(Me=I.instanceMatrix),K==="instanceColor"&&I.instanceColor&&(Me=I.instanceColor)),re===void 0||re.attribute!==Me||Me&&re.data!==Me.data)return!0;G++}return s.attributesNum!==G||s.index!==T}function L(I,k,$,T){const J={},Z=k.attributes;let G=0;const le=$.getAttributes();for(const K in le)if(le[K].location>=0){let re=Z[K];re===void 0&&(K==="instanceMatrix"&&I.instanceMatrix&&(re=I.instanceMatrix),K==="instanceColor"&&I.instanceColor&&(re=I.instanceColor));const Me={};Me.attribute=re,re&&re.data&&(Me.data=re.data),J[K]=Me,G++}s.attributes=J,s.attributesNum=G,s.index=T}function F(){const I=s.newAttributes;for(let k=0,$=I.length;k<$;k++)I[k]=0}function f(I){l(I,0)}function l(I,k){const $=s.newAttributes,T=s.enabledAttributes,J=s.attributeDivisors;$[I]=1,T[I]===0&&(e.enableVertexAttribArray(I),T[I]=1),J[I]!==k&&(e.vertexAttribDivisor(I,k),J[I]=k)}function g(){const I=s.newAttributes,k=s.enabledAttributes;for(let $=0,T=k.length;$<T;$++)k[$]!==I[$]&&(e.disableVertexAttribArray($),k[$]=0)}function D(I,k,$,T,J,Z,G){G===!0?e.vertexAttribIPointer(I,k,$,J,Z):e.vertexAttribPointer(I,k,$,T,J,Z)}function v(I,k,$,T){F();const J=T.attributes,Z=$.getAttributes(),G=k.defaultAttributeValues;for(const le in Z){const K=Z[le];if(K.location>=0){let te=J[le];if(te===void 0&&(le==="instanceMatrix"&&I.instanceMatrix&&(te=I.instanceMatrix),le==="instanceColor"&&I.instanceColor&&(te=I.instanceColor)),te!==void 0){const re=te.normalized,Me=te.itemSize,Ne=n.get(te);if(Ne===void 0)continue;const V=Ne.buffer,ue=Ne.type,Se=Ne.bytesPerElement,Ae=ue===e.INT||ue===e.UNSIGNED_INT||te.gpuType===kn;if(te.isInterleavedBufferAttribute){const he=te.data,Ue=he.stride,_t=te.offset;if(he.isInstancedInterleavedBuffer){for(let Ce=0;Ce<K.locationSize;Ce++)l(K.location+Ce,he.meshPerAttribute);I.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ce=0;Ce<K.locationSize;Ce++)f(K.location+Ce);e.bindBuffer(e.ARRAY_BUFFER,V);for(let Ce=0;Ce<K.locationSize;Ce++)D(K.location+Ce,Me/K.locationSize,ue,re,Ue*Se,(_t+Me/K.locationSize*Ce)*Se,Ae)}else{if(te.isInstancedBufferAttribute){for(let he=0;he<K.locationSize;he++)l(K.location+he,te.meshPerAttribute);I.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let he=0;he<K.locationSize;he++)f(K.location+he);e.bindBuffer(e.ARRAY_BUFFER,V);for(let he=0;he<K.locationSize;he++)D(K.location+he,Me/K.locationSize,ue,re,Me*Se,Me/K.locationSize*he*Se,Ae)}}else if(G!==void 0){const re=G[le];if(re!==void 0)switch(re.length){case 2:e.vertexAttrib2fv(K.location,re);break;case 3:e.vertexAttrib3fv(K.location,re);break;case 4:e.vertexAttrib4fv(K.location,re);break;default:e.vertexAttrib1fv(K.location,re)}}}}g()}function P(){Y();for(const I in i){const k=i[I];for(const $ in k){const T=k[$];for(const J in T){const Z=T[J];for(const G in Z)W(Z[G].object),delete Z[G];delete T[J]}}delete i[I]}}function S(I){if(i[I.id]===void 0)return;const k=i[I.id];for(const $ in k){const T=k[$];for(const J in T){const Z=T[J];for(const G in Z)W(Z[G].object),delete Z[G];delete T[J]}}delete i[I.id]}function o(I){for(const k in i){const $=i[k];for(const T in $){const J=$[T];if(J[I.id]===void 0)continue;const Z=J[I.id];for(const G in Z)W(Z[G].object),delete Z[G];delete J[I.id]}}}function h(I){for(const k in i){const $=i[k],T=I.isInstancedMesh===!0?I.id:0,J=$[T];if(J!==void 0){for(const Z in J){const G=J[Z];for(const le in G)W(G[le].object),delete G[le];delete J[Z]}delete $[T],Object.keys($).length===0&&delete i[k]}}}function Y(){w(),u=!0,s!==c&&(s=c,b(s.object))}function w(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:m,reset:Y,resetDefaultState:w,dispose:P,releaseStatesOfGeometry:S,releaseStatesOfObject:h,releaseStatesOfProgram:o,initAttributes:F,enableAttribute:f,disableUnusedAttributes:g}}function ic(e,n,t){let i;function c(N){i=N}function s(N,b){e.drawArrays(i,N,b),t.update(b,i,1)}function u(N,b,W){W!==0&&(e.drawArraysInstanced(i,N,b,W),t.update(b,i,W))}function m(N,b,W){if(W===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,N,0,b,0,W);let x=0;for(let E=0;E<W;E++)x+=b[E];t.update(x,i,1)}this.setMode=c,this.render=s,this.renderInstances=u,this.renderMultiDraw=m}function rc(e,n,t,i){let c;function s(){if(c!==void 0)return c;if(n.has("EXT_texture_filter_anisotropic")===!0){const o=n.get("EXT_texture_filter_anisotropic");c=e.getParameter(o.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else c=0;return c}function u(o){return!(o!==Bt&&i.convert(o)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function m(o){const h=o===wt&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(o!==bt&&o!==Ot&&!h&&i.convert(o)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function N(o){if(o==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";o="mediump"}return o==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let b=t.precision!==void 0?t.precision:"highp";const W=N(b);W!==b&&(Ve("WebGLRenderer:",b,"not supported, using",W,"instead."),b=W);const O=t.logarithmicDepthBuffer===!0,x=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control");t.reversedDepthBuffer===!0&&x===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),L=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),F=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),l=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),D=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),P=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:N,textureFormatReadable:u,textureTypeReadable:m,precision:b,logarithmicDepthBuffer:O,reversedDepthBuffer:x,maxTextures:E,maxVertexTextures:L,maxTextureSize:F,maxCubemapSize:f,maxAttributes:l,maxVertexUniforms:g,maxVaryings:D,maxFragmentUniforms:v,maxSamples:P,samples:S}}function ac(e){const n=this;let t=null,i=0,c=!1,s=!1;const u=new ur,m=new Fe,N={value:null,needsUpdate:!1};this.uniform=N,this.numPlanes=0,this.numIntersection=0,this.init=function(O,x){const E=O.length!==0||x||i!==0||c;return c=x,i=O.length,E},this.beginShadows=function(){s=!0,W(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(O,x){t=W(O,x,0)},this.setState=function(O,x,E){const L=O.clippingPlanes,F=O.clipIntersection,f=O.clipShadows,l=e.get(O);if(!c||L===null||L.length===0||s&&!f)s?W(null):b();else{const g=s?0:i,D=g*4;let v=l.clippingState||null;N.value=v,v=W(L,x,D,E);for(let P=0;P!==D;++P)v[P]=t[P];l.clippingState=v,this.numIntersection=F?this.numPlanes:0,this.numPlanes+=g}};function b(){N.value!==t&&(N.value=t,N.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function W(O,x,E,L){const F=O!==null?O.length:0;let f=null;if(F!==0){if(f=N.value,L!==!0||f===null){const l=E+F*4,g=x.matrixWorldInverse;m.getNormalMatrix(g),(f===null||f.length<l)&&(f=new Float32Array(l));for(let D=0,v=E;D!==F;++D,v+=4)u.copy(O[D]).applyMatrix4(g,m),u.normal.toArray(f,v),f[v+3]=u.constant}N.value=f,N.needsUpdate=!0}return n.numPlanes=F,n.numIntersection=0,f}}class In extends Pt{constructor(n=1,t={}){super(n,n,t),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},c=[i,i,i,i,i,i];this.texture=new zn(c),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},c=new Sn(5,5,5),s=new qt({name:"CubemapFromEquirect",uniforms:Vn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:St,blending:Zt});s.uniforms.tEquirect.value=t;const u=new Gt(c,s),m=t.minFilter;return t.minFilter===Ht&&(t.minFilter=At),new En(1,10,this).update(n,u),t.minFilter=m,u.geometry.dispose(),u.material.dispose(),this}clear(n,t=!0,i=!0,c=!0){const s=n.getRenderTarget();for(let u=0;u<6;u++)n.setRenderTarget(this,u),n.clear(t,i,c);n.setRenderTarget(s)}}const Da=256,oc=3,sc=20,wa=256,Ua=16,lc=3,cc=new Ge,fc=new $e;class _n{constructor(n){this._renderer=n,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new En(1,10,null),this._boxMesh=new Gt(new Sn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(n,t=0,i=.1,c=100,s={}){const{size:u=256,position:m=cc}=s,N=this._renderer;this._setSize(u);const b=this._allocateTarget(),W=this._getSourceTarget(!0);t>0&&(W.texture.mipmapsAutoUpdate=!1);const O=N.autoClear,x=N.autoClearColor,E=N.autoClearDepth,L=N.autoClearStencil,F=n.background;N.autoClear=!0,N.autoClearColor=!0,N.autoClearDepth=!0,N.autoClearStencil=!0,F===null&&(n.background=N.getClearColor(fc));const f=new En(i,c,W);return f.position.copy(m),f.update(N,n),N.autoClear=O,N.autoClearColor=x,N.autoClearDepth=E,N.autoClearStencil=L,n.background=F,t>0&&(W.texture.mipmapsAutoUpdate=!0,this._blur(b,t)),this._applyPMREM(b),b}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ya(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ia(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(n,t){return t>0?1-Math.sqrt(1-n/t):0}_setSize(n){this._cubeSize=Math.max(Da,mo(n))}_fromTexture(n,t){n.mapping===ln||n.mapping===en?this._setSize(n.image.length===0?Da:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(n),this._applyPMREM(i),i}_allocateTarget(){const n=this._cubeSize,t=Na(n,!1,!1),i=Math.log2(n)-oc;for(let c=0;c<=i;c++)t.texture.mipmaps.push({width:n>>c,height:n>>c});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(n=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||n&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Na(t,!0,n)),this._sourceTarget}_compileMaterial(n){this._boxMesh.material=n,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(n,t,i){const c=this._boxMesh,s=this._cubeCamera;c.material=i,s.renderTarget=n,s.activeMipmapLevel=t;const u=n.width>>t;n.viewport.set(0,0,u,u),s.update(this._renderer,c),n.viewport.set(0,0,n.width,n.height)}_textureToCubemap(n){let t;n.mapping===ln||n.mapping===en?(this._cubemapMaterial===null&&(this._cubemapMaterial=ya()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Ia()),t=this._equirectMaterial),t.uniforms.envMap.value=n,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(n){this._ggxMaterial===null&&(this._ggxMaterial=dc(),this._integrationMaterial=uc());const t=this._cubeSize,i=n.texture.mipmaps.length-1,c=this._ggxMaterial.uniforms;c.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/Ua);for(let u=0;u<=i;u++){const m=_n.lodToRoughness(u,i);if(u>i-lc)s.roughness.value=m,this._renderCube(n,u,this._integrationMaterial);else{const N=m>0?Math.log2(t)+.5*Math.log2(6/(wa*Math.pow(m,4)))+.5:0;c.roughness.value=m,c.lodBias.value=N,this._renderCube(n,u,this._ggxMaterial)}}}_blur(n,t){this._blurMaterial===null&&(this._blurMaterial=pc());const i=this._blurMaterial,c=i.uniforms,s=this._sourceTarget;c.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,c.envMap.value=s.texture,this._renderCube(n,0,i),c.envMap.value=n.texture,this._renderCube(s,0,i)}}function Na(e,n,t){return new In(e,{minFilter:Ht,generateMipmaps:n,type:wt,colorSpace:Xn,depthBuffer:t})}function pn(e,n,t){return new qt({name:e,uniforms:n,vertexShader:De.cube_vert,fragmentShader:t,side:St,blending:Zt,depthTest:!1,depthWrite:!1})}function dc(){return pn("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${wa}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function uc(){return pn("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ua}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function pc(){return pn("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${sc}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Ia(){return pn("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function ya(){return pn("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function hc(e){let n=new WeakMap,t=new WeakMap,i=null;function c(x,E=!1){return x==null?null:E?u(x):s(x)}function s(x){if(x&&x.isTexture){const E=x.mapping;if(E===Mn||E===xn)if(n.has(x)){const L=n.get(x).texture;return m(L,x.mapping)}else{const L=x.image;if(L&&L.height>0){const F=new In(L.height);return F.fromEquirectangularTexture(e,x),n.set(x,F),x.addEventListener("dispose",b),m(F.texture,x.mapping)}else return null}}return x}function u(x){if(x&&x.isTexture&&x.isPMREMTexture!==!0){const E=x.mapping,L=E===Mn||E===xn,F=E===ln||E===en;if(L||F){let f=t.get(x);const l=f!==void 0?f.texture.pmremVersion:0;if(x.isRenderTargetTexture&&x.pmremVersion!==l)return i===null&&(i=new _n(e)),f=L?i.fromEquirectangular(x,f):i.fromCubemap(x,f),f.texture.pmremVersion=x.pmremVersion,t.set(x,f),f.texture;if(f!==void 0)return f.texture;{const g=x.image;return L&&g&&g.height>0||F&&g&&N(g)?(i===null&&(i=new _n(e)),f=L?i.fromEquirectangular(x):i.fromCubemap(x),f.texture.pmremVersion=x.pmremVersion,t.set(x,f),x.addEventListener("dispose",W),f.texture):null}}}return x}function m(x,E){return E===Mn?x.mapping=ln:E===xn&&(x.mapping=en),x}function N(x){let E=0;const L=6;for(let F=0;F<L;F++)x[F]!==void 0&&E++;return E===L}function b(x){const E=x.target;E.removeEventListener("dispose",b);const L=n.get(E);L!==void 0&&(n.delete(E),L.dispose())}function W(x){const E=x.target;E.removeEventListener("dispose",W);const L=t.get(E);L!==void 0&&(t.delete(E),L.dispose())}function O(){n=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:c,dispose:O}}function mc(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const c=e.getExtension(i);return n[i]=c,c}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const c=t(i);return c===null&&pr("WebGLRenderer: "+i+" extension not supported."),c}}}function _c(e,n,t,i){const c={},s=new WeakMap,u=new FinalizationRegistry(L=>delete c[L]);function m(L){N(L.target)}function N(L){L.index!==null&&n.remove(L.index);for(const f in L.attributes)n.remove(L.attributes[f]);L.removeEventListener("dispose",m),delete c[L.id],u.unregister(L);const F=s.get(L);F&&(n.remove(F),s.delete(L)),i.releaseStatesOfGeometry(L),L.isInstancedBufferGeometry===!0&&delete L._maxInstanceCount,t.memory.geometries--}function b(L,F){return c[F.id]!==void 0||(F.addEventListener("dispose",m),c[F.id]=new WeakRef(F),u.register(F,F.id,F),t.memory.geometries++),F}function W(L){const F=L.attributes;for(const f in F)n.update(F[f],e.ARRAY_BUFFER)}function O(L){const F=L.index,f=L.attributes.position;let l=0;if(f===void 0)return;const g=F!==null?F.array.length:f.array.length/3-1,D=f.count>=65535?hr:mr,v=new D(Math.ceil(g/3)*6,1),P=v.array;if(F!==null){const o=F.array;l=F.version;for(let h=0,Y=0;h<g;h+=3){const w=o[h+0],I=o[h+1],k=o[h+2];P[Y++]=w,P[Y++]=I,P[Y++]=I,P[Y++]=k,P[Y++]=k,P[Y++]=w}}else{l=f.version;for(let o=0,h=0;o<g;o+=3){const Y=o+0,w=o+1,I=o+2;P[h++]=Y,P[h++]=w,P[h++]=w,P[h++]=I,P[h++]=I,P[h++]=Y}}v.version=l;const S=s.get(L);S&&n.remove(S),s.set(L,v)}function x(L){const F=s.get(L);if(F){const f=L.index;f!==null&&F.version<f.version&&O(L)}else O(L);return s.get(L)}function E(){for(const L in c){const F=c[L].deref();F!==void 0&&N(F)}}return{get:b,update:W,getWireframeAttribute:x,dispose:E}}function gc(e,n,t){let i;function c(O){i=O}let s,u;function m(O){s=O.type,u=O.bytesPerElement}function N(O,x){e.drawElements(i,x,s,O*u),t.update(x,i,1)}function b(O,x,E){E!==0&&(e.drawElementsInstanced(i,x,s,O*u,E),t.update(x,i,E))}function W(O,x,E){if(E===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,x,0,s,O,0,E);let F=0;for(let f=0;f<E;f++)F+=x[f];t.update(F,i,1)}this.setMode=c,this.setIndex=m,this.render=N,this.renderInstances=b,this.renderMultiDraw=W}function vc(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,u,m){switch(t.calls++,u){case e.TRIANGLES:t.triangles+=m*(s/3);break;case e.LINES:t.lines+=m*(s/2);break;case e.LINE_STRIP:t.lines+=m*(s-1);break;case e.LINE_LOOP:t.lines+=m*s;break;case e.POINTS:t.points+=m*s;break;default:Qe("WebGLInfo: Unknown draw mode:",u);break}}function c(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:c,update:i}}function Sc(e,n,t){const i=new WeakMap,c=new mt;function s(u,m,N){const b=u.morphTargetInfluences,W=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,O=W!==void 0?W.length:0;let x=i.get(m);if(x===void 0||x.count!==O){let Y=function(){o.dispose(),i.delete(m),m.removeEventListener("dispose",Y)};x!==void 0&&x.texture.dispose();const E=m.morphAttributes.position!==void 0,L=m.morphAttributes.normal!==void 0,F=m.morphAttributes.color!==void 0,f=m.morphAttributes.position||[],l=m.morphAttributes.normal||[],g=m.morphAttributes.color||[];let D=0;E===!0&&(D=1),L===!0&&(D=2),F===!0&&(D=3);let v=m.attributes.position.count*D,P=1;v>n.maxTextureSize&&(P=Math.ceil(v/n.maxTextureSize),v=n.maxTextureSize);const S=new Float32Array(v*P*4*O),o=new Kn(S,v,P,O);o.type=Ot,o.needsUpdate=!0;const h=D*4;for(let w=0;w<O;w++){const I=f[w],k=l[w],$=g[w],T=v*P*4*w;for(let J=0;J<I.count;J++){const Z=J*h;E===!0&&(c.fromBufferAttribute(I,J),S[T+Z+0]=c.x,S[T+Z+1]=c.y,S[T+Z+2]=c.z,S[T+Z+3]=0),L===!0&&(c.fromBufferAttribute(k,J),S[T+Z+4]=c.x,S[T+Z+5]=c.y,S[T+Z+6]=c.z,S[T+Z+7]=0),F===!0&&(c.fromBufferAttribute($,J),S[T+Z+8]=c.x,S[T+Z+9]=c.y,S[T+Z+10]=c.z,S[T+Z+11]=$.itemSize===4?c.w:1)}}x={count:O,texture:o,size:new ht(v,P)},i.set(m,x),m.addEventListener("dispose",Y)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)N.getUniforms().setValue(e,"morphTexture",u.morphTexture,t);else{let E=0;for(let F=0;F<b.length;F++)E+=b[F];const L=m.morphTargetsRelative?1:1-E;N.getUniforms().setValue(e,"morphTargetBaseInfluence",L),N.getUniforms().setValue(e,"morphTargetInfluences",b)}N.getUniforms().setValue(e,"morphTargetsTexture",x.texture,t),N.getUniforms().setValue(e,"morphTargetsTextureSize",x.size)}return{update:s}}function Ec(e,n,t,i,c){let s=new WeakMap;function u(b){const W=c.render.frame,O=b.geometry,x=n.get(b,O);if(s.get(x)!==W&&(n.update(x),s.set(x,W)),b.isInstancedMesh&&(b.hasEventListener("dispose",N)===!1&&b.addEventListener("dispose",N),s.get(b)!==W&&(t.update(b.instanceMatrix,e.ARRAY_BUFFER),b.instanceColor!==null&&t.update(b.instanceColor,e.ARRAY_BUFFER),s.set(b,W))),b.isSkinnedMesh){const E=b.skeleton;s.get(E)!==W&&(E.update(),s.set(E,W))}return x}function m(){s=new WeakMap}function N(b){const W=b.target;W.removeEventListener("dispose",N),i.releaseStatesOfObject(W),t.remove(W.instanceMatrix),W.instanceColor!==null&&t.remove(W.instanceColor)}return{update:u,dispose:m}}const Mc={[ti]:"LINEAR_TONE_MAPPING",[ei]:"REINHARD_TONE_MAPPING",[jn]:"CINEON_TONE_MAPPING",[Jn]:"ACES_FILMIC_TONE_MAPPING",[Qn]:"AGX_TONE_MAPPING",[$n]:"NEUTRAL_TONE_MAPPING",[Zn]:"CUSTOM_TONE_MAPPING"};function xc(e,n,t,i,c,s){const u=new Pt(n,t,{type:e,depthBuffer:c,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let m=null,N=null,b=null;const W=new qn;W.setAttribute("position",new Yn([-1,3,0,-1,-1,0,3,-1,0],3)),W.setAttribute("uv",new Yn([0,2,0,0,2,0],2));const O=new _r({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),x=new Gt(W,O),E=new gr(-1,1,1,-1,0,1);let L=null,F=null,f=!1,l,g=null,D=[],v=!1;this.setSize=function(P,S){u.setSize(P,S),m!==null&&m.setSize(P,S),N!==null&&N.setSize(P,S);for(let o=0;o<D.length;o++){const h=D[o];h.setSize&&h.setSize(P,S)}},this.setEffects=function(P){D=P,v=D.length>0&&D[0].isRenderPass===!0;const S=u.width,o=u.height;D.length>0&&m===null&&(m=new Pt(S,o,{type:wt,depthBuffer:!1,stencilBuffer:!1}),N=new Pt(S,o,{type:wt,depthBuffer:!1,stencilBuffer:!1}));const h=c===!0&&D.some(Y=>Y.needsDepthTexture===!0);h!==(u.depthTexture!==null)&&(h===!0&&b===null&&(b=new tn(S,o),s===!0&&(b.format=Vt,b.type=$t)),u.dispose(),u.depthTexture=h?b:null,u.resolveDepthBuffer=h,u.storeMultisampledDepthBuffer=h);for(let Y=0;Y<D.length;Y++){const w=D[Y];w.setSize&&w.setSize(S,o),h&&w.needsDepthTexture===!0&&w.setDepthTexture&&w.setDepthTexture(b)}},this.begin=function(P,S){if(f||P.toneMapping===Ut&&D.length===0)return!1;if(g=S,S!==null){const o=S.width,h=S.height;(u.width!==o||u.height!==h)&&this.setSize(o,h)}return v===!1&&P.setRenderTarget(u),l=P.toneMapping,P.toneMapping=Ut,!0},this.hasRenderPass=function(){return v},this.end=function(P,S){P.toneMapping=l,f=!0;let o=u,h=m;for(let Y=0;Y<D.length;Y++){const w=D[Y];w.enabled!==!1&&(w.render(P,h,o,S),w.needsSwap!==!1&&(o=h,h=h===m?N:m))}if(L!==P.outputColorSpace||F!==P.toneMapping){L=P.outputColorSpace,F=P.toneMapping,O.defines={},Je.getTransfer(L)===ze&&(O.defines.SRGB_TRANSFER="");const Y=Mc[F];Y&&(O.defines[Y]=""),O.needsUpdate=!0}O.uniforms.tDiffuse.value=o.texture,P.setRenderTarget(g),P.render(x,E),g=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){u.dispose(),m!==null&&m.dispose(),N!==null&&N.dispose(),W.dispose(),O.dispose()}}const Fa=new Sr,Oa=new tn(1,1),Ba=new ii(1),Ga=new Kn,Ha=new vr,Va=new zn,Wa=[],ka=[],za=new Float32Array(16),Xa=new Float32Array(9),Ka=new Float32Array(4);function on(e,n,t){const i=e[0];if(i<=0||i>0)return e;const c=n*t;let s=Wa[c];if(s===void 0&&(s=new Float32Array(c),Wa[c]=s),n!==0){i.toArray(s,0);for(let u=1,m=0;u!==n;++u)m+=t,e[u].toArray(s,m)}return s}function it(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function rt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function yn(e,n){let t=ka[n];t===void 0&&(t=new Int32Array(n),ka[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Tc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Ac(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(it(t,n))return;e.uniform2fv(this.addr,n),rt(t,n)}}function Rc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(it(t,n))return;e.uniform3fv(this.addr,n),rt(t,n)}}function Cc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(it(t,n))return;e.uniform4fv(this.addr,n),rt(t,n)}}function bc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(it(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),rt(t,n)}else{if(it(t,i))return;Ka.set(i),e.uniformMatrix2fv(this.addr,!1,Ka),rt(t,i)}}function Pc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(it(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),rt(t,n)}else{if(it(t,i))return;Xa.set(i),e.uniformMatrix3fv(this.addr,!1,Xa),rt(t,i)}}function Lc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(it(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),rt(t,n)}else{if(it(t,i))return;za.set(i),e.uniformMatrix4fv(this.addr,!1,za),rt(t,i)}}function Dc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function wc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(it(t,n))return;e.uniform2iv(this.addr,n),rt(t,n)}}function Uc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(it(t,n))return;e.uniform3iv(this.addr,n),rt(t,n)}}function Nc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(it(t,n))return;e.uniform4iv(this.addr,n),rt(t,n)}}function Ic(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function yc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(it(t,n))return;e.uniform2uiv(this.addr,n),rt(t,n)}}function Fc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(it(t,n))return;e.uniform3uiv(this.addr,n),rt(t,n)}}function Oc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(it(t,n))return;e.uniform4uiv(this.addr,n),rt(t,n)}}function Fn(e){return e.version===0&&(e.compareFunction=ni,e.needsUpdate=!0),e}function Bc(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c);let s;this.type===e.SAMPLER_2D_SHADOW?s=Fn(Oa):s=Fa,t.setTexture2D(n||s,c)}function Gc(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c),t.setTexture3D(n||Ha,c)}function Hc(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c);let s;this.type===e.SAMPLER_CUBE_SHADOW?s=Fn(Ba):s=Va,t.setTextureCube(n||s,c)}function Vc(e,n,t){const i=this.cache,c=t.allocateTextureUnit();i[0]!==c&&(e.uniform1i(this.addr,c),i[0]=c),t.setTexture2DArray(n||Ga,c)}function Wc(e){switch(e){case 5126:return Tc;case 35664:return Ac;case 35665:return Rc;case 35666:return Cc;case 35674:return bc;case 35675:return Pc;case 35676:return Lc;case 5124:case 35670:return Dc;case 35667:case 35671:return wc;case 35668:case 35672:return Uc;case 35669:case 35673:return Nc;case 5125:return Ic;case 36294:return yc;case 36295:return Fc;case 36296:return Oc;case 35678:case 36198:case 36298:case 36306:case 35682:return Bc;case 35679:case 36299:case 36307:return Gc;case 35680:case 36300:case 36308:case 36293:return Hc;case 36289:case 36303:case 36311:case 36292:return Vc}}function kc(e,n){e.uniform1fv(this.addr,n)}function zc(e,n){const t=on(n,this.size,2);e.uniform2fv(this.addr,t)}function Xc(e,n){const t=on(n,this.size,3);e.uniform3fv(this.addr,t)}function Kc(e,n){const t=on(n,this.size,4);e.uniform4fv(this.addr,t)}function qc(e,n){const t=on(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Yc(e,n){const t=on(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Zc(e,n){const t=on(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function $c(e,n){e.uniform1iv(this.addr,n)}function Qc(e,n){e.uniform2iv(this.addr,n)}function Jc(e,n){e.uniform3iv(this.addr,n)}function jc(e,n){e.uniform4iv(this.addr,n)}function ef(e,n){e.uniform1uiv(this.addr,n)}function tf(e,n){e.uniform2uiv(this.addr,n)}function nf(e,n){e.uniform3uiv(this.addr,n)}function rf(e,n){e.uniform4uiv(this.addr,n)}function af(e,n,t){const i=this.cache,c=n.length,s=yn(t,c);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));let u;this.type===e.SAMPLER_2D_SHADOW?u=Fn(Oa):u=Fa;for(let m=0;m!==c;++m)t.setTexture2D(n[m]||u,s[m])}function of(e,n,t){const i=this.cache,c=n.length,s=yn(t,c);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));for(let u=0;u!==c;++u)t.setTexture3D(n[u]||Ha,s[u])}function sf(e,n,t){const i=this.cache,c=n.length,s=yn(t,c);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));let u;this.type===e.SAMPLER_CUBE_SHADOW?u=Fn(Ba):u=Va;for(let m=0;m!==c;++m)t.setTextureCube(n[m]||u,s[m])}function lf(e,n,t){const i=this.cache,c=n.length,s=yn(t,c);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));for(let u=0;u!==c;++u)t.setTexture2DArray(n[u]||Ga,s[u])}function cf(e){switch(e){case 5126:return kc;case 35664:return zc;case 35665:return Xc;case 35666:return Kc;case 35674:return qc;case 35675:return Yc;case 35676:return Zc;case 5124:case 35670:return $c;case 35667:case 35671:return Qc;case 35668:case 35672:return Jc;case 35669:case 35673:return jc;case 5125:return ef;case 36294:return tf;case 36295:return nf;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return of;case 35680:case 36300:case 36308:case 36293:return sf;case 36289:case 36303:case 36311:case 36292:return lf}}class ff{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Wc(t.type)}}class df{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cf(t.type)}}class uf{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const c=this.seq;for(let s=0,u=c.length;s!==u;++s){const m=c[s];m.setValue(n,t[m.id],i)}}}const ji=/(\w+)(\])?(\[|\.)?/g;function qa(e,n){e.seq.push(n),e.map[n.id]=n}function pf(e,n,t){const i=e.name,c=i.length;for(ji.lastIndex=0;;){const s=ji.exec(i),u=ji.lastIndex;let m=s[1];const N=s[2]==="]",b=s[3];if(N&&(m=m|0),b===void 0||b==="["&&u+2===c){qa(t,b===void 0?new ff(m,e,n):new df(m,e,n));break}else{let O=t.map[m];O===void 0&&(O=new uf(m),qa(t,O)),t=O}}}class On{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let u=0;u<i;++u){const m=n.getActiveUniform(t,u),N=n.getUniformLocation(t,m.name);pf(m,N,this)}const c=[],s=[];for(const u of this.seq)u.type===n.SAMPLER_2D_SHADOW||u.type===n.SAMPLER_CUBE_SHADOW||u.type===n.SAMPLER_2D_ARRAY_SHADOW?c.push(u):s.push(u);c.length>0&&(this.seq=c.concat(s))}setValue(n,t,i,c){const s=this.map[t];s!==void 0&&s.setValue(n,i,c)}setOptional(n,t,i){const c=t[i];c!==void 0&&this.setValue(n,i,c)}static upload(n,t,i,c){for(let s=0,u=t.length;s!==u;++s){const m=t[s],N=i[m.id];N.needsUpdate!==!1&&m.setValue(n,N.value,c)}}static seqWithValue(n,t){const i=[];for(let c=0,s=n.length;c!==s;++c){const u=n[c];u.id in t&&i.push(u)}return i}}function Ya(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const hf=37297;let mf=0;function _f(e,n){const t=e.split(`
`),i=[],c=Math.max(n-6,0),s=Math.min(n+6,t.length);for(let u=c;u<s;u++){const m=u+1;i.push(`${m===n?">":" "} ${m}: ${t[u]}`)}return i.join(`
`)}const Za=new Fe;function gf(e){Je._getMatrix(Za,Je.workingColorSpace,e);const n=`mat3( ${Za.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(e)){case ai:return[n,"LinearTransferOETF"];case ze:return[n,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function $a(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),s=(e.getShaderInfoLog(n)||"").trim();if(i&&s==="")return"";const u=/ERROR: 0:(\d+)/.exec(s);if(u){const m=parseInt(u[1]);return t.toUpperCase()+`

`+s+`

`+_f(e.getShaderSource(n),m)}else return s}function vf(e,n){const t=gf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Sf={[ti]:"Linear",[ei]:"Reinhard",[jn]:"Cineon",[Jn]:"ACESFilmic",[Qn]:"AgX",[$n]:"Neutral",[Zn]:"Custom"};function Ef(e,n){const t=Sf[n];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Bn=new Ge;function Mf(){Je.getLuminanceCoefficients(Bn);const e=Bn.x.toFixed(4),n=Bn.y.toFixed(4),t=Bn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hn).join(`
`)}function Tf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Af(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let c=0;c<i;c++){const s=e.getActiveAttrib(n,c),u=s.name;let m=1;s.type===e.FLOAT_MAT2&&(m=2),s.type===e.FLOAT_MAT3&&(m=3),s.type===e.FLOAT_MAT4&&(m=4),t[u]={type:s.type,location:e.getAttribLocation(n,u),locationSize:m}}return t}function hn(e){return e!==""}function Qa(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,n.numSunLights).replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,n.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Ja(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Rf=/^[ \t]*#include +<([\w\d./]+)>/gm;function er(e){return e.replace(Rf,Cf)}function Cf(e,n){const t=De[n];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+n+">");return er(t)}const bf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ja(e){return e.replace(bf,Pf)}function Pf(e,n,t,i){let c="";for(let s=parseInt(n);s<parseInt(t);s++)c+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return c}function eo(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}const Lf={[cn]:"SHADOWMAP_TYPE_PCF",[nn]:"SHADOWMAP_TYPE_VSM"};function Df(e){return Lf[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wf={[en]:"ENVMAP_MODE_REFRACTION"};function Uf(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":wf[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Nf={[xr]:"ENVMAP_BLENDING_MULTIPLY",[Mr]:"ENVMAP_BLENDING_MIX",[Er]:"ENVMAP_BLENDING_ADD"};function If(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":Nf[e.combine]||"ENVMAP_BLENDING_NONE"}function yf(e,n,t,i){const c=e.getContext(),s=t.defines;let u=t.vertexShader,m=t.fragmentShader;const N=Df(t),b=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",W=Uf(t),O=If(t),x=xf(t),E=Tf(s),L=c.createProgram();let F,f,l=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(F=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(hn).join(`
`),F.length>0&&(F+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(hn).join(`
`),f.length>0&&(f+=`
`)):(F=[eo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+W:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+N:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hn).join(`
`),f=[eo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+b:"",t.envMap?"#define "+W:"",t.envMap?"#define "+O:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+N:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ut?"#define TONE_MAPPING":"",t.toneMapping!==Ut?De.tonemapping_pars_fragment:"",t.toneMapping!==Ut?Ef("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,vf("linearToOutputTexel",t.outputColorSpace),Mf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hn).join(`
`)),u=er(u),u=Qa(u,t),u=Ja(u,t),m=er(m),m=Qa(m,t),m=Ja(m,t),u=ja(u),m=ja(m),t.isRawShaderMaterial!==!0&&(l=`#version 300 es
`,F=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,f=["#define varying in",t.glslVersion===ri?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ri?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const g=l+F+u,D=l+f+m,v=Ya(c,c.VERTEX_SHADER,g),P=Ya(c,c.FRAGMENT_SHADER,D);c.attachShader(L,v),c.attachShader(L,P),t.index0AttributeName!==void 0?c.bindAttribLocation(L,0,t.index0AttributeName):t.hasPositionAttribute===!0&&c.bindAttribLocation(L,0,"position"),c.linkProgram(L);function S(w){if(e.debug.checkShaderErrors){const I=c.getProgramInfoLog(L)||"",k=c.getShaderInfoLog(v)||"",$=c.getShaderInfoLog(P)||"",T=I.trim(),J=k.trim(),Z=$.trim();let G=!0,le=!0;if(c.getProgramParameter(L,c.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(c,L,v,P);else{const K=$a(c,v,"vertex"),te=$a(c,P,"fragment");Qe("WebGLProgram: Shader Error "+c.getError()+" - VALIDATE_STATUS "+c.getProgramParameter(L,c.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+T+`
`+K+`
`+te)}else T!==""?Ve("WebGLProgram: Program Info Log:",T):(J===""||Z==="")&&(le=!1);le&&(w.diagnostics={runnable:G,programLog:T,vertexShader:{log:J,prefix:F},fragmentShader:{log:Z,prefix:f}})}c.deleteShader(v),c.deleteShader(P),o=new On(c,L),h=Af(c,L)}let o;this.getUniforms=function(){return o===void 0&&S(this),o};let h;this.getAttributes=function(){return h===void 0&&S(this),h};let Y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Y===!1&&(Y=c.getProgramParameter(L,hf)),Y},this.destroy=function(){i.releaseStatesOfProgram(this),c.deleteProgram(L),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mf++,this.cacheKey=n,this.usedTimes=1,this.program=L,this.vertexShader=v,this.fragmentShader=P,this}let Ff=0;class Of{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n,t,i){const c=this._getShaderCacheForMaterial(n);return c.has(t)===!1&&(c.add(t),t.usedTimes++),c.has(i)===!1&&(c.add(i),i.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderStage(n){return this._getShaderStage(n.vertexShader)}getFragmentShaderStage(n){return this._getShaderStage(n.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Bf(n),t.set(n,i)),i}}class Bf{constructor(n){this.id=Ff++,this.code=n,this.usedTimes=0}}function Gf(e){return e===Qt||e===Tn||e===An}function Hf(e,n,t,i,c,s){const u=new Rr,m=new Of,N=new Set,b=[],W=new Map,O=i.logarithmicDepthBuffer,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(o){return N.add(o),o===0?"uv":`uv${o}`}function L(o,h,Y,w,I,k){const $=w.fog,T=I.geometry,J=o.isMeshStandardMaterial||o.isMeshLambertMaterial||o.isMeshPhongMaterial?w.environment:null,Z=o.isMeshStandardMaterial||o.isMeshLambertMaterial&&!o.envMap||o.isMeshPhongMaterial&&!o.envMap,G=n.get(o.envMap||J,Z),le=x[o.type];let K=i.precision;o.precision!==null&&(K=i.getMaxPrecision(o.precision),K!==o.precision&&Ve("WebGLProgram.getParameters:",o.precision,"not supported, using",K,"instead."));const te=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,re=te!==void 0?te.length:0;let Me=0;T.morphAttributes.position!==void 0&&(Me=1),T.morphAttributes.normal!==void 0&&(Me=2),T.morphAttributes.color!==void 0&&(Me=3);let Ne,V,ue,Se;if(le){const Pe=Lt[le];Ne=Pe.vertexShader,V=Pe.fragmentShader}else{Ne=o.vertexShader,V=o.fragmentShader;const Pe=m.getVertexShaderStage(o),ge=m.getFragmentShaderStage(o);m.update(o,Pe,ge),ue=Pe.id,Se=ge.id}const Ae=e.getRenderTarget(),he=e.state.buffers.depth.getReversed(),Ue=I.isInstancedMesh===!0,_t=I.isBatchedMesh===!0,Ce=!!o.map,Ye=!!o.matcap,We=!!G,Ie=We&&G.isPMREMTexture===!0,lt=!!o.aoMap,nt=!!o.lightMap,gt=!!o.bumpMap&&o.wireframe===!1,je=!!o.normalMap,Dt=!!o.displacementMap,at=!!o.emissiveMap,Et=!!o.metalnessMap,Mt=!!o.roughnessMap,xt=o.anisotropy>0,M=o.clearcoat>0,Tt=o.diffuseRoughness>0,Xe=o.dispersion>0,ot=o.retroreflectivity>0,ce=o.iridescence>0,Ke=o.sheen>0,xe=o.transmission>0,be=xt&&!!o.anisotropyMap,ft=M&&!!o.clearcoatMap,d=M&&!!o.clearcoatNormalMap,r=M&&!!o.clearcoatRoughnessMap,C=Tt&&!!o.diffuseRoughnessMap,Q=ce&&!!o.iridescenceMap,X=ce&&!!o.iridescenceThicknessMap,ie=Ke&&!!o.sheenColorMap,oe=Ke&&!!o.sheenRoughnessMap,y=!!o.specularMap,H=!!o.specularColorMap,p=!!o.specularIntensityMap,q=xe&&!!o.transmissionMap,B=xe&&!!o.thicknessMap,z=!!o.gradientMap,j=!!o.alphaMap,ee=o.alphaTest>0,_e=!!o.alphaHash,Re=!!o.extensions;let Te=Ut;o.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(Te=e.toneMapping);const ne=Ie?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,we={shaderID:le,shaderType:o.type,shaderName:o.name,vertexShader:Ne,fragmentShader:V,defines:o.defines,customVertexShaderID:ue,customFragmentShaderID:Se,isRawShaderMaterial:o.isRawShaderMaterial===!0,glslVersion:o.glslVersion,precision:K,batching:_t,batchingColor:_t&&I._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&I.instanceColor!==null,instancingMorph:Ue&&I.morphTexture!==null,outputColorSpace:Ae===null?e.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!o.alphaToCoverage,map:Ce,matcap:Ye,envMap:We,envMapMode:We&&G.mapping,envMapPMREM:Ie,envMapMaxLod:Ie?ne.length-1:null,envMapSize:Ie?ne[0].width:null,aoMap:lt,lightMap:nt,bumpMap:gt,normalMap:je,displacementMap:Dt,emissiveMap:at,normalMapObjectSpace:je&&o.normalMapType===Ar,normalMapTangentSpace:je&&o.normalMapType===oi,packedNormalMap:je&&o.normalMapType===oi&&Gf(o.normalMap.format),metalnessMap:Et,roughnessMap:Mt,anisotropy:xt,anisotropyMap:be,clearcoat:M,clearcoatMap:ft,clearcoatNormalMap:d,clearcoatRoughnessMap:r,diffuseRoughness:Tt,diffuseRoughnessMap:C,dispersion:Xe,retroreflection:ot,iridescence:ce,iridescenceMap:Q,iridescenceThicknessMap:X,sheen:Ke,sheenColorMap:ie,sheenRoughnessMap:oe,specularMap:y,specularColorMap:H,specularIntensityMap:p,transmission:xe,transmissionMap:q,thicknessMap:B,gradientMap:z,opaque:o.transparent===!1&&o.blending===fn&&o.alphaToCoverage===!1,alphaMap:j,alphaTest:ee,alphaHash:_e,combine:o.combine,mapUv:Ce&&E(o.map.channel),aoMapUv:lt&&E(o.aoMap.channel),lightMapUv:nt&&E(o.lightMap.channel),bumpMapUv:gt&&E(o.bumpMap.channel),normalMapUv:je&&E(o.normalMap.channel),displacementMapUv:Dt&&E(o.displacementMap.channel),emissiveMapUv:at&&E(o.emissiveMap.channel),metalnessMapUv:Et&&E(o.metalnessMap.channel),roughnessMapUv:Mt&&E(o.roughnessMap.channel),anisotropyMapUv:be&&E(o.anisotropyMap.channel),clearcoatMapUv:ft&&E(o.clearcoatMap.channel),clearcoatNormalMapUv:d&&E(o.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:r&&E(o.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:C&&E(o.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&E(o.iridescenceMap.channel),iridescenceThicknessMapUv:X&&E(o.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&E(o.sheenColorMap.channel),sheenRoughnessMapUv:oe&&E(o.sheenRoughnessMap.channel),specularMapUv:y&&E(o.specularMap.channel),specularColorMapUv:H&&E(o.specularColorMap.channel),specularIntensityMapUv:p&&E(o.specularIntensityMap.channel),transmissionMapUv:q&&E(o.transmissionMap.channel),thicknessMapUv:B&&E(o.thicknessMap.channel),alphaMapUv:j&&E(o.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(je||xt),vertexNormals:!!T.attributes.normal,vertexColors:o.vertexColors,vertexAlphas:o.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!T.attributes.uv&&(Ce||j),fog:!!$,useFog:o.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:o.wireframe===!1&&(o.flatShading===!0||T.attributes.normal===void 0&&je===!1&&(o.isMeshLambertMaterial||o.isMeshPhongMaterial||o.isMeshStandardMaterial||o.isMeshPhysicalMaterial)),sizeAttenuation:o.sizeAttenuation===!0,logarithmicDepthBuffer:O,reversedDepthBuffer:he,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:T.attributes.position!==void 0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Me,numSunLights:h.sun.length,numDirLights:h.directional.length,numPointLights:h.point.length,numSpotLights:h.spot.length,numSpotLightMaps:h.spotLightMap.length,numRectAreaLights:h.rectArea.length,numHemiLights:h.hemi.length,numSunLightShadows:h.sunShadowMap.length,numDirLightShadows:h.directionalShadowMap.length,numPointLightShadows:h.pointShadowMap.length,numSpotLightShadows:h.spotShadowMap.length,numSpotLightShadowsWithMaps:h.numSpotLightShadowsWithMaps,numLightProbes:h.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:o.dithering,shadowMapEnabled:e.shadowMap.enabled&&Y.length>0,shadowMapType:e.shadowMap.type,toneMapping:Te,decodeVideoTexture:Ce&&o.map.isVideoTexture===!0&&Je.getTransfer(o.map.colorSpace)===ze,decodeVideoTextureEmissive:at&&o.emissiveMap.isVideoTexture===!0&&Je.getTransfer(o.emissiveMap.colorSpace)===ze,premultipliedAlpha:o.premultipliedAlpha,doubleSided:o.side===Nt,flipSided:o.side===St,useDepthPacking:o.depthPacking>=0,depthPacking:o.depthPacking||0,index0AttributeName:o.index0AttributeName,extensionClipCullDistance:Re&&o.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&o.extensions.multiDraw===!0||_t)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:o.customProgramCacheKey()};return we.vertexUv1s=N.has(1),we.vertexUv2s=N.has(2),we.vertexUv3s=N.has(3),N.clear(),we}function F(o){const h=[];if(o.shaderID?h.push(o.shaderID):(h.push(o.customVertexShaderID),h.push(o.customFragmentShaderID)),o.defines!==void 0)for(const Y in o.defines)h.push(Y),h.push(o.defines[Y]);return o.isRawShaderMaterial===!1&&(f(h,o),l(h,o),h.push(e.outputColorSpace)),h.push(o.customProgramCacheKey),h.join()}function f(o,h){o.push(h.precision),o.push(h.outputColorSpace),o.push(h.envMapMode),o.push(h.envMapPMREM),o.push(h.envMapMaxLod),o.push(h.envMapSize),o.push(h.mapUv),o.push(h.alphaMapUv),o.push(h.lightMapUv),o.push(h.aoMapUv),o.push(h.bumpMapUv),o.push(h.normalMapUv),o.push(h.displacementMapUv),o.push(h.emissiveMapUv),o.push(h.metalnessMapUv),o.push(h.roughnessMapUv),o.push(h.anisotropyMapUv),o.push(h.clearcoatMapUv),o.push(h.clearcoatNormalMapUv),o.push(h.clearcoatRoughnessMapUv),o.push(h.diffuseRoughnessMapUv),o.push(h.iridescenceMapUv),o.push(h.iridescenceThicknessMapUv),o.push(h.sheenColorMapUv),o.push(h.sheenRoughnessMapUv),o.push(h.specularMapUv),o.push(h.specularColorMapUv),o.push(h.specularIntensityMapUv),o.push(h.transmissionMapUv),o.push(h.thicknessMapUv),o.push(h.combine),o.push(h.fogExp2),o.push(h.sizeAttenuation),o.push(h.morphTargetsCount),o.push(h.numSunLights),o.push(h.numDirLights),o.push(h.numPointLights),o.push(h.numSpotLights),o.push(h.numSpotLightMaps),o.push(h.numHemiLights),o.push(h.numRectAreaLights),o.push(h.numSunLightShadows),o.push(h.numDirLightShadows),o.push(h.numPointLightShadows),o.push(h.numSpotLightShadows),o.push(h.numSpotLightShadowsWithMaps),o.push(h.numLightProbes),o.push(h.shadowMapType),o.push(h.toneMapping),o.push(h.numClippingPlanes),o.push(h.numClipIntersection),o.push(h.depthPacking)}function l(o,h){u.disableAll(),h.instancing&&u.enable(0),h.instancingColor&&u.enable(1),h.instancingMorph&&u.enable(2),h.matcap&&u.enable(3),h.envMap&&u.enable(4),h.normalMapObjectSpace&&u.enable(5),h.normalMapTangentSpace&&u.enable(6),h.clearcoat&&u.enable(7),h.iridescence&&u.enable(8),h.alphaTest&&u.enable(9),h.vertexColors&&u.enable(10),h.vertexAlphas&&u.enable(11),h.vertexUv1s&&u.enable(12),h.vertexUv2s&&u.enable(13),h.vertexUv3s&&u.enable(14),h.vertexTangents&&u.enable(15),h.anisotropy&&u.enable(16),h.alphaHash&&u.enable(17),h.batching&&u.enable(18),h.dispersion&&u.enable(19),h.retroreflection&&u.enable(24),h.diffuseRoughness&&u.enable(25),h.batchingColor&&u.enable(20),h.gradientMap&&u.enable(21),h.packedNormalMap&&u.enable(22),h.vertexNormals&&u.enable(23),o.push(u.mask),u.disableAll(),h.fog&&u.enable(0),h.useFog&&u.enable(1),h.flatShading&&u.enable(2),h.logarithmicDepthBuffer&&u.enable(3),h.reversedDepthBuffer&&u.enable(4),h.skinning&&u.enable(5),h.morphTargets&&u.enable(6),h.morphNormals&&u.enable(7),h.morphColors&&u.enable(8),h.premultipliedAlpha&&u.enable(9),h.shadowMapEnabled&&u.enable(10),h.doubleSided&&u.enable(11),h.flipSided&&u.enable(12),h.useDepthPacking&&u.enable(13),h.dithering&&u.enable(14),h.transmission&&u.enable(15),h.sheen&&u.enable(16),h.opaque&&u.enable(17),h.pointsUvs&&u.enable(18),h.decodeVideoTexture&&u.enable(19),h.decodeVideoTextureEmissive&&u.enable(20),h.alphaToCoverage&&u.enable(21),h.numLightProbeGrids>0&&u.enable(22),h.hasPositionAttribute&&u.enable(23),o.push(u.mask)}function g(o){const h=x[o.type];let Y;if(h){const w=Lt[h];Y=Tr.clone(w.uniforms)}else Y=o.uniforms;return Y}function D(o,h){let Y=W.get(h);return Y!==void 0?++Y.usedTimes:(Y=new yf(e,h,o,c),b.push(Y),W.set(h,Y)),Y}function v(o){if(--o.usedTimes===0){const h=b.indexOf(o);b[h]=b[b.length-1],b.pop(),W.delete(o.cacheKey),o.destroy()}}function P(o){m.remove(o)}function S(){m.dispose()}return{getParameters:L,getProgramCacheKey:F,getUniforms:g,acquireProgram:D,releaseProgram:v,releaseShaderCache:P,programs:b,dispose:S}}function Vf(){let e=new WeakMap;function n(u){return e.has(u)}function t(u){let m=e.get(u);return m===void 0&&(m={},e.set(u,m)),m}function i(u){e.delete(u)}function c(u,m,N){e.get(u)[m]=N}function s(){e=new WeakMap}return{has:n,get:t,remove:i,update:c,dispose:s}}function Wf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.materialVariant!==n.materialVariant?e.materialVariant-n.materialVariant:e.z!==n.z?e.z-n.z:e.id-n.id}function to(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function no(){const e=[];let n=0;const t=[],i=[],c=[];function s(){n=0,t.length=0,i.length=0,c.length=0}function u(x){let E=0;return x.isInstancedMesh&&(E+=2),x.isSkinnedMesh&&(E+=1),E}function m(x,E,L,F,f,l){let g=e[n];return g===void 0?(g={id:x.id,object:x,geometry:E,material:L,materialVariant:u(x),groupOrder:F,renderOrder:x.renderOrder,z:f,group:l},e[n]=g):(g.id=x.id,g.object=x,g.geometry=E,g.material=L,g.materialVariant=u(x),g.groupOrder=F,g.renderOrder=x.renderOrder,g.z=f,g.group=l),n++,g}function N(x,E,L,F,f,l,g){g.reversedDepth===!0&&(f=-f);const D=m(x,E,L,F,f,l);L.transmission>0?i.push(D):L.transparent===!0?c.push(D):t.push(D)}function b(x,E,L,F,f,l){const g=m(x,E,L,F,f,l);L.transmission>0?i.unshift(g):L.transparent===!0?c.unshift(g):t.unshift(g)}function W(x,E){t.length>1&&t.sort(x||Wf),i.length>1&&i.sort(E||to),c.length>1&&c.sort(E||to)}function O(){for(let x=n,E=e.length;x<E;x++){const L=e[x];if(L.id===null)break;L.id=null,L.object=null,L.geometry=null,L.material=null,L.group=null}}return{opaque:t,transmissive:i,transparent:c,init:s,push:N,unshift:b,finish:O,sort:W}}function kf(){let e=new WeakMap;function n(i,c){const s=e.get(i);let u;return s===void 0?(u=new no,e.set(i,[u])):c>=s.length?(u=new no,s.push(u)):u=s[c],u}function t(){e=new WeakMap}return{get:n,dispose:t}}function zf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"SunLight":case"DirectionalLight":t={direction:new Ge,color:new $e};break;case"SpotLight":t={position:new Ge,direction:new Ge,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Ge,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Ge,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new Ge,halfWidth:new Ge,halfHeight:new Ge};break}return e[n.id]=t,t}}}function Xf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Kf=0;function qf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Yf(e){const n=new zf,t=Xf(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let b=0;b<9;b++)i.probe.push(new Ge);const c=new Ge,s=new Yt,u=new Yt;function m(b){let W=0,O=0,x=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let E=0,L=0,F=0,f=0,l=0,g=0,D=0,v=0,P=0,S=0,o=0,h=0,Y=0,w=0;b.sort(qf);for(let k=0,$=b.length;k<$;k++){const T=b[k],J=T.color,Z=T.intensity,G=T.distance;let le=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===Qt?le=T.shadow.map.texture:le=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)W+=J.r*Z,O+=J.g*Z,x+=J.b*Z;else if(T.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(T.sh.coefficients[K],Z);w++}else if(T.isSunLight){const K=n.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const te=T.shadow,re=t.get(T);re.shadowIntensity=te.intensity,re.shadowBias=te.bias,re.shadowNormalBias=te.normalBias,re.shadowRadius=te.radius,re.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[L]=re,i.sunShadowMap[L]=le;const Me=te.getViewportCount();for(let Ne=0;Ne<Me;Ne++)i.sunShadowMatrix[F+Ne]=te.getMatrix(Ne),i.sunShadowCascade[F+Ne]=te._cascadeData[Ne];F+=Me,L++}i.sun[E]=K,E++}else if(T.isDirectionalLight){const K=n.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const te=T.shadow,re=t.get(T);re.shadowIntensity=te.intensity,re.shadowBias=te.bias,re.shadowNormalBias=te.normalBias,re.shadowRadius=te.radius,re.shadowMapSize=te.mapSize,i.directionalShadow[f]=re,i.directionalShadowMap[f]=le,i.directionalShadowMatrix[f]=T.shadow.matrix,P++}i.directional[f]=K,f++}else if(T.isSpotLight){const K=n.get(T);K.position.setFromMatrixPosition(T.matrixWorld),K.color.copy(J).multiplyScalar(Z),K.distance=G,K.coneCos=Math.cos(T.angle),K.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),K.decay=T.decay,i.spot[g]=K;const te=T.shadow;if(T.map&&(i.spotLightMap[h]=T.map,h++,te.updateMatrices(T),T.castShadow&&Y++),i.spotLightMatrix[g]=te.matrix,T.castShadow){const re=t.get(T);re.shadowIntensity=te.intensity,re.shadowBias=te.bias,re.shadowNormalBias=te.normalBias,re.shadowRadius=te.radius,re.shadowMapSize=te.mapSize,i.spotShadow[g]=re,i.spotShadowMap[g]=le,o++}g++}else if(T.isRectAreaLight){const K=n.get(T);K.color.copy(J).multiplyScalar(Z),K.halfWidth.set(T.width*.5,0,0),K.halfHeight.set(0,T.height*.5,0),i.rectArea[D]=K,D++}else if(T.isPointLight){const K=n.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),K.distance=T.distance,K.decay=T.decay,T.castShadow){const te=T.shadow,re=t.get(T);re.shadowIntensity=te.intensity,re.shadowBias=te.bias,re.shadowNormalBias=te.normalBias,re.shadowRadius=te.radius,re.shadowMapSize=te.mapSize,re.shadowCameraNear=te.camera.near,re.shadowCameraFar=te.camera.far,i.pointShadow[l]=re,i.pointShadowMap[l]=le,i.pointShadowMatrix[l]=T.shadow.matrix,S++}i.point[l]=K,l++}else if(T.isHemisphereLight){const K=n.get(T);K.skyColor.copy(T.color).multiplyScalar(Z),K.groundColor.copy(T.groundColor).multiplyScalar(Z),i.hemi[v]=K,v++}}D>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=W,i.ambient[1]=O,i.ambient[2]=x;const I=i.hash;(I.sunLength!==E||I.directionalLength!==f||I.pointLength!==l||I.spotLength!==g||I.rectAreaLength!==D||I.hemiLength!==v||I.numSunShadows!==L||I.numDirectionalShadows!==P||I.numPointShadows!==S||I.numSpotShadows!==o||I.numSpotMaps!==h||I.numLightProbes!==w)&&(i.sun.length=E,i.directional.length=f,i.spot.length=g,i.rectArea.length=D,i.point.length=l,i.hemi.length=v,i.sunShadow.length=L,i.sunShadowMap.length=L,i.sunShadowMatrix.length=F,i.sunShadowCascade.length=F,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.directionalShadowMatrix.length=P,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=o,i.spotShadowMap.length=o,i.spotLightMatrix.length=o+h-Y,i.spotLightMap.length=h,i.numSpotLightShadowsWithMaps=Y,i.numLightProbes=w,I.sunLength=E,I.directionalLength=f,I.pointLength=l,I.spotLength=g,I.rectAreaLength=D,I.hemiLength=v,I.numSunShadows=L,I.numDirectionalShadows=P,I.numPointShadows=S,I.numSpotShadows=o,I.numSpotMaps=h,I.numLightProbes=w,i.version=Kf++)}function N(b,W){let O=0,x=0,E=0,L=0,F=0,f=0;const l=W.matrixWorldInverse;for(let g=0,D=b.length;g<D;g++){const v=b[g];if(v.isSunLight){const P=i.sun[O];P.direction.setFromMatrixPosition(v.matrixWorld),P.direction.transformDirection(l),O++}else if(v.isDirectionalLight){const P=i.directional[x];P.direction.setFromMatrixPosition(v.matrixWorld),c.setFromMatrixPosition(v.target.matrixWorld),P.direction.sub(c),P.direction.transformDirection(l),x++}else if(v.isSpotLight){const P=i.spot[L];P.position.setFromMatrixPosition(v.matrixWorld),P.position.applyMatrix4(l),P.direction.setFromMatrixPosition(v.matrixWorld),c.setFromMatrixPosition(v.target.matrixWorld),P.direction.sub(c),P.direction.transformDirection(l),L++}else if(v.isRectAreaLight){const P=i.rectArea[F];P.position.setFromMatrixPosition(v.matrixWorld),P.position.applyMatrix4(l),u.identity(),s.copy(v.matrixWorld),s.premultiply(l),u.extractRotation(s),P.halfWidth.set(v.width*.5,0,0),P.halfHeight.set(0,v.height*.5,0),P.halfWidth.applyMatrix4(u),P.halfHeight.applyMatrix4(u),F++}else if(v.isPointLight){const P=i.point[E];P.position.setFromMatrixPosition(v.matrixWorld),P.position.applyMatrix4(l),E++}else if(v.isHemisphereLight){const P=i.hemi[f];P.direction.setFromMatrixPosition(v.matrixWorld),P.direction.transformDirection(l),f++}}}return{setup:m,setupView:N,state:i}}function io(e){const n=new Yf(e),t=[],i=[],c=[];function s(O){W.camera=O,t.length=0,i.length=0,c.length=0}function u(O){O.isLightProbeGrid?c.push(O):t.push(O)}function m(O){i.push(O)}function N(){n.setup(t)}function b(O){n.setupView(t,O)}const W={lightsArray:t,shadowsArray:i,lightProbeGridArray:c,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:W,setupLights:N,setupLightsView:b,pushLight:u,pushShadow:m}}function Zf(e){let n=new WeakMap;function t(c,s=0){const u=n.get(c);let m;return u===void 0?(m=new io(e),n.set(c,[m])):s>=u.length?(m=new io(e),u.push(m)):m=u[s],m}function i(){n=new WeakMap}return{get:t,dispose:i}}const $f=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Jf=[new Ge(1,0,0),new Ge(-1,0,0),new Ge(0,1,0),new Ge(0,-1,0),new Ge(0,0,1),new Ge(0,0,-1)],jf=[new Ge(0,-1,0),new Ge(0,-1,0),new Ge(0,0,1),new Ge(0,0,-1),new Ge(0,-1,0),new Ge(0,-1,0)],ro=new Yt,mn=new Ge,tr=new Ge;function ed(e,n,t){let i=new ci;const c=new ht,s=new ht,u=new mt,m=new Cr,N=new br,b={},W=t.maxTextureSize,O={[jt]:St,[St]:jt,[Nt]:Nt},x=new qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:$f,fragmentShader:Qf}),E=x.clone();E.defines.HORIZONTAL_PASS=1;const L=new qn;L.setAttribute("position",new Pr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const F=new Gt(L,x),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cn;let l=this.type;this.render=function(S,o,h){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||S.length===0)return;this.type===Lr&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=cn);const Y=e.getRenderTarget(),w=e.getActiveCubeFace(),I=e.getActiveMipmapLevel(),k=e.state;k.setBlending(Zt),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const $=l!==this.type;$&&o.traverse(function(T){T.material&&(Array.isArray(T.material)?T.material.forEach(J=>J.needsUpdate=!0):T.material.needsUpdate=!0)});for(let T=0,J=S.length;T<J;T++){const Z=S[T],G=Z.shadow;if(G===void 0){Ve("WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;c.copy(G.mapSize);const le=G.getFrameExtents();c.multiply(le),s.copy(G.mapSize),(c.x>W||c.y>W)&&(c.x>W&&(s.x=Math.floor(W/le.x),c.x=s.x*le.x,G.mapSize.x=s.x),c.y>W&&(s.y=Math.floor(W/le.y),c.y=s.y*le.y,G.mapSize.y=s.y));const K=e.state.buffers.depth.getReversed();if(G.camera._reversedDepth=K,G.map===null||$===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===nn){if(Z.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Pt(c.x,c.y,{format:Qt,type:wt,minFilter:At,magFilter:At,generateMipmaps:!1}),G.map.texture.name=Z.name+".shadowMap",G.map.depthTexture=new tn(c.x,c.y,Ot),G.map.depthTexture.name=Z.name+".shadowMapDepth",G.map.depthTexture.format=rn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Wt,G.map.depthTexture.magFilter=Wt}else Z.isPointLight?(G.map=new In(c.x),G.map.depthTexture=new ii(c.x,kt)):(G.map=new Pt(c.x,c.y),G.map.depthTexture=new tn(c.x,c.y,kt)),G.map.depthTexture.name=Z.name+".shadowMap",G.map.depthTexture.format=rn,this.type===cn?(G.map.depthTexture.compareFunction=K?si:li,G.map.depthTexture.minFilter=At,G.map.depthTexture.magFilter=At):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Wt,G.map.depthTexture.magFilter=Wt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==c.x||G.map.height!==c.y)&&G.map.setSize(c.x,c.y);const te=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Z.isPointLight!==!0&&G.updateMatrices(Z,h);const re=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:h.layers;for(let Me=0;Me<te;Me++){const Ne=G.getCamera(Me);if(Z.isPointLight){const V=G.camera,ue=G.matrix,Se=Z.distance||V.far;Se!==V.far&&(V.far=Se,V.updateProjectionMatrix()),mn.setFromMatrixPosition(Z.matrixWorld),V.position.copy(mn),tr.copy(V.position),tr.add(Jf[Me]),V.up.copy(jf[Me]),V.lookAt(tr),V.updateMatrixWorld(),ue.makeTranslation(-mn.x,-mn.y,-mn.z),ro.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),G._frustum.setFromProjectionMatrix(ro,V.coordinateSystem,V.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)e.setRenderTarget(G.map,Me),e.clear();else{Me===0&&(e.setRenderTarget(G.map),e.clear());const V=G.getViewport(Me);u.set(s.x*V.x,s.y*V.y,s.x*V.z,s.y*V.w),k.viewport(u)}i=G.getFrustum(Me),v(o,h,Ne,Z,re,this.type)}G.isPointLightShadow!==!0&&this.type===nn&&g(G,h),G.needsUpdate=!1}l=this.type,f.needsUpdate=!1,e.setRenderTarget(Y,w,I)};function g(S,o){const h=n.update(F);x.defines.VSM_SAMPLES!==S.blurSamples&&(x.defines.VSM_SAMPLES=S.blurSamples,E.defines.VSM_SAMPLES=S.blurSamples,x.needsUpdate=!0,E.needsUpdate=!0),S.mapPass===null?S.mapPass=new Pt(c.x,c.y,{format:Qt,type:wt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),x.uniforms.shadow_pass.value=S.map.depthTexture,x.uniforms.resolution.value.set(S.map.width,S.map.height),x.uniforms.radius.value=S.radius,e.setRenderTarget(S.mapPass),e.clear(),e.renderBufferDirect(o,null,h,x,F,null),E.uniforms.shadow_pass.value=S.mapPass.texture,E.uniforms.resolution.value.set(S.map.width,S.map.height),E.uniforms.radius.value=S.radius,e.setRenderTarget(S.map),e.clear(),e.renderBufferDirect(o,null,h,E,F,null)}function D(S,o,h,Y){let w=null;const I=h.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)w=I;else if(w=h.isPointLight===!0?N:m,e.localClippingEnabled&&o.clipShadows===!0&&Array.isArray(o.clippingPlanes)&&o.clippingPlanes.length!==0||o.displacementMap&&o.displacementScale!==0||o.alphaMap&&o.alphaTest>0||o.map&&o.alphaTest>0||o.alphaToCoverage===!0){const k=w.uuid,$=o.uuid;let T=b[k];T===void 0&&(T={},b[k]=T);let J=T[$];J===void 0&&(J=w.clone(),T[$]=J,o.addEventListener("dispose",P)),w=J}if(w.visible=o.visible,w.wireframe=o.wireframe,Y===nn?w.side=o.shadowSide!==null?o.shadowSide:o.side:w.side=o.shadowSide!==null?o.shadowSide:O[o.side],w.alphaMap=o.alphaMap,w.alphaTest=o.alphaToCoverage===!0?.5:o.alphaTest,w.map=o.map,w.clipShadows=o.clipShadows,w.clippingPlanes=o.clippingPlanes,w.clipIntersection=o.clipIntersection,w.displacementMap=o.displacementMap,w.displacementScale=o.displacementScale,w.displacementBias=o.displacementBias,w.wireframeLinewidth=o.wireframeLinewidth,w.linewidth=o.linewidth,h.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const k=e.properties.get(w);k.light=h}return w}function v(S,o,h,Y,w,I){if(S.visible===!1)return;if(S.layers.test(w)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===nn)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse,S.matrixWorld);const T=n.update(S),J=S.material;if(Array.isArray(J)){const Z=T.groups;for(let G=0,le=Z.length;G<le;G++){const K=Z[G],te=J[K.materialIndex];if(te&&te.visible){const re=D(S,te,Y,I);S.onBeforeShadow(e,S,o,h,T,re,K),e.renderBufferDirect(h,null,T,re,S,K),S.onAfterShadow(e,S,o,h,T,re,K)}}}else if(J.visible){const Z=D(S,J,Y,I);S.onBeforeShadow(e,S,o,h,T,Z,null),e.renderBufferDirect(h,null,T,Z,S,null),S.onAfterShadow(e,S,o,h,T,Z,null)}}const $=S.children;for(let T=0,J=$.length;T<J;T++)v($[T],o,h,Y,w,I)}function P(S){S.target.removeEventListener("dispose",P);for(const h in b){const Y=b[h],w=S.target.uuid;w in Y&&(Y[w].dispose(),delete Y[w])}}}function td(e,n){function t(){let p=!1;const q=new mt;let B=null;const z=new mt(0,0,0,0);return{setMask:function(j){B!==j&&!p&&(e.colorMask(j,j,j,j),B=j)},setLocked:function(j){p=j},setClear:function(j,ee,_e,Re,Te){Te===!0&&(j*=Re,ee*=Re,_e*=Re),q.set(j,ee,_e,Re),z.equals(q)===!1&&(e.clearColor(j,ee,_e,Re),z.copy(q))},reset:function(){p=!1,B=null,z.set(-1,0,0,0)}}}function i(){let p=!1,q=!1,B=null,z=null,j=null;return{setReversed:function(ee){if(q!==ee){const _e=n.get("EXT_clip_control");ee?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),q=ee;const Re=j;j=null,this.setClear(Re)}},getReversed:function(){return q},setTest:function(ee){ee?he(e.DEPTH_TEST):Ue(e.DEPTH_TEST)},setMask:function(ee){B!==ee&&!p&&(e.depthMask(ee),B=ee)},setFunc:function(ee){if(q&&(ee=_o[ee]),z!==ee){switch(ee){case jr:e.depthFunc(e.NEVER);break;case Jr:e.depthFunc(e.ALWAYS);break;case Qr:e.depthFunc(e.LESS);break;case fi:e.depthFunc(e.LEQUAL);break;case $r:e.depthFunc(e.EQUAL);break;case Zr:e.depthFunc(e.GEQUAL);break;case Yr:e.depthFunc(e.GREATER);break;case qr:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}z=ee}},setLocked:function(ee){p=ee},setClear:function(ee){j!==ee&&(j=ee,q&&(ee=1-ee),e.clearDepth(ee))},reset:function(){p=!1,B=null,z=null,j=null,q=!1}}}function c(){let p=!1,q=null,B=null,z=null,j=null,ee=null,_e=null,Re=null,Te=null;return{setTest:function(ne){p||(ne?he(e.STENCIL_TEST):Ue(e.STENCIL_TEST))},setMask:function(ne){q!==ne&&!p&&(e.stencilMask(ne),q=ne)},setFunc:function(ne,we,Pe){(B!==ne||z!==we||j!==Pe)&&(e.stencilFunc(ne,we,Pe),B=ne,z=we,j=Pe)},setOp:function(ne,we,Pe){(ee!==ne||_e!==we||Re!==Pe)&&(e.stencilOp(ne,we,Pe),ee=ne,_e=we,Re=Pe)},setLocked:function(ne){p=ne},setClear:function(ne){Te!==ne&&(e.clearStencil(ne),Te=ne)},reset:function(){p=!1,q=null,B=null,z=null,j=null,ee=null,_e=null,Re=null,Te=null}}}const s=new t,u=new i,m=new c;let N={};const b=new WeakMap;let W={},O={},x={},E=new WeakMap,L=[],F=null,f=!1,l=null,g=null,D=null,v=null,P=null,S=null,o=null,h=new $e(0,0,0),Y=0,w=!1,I=null,k=null,$=null,T=null,J=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,le=0;const K=e.getParameter(e.VERSION);K.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(K)[1]),G=le>=1):K.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),G=le>=2);let te=null,re={};const Me=e.getParameter(e.SCISSOR_BOX),Ne=e.getParameter(e.VIEWPORT),V=new mt().fromArray(Me),ue=new mt().fromArray(Ne);function Se(p,q,B,z){const j=new Uint8Array(4),ee=e.createTexture();e.bindTexture(p,ee),e.texParameteri(p,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(p,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let _e=0;_e<B;_e++)p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY?e.texImage3D(q,0,e.RGBA,1,1,z,0,e.RGBA,e.UNSIGNED_BYTE,j):e.texImage2D(q+_e,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,j);return ee}const Ae={};Ae[e.TEXTURE_2D]=Se(e.TEXTURE_2D,e.TEXTURE_2D,1),Ae[e.TEXTURE_CUBE_MAP]=Se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[e.TEXTURE_2D_ARRAY]=Se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Ae[e.TEXTURE_3D]=Se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),u.setClear(1),m.setClear(0),he(e.DEPTH_TEST),u.setFunc(fi),gt(!1),je(di),he(e.CULL_FACE),lt(Zt);function he(p){W[p]!==!0&&(e.enable(p),W[p]=!0)}function Ue(p){W[p]!==!1&&(e.disable(p),W[p]=!1)}function _t(p,q){return x[p]!==q?(e.bindFramebuffer(p,q),x[p]=q,p===e.DRAW_FRAMEBUFFER&&(x[e.FRAMEBUFFER]=q),p===e.FRAMEBUFFER&&(x[e.DRAW_FRAMEBUFFER]=q),!0):!1}function Ce(p,q){let B=L,z=!1;if(p){B=E.get(q),B===void 0&&(B=[],E.set(q,B));const j=p.textures;if(B.length!==j.length||B[0]!==e.COLOR_ATTACHMENT0){for(let ee=0,_e=j.length;ee<_e;ee++)B[ee]=e.COLOR_ATTACHMENT0+ee;B.length=j.length,z=!0}}else B[0]!==e.BACK&&(B[0]=e.BACK,z=!0);z&&e.drawBuffers(B)}function Ye(p){return F!==p?(e.useProgram(p),F=p,!0):!1}const We={[an]:e.FUNC_ADD,[wr]:e.FUNC_SUBTRACT,[Dr]:e.FUNC_REVERSE_SUBTRACT};We[ia]=e.MIN,We[ra]=e.MAX;const Ie={[Kr]:e.ZERO,[Xr]:e.ONE,[zr]:e.SRC_COLOR,[kr]:e.SRC_ALPHA,[Wr]:e.SRC_ALPHA_SATURATE,[Vr]:e.DST_COLOR,[Hr]:e.DST_ALPHA,[Gr]:e.ONE_MINUS_SRC_COLOR,[Br]:e.ONE_MINUS_SRC_ALPHA,[Or]:e.ONE_MINUS_DST_COLOR,[Fr]:e.ONE_MINUS_DST_ALPHA,[yr]:e.CONSTANT_COLOR,[Ir]:e.ONE_MINUS_CONSTANT_COLOR,[Nr]:e.CONSTANT_ALPHA,[Ur]:e.ONE_MINUS_CONSTANT_ALPHA};function lt(p,q,B,z,j,ee,_e,Re,Te,ne){if(p===Zt){f===!0&&(Ue(e.BLEND),f=!1);return}if(f===!1&&(he(e.BLEND),f=!0),p!==na){if(p!==l||ne!==w){if((g!==an||P!==an)&&(e.blendEquation(e.FUNC_ADD),g=an,P=an),ne)switch(p){case fn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case hi:e.blendFunc(e.ONE,e.ONE);break;case pi:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case ui:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Qe("WebGLState: Invalid blending: ",p);break}else switch(p){case fn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case hi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case pi:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ui:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",p);break}D=null,v=null,S=null,o=null,h.set(0,0,0),Y=0,l=p,w=ne}return}j=j||q,ee=ee||B,_e=_e||z,(q!==g||j!==P)&&(e.blendEquationSeparate(We[q],We[j]),g=q,P=j),(B!==D||z!==v||ee!==S||_e!==o)&&(e.blendFuncSeparate(Ie[B],Ie[z],Ie[ee],Ie[_e]),D=B,v=z,S=ee,o=_e),(Re.equals(h)===!1||Te!==Y)&&(e.blendColor(Re.r,Re.g,Re.b,Te),h.copy(Re),Y=Te),l=p,w=!1}function nt(p,q){p.side===Nt?Ue(e.CULL_FACE):he(e.CULL_FACE);let B=p.side===St;q&&(B=!B),gt(B),p.blending===fn&&p.transparent===!1?lt(Zt):lt(p.blending,p.blendEquation,p.blendSrc,p.blendDst,p.blendEquationAlpha,p.blendSrcAlpha,p.blendDstAlpha,p.blendColor,p.blendAlpha,p.premultipliedAlpha),u.setFunc(p.depthFunc),u.setTest(p.depthTest),u.setMask(p.depthWrite),s.setMask(p.colorWrite);const z=p.stencilWrite;m.setTest(z),z&&(m.setMask(p.stencilWriteMask),m.setFunc(p.stencilFunc,p.stencilRef,p.stencilFuncMask),m.setOp(p.stencilFail,p.stencilZFail,p.stencilZPass)),at(p.polygonOffset,p.polygonOffsetFactor,p.polygonOffsetUnits),p.alphaToCoverage===!0?he(e.SAMPLE_ALPHA_TO_COVERAGE):Ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function gt(p){I!==p&&(p?e.frontFace(e.CW):e.frontFace(e.CCW),I=p)}function je(p){p!==ea?(he(e.CULL_FACE),p!==k&&(p===di?e.cullFace(e.BACK):p===ta?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ue(e.CULL_FACE),k=p}function Dt(p){p!==$&&(G&&e.lineWidth(p),$=p)}function at(p,q,B){p?(he(e.POLYGON_OFFSET_FILL),(T!==q||J!==B)&&(T=q,J=B,u.getReversed()&&(q=-q,B=-B),e.polygonOffset(q,B))):Ue(e.POLYGON_OFFSET_FILL)}function Et(p){p?he(e.SCISSOR_TEST):Ue(e.SCISSOR_TEST)}function Mt(p){p===void 0&&(p=e.TEXTURE0+Z-1),te!==p&&(e.activeTexture(p),te=p)}function xt(p,q,B){B===void 0&&(te===null?B=e.TEXTURE0+Z-1:B=te);let z=re[B];z===void 0&&(z={type:void 0,texture:void 0},re[B]=z),(z.type!==p||z.texture!==q)&&(te!==B&&(e.activeTexture(B),te=B),e.bindTexture(p,q||Ae[p]),z.type=p,z.texture=q)}function M(){const p=re[te];p!==void 0&&p.type!==void 0&&(e.bindTexture(p.type,null),p.type=void 0,p.texture=void 0)}function Tt(){try{e.compressedTexImage2D(...arguments)}catch(p){Qe("WebGLState:",p)}}function Xe(){try{e.compressedTexImage3D(...arguments)}catch(p){Qe("WebGLState:",p)}}function ot(){try{e.texSubImage2D(...arguments)}catch(p){Qe("WebGLState:",p)}}function ce(){try{e.texSubImage3D(...arguments)}catch(p){Qe("WebGLState:",p)}}function Ke(){try{e.compressedTexSubImage2D(...arguments)}catch(p){Qe("WebGLState:",p)}}function xe(){try{e.compressedTexSubImage3D(...arguments)}catch(p){Qe("WebGLState:",p)}}function be(){try{e.texStorage2D(...arguments)}catch(p){Qe("WebGLState:",p)}}function ft(){try{e.texStorage3D(...arguments)}catch(p){Qe("WebGLState:",p)}}function d(){try{e.texImage2D(...arguments)}catch(p){Qe("WebGLState:",p)}}function r(){try{e.texImage3D(...arguments)}catch(p){Qe("WebGLState:",p)}}function C(p){return O[p]!==void 0?O[p]:e.getParameter(p)}function Q(p,q){O[p]!==q&&(e.pixelStorei(p,q),O[p]=q)}function X(p){V.equals(p)===!1&&(e.scissor(p.x,p.y,p.z,p.w),V.copy(p))}function ie(p){ue.equals(p)===!1&&(e.viewport(p.x,p.y,p.z,p.w),ue.copy(p))}function oe(p,q){let B=b.get(q);B===void 0&&(B=new WeakMap,b.set(q,B));let z=B.get(p);z===void 0&&(z=e.getUniformBlockIndex(q,p.name),e.uniformBlockBinding(q,z,z),B.set(p,z))}function y(p,q,B){const j=b.get(q).get(p);N[j]!==B&&(e.bindBufferBase(e.UNIFORM_BUFFER,j,B),N[j]=B)}function H(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),u.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),W={},O={},te=null,re={},x={},N={},E=new WeakMap,L=[],F=null,f=!1,l=null,g=null,D=null,v=null,P=null,S=null,o=null,h=new $e(0,0,0),Y=0,w=!1,I=null,k=null,$=null,T=null,J=null,V.set(0,0,e.canvas.width,e.canvas.height),ue.set(0,0,e.canvas.width,e.canvas.height),s.reset(),u.reset(),m.reset()}return{buffers:{color:s,depth:u,stencil:m},enable:he,disable:Ue,bindFramebuffer:_t,drawBuffers:Ce,useProgram:Ye,setBlending:lt,setMaterial:nt,setFlipSided:gt,setCullFace:je,setLineWidth:Dt,setPolygonOffset:at,setScissorTest:Et,activeTexture:Mt,bindTexture:xt,unbindTexture:M,compressedTexImage2D:Tt,compressedTexImage3D:Xe,texImage2D:d,texImage3D:r,pixelStorei:Q,getParameter:C,updateUBOMapping:oe,uniformBlockBinding:y,texStorage2D:be,texStorage3D:ft,texSubImage2D:ot,texSubImage3D:ce,compressedTexSubImage2D:Ke,compressedTexSubImage3D:xe,scissor:X,viewport:ie,reset:H}}function nd(e,n,t,i,c,s,u){const m=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,N=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),b=new ht,W=new WeakMap,O=new Set;let x;const E=new WeakMap,L=new Set,F=new FinalizationRegistry(d=>L.delete(d));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function l(d,r){return f?new OffscreenCanvas(d,r):go("canvas")}function g(d,r,C){let Q=1;const X=ft(d);if((X.width>C||X.height>C)&&(Q=C/Math.max(X.width,X.height)),Q<1)if(typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&d instanceof ImageBitmap||typeof VideoFrame<"u"&&d instanceof VideoFrame){const ie=Math.floor(Q*X.width),oe=Math.floor(Q*X.height);x===void 0&&(x=l(ie,oe));const y=r?l(ie,oe):x;return y.width=ie,y.height=oe,y.getContext("2d").drawImage(d,0,0,ie,oe),Ve("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+ie+"x"+oe+")."),y}else return"data"in d&&Ve("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),d;return d}function D(d){return d.generateMipmaps}function v(d){e.generateMipmap(d)}function P(d){return d.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:d.isWebGL3DRenderTarget?e.TEXTURE_3D:d.isWebGLArrayRenderTarget||d.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(d,r,C,Q,X,ie=!1){if(d!==null){if(e[d]!==void 0)return e[d];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+d+"'")}let oe;Q&&(oe=n.get("EXT_texture_norm16"),oe||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let y=r;if(r===e.RED&&(C===e.FLOAT&&(y=e.R32F),C===e.HALF_FLOAT&&(y=e.R16F),C===e.UNSIGNED_BYTE&&(y=e.R8),C===e.UNSIGNED_SHORT&&oe&&(y=oe.R16_EXT),C===e.SHORT&&oe&&(y=oe.R16_SNORM_EXT)),r===e.RED_INTEGER&&(C===e.UNSIGNED_BYTE&&(y=e.R8UI),C===e.UNSIGNED_SHORT&&(y=e.R16UI),C===e.UNSIGNED_INT&&(y=e.R32UI),C===e.BYTE&&(y=e.R8I),C===e.SHORT&&(y=e.R16I),C===e.INT&&(y=e.R32I)),r===e.RG&&(C===e.FLOAT&&(y=e.RG32F),C===e.HALF_FLOAT&&(y=e.RG16F),C===e.UNSIGNED_BYTE&&(y=e.RG8),C===e.UNSIGNED_SHORT&&oe&&(y=oe.RG16_EXT),C===e.SHORT&&oe&&(y=oe.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(C===e.UNSIGNED_BYTE&&(y=e.RG8UI),C===e.UNSIGNED_SHORT&&(y=e.RG16UI),C===e.UNSIGNED_INT&&(y=e.RG32UI),C===e.BYTE&&(y=e.RG8I),C===e.SHORT&&(y=e.RG16I),C===e.INT&&(y=e.RG32I)),r===e.RGB_INTEGER&&(C===e.UNSIGNED_BYTE&&(y=e.RGB8UI),C===e.UNSIGNED_SHORT&&(y=e.RGB16UI),C===e.UNSIGNED_INT&&(y=e.RGB32UI),C===e.BYTE&&(y=e.RGB8I),C===e.SHORT&&(y=e.RGB16I),C===e.INT&&(y=e.RGB32I)),r===e.RGBA_INTEGER&&(C===e.UNSIGNED_BYTE&&(y=e.RGBA8UI),C===e.UNSIGNED_SHORT&&(y=e.RGBA16UI),C===e.UNSIGNED_INT&&(y=e.RGBA32UI),C===e.BYTE&&(y=e.RGBA8I),C===e.SHORT&&(y=e.RGBA16I),C===e.INT&&(y=e.RGBA32I)),r===e.RGB&&(C===e.UNSIGNED_SHORT&&oe&&(y=oe.RGB16_EXT),C===e.SHORT&&oe&&(y=oe.RGB16_SNORM_EXT),C===e.UNSIGNED_INT_5_9_9_9_REV&&(y=e.RGB9_E5),C===e.UNSIGNED_INT_10F_11F_11F_REV&&(y=e.R11F_G11F_B10F)),r===e.RGBA){const H=ie?ai:Je.getTransfer(X);C===e.FLOAT&&(y=e.RGBA32F),C===e.HALF_FLOAT&&(y=e.RGBA16F),C===e.UNSIGNED_BYTE&&(y=H===ze?e.SRGB8_ALPHA8:e.RGBA8),C===e.UNSIGNED_SHORT&&oe&&(y=oe.RGBA16_EXT),C===e.SHORT&&oe&&(y=oe.RGBA16_SNORM_EXT),C===e.UNSIGNED_SHORT_4_4_4_4&&(y=e.RGBA4),C===e.UNSIGNED_SHORT_5_5_5_1&&(y=e.RGB5_A1)}return(y===e.R16F||y===e.R32F||y===e.RG16F||y===e.RG32F||y===e.RGBA16F||y===e.RGBA32F)&&n.get("EXT_color_buffer_float"),y}function o(d,r){let C;return d?r===null||r===kt||r===$t?C=e.DEPTH24_STENCIL8:r===Ot?C=e.DEPTH32F_STENCIL8:r===un&&(C=e.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):r===null||r===kt||r===$t?C=e.DEPTH_COMPONENT24:r===Ot?C=e.DEPTH_COMPONENT32F:r===un&&(C=e.DEPTH_COMPONENT16),C}function h(d,r){return D(d)===!0||d.isFramebufferTexture&&d.minFilter!==Wt&&d.minFilter!==At?Math.log2(Math.max(r.width,r.height))+1:d.mipmaps!==void 0&&d.mipmaps.length>0?d.mipmaps.length:d.isCompressedTexture&&Array.isArray(d.image)?r.mipmaps.length:1}function Y(d){const r=new WeakRef(d);i.get(d).__ref=r,L.add(r),F.register(d,r,r)}function w(d){const r=i.get(d).__ref;r!==void 0&&(L.delete(r),F.unregister(r))}function I(d){$(d.target)}function k(d){T(d.target)}function $(d){d.removeEventListener("dispose",I),w(d),Z(d),d.isVideoTexture&&W.delete(d),d.isHTMLTexture&&O.delete(d)}function T(d){d.removeEventListener("dispose",k),w(d),le(d)}function J(){for(const d of L){const r=d.deref();r!==void 0&&(r.isRenderTarget===!0?T(r):$(r))}L.clear(),O.clear()}function Z(d){const r=i.get(d);if(r.__webglInit===void 0)return;const C=d.source,Q=E.get(C);if(Q){const X=Q[r.__cacheKey];X.usedTimes--,X.usedTimes===0&&G(d),Object.keys(Q).length===0&&E.delete(C)}i.remove(d)}function G(d){const r=i.get(d);e.deleteTexture(r.__webglTexture);const C=d.source,Q=E.get(C);delete Q[r.__cacheKey],u.memory.textures--}function le(d){const r=i.get(d);r.__depthDisposeCallback&&r.__depthDisposeCallback();const C=d.depthTexture;if(C&&C.renderTarget===d&&$(C),d.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(r.__webglFramebuffer[X]))for(let ie=0;ie<r.__webglFramebuffer[X].length;ie++)e.deleteFramebuffer(r.__webglFramebuffer[X][ie]);else e.deleteFramebuffer(r.__webglFramebuffer[X]);r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer[X])}else{if(Array.isArray(r.__webglFramebuffer))for(let X=0;X<r.__webglFramebuffer.length;X++)e.deleteFramebuffer(r.__webglFramebuffer[X]);else e.deleteFramebuffer(r.__webglFramebuffer);if(r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer),r.__webglMultisampledFramebuffer&&e.deleteFramebuffer(r.__webglMultisampledFramebuffer),r.__webglColorRenderbuffer)for(let X=0;X<r.__webglColorRenderbuffer.length;X++)r.__webglColorRenderbuffer[X]&&e.deleteRenderbuffer(r.__webglColorRenderbuffer[X]);r.__webglDepthRenderbuffer&&e.deleteRenderbuffer(r.__webglDepthRenderbuffer)}const Q=d.textures;for(let X=0,ie=Q.length;X<ie;X++){const oe=i.get(Q[X]);oe.__webglTexture&&(e.deleteTexture(oe.__webglTexture),u.memory.textures--),i.remove(Q[X])}i.remove(d)}let K=0;function te(){K=0}function re(){return K}function Me(d){K=d}function Ne(){const d=K;return d>=c.maxTextures&&Ve("WebGLTextures: Trying to use "+(d+1)+" texture units while this GPU supports only "+c.maxTextures),K+=1,d}function V(d){const r=[];return r.push(d.wrapS),r.push(d.wrapT),r.push(d.wrapR||0),r.push(d.magFilter),r.push(d.minFilter),r.push(d.anisotropy),r.push(d.internalFormat),r.push(d.format),r.push(d.type),r.push(d.generateMipmaps),r.push(d.mipmapsAutoUpdate),r.push(d.premultiplyAlpha),r.push(d.flipY),r.push(d.unpackAlignment),r.push(d.colorSpace),r.join()}function ue(d,r){const C=i.get(d);if(d.isVideoTexture&&xe(d),d.isRenderTargetTexture===!1&&d.isExternalTexture!==!0&&d.version>0&&C.__version!==d.version){const Q=d.image;if(Q===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{nt(C,d,r);return}}else d.isExternalTexture&&(C.__webglTexture=d.sourceTexture?d.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,C.__webglTexture,e.TEXTURE0+r)}function Se(d,r){const C=i.get(d);if(d.isRenderTargetTexture===!1&&d.version>0&&C.__version!==d.version){nt(C,d,r);return}else d.isExternalTexture&&(C.__webglTexture=d.sourceTexture?d.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,C.__webglTexture,e.TEXTURE0+r)}function Ae(d,r){const C=i.get(d);if(d.isRenderTargetTexture===!1&&d.version>0&&C.__version!==d.version){nt(C,d,r);return}t.bindTexture(e.TEXTURE_3D,C.__webglTexture,e.TEXTURE0+r)}function he(d,r){const C=i.get(d);if(d.version>0&&C.__version!==d.version){gt(C,d,r);return}t.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+r)}const Ue={[oa]:e.REPEAT,[Rn]:e.CLAMP_TO_EDGE,[aa]:e.MIRRORED_REPEAT},_t={[Wt]:e.NEAREST,[sa]:e.NEAREST_MIPMAP_NEAREST,[dn]:e.NEAREST_MIPMAP_LINEAR,[At]:e.LINEAR,[Cn]:e.LINEAR_MIPMAP_NEAREST,[Ht]:e.LINEAR_MIPMAP_LINEAR},Ce={[ua]:e.NEVER,[ni]:e.ALWAYS,[da]:e.LESS,[li]:e.LEQUAL,[fa]:e.EQUAL,[si]:e.GEQUAL,[ca]:e.GREATER,[la]:e.NOTEQUAL};function Ye(d,r){if(r.type===Ot&&n.has("OES_texture_float_linear")===!1&&(r.magFilter===At||r.magFilter===Cn||r.magFilter===dn||r.magFilter===Ht||r.minFilter===At||r.minFilter===Cn||r.minFilter===dn||r.minFilter===Ht)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(d,e.TEXTURE_WRAP_S,Ue[r.wrapS]),e.texParameteri(d,e.TEXTURE_WRAP_T,Ue[r.wrapT]),(d===e.TEXTURE_3D||d===e.TEXTURE_2D_ARRAY)&&e.texParameteri(d,e.TEXTURE_WRAP_R,Ue[r.wrapR]),e.texParameteri(d,e.TEXTURE_MAG_FILTER,_t[r.magFilter]),e.texParameteri(d,e.TEXTURE_MIN_FILTER,_t[r.minFilter]),r.compareFunction&&(e.texParameteri(d,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(d,e.TEXTURE_COMPARE_FUNC,Ce[r.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(r.magFilter===Wt||r.minFilter!==dn&&r.minFilter!==Ht||r.type===Ot&&n.has("OES_texture_float_linear")===!1)return;if(r.anisotropy>1||i.get(r).__currentAnisotropy){const C=n.get("EXT_texture_filter_anisotropic");e.texParameterf(d,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,c.getMaxAnisotropy())),i.get(r).__currentAnisotropy=r.anisotropy}}}function We(d,r){let C=!1;d.__webglInit===void 0&&(d.__webglInit=!0,r.addEventListener("dispose",I),Y(r));const Q=r.source;let X=E.get(Q);X===void 0&&(X={},E.set(Q,X));const ie=V(r);if(ie!==d.__cacheKey){X[ie]===void 0&&(X[ie]={texture:e.createTexture(),usedTimes:0},u.memory.textures++,C=!0),X[ie].usedTimes++;const oe=X[d.__cacheKey];oe!==void 0&&(X[d.__cacheKey].usedTimes--,oe.usedTimes===0&&G(r)),d.__cacheKey=ie,d.__webglTexture=X[ie].texture}return C}function Ie(d,r,C){return Math.floor(Math.floor(d/C)/r)}function lt(d,r,C,Q){const ie=d.updateRanges;if(ie.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,C,Q,r.data);else{ie.sort((q,B)=>q.start-B.start);let oe=0;for(let q=1;q<ie.length;q++){const B=ie[oe],z=ie[q],j=B.start+B.count,ee=Ie(z.start,r.width,4),_e=Ie(B.start,r.width,4);z.start<=j+1&&ee===_e&&Ie(z.start+z.count-1,r.width,4)===ee?B.count=Math.max(B.count,z.start+z.count-B.start):(++oe,ie[oe]=z)}ie.length=oe+1;const y=t.getParameter(e.UNPACK_ROW_LENGTH),H=t.getParameter(e.UNPACK_SKIP_PIXELS),p=t.getParameter(e.UNPACK_SKIP_ROWS);t.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let q=0,B=ie.length;q<B;q++){const z=ie[q],j=Math.floor(z.start/4),ee=Math.ceil(z.count/4),_e=j%r.width,Re=Math.floor(j/r.width),Te=ee,ne=1;t.pixelStorei(e.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(e.UNPACK_SKIP_ROWS,Re),t.texSubImage2D(e.TEXTURE_2D,0,_e,Re,Te,ne,C,Q,r.data)}d.clearUpdateRanges(),t.pixelStorei(e.UNPACK_ROW_LENGTH,y),t.pixelStorei(e.UNPACK_SKIP_PIXELS,H),t.pixelStorei(e.UNPACK_SKIP_ROWS,p)}}function nt(d,r,C){let Q=e.TEXTURE_2D;(r.isDataArrayTexture||r.isCompressedArrayTexture)&&(Q=e.TEXTURE_2D_ARRAY),r.isData3DTexture&&(Q=e.TEXTURE_3D);const X=We(d,r),ie=r.source;t.bindTexture(Q,d.__webglTexture,e.TEXTURE0+C);const oe=i.get(ie);if(ie.version!==oe.__version||X===!0){if(t.activeTexture(e.TEXTURE0+C),(typeof ImageBitmap<"u"&&r.image instanceof ImageBitmap)===!1){const ne=Je.getPrimaries(Je.workingColorSpace),we=r.colorSpace===Jt?null:Je.getPrimaries(r.colorSpace),Pe=r.colorSpace===Jt||ne===we?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment);let H=g(r.image,!1,c.maxTextureSize);H=be(r,H);const p=s.convert(r.format,r.colorSpace),q=s.convert(r.type);let B=S(r.internalFormat,p,q,r.normalized,r.colorSpace,r.isVideoTexture);Ye(Q,r);let z;const j=r.mipmaps,ee=r.isVideoTexture!==!0,_e=oe.__version===void 0||X===!0,Re=ie.dataReady,Te=h(r,H);if(r.isDepthTexture)B=o(r.format===Vt,r.type),_e&&(ee?t.texStorage2D(e.TEXTURE_2D,1,B,H.width,H.height):t.texImage2D(e.TEXTURE_2D,0,B,H.width,H.height,0,p,q,null));else if(r.isDataTexture)if(j.length>0){ee&&_e&&t.texStorage2D(e.TEXTURE_2D,Te,B,j[0].width,j[0].height);for(let ne=0,we=j.length;ne<we;ne++)z=j[ne],ee?Re&&t.texSubImage2D(e.TEXTURE_2D,ne,0,0,z.width,z.height,p,q,z.data):t.texImage2D(e.TEXTURE_2D,ne,B,z.width,z.height,0,p,q,z.data);r.generateMipmaps=!1}else ee?(_e&&t.texStorage2D(e.TEXTURE_2D,Te,B,H.width,H.height),Re&&lt(r,H,p,q)):t.texImage2D(e.TEXTURE_2D,0,B,H.width,H.height,0,p,q,H.data);else if(r.isCompressedTexture)if(r.isCompressedArrayTexture){ee&&_e&&t.texStorage3D(e.TEXTURE_2D_ARRAY,Te,B,j[0].width,j[0].height,H.depth);for(let ne=0,we=j.length;ne<we;ne++)if(z=j[ne],r.format!==Bt)if(p!==null)if(ee){if(Re)if(r.layerUpdates.size>0){const Pe=pa(z.width,z.height,r.format,r.type);for(const ge of r.layerUpdates){const Ze=z.data.subarray(ge*Pe/z.data.BYTES_PER_ELEMENT,(ge+1)*Pe/z.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ne,0,0,ge,z.width,z.height,1,p,Ze)}}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ne,0,0,0,z.width,z.height,H.depth,p,z.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ne,B,z.width,z.height,H.depth,0,z.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?Re&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,ne,0,0,0,z.width,z.height,H.depth,p,q,z.data):t.texImage3D(e.TEXTURE_2D_ARRAY,ne,B,z.width,z.height,H.depth,0,p,q,z.data);r.layerUpdates.size>0&&r.clearLayerUpdates()}else{ee&&_e&&t.texStorage2D(e.TEXTURE_2D,Te,B,j[0].width,j[0].height);for(let ne=0,we=j.length;ne<we;ne++)z=j[ne],r.format!==Bt?p!==null?ee?Re&&t.compressedTexSubImage2D(e.TEXTURE_2D,ne,0,0,z.width,z.height,p,z.data):t.compressedTexImage2D(e.TEXTURE_2D,ne,B,z.width,z.height,0,z.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?Re&&t.texSubImage2D(e.TEXTURE_2D,ne,0,0,z.width,z.height,p,q,z.data):t.texImage2D(e.TEXTURE_2D,ne,B,z.width,z.height,0,p,q,z.data)}else if(r.isDataArrayTexture)if(ee){if(_e&&t.texStorage3D(e.TEXTURE_2D_ARRAY,Te,B,H.width,H.height,H.depth),Re)if(r.layerUpdates.size>0){const ne=pa(H.width,H.height,r.format,r.type);for(const we of r.layerUpdates){const Pe=H.data.subarray(we*ne/H.data.BYTES_PER_ELEMENT,(we+1)*ne/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,we,H.width,H.height,1,p,q,Pe)}r.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,p,q,H.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,B,H.width,H.height,H.depth,0,p,q,H.data);else if(r.isData3DTexture)ee?(_e&&t.texStorage3D(e.TEXTURE_3D,Te,B,H.width,H.height,H.depth),Re&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,p,q,H.data)):t.texImage3D(e.TEXTURE_3D,0,B,H.width,H.height,H.depth,0,p,q,H.data);else if(r.isFramebufferTexture){if(_e)if(ee)t.texStorage2D(e.TEXTURE_2D,Te,B,H.width,H.height);else{let ne=H.width,we=H.height;for(let Pe=0;Pe<Te;Pe++)t.texImage2D(e.TEXTURE_2D,Pe,B,ne,we,0,p,q,null),ne>>=1,we>>=1}}else if(r.isHTMLTexture){if("texElementImage2D"in e){const ne=e.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),H.parentNode!==ne){ne.appendChild(H),O.add(r),ne.onpaint=we=>{const Pe=we.changedElements;for(const ge of O)Pe.includes(ge.image)&&(ge.needsUpdate=!0)},ne.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,H);else{const Pe=e.RGBA,ge=e.RGBA,Ze=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,Pe,ge,Ze,H)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(j.length>0){if(ee&&_e){const ne=ft(j[0]);t.texStorage2D(e.TEXTURE_2D,Te,B,ne.width,ne.height)}for(let ne=0,we=j.length;ne<we;ne++)z=j[ne],ee?Re&&t.texSubImage2D(e.TEXTURE_2D,ne,0,0,p,q,z):t.texImage2D(e.TEXTURE_2D,ne,B,p,q,z);r.generateMipmaps=!1}else if(ee){if(_e){const ne=ft(H);t.texStorage2D(e.TEXTURE_2D,Te,B,ne.width,ne.height)}Re&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,p,q,H)}else t.texImage2D(e.TEXTURE_2D,0,B,p,q,H);D(r)&&r.mipmapsAutoUpdate===!0&&v(Q),oe.__version=ie.version,r.onUpdate&&r.onUpdate(r)}d.__version=r.version}function gt(d,r,C){if(r.image.length!==6)return;const Q=We(d,r),X=r.source;t.bindTexture(e.TEXTURE_CUBE_MAP,d.__webglTexture,e.TEXTURE0+C);const ie=i.get(X);if(X.version!==ie.__version||Q===!0){t.activeTexture(e.TEXTURE0+C);const oe=Je.getPrimaries(Je.workingColorSpace),y=r.colorSpace===Jt?null:Je.getPrimaries(r.colorSpace),H=r.colorSpace===Jt||oe===y?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),t.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,H);const p=r.isCompressedTexture||r.image[0].isCompressedTexture,q=r.image[0]&&r.image[0].isDataTexture,B=[];for(let ge=0;ge<6;ge++)!p&&!q?B[ge]=g(r.image[ge],!0,c.maxCubemapSize):B[ge]=q?r.image[ge].image:r.image[ge],B[ge]=be(r,B[ge]);const z=B[0],j=s.convert(r.format,r.colorSpace),ee=s.convert(r.type);let _e=S(r.internalFormat,j,ee,r.normalized,r.colorSpace);const Re=r.isVideoTexture!==!0,Te=ie.__version===void 0||Q===!0,ne=X.dataReady;let we=h(r,z);Ye(e.TEXTURE_CUBE_MAP,r);let Pe;if(r.isDepthTexture){if(_e=o(r.format===Vt,r.type),Te)if(Re)t.texStorage2D(e.TEXTURE_CUBE_MAP,1,_e,z.width,z.height);else for(let ge=0;ge<6;ge++)t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,_e,z.width,z.height,0,j,ee,null)}else if(p){Re&&Te&&t.texStorage2D(e.TEXTURE_CUBE_MAP,we,_e,z.width,z.height);for(let ge=0;ge<6;ge++){Pe=B[ge].mipmaps;for(let Ze=0;Ze<Pe.length;Ze++){const st=Pe[Ze];r.format!==Bt?j!==null?Re?ne&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze,0,0,st.width,st.height,j,st.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze,_e,st.width,st.height,0,st.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze,0,0,st.width,st.height,j,ee,st.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze,_e,st.width,st.height,0,j,ee,st.data)}}}else{if(Pe=r.mipmaps,Re&&Te){Pe.length>0&&we++;const ge=ft(B[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,we,_e,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(q){Re?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,B[ge].width,B[ge].height,j,ee,B[ge].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,_e,B[ge].width,B[ge].height,0,j,ee,B[ge].data);for(let Ze=0;Ze<Pe.length;Ze++){const yt=Pe[Ze].image[ge].image;Re?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze+1,0,0,yt.width,yt.height,j,ee,yt.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze+1,_e,yt.width,yt.height,0,j,ee,yt.data)}}else{Re?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,j,ee,B[ge]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,_e,j,ee,B[ge]);for(let Ze=0;Ze<Pe.length;Ze++){const st=Pe[Ze];Re?ne&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze+1,0,0,j,ee,st.image[ge]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ze+1,_e,j,ee,st.image[ge])}}}D(r)&&r.mipmapsAutoUpdate===!0&&v(e.TEXTURE_CUBE_MAP),ie.__version=X.version,r.onUpdate&&r.onUpdate(r)}d.__version=r.version}function je(d,r,C,Q,X,ie){const oe=s.convert(C.format,C.colorSpace),y=s.convert(C.type),H=S(C.internalFormat,oe,y,C.normalized,C.colorSpace),p=i.get(r),q=i.get(C);if(q.__renderTarget=r,!p.__hasExternalTextures){const B=Math.max(1,r.width>>ie),z=Math.max(1,r.height>>ie);X===e.TEXTURE_3D||X===e.TEXTURE_2D_ARRAY?t.texImage3D(X,ie,H,B,z,r.depth,0,oe,y,null):t.texImage2D(X,ie,H,B,z,0,oe,y,null)}t.bindFramebuffer(e.FRAMEBUFFER,d),Ke(r)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Q,X,q.__webglTexture,0,ce(r)):(X===e.TEXTURE_2D||X>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Q,X,q.__webglTexture,ie),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Dt(d,r,C){if(e.bindRenderbuffer(e.RENDERBUFFER,d),r.depthBuffer){const Q=r.depthTexture,X=Q&&Q.isDepthTexture?Q.type:null,ie=o(r.stencilBuffer,X),oe=r.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ke(r)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ce(r),ie,r.width,r.height):C?e.renderbufferStorageMultisample(e.RENDERBUFFER,ce(r),ie,r.width,r.height):e.renderbufferStorage(e.RENDERBUFFER,ie,r.width,r.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,oe,e.RENDERBUFFER,d)}else{const Q=r.textures;for(let X=0;X<Q.length;X++){const ie=Q[X],oe=s.convert(ie.format,ie.colorSpace),y=s.convert(ie.type),H=S(ie.internalFormat,oe,y,ie.normalized,ie.colorSpace);Ke(r)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ce(r),H,r.width,r.height):C?e.renderbufferStorageMultisample(e.RENDERBUFFER,ce(r),H,r.width,r.height):e.renderbufferStorage(e.RENDERBUFFER,H,r.width,r.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function at(d,r,C){const Q=r.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,d),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=i.get(r.depthTexture);X.__renderTarget=r;const ie=Q?r.depthTexture.image[0]:r.depthTexture.image;(!X.__webglTexture||ie.width!==r.width||ie.height!==r.height)&&(ie.width=r.width,ie.height=r.height,r.depthTexture.needsUpdate=!0),Q?he(r.depthTexture,0):ue(r.depthTexture,0);const oe=X.__webglTexture,y=ce(r),H=Q?e.TEXTURE_CUBE_MAP_POSITIVE_X+C:e.TEXTURE_2D,p=r.depthTexture.format===Vt?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(r.depthTexture.format===rn)Ke(r)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,H,oe,0,y):e.framebufferTexture2D(e.FRAMEBUFFER,p,H,oe,0);else if(r.depthTexture.format===Vt)Ke(r)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,H,oe,0,y):e.framebufferTexture2D(e.FRAMEBUFFER,p,H,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Et(d){const r=i.get(d),C=d.isWebGLCubeRenderTarget===!0;if(r.__boundDepthTexture!==d.depthTexture){const Q=d.depthTexture;if(r.__depthDisposeCallback&&r.__depthDisposeCallback(),Q){const X=()=>{delete r.__boundDepthTexture,delete r.__depthDisposeCallback,Q.removeEventListener("dispose",X)};Q.addEventListener("dispose",X),r.__depthDisposeCallback=X}r.__boundDepthTexture=Q}if(d.depthTexture&&!r.__autoAllocateDepthBuffer)if(C)for(let Q=0;Q<6;Q++)at(r.__webglFramebuffer[Q],d,Q);else{const Q=d.texture.mipmaps;Q&&Q.length>0?at(r.__webglFramebuffer[0],d,0):at(r.__webglFramebuffer,d,0)}else if(C){r.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[Q]),r.__webglDepthbuffer[Q]===void 0)r.__webglDepthbuffer[Q]=e.createRenderbuffer(),Dt(r.__webglDepthbuffer[Q],d,!1);else{const X=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=r.__webglDepthbuffer[Q];e.bindRenderbuffer(e.RENDERBUFFER,ie),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,ie)}}else{const Q=d.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer===void 0)r.__webglDepthbuffer=e.createRenderbuffer(),Dt(r.__webglDepthbuffer,d,!1);else{const X=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=r.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ie),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,ie)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Mt(d,r,C){const Q=i.get(d);r!==void 0&&je(Q.__webglFramebuffer,d,d.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),C!==void 0&&Et(d)}function xt(d){const r=d.texture,C=i.get(d),Q=i.get(r);d.addEventListener("dispose",k),Y(d);const X=d.textures,ie=d.isWebGLCubeRenderTarget===!0,oe=X.length>1;if(oe||(Q.__webglTexture===void 0&&(Q.__webglTexture=e.createTexture()),Q.__version=r.version,u.memory.textures++),ie){C.__webglFramebuffer=[];for(let y=0;y<6;y++)if(r.mipmaps&&r.mipmaps.length>0){C.__webglFramebuffer[y]=[];for(let H=0;H<r.mipmaps.length;H++)C.__webglFramebuffer[y][H]=e.createFramebuffer()}else C.__webglFramebuffer[y]=e.createFramebuffer()}else{if(r.mipmaps&&r.mipmaps.length>0){C.__webglFramebuffer=[];for(let y=0;y<r.mipmaps.length;y++)C.__webglFramebuffer[y]=e.createFramebuffer()}else C.__webglFramebuffer=e.createFramebuffer();if(oe)for(let y=0,H=X.length;y<H;y++){const p=i.get(X[y]);p.__webglTexture===void 0&&(p.__webglTexture=e.createTexture(),u.memory.textures++)}if(d.samples>0&&Ke(d)===!1){C.__webglMultisampledFramebuffer=e.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let y=0;y<X.length;y++){const H=X[y];C.__webglColorRenderbuffer[y]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,C.__webglColorRenderbuffer[y]);const p=s.convert(H.format,H.colorSpace),q=s.convert(H.type),B=S(H.internalFormat,p,q,H.normalized,H.colorSpace,d.isXRRenderTarget===!0),z=ce(d);e.renderbufferStorageMultisample(e.RENDERBUFFER,z,B,d.width,d.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+y,e.RENDERBUFFER,C.__webglColorRenderbuffer[y])}e.bindRenderbuffer(e.RENDERBUFFER,null),d.depthBuffer&&(C.__webglDepthRenderbuffer=e.createRenderbuffer(),Dt(C.__webglDepthRenderbuffer,d,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ie){t.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),Ye(e.TEXTURE_CUBE_MAP,r);for(let y=0;y<6;y++)if(r.mipmaps&&r.mipmaps.length>0)for(let H=0;H<r.mipmaps.length;H++)je(C.__webglFramebuffer[y][H],d,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+y,H);else je(C.__webglFramebuffer[y],d,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+y,0);D(r)?v(e.TEXTURE_CUBE_MAP):r.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,r.mipmaps.length-1),t.unbindTexture()}else if(oe){for(let y=0,H=X.length;y<H;y++){const p=X[y],q=i.get(p);let B=e.TEXTURE_2D;(d.isWebGL3DRenderTarget||d.isWebGLArrayRenderTarget)&&(B=d.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(B,q.__webglTexture),Ye(B,p),je(C.__webglFramebuffer,d,p,e.COLOR_ATTACHMENT0+y,B,0),D(p)&&v(B)}t.unbindTexture()}else{let y=e.TEXTURE_2D;if((d.isWebGL3DRenderTarget||d.isWebGLArrayRenderTarget)&&(y=d.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(y,Q.__webglTexture),Ye(y,r),r.mipmaps&&r.mipmaps.length>0)for(let H=0;H<r.mipmaps.length;H++)je(C.__webglFramebuffer[H],d,r,e.COLOR_ATTACHMENT0,y,H);else je(C.__webglFramebuffer,d,r,e.COLOR_ATTACHMENT0,y,0);D(r)?v(y):r.mipmaps.length>0&&e.texParameteri(y,e.TEXTURE_MAX_LEVEL,r.mipmaps.length-1),t.unbindTexture()}d.depthBuffer&&Et(d)}function M(d){const r=d.textures;for(let C=0,Q=r.length;C<Q;C++){const X=r[C];if(D(X)&&X.mipmapsAutoUpdate===!0){const ie=P(d),oe=i.get(X).__webglTexture;t.bindTexture(ie,oe),v(ie),t.unbindTexture()}}}const Tt=[],Xe=[];function ot(d){if(d.samples>0){if(Ke(d)===!1){const r=d.textures,C=d.width,Q=d.height;let X=e.COLOR_BUFFER_BIT;const ie=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,oe=i.get(d),y=r.length>1;if(y)for(let p=0;p<r.length;p++)t.bindFramebuffer(e.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+p,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,oe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+p,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const H=d.texture.mipmaps;H&&H.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let p=0;p<r.length;p++){if(d.resolveDepthBuffer&&(d.depthBuffer&&(X|=e.DEPTH_BUFFER_BIT),d.stencilBuffer&&d.resolveStencilBuffer&&(X|=e.STENCIL_BUFFER_BIT)),y){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,oe.__webglColorRenderbuffer[p]);const q=i.get(r[p]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,q,0)}e.blitFramebuffer(0,0,C,Q,0,0,C,Q,X,e.NEAREST),N===!0&&(Tt.length=0,Xe.length=0,Tt.push(e.COLOR_ATTACHMENT0+p),d.depthBuffer&&d.storeMultisampledDepthBuffer===!1&&(Tt.push(ie),Xe.push(ie),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),y)for(let p=0;p<r.length;p++){t.bindFramebuffer(e.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+p,e.RENDERBUFFER,oe.__webglColorRenderbuffer[p]);const q=i.get(r[p]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,oe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+p,e.TEXTURE_2D,q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(d.depthBuffer&&d.storeMultisampledDepthBuffer===!1&&N){const r=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[r])}}}function ce(d){return Math.min(c.maxSamples,d.samples)}function Ke(d){const r=i.get(d);return d.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&r.__useRenderToTexture!==!1}function xe(d){const r=u.render.frame;W.get(d)!==r&&(W.set(d,r),d.update())}function be(d,r){const C=d.colorSpace,Q=d.format,X=d.type;return d.isCompressedTexture===!0||d.isVideoTexture===!0||C!==Xn&&C!==Jt&&(Je.getTransfer(C)===ze?(Q!==Bt||X!==bt)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",C)),r}function ft(d){return typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement?(b.width=d.naturalWidth||d.width,b.height=d.naturalHeight||d.height):typeof VideoFrame<"u"&&d instanceof VideoFrame?(b.width=d.displayWidth,b.height=d.displayHeight):(b.width=d.width,b.height=d.height),b}this.allocateTextureUnit=Ne,this.resetTextureUnits=te,this.getTextureUnits=re,this.setTextureUnits=Me,this.setTexture2D=ue,this.setTexture2DArray=Se,this.setTexture3D=Ae,this.setTextureCube=he,this.rebindTextures=Mt,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=M,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=je,this.useMultisampledRTT=Ke,this.dispose=J}function ao(e,n){function t(i,c=Jt){let s;const u=Je.getTransfer(c);if(i===bt)return e.UNSIGNED_BYTE;if(i===mi)return e.UNSIGNED_SHORT_4_4_4_4;if(i===_i)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ha)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===ma)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===_a)return e.BYTE;if(i===ga)return e.SHORT;if(i===un)return e.UNSIGNED_SHORT;if(i===kn)return e.INT;if(i===kt)return e.UNSIGNED_INT;if(i===Ot)return e.FLOAT;if(i===wt)return e.HALF_FLOAT;if(i===va)return e.ALPHA;if(i===Sa)return e.RGB;if(i===Bt)return e.RGBA;if(i===rn)return e.DEPTH_COMPONENT;if(i===Vt)return e.DEPTH_STENCIL;if(i===Ea)return e.RED;if(i===gi)return e.RED_INTEGER;if(i===Qt)return e.RG;if(i===vi)return e.RG_INTEGER;if(i===Si)return e.RGBA_INTEGER;if(i===bn||i===Pn||i===Ln||i===Dn)if(u===ze)if(s=n.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===bn)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ln)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=n.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===bn)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pn)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ln)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dn)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ei||i===Mi||i===xi||i===Ti)if(s=n.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ei)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Mi)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xi)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ti)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ai||i===Ri||i===Ci||i===bi||i===Pi||i===Tn||i===Li)if(s=n.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ai||i===Ri)return u===ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ci)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===bi)return s.COMPRESSED_R11_EAC;if(i===Pi)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Tn)return s.COMPRESSED_RG11_EAC;if(i===Li)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Di||i===wi||i===Ui||i===Ni||i===Ii||i===yi||i===Fi||i===Oi||i===Bi||i===Gi||i===Hi||i===Vi||i===Wi||i===ki)if(s=n.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Di)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ui)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ni)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ii)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Oi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Bi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Vi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wi)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ki)return u===ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zi||i===Xi||i===Ki)if(s=n.get("EXT_texture_compression_bptc"),s!==null){if(i===zi)return u===ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xi)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ki)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qi||i===Yi||i===An||i===Zi)if(s=n.get("EXT_texture_compression_rgtc"),s!==null){if(i===qi)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Yi)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===An)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zi)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===$t?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const id=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ad{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new $i(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new qt({vertexShader:id,fragmentShader:rd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class od extends Ma{constructor(n,t){super();const i=this;let c=null,s=1,u=null,m="local-floor",N=1,b=null,W=null,O=null,x=null,E=null,L=null;const F=typeof XRWebGLBinding<"u",f=new ad,l={},g=t.getContextAttributes();let D=null,v=null;const P=[],S=[],o=new ht;let h=null,Y=null;const w=new wn;w.viewport=new mt;const I=new wn;I.viewport=new mt;const k=[w,I],$=new xa;let T=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let ue=P[V];return ue===void 0&&(ue=new Un,P[V]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(V){let ue=P[V];return ue===void 0&&(ue=new Un,P[V]=ue),ue.getGripSpace()},this.getHand=function(V){let ue=P[V];return ue===void 0&&(ue=new Un,P[V]=ue),ue.getHandSpace()};function Z(V){const ue=S.indexOf(V.inputSource);if(ue===-1)return;const Se=P[ue];Se!==void 0&&(Se.update(V.inputSource,V.frame,b||u),Se.dispatchEvent({type:V.type,data:V.inputSource}))}function G(){c.removeEventListener("select",Z),c.removeEventListener("selectstart",Z),c.removeEventListener("selectend",Z),c.removeEventListener("squeeze",Z),c.removeEventListener("squeezestart",Z),c.removeEventListener("squeezeend",Z),c.removeEventListener("end",G),c.removeEventListener("inputsourceschange",le);for(let V=0;V<P.length;V++){const ue=S[V];ue!==null&&(S[V]=null,P[V].disconnect(ue))}T=null,J=null,f.reset();for(const V in l)delete l[V];if(n.setRenderTarget(D),E=null,x=null,O=null,c=null,v=null,Ne.stop(),i.isPresenting=!1,n.setPixelRatio(h),n.setSize(o.width,o.height,!1),Y!==null){const V=Y.camera;V.fov=Y.fov,V.zoom=Y.zoom,V.updateProjectionMatrix(),Y=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){m=V,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return b||u},this.setReferenceSpace=function(V){b=V},this.getBaseLayer=function(){return x!==null?x:E},this.getBinding=function(){return O===null&&F&&(O=new XRWebGLBinding(c,t)),O},this.getFrame=function(){return L},this.getSession=function(){return c},this.setSession=async function(V){if(c=V,c!==null){if(D=n.getRenderTarget(),c.addEventListener("select",Z),c.addEventListener("selectstart",Z),c.addEventListener("selectend",Z),c.addEventListener("squeeze",Z),c.addEventListener("squeezestart",Z),c.addEventListener("squeezeend",Z),c.addEventListener("end",G),c.addEventListener("inputsourceschange",le),g.xrCompatible!==!0&&await t.makeXRCompatible(),h=n.getPixelRatio(),n.getSize(o),F&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Ae=null,he=null;g.depth&&(he=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=g.stencil?Vt:rn,Ae=g.stencil?$t:kt);const Ue={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};O=this.getBinding(),x=O.createProjectionLayer(Ue),c.updateRenderState({layers:[x]}),n.setPixelRatio(1),n.setSize(x.textureWidth,x.textureHeight,!1),v=new Pt(x.textureWidth,x.textureHeight,{format:Bt,type:bt,depthTexture:new tn(x.textureWidth,x.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:g.stencil,colorSpace:n.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}else{const Se={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};E=new XRWebGLLayer(c,t,Se),c.updateRenderState({baseLayer:E}),n.setPixelRatio(1),n.setSize(E.framebufferWidth,E.framebufferHeight,!1),v=new Pt(E.framebufferWidth,E.framebufferHeight,{format:Bt,type:bt,colorSpace:n.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1,storeMultisampledDepthBuffer:E.ignoreDepthValues===!1,storeMultisampledStencilBuffer:E.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(N),b=null,u=await c.requestReferenceSpace(m),Ne.setContext(c),Ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(c!==null)return c.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function le(V){for(let ue=0;ue<V.removed.length;ue++){const Se=V.removed[ue],Ae=S.indexOf(Se);Ae>=0&&(S[Ae]=null,P[Ae].disconnect(Se))}for(let ue=0;ue<V.added.length;ue++){const Se=V.added[ue];let Ae=S.indexOf(Se);if(Ae===-1){for(let Ue=0;Ue<P.length;Ue++)if(Ue>=S.length){S.push(Se),Ae=Ue;break}else if(S[Ue]===null){S[Ue]=Se,Ae=Ue;break}if(Ae===-1)break}const he=P[Ae];he&&he.connect(Se)}}function K(V,ue){ue===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(ue.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(c===null)return;let ue=V.near,Se=V.far;f.texture!==null&&(f.depthNear>0&&(ue=f.depthNear),f.depthFar>0&&(Se=f.depthFar)),$.near=I.near=w.near=ue,$.far=I.far=w.far=Se,(T!==$.near||J!==$.far)&&(c.updateRenderState({depthNear:$.near,depthFar:$.far}),T=$.near,J=$.far),$.layers.mask=V.layers.mask|6,w.layers.mask=$.layers.mask&-5,I.layers.mask=$.layers.mask&-3;const Ae=V.parent,he=$.cameras;K($,Ae);for(let Ue=0;Ue<he.length;Ue++)K(he[Ue],Ae);$.projectionMatrix.copy(w.projectionMatrix),$.projectionMatrixInverse.copy(w.projectionMatrixInverse),Y===null&&V.isPerspectiveCamera&&(Y={camera:V,fov:V.fov,zoom:V.zoom}),te(V,$,Ae)};function te(V,ue,Se){Se===null?V.matrix.copy(ue.matrixWorld):(V.matrix.copy(Se.matrixWorld),V.matrix.invert(),V.matrix.multiply(ue.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(ue.projectionMatrix),V.projectionMatrixInverse.copy(ue.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=vo*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(x===null&&E===null))return N},this.setFoveation=function(V){N=V,x!==null&&(x.fixedFoveation=V),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=V)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh($)},this.getCameraTexture=function(V){return l[V]};let re=null;function Me(V,ue){if(W=ue.getViewerPose(b||u),L=ue,W!==null){const Se=W.views;E!==null&&(n.setRenderTargetFramebuffer(v,E.framebuffer),n.setRenderTarget(v));let Ae=!1;Se.length!==$.cameras.length&&($.cameras.length=0,Ae=!0);for(let Ce=0;Ce<Se.length;Ce++){const Ye=Se[Ce];let We=null;if(E!==null)We=E.getViewport(Ye);else{const lt=O.getViewSubImage(x,Ye);We=lt.viewport,Ce===0&&(n.setRenderTargetTextures(v,lt.colorTexture,lt.depthStencilTexture),n.setRenderTarget(v))}let Ie=k[Ce];Ie===void 0&&(Ie=new wn,Ie.layers.enable(Ce),Ie.viewport=new mt,k[Ce]=Ie),Ie.matrix.fromArray(Ye.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(Ye.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(We.x,We.y,We.width,We.height),Ce===0&&($.matrix.copy(Ie.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),Ae===!0&&$.cameras.push(Ie)}const he=c.enabledFeatures;if(he&&he.includes("depth-sensing")&&c.depthUsage=="gpu-optimized"&&F){O=i.getBinding();const Ce=O.getDepthInformation(Se[0]);Ce&&Ce.isValid&&Ce.texture&&f.init(Ce,c.renderState)}if(he&&he.includes("camera-access")&&F){n.state.unbindTexture(),O=i.getBinding();for(let Ce=0;Ce<Se.length;Ce++){const Ye=Se[Ce].camera;if(Ye){let We=l[Ye];We||(We=new $i,l[Ye]=We);const Ie=O.getCameraImage(Ye);We.sourceTexture=Ie}}}}for(let Se=0;Se<P.length;Se++){const Ae=S[Se],he=P[Se];Ae!==null&&he!==void 0&&he.update(Ae,ue,b||u)}re&&re(V,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),L=null}const Ne=new Pa;Ne.setAnimationLoop(Me),this.setAnimationLoop=function(V){re=V},this.dispose=function(){}}}const sd=new Yt,oo=new Fe;oo.set(-1,0,0,0,1,0,0,0,1);function ld(e,n){function t(f,l){f.matrixAutoUpdate===!0&&f.updateMatrix(),l.value.copy(f.matrix)}function i(f,l){l.color.getRGB(f.fogColor.value,dr(e)),l.isFog?(f.fogNear.value=l.near,f.fogFar.value=l.far):l.isFogExp2&&(f.fogDensity.value=l.density)}function c(f,l,g,D,v){l.isNodeMaterial?l.uniformsNeedUpdate=!1:l.isMeshBasicMaterial?s(f,l):l.isMeshLambertMaterial?(s(f,l),l.envMap&&(f.envMapIntensity.value=l.envMapIntensity)):l.isMeshToonMaterial?(s(f,l),O(f,l)):l.isMeshPhongMaterial?(s(f,l),W(f,l),l.envMap&&(f.envMapIntensity.value=l.envMapIntensity)):l.isMeshStandardMaterial?(s(f,l),x(f,l),l.isMeshPhysicalMaterial&&E(f,l,v)):l.isMeshMatcapMaterial?(s(f,l),L(f,l)):l.isMeshDepthMaterial?s(f,l):l.isMeshDistanceMaterial?(s(f,l),F(f,l)):l.isMeshNormalMaterial?s(f,l):l.isLineBasicMaterial?(u(f,l),l.isLineDashedMaterial&&m(f,l)):l.isPointsMaterial?N(f,l,g,D):l.isSpriteMaterial?b(f,l):l.isShadowMaterial?(f.color.value.copy(l.color),f.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function s(f,l){f.opacity.value=l.opacity,l.color&&f.diffuse.value.copy(l.color),l.emissive&&f.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(f.map.value=l.map,t(l.map,f.mapTransform)),l.alphaMap&&(f.alphaMap.value=l.alphaMap,t(l.alphaMap,f.alphaMapTransform)),l.bumpMap&&(f.bumpMap.value=l.bumpMap,t(l.bumpMap,f.bumpMapTransform),f.bumpScale.value=l.bumpScale,l.side===St&&(f.bumpScale.value*=-1)),l.normalMap&&(f.normalMap.value=l.normalMap,t(l.normalMap,f.normalMapTransform),f.normalScale.value.copy(l.normalScale),l.side===St&&f.normalScale.value.negate()),l.displacementMap&&(f.displacementMap.value=l.displacementMap,t(l.displacementMap,f.displacementMapTransform),f.displacementScale.value=l.displacementScale,f.displacementBias.value=l.displacementBias),l.emissiveMap&&(f.emissiveMap.value=l.emissiveMap,t(l.emissiveMap,f.emissiveMapTransform)),l.specularMap&&(f.specularMap.value=l.specularMap,t(l.specularMap,f.specularMapTransform)),l.alphaTest>0&&(f.alphaTest.value=l.alphaTest);const g=n.get(l),D=g.envMap,v=g.envMapRotation;D&&(f.envMap.value=D,f.envMapRotation.value.setFromMatrix4(sd.makeRotationFromEuler(v)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(oo),f.reflectivity.value=l.reflectivity,f.ior.value=l.ior,f.refractionRatio.value=l.refractionRatio),l.lightMap&&(f.lightMap.value=l.lightMap,f.lightMapIntensity.value=l.lightMapIntensity,t(l.lightMap,f.lightMapTransform)),l.aoMap&&(f.aoMap.value=l.aoMap,f.aoMapIntensity.value=l.aoMapIntensity,t(l.aoMap,f.aoMapTransform))}function u(f,l){f.diffuse.value.copy(l.color),f.opacity.value=l.opacity,l.map&&(f.map.value=l.map,t(l.map,f.mapTransform))}function m(f,l){f.dashSize.value=l.dashSize,f.totalSize.value=l.dashSize+l.gapSize,f.scale.value=l.scale}function N(f,l,g,D){f.diffuse.value.copy(l.color),f.opacity.value=l.opacity,f.size.value=l.size*g,f.scale.value=D*.5,l.map&&(f.map.value=l.map,t(l.map,f.uvTransform)),l.alphaMap&&(f.alphaMap.value=l.alphaMap,t(l.alphaMap,f.alphaMapTransform)),l.alphaTest>0&&(f.alphaTest.value=l.alphaTest)}function b(f,l){f.diffuse.value.copy(l.color),f.opacity.value=l.opacity,f.rotation.value=l.rotation,l.map&&(f.map.value=l.map,t(l.map,f.mapTransform)),l.alphaMap&&(f.alphaMap.value=l.alphaMap,t(l.alphaMap,f.alphaMapTransform)),l.alphaTest>0&&(f.alphaTest.value=l.alphaTest)}function W(f,l){f.specular.value.copy(l.specular),f.shininess.value=Math.max(l.shininess,1e-4)}function O(f,l){l.gradientMap&&(f.gradientMap.value=l.gradientMap)}function x(f,l){f.metalness.value=l.metalness,l.metalnessMap&&(f.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,f.metalnessMapTransform)),f.roughness.value=l.roughness,l.roughnessMap&&(f.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,f.roughnessMapTransform)),l.envMap&&(f.envMapIntensity.value=l.envMapIntensity)}function E(f,l,g){f.ior.value=l.ior,l.diffuseRoughness>0&&(f.diffuseRoughness.value=l.diffuseRoughness,l.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=l.diffuseRoughnessMap,t(l.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),l.sheen>0&&(f.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),f.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(f.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,f.sheenColorMapTransform)),l.sheenRoughnessMap&&(f.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,f.sheenRoughnessMapTransform))),l.clearcoat>0&&(f.clearcoat.value=l.clearcoat,f.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(f.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,f.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(f.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===St&&f.clearcoatNormalScale.value.negate())),l.dispersion>0&&(f.dispersion.value=l.dispersion),l.retroreflectivity>0&&(f.retroreflectivity.value=l.retroreflectivity),l.iridescence>0&&(f.iridescence.value=l.iridescence,f.iridescenceIOR.value=l.iridescenceIOR,f.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(f.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,f.iridescenceMapTransform)),l.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),l.transmission>0&&(f.transmission.value=l.transmission,f.transmissionSamplerMap.value=g.texture,f.transmissionSamplerSize.value.set(g.width,g.height),l.transmissionMap&&(f.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,f.transmissionMapTransform)),f.thickness.value=l.thickness,l.thicknessMap&&(f.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=l.attenuationDistance,f.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(f.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(f.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=l.specularIntensity,f.specularColor.value.copy(l.specularColor),l.specularColorMap&&(f.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,f.specularColorMapTransform)),l.specularIntensityMap&&(f.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,f.specularIntensityMapTransform))}function L(f,l){l.matcap&&(f.matcap.value=l.matcap)}function F(f,l){const g=n.get(l).light;f.referencePosition.value.setFromMatrixPosition(g.matrixWorld),f.nearDistance.value=g.shadow.camera.near,f.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:c}}function cd(e,n,t,i){let c={},s={};function u(g,D){const v=D.program;i.uniformBlockBinding(g,v,c[g.id])}function m(g,D){let v=c[g.id];v===void 0&&(L(g),v=N(g),c[g.id]=v,g.addEventListener("dispose",f));const P=D.program;i.updateUBOMapping(g,P);const S=n.render.frame;s[g.id]!==S&&(b(g),s[g.id]=S)}function N(g){const D=e.createBuffer(),v=g.__size,P=g.usage;return e.bindBuffer(e.UNIFORM_BUFFER,D),e.bufferData(e.UNIFORM_BUFFER,v,P),e.bindBuffer(e.UNIFORM_BUFFER,null),D}function b(g){const D=c[g.id],v=g.uniforms,P=g.__cache;e.bindBuffer(e.UNIFORM_BUFFER,D);for(let S=0,o=v.length;S<o;S++){const h=v[S];if(Array.isArray(h))for(let Y=0,w=h.length;Y<w;Y++)W(h[Y],S,Y,P);else W(h,S,0,P)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function W(g,D,v,P){if(x(g,D,v,P)===!0){const S=g.__offset,o=g.value;if(Array.isArray(o)){let h=0;for(let Y=0;Y<o.length;Y++){const w=o[Y],I=F(w,!0);O(w,g.__data,h),h+=I.storage/Float32Array.BYTES_PER_ELEMENT}}else O(o,g.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,S,g.__data)}}function O(g,D,v){typeof g=="number"||typeof g=="boolean"?D[v]=g:g.isMatrix3?(D[v]=g.elements[0],D[v+1]=g.elements[1],D[v+2]=g.elements[2],D[v+3]=0,D[v+4]=g.elements[3],D[v+5]=g.elements[4],D[v+6]=g.elements[5],D[v+7]=0,D[v+8]=g.elements[6],D[v+9]=g.elements[7],D[v+10]=g.elements[8],D[v+11]=0):ArrayBuffer.isView(g)?D.set(g.subarray(0,D.length-v),v):g.toArray(D,v)}function x(g,D,v,P){const S=g.value,o=D+"_"+v;if(Array.isArray(S)){P[o]===void 0&&(P[o]=[]);const h=P[o];let Y=!1;for(let w=0;w<S.length;w++)E(S[w],h,w)===!0&&(Y=!0);return Y}return E(S,P,o)}function E(g,D,v){if(D[v]===void 0)return typeof g=="number"||typeof g=="boolean"?D[v]=g:ArrayBuffer.isView(g)?D[v]=g.slice():D[v]=g.clone(),!0;{const P=D[v];if(typeof g=="number"||typeof g=="boolean"){if(P!==g)return D[v]=g,!0}else{if(ArrayBuffer.isView(g))return!0;if(P.equals(g)===!1)return P.copy(g),!0}}return!1}function L(g){const D=g.uniforms;let v=0;const P=16;for(let o=0,h=D.length;o<h;o++){const Y=Array.isArray(D[o])?D[o]:[D[o]];for(let w=0,I=Y.length;w<I;w++){const k=Y[w],$=Array.isArray(k.value)?k.value:[k.value],T=Array.isArray(D[o])||Array.isArray(k.value);let J=v;for(let G=0,le=$.length;G<le;G++){const K=$[G],te=F(K,T),re=v%P,Me=re%te.boundary,Ne=re+Me;v+=Me,Ne!==0&&P-Ne<te.storage&&(v+=P-Ne),G===0&&(J=v),v+=te.storage}const Z=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new Z((v-J)/Float32Array.BYTES_PER_ELEMENT),k.__offset=J}}const S=v%P;return S>0&&(v+=P-S),g.__size=v,g.__cache={},this}function F(g,D){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=16,v.storage=48):g.isMatrix4?(v.boundary=16,v.storage=64):g.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(g)?(v.boundary=16,v.storage=g.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",g),D===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function f(g){const D=g.target;D.removeEventListener("dispose",f),e.deleteBuffer(c[D.id]),delete c[D.id],delete s[D.id]}function l(){for(const g in c)e.deleteBuffer(c[g]);c={},s={}}return{bind:u,update:m,dispose:l}}const fd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let It=null;function dd(){return It===null&&(It=new Ta(fd,16,16,Qt,wt),It.name="DFG_LUT",It.minFilter=At,It.magFilter=At,It.wrapS=Rn,It.wrapT=Rn,It.generateMipmaps=!1,It.needsUpdate=!0),It}class ud{constructor(n={}){const{canvas:t=Aa(),context:i=null,depth:c=!0,stencil:s=!1,alpha:u=!1,antialias:m=!1,premultipliedAlpha:N=!0,preserveDrawingBuffer:b=!1,powerPreference:W="default",failIfMajorPerformanceCaveat:O=!1,reversedDepthBuffer:x=!1,outputBufferType:E=bt}=n;this.isWebGLRenderer=!0;let L;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");L=i.getContextAttributes().alpha}else L=u;const F=E,f=new Set([Si,vi,gi]),l=new Set([bt,kt,un,$t,mi,_i]),g=new Uint32Array(4),D=new Int32Array(4),v=new Ge;let P=null,S=null;const o=[],h=[];let Y=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ut,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let I=!1,k=null,$=null,T=null,J=null;this._outputColorSpace=Ra;let Z=0,G=0,le=null,K=-1,te=null;const re=new mt,Me=new mt;let Ne=null;const V=new $e(0);let ue=0,Se=t.width,Ae=t.height,he=1,Ue=null,_t=null;const Ce=new mt(0,0,Se,Ae),Ye=new mt(0,0,Se,Ae);let We=!1;const Ie=new ci,lt=new ba;let nt=!1,gt=!1;const je=new Yt,Dt=new Ge,at=new mt,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function xt(){return le===null?he:1}let M=i;function Tt(a,_){return t.getContext(a,_)}let Xe,ot,ce,Ke,xe,be,ft,d,r,C,Q,X,ie,oe,y,H,p,q,B,z,j,ee,_e;try{const a={alpha:!0,depth:c,stencil:s,antialias:m,premultipliedAlpha:N,preserveDrawingBuffer:b,powerPreference:W,failIfMajorPerformanceCaveat:O};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),M===null){const _="webgl2";if(M=Tt(_,a),M===null)throw Tt(_)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Re()}catch(a){throw t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),Qe("WebGLRenderer: "+a.message),a}function Re(){Xe=new mc(M),Xe.init(),j=new ao(M,Xe),ot=new rc(M,Xe,n,j),ce=new td(M,Xe),ot.reversedDepthBuffer&&x&&ce.buffers.depth.setReversed(!0),$=M.createFramebuffer(),T=M.createFramebuffer(),J=M.createFramebuffer(),Ke=new vc(M),xe=new Vf,be=new nd(M,Xe,ce,xe,ot,j,Ke),ft=new hc(w),d=new Eo(M),ee=new nc(M,d),r=new _c(M,d,Ke,ee),C=new Ec(M,r,d,ee,Ke),q=new Sc(M,ot,be),y=new ac(xe),Q=new Hf(w,ft,Xe,ot,ee,y),X=new ld(w,xe),ie=new kf,oe=new Zf(Xe),p=new tc(w,ft,ce,C,L,N),H=new ed(w,C,ot),_e=new cd(M,Ke,ot,ce),B=new ic(M,Xe,Ke),z=new gc(M,Xe,Ke),Ke.programs=Q.programs,w.capabilities=ot,w.extensions=Xe,w.properties=xe,w.renderLists=ie,w.shadowMap=H,w.state=ce,w.info=Ke}F!==bt&&(Y=new xc(F,t.width,t.height,m,c,s));const Te=new od(w,M);this.xr=Te,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){const a=Xe.get("WEBGL_lose_context");a&&a.loseContext()},this.forceContextRestore=function(){const a=Xe.get("WEBGL_lose_context");a&&a.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(a){a!==void 0&&(he=a,this.setSize(Se,Ae,!1))},this.getSize=function(a){return a.set(Se,Ae)},this.setSize=function(a,_,U=!0){if(Te.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=a,Ae=_,t.width=Math.floor(a*he),t.height=Math.floor(_*he),U===!0&&(t.style.width=a+"px",t.style.height=_+"px"),Y!==null&&Y.setSize(t.width,t.height),this.setViewport(0,0,a,_)},this.getDrawingBufferSize=function(a){return a.set(Se*he,Ae*he).floor()},this.setDrawingBufferSize=function(a,_,U){Se=a,Ae=_,he=U,t.width=Math.floor(a*U),t.height=Math.floor(_*U),this.setViewport(0,0,a,_)},this.setEffects=function(a){if(F===bt){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(a){for(let _=0;_<a.length;_++)if(a[_].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}Y.setEffects(a||[])},this.getCurrentViewport=function(a){return a.copy(re)},this.getViewport=function(a){return a.copy(Ce)},this.setViewport=function(a,_,U,A){a.isVector4?Ce.set(a.x,a.y,a.z,a.w):Ce.set(a,_,U,A),ce.viewport(re.copy(Ce).multiplyScalar(xt()).round())},this.getScissor=function(a){return a.copy(Ye)},this.setScissor=function(a,_,U,A){a.isVector4?Ye.set(a.x,a.y,a.z,a.w):Ye.set(a,_,U,A),ce.scissor(Me.copy(Ye).multiplyScalar(xt()).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(a){ce.setScissorTest(We=a)},this.setOpaqueSort=function(a){Ue=a},this.setTransparentSort=function(a){_t=a},this.getClearColor=function(a){return a.copy(p.getClearColor())},this.setClearColor=function(){p.setClearColor(...arguments)},this.getClearAlpha=function(){return p.getClearAlpha()},this.setClearAlpha=function(){p.setClearAlpha(...arguments)},this.clear=function(a=!0,_=!0,U=!0){let A=0;if(a){let R=!1;if(le!==null){const se=le.texture.format;R=f.has(se)}if(R){const se=le.texture.type,me=l.has(se),ae=p.getClearColor(),de=p.getClearAlpha(),Ee=ae.r,Le=ae.g,ye=ae.b;me?(g[0]=Ee,g[1]=Le,g[2]=ye,g[3]=de,M.clearBufferuiv(M.COLOR,0,g)):(D[0]=Ee,D[1]=Le,D[2]=ye,D[3]=de,M.clearBufferiv(M.COLOR,0,D))}else A|=M.COLOR_BUFFER_BIT}_&&(A|=M.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),U&&(A|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A!==0&&M.clear(A)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(a){a.setRenderer(this),k=a},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),p.dispose(),ie.dispose(),oe.dispose(),be.dispose(),xe.dispose(),ft.dispose(),C.dispose(),r.dispose(),ee.dispose(),_e.dispose(),Q.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",nr),Te.removeEventListener("sessionend",ir),zt.stop()};function ne(a){a.preventDefault(),Qi("WebGLRenderer: Context Lost."),I=!0}function we(){Qi("WebGLRenderer: Context Restored."),I=!1;const a=Ke.autoReset,_=H.enabled,U=H.autoUpdate,A=H.needsUpdate,R=H.type;Re(),Ke.autoReset=a,H.enabled=_,H.autoUpdate=U,H.needsUpdate=A,H.type=R}function Pe(a){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",a.statusMessage)}function ge(a){const _=a.target;_.removeEventListener("dispose",ge),Ze(_)}function Ze(a){st(a),xe.remove(a)}function st(a){const _=xe.get(a).programs;_!==void 0&&(_.forEach(function(U){Q.releaseProgram(U)}),a.isShaderMaterial&&Q.releaseShaderCache(a))}this.renderBufferDirect=function(a,_,U,A,R,se){_===null&&(_=Et);const me=R.isMesh&&R.matrixWorld.determinantAffine()<0,ae=fo(a,_,U,A,R);ce.setMaterial(A,me);let de=U.index,Ee=1;if(A.wireframe===!0){if(de=r.getWireframeAttribute(U),de===void 0)return;Ee=2}const Le=U.drawRange,ye=U.attributes.position;let ve=Le.start*Ee,Oe=(Le.start+Le.count)*Ee;se!==null&&(ve=Math.max(ve,se.start*Ee),Oe=Math.min(Oe,(se.start+se.count)*Ee)),de!==null?(ve=Math.max(ve,0),Oe=Math.min(Oe,de.count)):ye!=null&&(ve=Math.max(ve,0),Oe=Math.min(Oe,ye.count));const et=Oe-ve;if(et<0||et===1/0)return;ee.setup(R,A,ae,U,de);let qe,ke=B;if(de!==null&&(qe=d.get(de),ke=z,ke.setIndex(qe)),R.isMesh)A.wireframe===!0?(ce.setLineWidth(A.wireframeLinewidth*xt()),ke.setMode(M.LINES)):ke.setMode(M.TRIANGLES);else if(R.isLine){let dt=A.linewidth;dt===void 0&&(dt=1),ce.setLineWidth(dt*xt()),R.isLineSegments?ke.setMode(M.LINES):R.isLineLoop?ke.setMode(M.LINE_LOOP):ke.setMode(M.LINE_STRIP)}else R.isPoints?ke.setMode(M.POINTS):R.isSprite&&ke.setMode(M.TRIANGLES);if(R.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))ke.renderMultiDraw(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount);else{const dt=R._multiDrawStarts,pe=R._multiDrawCounts,pt=R._multiDrawCount,He=de?d.get(de).bytesPerElement:1,Xt=xe.get(A).currentProgram.getUniforms();for(let ut=0;ut<pt;ut++)Xt.setValue(M,"_gl_DrawID",ut),ke.render(dt[ut]/He,pe[ut])}else if(R.isInstancedMesh)ke.renderInstances(ve,et,R.count);else if(U.isInstancedBufferGeometry){const dt=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,pe=Math.min(U.instanceCount,dt);ke.renderInstances(ve,et,pe)}else ke.render(ve,et)};function yt(a,_,U,A){k!==null&&a.isNodeMaterial&&k.setObject(A,a),nt===!0&&y.setState(a,U,!1),a.transparent===!0&&a.side===Nt&&a.forceSinglePass===!1?(a.side=St,a.needsUpdate=!0,sn(a,_,A),a.side=jt,a.needsUpdate=!0,sn(a,_,A),a.side=Nt):sn(a,_,A)}this.compile=function(a,_,U=null){U===null&&(U=a),k!==null&&k.renderStart(a,_,U),S=oe.get(U),S.init(_),h.push(S),U.traverseVisible(function(R){R.isLight&&R.layers.test(_.layers)&&(S.pushLight(R),R.castShadow&&S.pushShadow(R))}),a!==U&&a.traverseVisible(function(R){R.isLight&&R.layers.test(_.layers)&&(S.pushLight(R),R.castShadow&&S.pushShadow(R))}),S.setupLights(),k!==null&&k.updateLights(S.state.lightsArray),gt=this.localClippingEnabled,nt=y.init(this.clippingPlanes,gt),nt===!0&&y.setGlobalState(this.clippingPlanes,_),k!==null&&H.render(S.state.shadowsArray,U,_);const A=new Set;return a.traverse(function(R){if(!(R.isMesh||R.isPoints||R.isLine||R.isSprite))return;const se=R.material;if(se)if(Array.isArray(se))for(let me=0;me<se.length;me++){const ae=se[me];yt(ae,U,_,R),A.add(ae)}else yt(se,U,_,R),A.add(se)}),S=h.pop(),k!==null&&k.renderEnd(),A},this.compileAsync=function(a,_,U=null){const A=this.compile(a,_,U);return new Promise(R=>{function se(){if(A.forEach(function(me){const de=xe.get(me).currentProgram;(de===void 0||de.isReady())&&A.delete(me)}),A.size===0){R(a);return}setTimeout(se,10)}Xe.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Gn=null;function so(a){Gn&&Gn(a)}function nr(){zt.stop()}function ir(){zt.start()}const zt=new Pa;zt.setAnimationLoop(so),typeof self<"u"&&zt.setContext(self),this.setAnimationLoop=function(a){Gn=a,Te.setAnimationLoop(a),a===null?zt.stop():zt.start()},Te.addEventListener("sessionstart",nr),Te.addEventListener("sessionend",ir),this.render=function(a,_){if(_!==void 0&&_.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;k!==null&&k.renderStart(a,_);const U=Te.enabled===!0&&Te.isPresenting===!0,A=Y!==null&&(le===null||U)&&Y.begin(w,le);if(a.matrixWorldAutoUpdate===!0&&a.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Y===null||Y.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(_),_=Te.getCamera()),a.isScene===!0&&a.onBeforeRender(w,a,_,le),S=oe.get(a,h.length),S.init(_),S.state.textureUnits=be.getTextureUnits(),h.push(S),je.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse),_.isArrayCamera?lt.setFromArrayCamera(_):Ie.setFromProjectionMatrix(je,Ji,_.reversedDepth),gt=this.localClippingEnabled,nt=y.init(this.clippingPlanes,gt),P=ie.get(a,o.length),P.init(),o.push(P),Te.enabled===!0&&Te.isPresenting===!0){const me=w.xr.getDepthSensingMesh();me!==null&&Hn(me,_,-1/0,w.sortObjects)}Hn(a,_,0,w.sortObjects),P.finish(),k!==null&&k.updateLights(S.state.lightsArray),w.sortObjects===!0&&P.sort(Ue,_t),Mt=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,Mt&&p.addToRenderList(P,a),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),nt===!0&&y.beginShadows();const R=S.state.shadowsArray;if(H.render(R,a,_),nt===!0&&y.endShadows(),(A&&Y.hasRenderPass())===!1){const me=P.opaque,ae=P.transmissive;if(S.setupLights(),_.isArrayCamera){const de=_.cameras;if(ae.length>0)for(let Ee=0,Le=de.length;Ee<Le;Ee++){const ye=de[Ee];ar(me,ae,a,ye)}Mt&&p.render(a);for(let Ee=0,Le=de.length;Ee<Le;Ee++){const ye=de[Ee];rr(P,a,ye,ye.viewport)}}else ae.length>0&&ar(me,ae,a,_),Mt&&p.render(a),rr(P,a,_)}le!==null&&G===0&&(be.updateMultisampleRenderTarget(le),be.updateRenderTargetMipmap(le)),A&&Y.end(w),a.isScene===!0&&a.onAfterRender(w,a,_),ee.resetDefaultState(),K=-1,te=null,h.pop(),h.length>0?(S=h[h.length-1],be.setTextureUnits(S.state.textureUnits),nt===!0&&y.setGlobalState(w.clippingPlanes,S.state.camera)):S=null,o.pop(),o.length>0?P=o[o.length-1]:P=null,k!==null&&k.renderEnd()};function Hn(a,_,U,A){if(a.visible===!1)return;if(a.layers.test(_.layers)){if(a.isGroup)U=a.renderOrder;else if(a.isLOD)a.autoUpdate===!0&&a.update(_);else if(a.isLight)S.pushLight(a),a.castShadow&&S.pushShadow(a);else if(a.isSprite){const me=_.isArrayCamera?lt:Ie;if(!a.frustumCulled||a.intersectsFrustum(me)){A&&at.setFromMatrixPosition(a.matrixWorld).applyMatrix4(je);const ae=C.update(a),de=a.material;de.visible&&P.push(a,ae,de,U,at.z,null,_)}}else if(a.isMesh||a.isLine||a.isPoints){const me=_.isArrayCamera?lt:Ie;if(!a.frustumCulled||a.intersectsFrustum(me)){const ae=C.update(a),de=a.material;if(A&&(a.boundingSphere!==void 0?(a.boundingSphere===null&&a.computeBoundingSphere(),at.copy(a.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),at.copy(ae.boundingSphere.center)),at.applyMatrix4(a.matrixWorld).applyMatrix4(je)),Array.isArray(de)){const Ee=ae.groups;for(let Le=0,ye=Ee.length;Le<ye;Le++){const ve=Ee[Le],Oe=de[ve.materialIndex];Oe&&Oe.visible&&P.push(a,ae,Oe,U,at.z,ve,_)}}else de.visible&&P.push(a,ae,de,U,at.z,null,_)}}}const se=a.children;for(let me=0,ae=se.length;me<ae;me++)Hn(se[me],_,U,A)}function rr(a,_,U,A){const{opaque:R,transmissive:se,transparent:me}=a;S.setupLightsView(U),nt===!0&&y.setGlobalState(w.clippingPlanes,U),A&&ce.viewport(re.copy(A)),R.length>0&&gn(R,_,U),se.length>0&&gn(se,_,U),me.length>0&&gn(me,_,U),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function ar(a,_,U,A){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[A.id]===void 0){const ve=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[A.id]=new Pt(1,1,{generateMipmaps:!0,type:ve?wt:bt,minFilter:Ht,samples:Math.max(4,ot.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const se=S.state.transmissionRenderTarget[A.id],me=A.viewport||re;se.setSize(me.z*w.transmissionResolutionScale,me.w*w.transmissionResolutionScale);const ae=w.getRenderTarget(),de=w.getActiveCubeFace(),Ee=w.getActiveMipmapLevel();w.setRenderTarget(se),w.getClearColor(V),ue=w.getClearAlpha(),ue<1&&w.setClearColor(16777215,.5),w.clear(),Mt&&p.render(U);const Le=w.toneMapping;w.toneMapping=Ut;const ye=A.viewport;if(A.viewport!==void 0&&(A.viewport=void 0),S.setupLightsView(A),nt===!0&&y.setGlobalState(w.clippingPlanes,A),gn(a,U,A),be.updateMultisampleRenderTarget(se),be.updateRenderTargetMipmap(se),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let Oe=0,et=_.length;Oe<et;Oe++){const qe=_[Oe],{object:ke,geometry:dt,material:pe,group:pt}=qe;if(pe.side===Nt&&ke.layers.test(A.layers)){const He=pe.side;pe.side=St,pe.needsUpdate=!0,or(ke,U,A,dt,pe,pt),pe.side=He,pe.needsUpdate=!0,ve=!0}}ve===!0&&(be.updateMultisampleRenderTarget(se),be.updateRenderTargetMipmap(se))}w.setRenderTarget(ae,de,Ee),w.setClearColor(V,ue),ye!==void 0&&(A.viewport=ye),w.toneMapping=Le}function gn(a,_,U){const A=_.isScene===!0?_.overrideMaterial:null;for(let R=0,se=a.length;R<se;R++){const me=a[R],{object:ae,geometry:de,group:Ee}=me;let Le=me.material;Le.allowOverride===!0&&A!==null&&(Le=A),ae.layers.test(U.layers)&&or(ae,_,U,de,Le,Ee)}}function or(a,_,U,A,R,se){k!==null&&R.isNodeMaterial&&k.setObject(a,R),a.onBeforeRender(w,_,U,A,R,se),a.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,a.matrixWorld),a.normalMatrix.getNormalMatrix(a.modelViewMatrix),R.onBeforeRender(w,_,U,A,a,se),R.transparent===!0&&R.side===Nt&&R.forceSinglePass===!1?(R.side=St,R.needsUpdate=!0,w.renderBufferDirect(U,_,A,R,a,se),R.side=jt,R.needsUpdate=!0,w.renderBufferDirect(U,_,A,R,a,se),R.side=Nt):w.renderBufferDirect(U,_,A,R,a,se),a.onAfterRender(w,_,U,A,R,se)}function sn(a,_,U){_.isScene!==!0&&(_=Et);const A=xe.get(a),R=S.state.lights,se=S.state.shadowsArray,me=R.state.version,ae=Q.getParameters(a,R.state,se,_,U,S.state.lightProbeGridArray),de=Q.getProgramCacheKey(ae);let Ee=A.programs;A.environment=a.isMeshStandardMaterial||a.isMeshLambertMaterial||a.isMeshPhongMaterial?_.environment:null,A.fog=_.fog;const Le=a.isMeshStandardMaterial||a.isMeshLambertMaterial&&!a.envMap||a.isMeshPhongMaterial&&!a.envMap;A.envMap=ft.get(a.envMap||A.environment,Le),A.envMapRotation=A.environment!==null&&a.envMap===null?_.environmentRotation:a.envMapRotation,Ee===void 0&&(a.addEventListener("dispose",ge),Ee=new Map,A.programs=Ee,A.programVariants=new Map);let ye=Ee.get(de);if(ye!==void 0){if(A.currentProgram===ye&&A.lightsStateVersion===me)return lr(a,ae),ye}else ae.uniforms=Q.getUniforms(a),k!==null&&a.isNodeMaterial&&k.build(a,U,ae),a.onBeforeCompile(ae,w),ye=Q.acquireProgram(ae,de),Ee.set(de,ye),A.uniforms=ae.uniforms;const ve=A.uniforms;return(!a.isShaderMaterial&&!a.isRawShaderMaterial||a.clipping===!0)&&(ve.clippingPlanes=y.uniform),lr(a,ae),A.needsLights=po(a),A.lightsStateVersion=me,A.needsLights&&(ve.ambientLightColor.value=R.state.ambient,ve.lightProbe.value=R.state.probe,ve.sunLights.value=R.state.sun,ve.sunLightShadows.value=R.state.sunShadow,ve.directionalLights.value=R.state.directional,ve.directionalLightShadows.value=R.state.directionalShadow,ve.spotLights.value=R.state.spot,ve.spotLightShadows.value=R.state.spotShadow,ve.rectAreaLights.value=R.state.rectArea,ve.ltc_1.value=R.state.rectAreaLTC1,ve.ltc_2.value=R.state.rectAreaLTC2,ve.pointLights.value=R.state.point,ve.pointLightShadows.value=R.state.pointShadow,ve.hemisphereLights.value=R.state.hemi,ve.sunShadowMatrix.value=R.state.sunShadowMatrix,ve.sunShadowCascade.value=R.state.sunShadowCascade,ve.directionalShadowMatrix.value=R.state.directionalShadowMatrix,ve.spotLightMatrix.value=R.state.spotLightMatrix,ve.spotLightMap.value=R.state.spotLightMap,ve.pointShadowMatrix.value=R.state.pointShadowMatrix),A.lightProbeGrid=S.state.lightProbeGridArray.length>0,A.currentProgram=ye,A.uniformsList=null,ye}function lo(a,_,U,A,R){const se=xe.get(a),me=se.currentProgram.id+","+A+","+R;let ae=se.programVariants.get(me);return ae===void 0?(ae=sn(a,_,U),se.programVariants.set(me,ae)):(se.currentProgram=ae,se.uniformsList=null,se.outputColorSpace=A,se.toneMapping=R),ae}function sr(a){if(a.uniformsList===null){const _=a.currentProgram.getUniforms();a.uniformsList=On.seqWithValue(_.seq,a.uniforms)}return a.uniformsList}function lr(a,_){const U=xe.get(a);U.outputColorSpace=_.outputColorSpace,U.batching=_.batching,U.batchingColor=_.batchingColor,U.instancing=_.instancing,U.instancingColor=_.instancingColor,U.instancingMorph=_.instancingMorph,U.skinning=_.skinning,U.morphTargets=_.morphTargets,U.morphNormals=_.morphNormals,U.morphColors=_.morphColors,U.morphTargetsCount=_.morphTargetsCount,U.numClippingPlanes=_.numClippingPlanes,U.numIntersection=_.numClipIntersection,U.vertexAlphas=_.vertexAlphas,U.vertexTangents=_.vertexTangents,U.toneMapping=_.toneMapping}function co(a,_){if(a.length===0)return null;if(a.length===1)return a[0].texture!==null?a[0]:null;v.setFromMatrixPosition(_.matrixWorld);for(let U=0,A=a.length;U<A;U++){const R=a[U];if(R.texture!==null&&R.boundingBox.containsPoint(v))return R}return null}function fo(a,_,U,A,R){_.isScene!==!0&&(_=Et),be.resetTextureUnits();const se=_.fog,me=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?_.environment:null,ae=le===null?w.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Je.workingColorSpace,de=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,Ee=ft.get(A.envMap||me,de),Le=A.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,ye=!!U.attributes.tangent&&(!!A.normalMap||A.anisotropy>0),ve=!!U.morphAttributes.position,Oe=!!U.morphAttributes.normal,et=!!U.morphAttributes.color;let qe=Ut;A.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(qe=w.toneMapping);const ke=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,dt=ke!==void 0?ke.length:0,pe=xe.get(A),pt=S.state.lights;if(nt===!0&&(gt===!0||a!==te)){const tt=a===te&&A.id===K;y.setState(A,a,tt)}let He=!1,Xt=!1;A.version===pe.__version?pe.needsLights&&pe.lightsStateVersion!==pt.state.version||R.isBatchedMesh&&pe.batching===!1||!R.isBatchedMesh&&pe.batching===!0||R.isBatchedMesh&&pe.batchingColor===!0&&R._colorsTexture===null||R.isBatchedMesh&&pe.batchingColor===!1&&R._colorsTexture!==null||R.isInstancedMesh&&pe.instancing===!1||!R.isInstancedMesh&&pe.instancing===!0||R.isSkinnedMesh&&pe.skinning===!1||!R.isSkinnedMesh&&pe.skinning===!0||R.isInstancedMesh&&pe.instancingColor===!0&&R.instanceColor===null||R.isInstancedMesh&&pe.instancingColor===!1&&R.instanceColor!==null||R.isInstancedMesh&&pe.instancingMorph===!0&&R.morphTexture===null||R.isInstancedMesh&&pe.instancingMorph===!1&&R.morphTexture!==null||pe.envMap!==Ee||A.fog===!0&&pe.fog!==se||pe.numClippingPlanes!==void 0&&(pe.numClippingPlanes!==y.numPlanes||pe.numIntersection!==y.numIntersection)||pe.vertexAlphas!==Le||pe.vertexTangents!==ye||pe.morphTargets!==ve||pe.morphNormals!==Oe||pe.morphColors!==et||pe.morphTargetsCount!==dt||!!pe.lightProbeGrid!=S.state.lightProbeGridArray.length>0?He=!0:(pe.outputColorSpace!==ae||pe.toneMapping!==qe)&&(Xt=!0):(He=!0,pe.__version=A.version);let ut=pe.currentProgram;(He===!0||Xt===!0)&&(ut=Xt===!0?lo(A,_,R,ae,qe):sn(A,_,R),k&&A.isNodeMaterial&&k.onUpdateProgram(A,ut,pe));let vn=!1,Ft=!1,Kt=!1;const Be=ut.getUniforms(),ct=pe.uniforms;if(ce.useProgram(ut.program)&&(vn=!0,Ft=!0,Kt=!0),A.id!==K&&(K=A.id,Ft=!0),pe.needsLights){const tt=co(S.state.lightProbeGridArray,R);pe.lightProbeGrid!==tt&&(pe.lightProbeGrid=tt,Ft=!0)}if(vn||te!==a){ce.buffers.depth.getReversed()&&a.reversedDepth!==!0&&(a._reversedDepth=!0,a.updateProjectionMatrix()),Be.setValue(M,"projectionMatrix",a.projectionMatrix),Be.setValue(M,"viewMatrix",a.matrixWorldInverse);const Ct=Be.map.cameraPosition;Ct!==void 0&&Ct.setValue(M,Dt.setFromMatrixPosition(a.matrixWorld)),ot.logarithmicDepthBuffer&&Be.setValue(M,"logDepthBufFC",2/(Math.log(a.far+1)/Math.LN2)),(A.isMeshPhongMaterial||A.isMeshToonMaterial||A.isMeshLambertMaterial||A.isMeshBasicMaterial||A.isMeshStandardMaterial||A.isShaderMaterial)&&Be.setValue(M,"isOrthographic",a.isOrthographicCamera===!0),te!==a&&(te=a,Ft=!0,Kt=!0)}if(pe.needsLights&&(pt.state.sunShadowMap.length>0&&Be.setValue(M,"sunShadowMap",pt.state.sunShadowMap,be),pt.state.directionalShadowMap.length>0&&Be.setValue(M,"directionalShadowMap",pt.state.directionalShadowMap,be),pt.state.spotShadowMap.length>0&&Be.setValue(M,"spotShadowMap",pt.state.spotShadowMap,be),pt.state.pointShadowMap.length>0&&Be.setValue(M,"pointShadowMap",pt.state.pointShadowMap,be)),R.isSkinnedMesh){Be.setOptional(M,R,"bindMatrix"),Be.setOptional(M,R,"bindMatrixInverse");const tt=R.skeleton;tt&&(tt.boneTexture===null&&tt.computeBoneTexture(),Be.setValue(M,"boneTexture",tt.boneTexture,be))}R.isBatchedMesh&&(Be.setOptional(M,R,"batchingTexture"),Be.setValue(M,"batchingTexture",R._matricesTexture,be),Be.setOptional(M,R,"batchingIdTexture"),Be.setValue(M,"batchingIdTexture",R._indirectTexture,be),Be.setOptional(M,R,"batchingColorTexture"),R._colorsTexture!==null&&Be.setValue(M,"batchingColorTexture",R._colorsTexture,be));const Rt=U.morphAttributes;if((Rt.position!==void 0||Rt.normal!==void 0||Rt.color!==void 0)&&q.update(R,U,ut),(Ft||pe.receiveShadow!==R.receiveShadow)&&(pe.receiveShadow=R.receiveShadow,Be.setValue(M,"receiveShadow",R.receiveShadow)),(A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial)&&A.envMap===null&&_.environment!==null&&(ct.envMapIntensity.value=_.environmentIntensity),ct.dfgLUT!==void 0&&(ct.dfgLUT.value=dd()),Ft){if(Be.setValue(M,"toneMappingExposure",w.toneMappingExposure),pe.needsLights&&uo(ct,Kt),se&&A.fog===!0&&X.refreshFogUniforms(ct,se),X.refreshMaterialUniforms(ct,A,he,Ae,S.state.transmissionRenderTarget[a.id]),pe.needsLights&&pe.lightProbeGrid){const tt=pe.lightProbeGrid;ct.probesSH.value=tt.texture,ct.probesMin.value.copy(tt.boundingBox.min),ct.probesMax.value.copy(tt.boundingBox.max),ct.probesResolution.value.copy(tt.resolution)}On.upload(M,sr(pe),ct,be)}if(A.isShaderMaterial&&A.uniformsNeedUpdate===!0&&(On.upload(M,sr(pe),ct,be),A.uniformsNeedUpdate=!1),A.isSpriteMaterial&&Be.setValue(M,"center",R.center),Be.setValue(M,"modelViewMatrix",R.modelViewMatrix),Be.setValue(M,"normalMatrix",R.normalMatrix),Be.setValue(M,"modelMatrix",R.matrixWorld),A.uniformsGroups!==void 0){const tt=A.uniformsGroups;for(let Ct=0,ho=tt.length;Ct<ho;Ct++){const fr=tt[Ct];_e.update(fr,ut),_e.bind(fr,ut)}}return ut}function uo(a,_){a.ambientLightColor.needsUpdate=_,a.lightProbe.needsUpdate=_,a.sunLights.needsUpdate=_,a.sunLightShadows.needsUpdate=_,a.directionalLights.needsUpdate=_,a.directionalLightShadows.needsUpdate=_,a.pointLights.needsUpdate=_,a.pointLightShadows.needsUpdate=_,a.spotLights.needsUpdate=_,a.spotLightShadows.needsUpdate=_,a.rectAreaLights.needsUpdate=_,a.hemisphereLights.needsUpdate=_}function po(a){return a.isMeshLambertMaterial||a.isMeshToonMaterial||a.isMeshPhongMaterial||a.isMeshStandardMaterial||a.isShadowMaterial||a.isShaderMaterial&&a.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return le},this.setRenderTargetTextures=function(a,_,U){const A=xe.get(a);A.__autoAllocateDepthBuffer=a.resolveDepthBuffer===!1,A.__autoAllocateDepthBuffer===!1&&(A.__useRenderToTexture=!1),xe.get(a.texture).__webglTexture=_,xe.get(a.depthTexture).__webglTexture=A.__autoAllocateDepthBuffer?void 0:U,A.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(a,_){const U=xe.get(a);U.__webglFramebuffer=_,U.__useDefaultFramebuffer=_===void 0},this.setRenderTarget=function(a,_=0,U=0){le=a,Z=_,G=U;let A=null,R=!1,se=!1;if(a){const ae=xe.get(a);if(ae.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(M.FRAMEBUFFER,ae.__webglFramebuffer),re.copy(a.viewport),Me.copy(a.scissor),Ne=a.scissorTest,ce.viewport(re),ce.scissor(Me),ce.setScissorTest(Ne),K=-1;return}else if(ae.__webglFramebuffer===void 0)be.setupRenderTarget(a);else if(ae.__hasExternalTextures)be.rebindTextures(a,xe.get(a.texture).__webglTexture,xe.get(a.depthTexture).__webglTexture);else if(a.depthBuffer){const Le=a.depthTexture;if(ae.__boundDepthTexture!==Le){if(Le!==null&&xe.has(Le)&&(a.width!==Le.image.width||a.height!==Le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");be.setupDepthRenderbuffer(a)}}const de=a.texture;(de.isData3DTexture||de.isDataArrayTexture||de.isCompressedArrayTexture)&&(se=!0);const Ee=xe.get(a).__webglFramebuffer;a.isWebGLCubeRenderTarget?(Array.isArray(Ee[_])?A=Ee[_][U]:A=Ee[_],R=!0):a.samples>0&&be.useMultisampledRTT(a)===!1?A=xe.get(a).__webglMultisampledFramebuffer:Array.isArray(Ee)?A=Ee[U]:A=Ee,re.copy(a.viewport),Me.copy(a.scissor),Ne=a.scissorTest}else re.copy(Ce).multiplyScalar(he).floor(),Me.copy(Ye).multiplyScalar(he).floor(),Ne=We;if(U!==0&&(A=$),ce.bindFramebuffer(M.FRAMEBUFFER,A)&&ce.drawBuffers(a,A),ce.viewport(re),ce.scissor(Me),ce.setScissorTest(Ne),R){const ae=xe.get(a.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+_,ae.__webglTexture,U)}else if(se){const ae=_;for(let de=0;de<a.textures.length;de++){const Ee=xe.get(a.textures[de]);M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0+de,Ee.__webglTexture,U,ae)}}else if(a!==null&&U!==0){const ae=xe.get(a.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,ae.__webglTexture,U)}K=-1};function cr(a){const _=xe.get(a);return(_.__readFormat!==a.format||_.__readType!==a.type)&&(_.__readFormat=a.format,_.__readType=a.type,_.__formatReadable=ot.textureFormatReadable(a.format),_.__typeReadable=ot.textureTypeReadable(a.type)),_}this.readRenderTargetPixels=function(a,_,U,A,R,se,me,ae=0){if(!(a&&a.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=xe.get(a).__webglFramebuffer;if(a.isWebGLCubeRenderTarget&&me!==void 0&&(de=de[me],Array.isArray(de)&&(de=de[0])),de){ce.bindFramebuffer(M.FRAMEBUFFER,de);try{const Ee=a.textures[ae],Le=Ee.format,ye=Ee.type;a.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+ae);const ve=cr(Ee);if(ve.__formatReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ve.__typeReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}_>=0&&_<=a.width-A&&U>=0&&U<=a.height-R&&M.readPixels(_,U,A,R,j.convert(Le),j.convert(ye),se)}finally{const Ee=le!==null?xe.get(le).__webglFramebuffer:null;ce.bindFramebuffer(M.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(a,_,U,A,R,se,me,ae=0){if(!(a&&a.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=xe.get(a).__webglFramebuffer;if(a.isWebGLCubeRenderTarget&&me!==void 0&&(de=de[me],Array.isArray(de)&&(de=de[0])),de)if(_>=0&&_<=a.width-A&&U>=0&&U<=a.height-R){ce.bindFramebuffer(M.FRAMEBUFFER,de);const Ee=a.textures[ae],Le=Ee.format,ye=Ee.type;a.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+ae);const ve=cr(Ee);if(ve.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ve.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,Oe),M.bufferData(M.PIXEL_PACK_BUFFER,se.byteLength,M.STREAM_READ),M.readPixels(_,U,A,R,j.convert(Le),j.convert(ye),0),M.bindBuffer(M.PIXEL_PACK_BUFFER,null);const et=le!==null?xe.get(le).__webglFramebuffer:null;ce.bindFramebuffer(M.FRAMEBUFFER,et);const qe=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await So(M,qe,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,Oe),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,se),M.bindBuffer(M.PIXEL_PACK_BUFFER,null),M.deleteBuffer(Oe),M.deleteSync(qe),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(a,_=null,U=0){const A=Math.pow(2,-U),R=Math.floor(a.image.width*A),se=Math.floor(a.image.height*A),me=_!==null?_.x:0,ae=_!==null?_.y:0;be.setTexture2D(a,0),M.copyTexSubImage2D(M.TEXTURE_2D,U,0,0,me,ae,R,se),ce.unbindTexture()},this.copyTextureToTexture=function(a,_,U=null,A=null,R=0,se=0){let me,ae,de,Ee,Le,ye,ve,Oe,et;const qe=a.isCompressedTexture?a.mipmaps[se]:a.image;if(U!==null)me=U.max.x-U.min.x,ae=U.max.y-U.min.y,de=U.isBox3?U.max.z-U.min.z:1,Ee=U.min.x,Le=U.min.y,ye=U.isBox3?U.min.z:0;else{const Be=Math.pow(2,-R);me=Math.floor(qe.width*Be),ae=Math.floor(qe.height*Be),a.isDataArrayTexture?de=qe.depth:a.isData3DTexture?de=Math.floor(qe.depth*Be):de=1,Ee=0,Le=0,ye=0}A!==null?(ve=A.x,Oe=A.y,et=A.z):(ve=0,Oe=0,et=0);const ke=j.convert(_.format),dt=j.convert(_.type);let pe;_.isData3DTexture?(be.setTexture3D(_,0),pe=M.TEXTURE_3D):_.isDataArrayTexture||_.isCompressedArrayTexture?(be.setTexture2DArray(_,0),pe=M.TEXTURE_2D_ARRAY):(be.setTexture2D(_,0),pe=M.TEXTURE_2D),ce.activeTexture(M.TEXTURE0),ce.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,_.flipY),ce.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),ce.pixelStorei(M.UNPACK_ALIGNMENT,_.unpackAlignment);const pt=ce.getParameter(M.UNPACK_ROW_LENGTH),He=ce.getParameter(M.UNPACK_IMAGE_HEIGHT),Xt=ce.getParameter(M.UNPACK_SKIP_PIXELS),ut=ce.getParameter(M.UNPACK_SKIP_ROWS),vn=ce.getParameter(M.UNPACK_SKIP_IMAGES);ce.pixelStorei(M.UNPACK_ROW_LENGTH,qe.width),ce.pixelStorei(M.UNPACK_IMAGE_HEIGHT,qe.height),ce.pixelStorei(M.UNPACK_SKIP_PIXELS,Ee),ce.pixelStorei(M.UNPACK_SKIP_ROWS,Le),ce.pixelStorei(M.UNPACK_SKIP_IMAGES,ye);const Ft=a.isDataArrayTexture||a.isData3DTexture,Kt=_.isDataArrayTexture||_.isData3DTexture;if(a.isDepthTexture){const Be=xe.get(a),ct=xe.get(_),Rt=xe.get(Be.__renderTarget),tt=xe.get(ct.__renderTarget);ce.bindFramebuffer(M.READ_FRAMEBUFFER,Rt.__webglFramebuffer),ce.bindFramebuffer(M.DRAW_FRAMEBUFFER,tt.__webglFramebuffer);for(let Ct=0;Ct<de;Ct++)Ft&&(M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,xe.get(a).__webglTexture,R,ye+Ct),M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,xe.get(_).__webglTexture,se,et+Ct)),M.blitFramebuffer(Ee,Le,me,ae,ve,Oe,me,ae,M.DEPTH_BUFFER_BIT,M.NEAREST);ce.bindFramebuffer(M.READ_FRAMEBUFFER,null),ce.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else if(R!==0||a.isRenderTargetTexture||xe.has(a)){const Be=xe.get(a),ct=xe.get(_);ce.bindFramebuffer(M.READ_FRAMEBUFFER,T),ce.bindFramebuffer(M.DRAW_FRAMEBUFFER,J);for(let Rt=0;Rt<de;Rt++)Ft?M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,Be.__webglTexture,R,ye+Rt):M.framebufferTexture2D(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,Be.__webglTexture,R),Kt?M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,ct.__webglTexture,se,et+Rt):M.framebufferTexture2D(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,ct.__webglTexture,se),R!==0?M.blitFramebuffer(Ee,Le,me,ae,ve,Oe,me,ae,M.COLOR_BUFFER_BIT,M.NEAREST):Kt?M.copyTexSubImage3D(pe,se,ve,Oe,et+Rt,Ee,Le,me,ae):M.copyTexSubImage2D(pe,se,ve,Oe,Ee,Le,me,ae);ce.bindFramebuffer(M.READ_FRAMEBUFFER,null),ce.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else Kt?a.isDataTexture||a.isData3DTexture?M.texSubImage3D(pe,se,ve,Oe,et,me,ae,de,ke,dt,qe.data):_.isCompressedArrayTexture?M.compressedTexSubImage3D(pe,se,ve,Oe,et,me,ae,de,ke,qe.data):M.texSubImage3D(pe,se,ve,Oe,et,me,ae,de,ke,dt,qe):a.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,se,ve,Oe,me,ae,ke,dt,qe.data):a.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,se,ve,Oe,qe.width,qe.height,ke,qe.data):M.texSubImage2D(M.TEXTURE_2D,se,ve,Oe,me,ae,ke,dt,qe);ce.pixelStorei(M.UNPACK_ROW_LENGTH,pt),ce.pixelStorei(M.UNPACK_IMAGE_HEIGHT,He),ce.pixelStorei(M.UNPACK_SKIP_PIXELS,Xt),ce.pixelStorei(M.UNPACK_SKIP_ROWS,ut),ce.pixelStorei(M.UNPACK_SKIP_IMAGES,vn),se===0&&_.generateMipmaps===!0&&_.mipmapsAutoUpdate===!0&&M.generateMipmap(pe),ce.unbindTexture()},this.initRenderTarget=function(a){xe.get(a).__webglFramebuffer===void 0&&be.setupRenderTarget(a)},this.initTexture=function(a){a.isCubeTexture?be.setTextureCube(a,0):a.isData3DTexture?be.setTexture3D(a,0):a.isDataArrayTexture||a.isCompressedArrayTexture?be.setTexture2DArray(a,0):be.setTexture2D(a,0),ce.unbindTexture()},this.resetState=function(){Z=0,G=0,le=null,ce.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(n),t.unpackColorSpace=Je._getUnpackColorSpace()}}export{Jn as ACESFilmicToneMapping,an as AddEquation,Er as AddOperation,_d as AdditiveAnimationBlendMode,hi as AdditiveBlending,Qn as AgXToneMapping,va as AlphaFormat,ni as AlwaysCompare,Jr as AlwaysDepth,gd as AlwaysStencilFunc,vd as AmbientLight,Sd as AnimationAction,Ed as AnimationClip,Md as AnimationLoader,xd as AnimationMixer,Td as AnimationObjectGroup,Ad as AnimationUtils,Rd as ArcCurve,xa as ArrayCamera,Cd as ArrowHelper,bd as AttachedBindMode,Pd as Audio,Ld as AudioAnalyser,Dd as AudioContext,wd as AudioListener,Ud as AudioLoader,Nd as AxesHelper,St as BackSide,Id as BasicDepthPacking,yd as BasicShadowMap,Fd as BatchedMesh,Od as BezierInterpolant,Bd as Bone,Gd as BooleanKeyframeTrack,Hd as Box2,Vd as Box3,Wd as Box3Helper,Sn as BoxGeometry,kd as BoxHelper,Pr as BufferAttribute,qn as BufferGeometry,zd as BufferGeometryLoader,_a as ByteType,Xd as Cache,Kd as Camera,qd as CameraHelper,Yd as CanvasTexture,Zd as CapsuleGeometry,$d as CatmullRomCurve3,jn as CineonToneMapping,Qd as CircleGeometry,Rn as ClampToEdgeWrapping,Jd as Clock,$e as Color,jd as ColorKeyframeTrack,Je as ColorManagement,eu as Compatibility,tu as CompressedArrayTexture,nu as CompressedCubeTexture,iu as CompressedTexture,ru as CompressedTextureLoader,au as ConeGeometry,Nr as ConstantAlphaFactor,yr as ConstantColorFactor,ou as Controls,En as CubeCamera,ii as CubeDepthTexture,ln as CubeReflectionMapping,en as CubeRefractionMapping,zn as CubeTexture,su as CubeTextureLoader,lu as CubicBezierCurve,cu as CubicBezierCurve3,fu as CubicInterpolant,di as CullFaceBack,ta as CullFaceFront,du as CullFaceFrontBack,ea as CullFaceNone,uu as Curve,pu as CurvePath,na as CustomBlending,Zn as CustomToneMapping,hu as CylinderGeometry,mu as Cylindrical,vr as Data3DTexture,Kn as DataArrayTexture,Ta as DataTexture,_u as DataTextureLoader,gu as DataUtils,vu as DecrementStencilOp,Su as DecrementWrapStencilOp,Eu as DefaultLoadingManager,rn as DepthFormat,Vt as DepthStencilFormat,tn as DepthTexture,Mu as DetachedBindMode,xu as DirectionalLight,Tu as DirectionalLightHelper,Au as DiscreteInterpolant,Ru as DodecahedronGeometry,Nt as DoubleSide,Hr as DstAlphaFactor,Vr as DstColorFactor,Cu as DynamicCopyUsage,bu as DynamicDrawUsage,Pu as DynamicReadUsage,Lu as EdgesGeometry,Du as EllipseCurve,fa as EqualCompare,$r as EqualDepth,wu as EqualStencilFunc,Mn as EquirectangularReflectionMapping,xn as EquirectangularRefractionMapping,Uu as Euler,Ma as EventDispatcher,$i as ExternalTexture,Nu as ExtrudeGeometry,Iu as FileLoader,yu as Float16BufferAttribute,Yn as Float32BufferAttribute,Ot as FloatType,Fu as Fog,Ou as FogExp2,Bu as FramebufferTexture,jt as FrontSide,ci as Frustum,ba as FrustumArray,Gu as GLBufferAttribute,Hu as GLSL1,ri as GLSL3,ca as GreaterCompare,Yr as GreaterDepth,si as GreaterEqualCompare,Zr as GreaterEqualDepth,Vu as GreaterEqualStencilFunc,Wu as GreaterStencilFunc,ku as GridHelper,zu as Group,Xu as HTMLTexture,wt as HalfFloatType,Ku as HemisphereLight,qu as HemisphereLightHelper,Yu as IcosahedronGeometry,Zu as ImageBitmapLoader,$u as ImageLoader,Qu as ImageUtils,Ju as IncrementStencilOp,ju as IncrementWrapStencilOp,ep as InstancedBufferAttribute,tp as InstancedBufferGeometry,np as InstancedInterleavedBuffer,ip as InstancedMesh,rp as Int16BufferAttribute,ap as Int32BufferAttribute,op as Int8BufferAttribute,kn as IntType,sp as InterleavedBuffer,lp as InterleavedBufferAttribute,cp as Interpolant,fp as InterpolateBezier,dp as InterpolateDiscrete,up as InterpolateLinear,pp as InterpolateSmooth,hp as InterpolationSamplingMode,mp as InterpolationSamplingType,_p as InvertStencilOp,gp as KeepStencilOp,vp as KeyframeTrack,Sp as LOD,Ep as LatheGeometry,Rr as Layers,da as LessCompare,Qr as LessDepth,li as LessEqualCompare,fi as LessEqualDepth,Mp as LessEqualStencilFunc,xp as LessStencilFunc,Tp as Light,Ap as LightProbe,Rp as LightShadow,Cp as Line,bp as Line3,Pp as LineBasicMaterial,Lp as LineCurve,Dp as LineCurve3,wp as LineDashedMaterial,Up as LineLoop,Np as LineSegments,At as LinearFilter,Ip as LinearInterpolant,yp as LinearMipMapLinearFilter,Fp as LinearMipMapNearestFilter,Ht as LinearMipmapLinearFilter,Cn as LinearMipmapNearestFilter,Xn as LinearSRGBColorSpace,ti as LinearToneMapping,ai as LinearTransfer,Op as Loader,Bp as LoaderUtils,Gp as LoadingManager,Hp as LoopOnce,Vp as LoopPingPong,Wp as LoopRepeat,kp as MOUSE,zp as Material,Xp as MaterialBlending,Kp as MaterialLoader,qp as MathUtils,Yp as Matrix2,Fe as Matrix3,Yt as Matrix4,ra as MaxEquation,Gt as Mesh,Zp as MeshBasicMaterial,Cr as MeshDepthMaterial,br as MeshDistanceMaterial,$p as MeshLambertMaterial,Qp as MeshMatcapMaterial,Jp as MeshNormalMaterial,jp as MeshPhongMaterial,eh as MeshPhysicalMaterial,th as MeshStandardMaterial,nh as MeshToonMaterial,ia as MinEquation,aa as MirroredRepeatWrapping,Mr as MixOperation,ui as MultiplyBlending,xr as MultiplyOperation,Wt as NearestFilter,ih as NearestMipMapLinearFilter,rh as NearestMipMapNearestFilter,dn as NearestMipmapLinearFilter,sa as NearestMipmapNearestFilter,$n as NeutralToneMapping,ua as NeverCompare,jr as NeverDepth,ah as NeverStencilFunc,Zt as NoBlending,Jt as NoColorSpace,oh as NoNormalPacking,Ut as NoToneMapping,sh as NormalAnimationBlendMode,fn as NormalBlending,lh as NormalGAPacking,ch as NormalRGPacking,la as NotEqualCompare,qr as NotEqualDepth,fh as NotEqualStencilFunc,dh as NumberKeyframeTrack,uh as Object3D,ph as ObjectLoader,Ar as ObjectSpaceNormalMap,hh as OctahedronGeometry,Xr as OneFactor,Ur as OneMinusConstantAlphaFactor,Ir as OneMinusConstantColorFactor,Fr as OneMinusDstAlphaFactor,Or as OneMinusDstColorFactor,Br as OneMinusSrcAlphaFactor,Gr as OneMinusSrcColorFactor,gr as OrthographicCamera,cn as PCFShadowMap,Lr as PCFSoftShadowMap,_n as PMREMGenerator,mh as Path,wn as PerspectiveCamera,ur as Plane,Wn as PlaneGeometry,_h as PlaneHelper,gh as PointLight,vh as PointLightHelper,Sh as Points,Eh as PointsMaterial,Mh as PolarGridHelper,xh as PolyhedronGeometry,Th as PositionalAudio,Ah as PropertyBinding,Rh as PropertyMixer,Ch as QuadraticBezierCurve,bh as QuadraticBezierCurve3,Ph as Quaternion,Lh as QuaternionKeyframeTrack,Dh as QuaternionLinearInterpolant,bi as R11_EAC_Format,An as RED_GREEN_RGTC2_Format,qi as RED_RGTC1_Format,Ca as REVISION,Tn as RG11_EAC_Format,wh as RGBADepthPacking,Bt as RGBAFormat,Si as RGBAIntegerFormat,Vi as RGBA_ASTC_10x10_Format,Bi as RGBA_ASTC_10x5_Format,Gi as RGBA_ASTC_10x6_Format,Hi as RGBA_ASTC_10x8_Format,Wi as RGBA_ASTC_12x10_Format,ki as RGBA_ASTC_12x12_Format,Di as RGBA_ASTC_4x4_Format,wi as RGBA_ASTC_5x4_Format,Ui as RGBA_ASTC_5x5_Format,Ni as RGBA_ASTC_6x5_Format,Ii as RGBA_ASTC_6x6_Format,yi as RGBA_ASTC_8x5_Format,Fi as RGBA_ASTC_8x6_Format,Oi as RGBA_ASTC_8x8_Format,zi as RGBA_BPTC_Format,Ci as RGBA_ETC2_EAC_Format,Ti as RGBA_PVRTC_2BPPV1_Format,xi as RGBA_PVRTC_4BPPV1_Format,Pn as RGBA_S3TC_DXT1_Format,Ln as RGBA_S3TC_DXT3_Format,Dn as RGBA_S3TC_DXT5_Format,Uh as RGBDepthPacking,Sa as RGBFormat,Nh as RGBIntegerFormat,Xi as RGB_BPTC_SIGNED_Format,Ki as RGB_BPTC_UNSIGNED_Format,Ai as RGB_ETC1_Format,Ri as RGB_ETC2_Format,Mi as RGB_PVRTC_2BPPV1_Format,Ei as RGB_PVRTC_4BPPV1_Format,bn as RGB_S3TC_DXT1_Format,Ih as RGDepthPacking,Qt as RGFormat,vi as RGIntegerFormat,_r as RawShaderMaterial,yh as Ray,Fh as Raycaster,Oh as RectAreaLight,Ea as RedFormat,gi as RedIntegerFormat,ei as ReinhardToneMapping,Bh as RenderObjectRefreshType,Gh as RenderTarget,Hh as RenderTarget3D,oa as RepeatWrapping,Vh as ReplaceStencilOp,Dr as ReverseSubtractEquation,Wh as RingGeometry,Pi as SIGNED_R11_EAC_Format,Zi as SIGNED_RED_GREEN_RGTC2_Format,Yi as SIGNED_RED_RGTC1_Format,Li as SIGNED_RG11_EAC_Format,Ra as SRGBColorSpace,ze as SRGBTransfer,kh as Scene,De as ShaderChunk,Lt as ShaderLib,qt as ShaderMaterial,zh as ShadowMaterial,Xh as Shape,Kh as ShapeGeometry,qh as ShapePath,Yh as ShapeUtils,ga as ShortType,Zh as Skeleton,$h as SkeletonHelper,Qh as SkinnedMesh,Jh as Source,jh as Sphere,em as SphereGeometry,tm as Spherical,nm as SphericalHarmonics3,im as SplineCurve,rm as SpotLight,am as SpotLightHelper,om as Sprite,sm as SpriteMaterial,kr as SrcAlphaFactor,Wr as SrcAlphaSaturateFactor,zr as SrcColorFactor,lm as StaticCopyUsage,cm as StaticDrawUsage,fm as StaticReadUsage,dm as StereoCamera,um as StreamCopyUsage,pm as StreamDrawUsage,hm as StreamReadUsage,mm as StringKeyframeTrack,wr as SubtractEquation,pi as SubtractiveBlending,_m as TOUCH,oi as TangentSpaceNormalMap,gm as TetrahedronGeometry,Sr as Texture,vm as TextureLoader,Sm as TextureSource,Em as TextureUtils,Mm as Timer,xm as TimestampQuery,Tm as TorusGeometry,Am as TorusKnotGeometry,Rm as Triangle,Cm as TriangleFanDrawMode,bm as TriangleStripDrawMode,Pm as TrianglesDrawMode,Lm as TubeGeometry,Dm as UVMapping,mr as Uint16BufferAttribute,hr as Uint32BufferAttribute,wm as Uint8BufferAttribute,Um as Uint8ClampedBufferAttribute,Nm as Uniform,Im as UniformsGroup,fe as UniformsLib,Tr as UniformsUtils,bt as UnsignedByteType,ma as UnsignedInt101111Type,$t as UnsignedInt248Type,ha as UnsignedInt5999Type,kt as UnsignedIntType,mi as UnsignedShort4444Type,_i as UnsignedShort5551Type,un as UnsignedShortType,nn as VSMShadowMap,ht as Vector2,Ge as Vector3,mt as Vector4,ym as VectorKeyframeTrack,Fm as VideoFrameTexture,Om as VideoTexture,Bm as WebGL3DRenderTarget,Gm as WebGLArrayRenderTarget,Ji as WebGLCoordinateSystem,In as WebGLCubeRenderTarget,Pt as WebGLRenderTarget,ud as WebGLRenderer,ao as WebGLUtils,Hm as WebGPUCoordinateSystem,Un as WebXRController,Vm as WireframeGeometry,Wm as WrapAroundEnding,km as ZeroCurvatureEnding,Kr as ZeroFactor,zm as ZeroSlopeEnding,Xm as ZeroStencilOp,Aa as createCanvasElement,Qe as error,Km as getConsoleFunction,Qi as log,qm as setConsoleFunction,Ve as warn,pr as warnOnce};
