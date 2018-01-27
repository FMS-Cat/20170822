#define PARTICLE_LIFE_SPEED 4.0

#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

precision highp float;

uniform float time;
uniform float particlesSqrt;
uniform float particlePixels;
uniform float frame;
uniform float frames;
uniform bool init;
uniform float deltaTime;
uniform vec2 resolution;

uniform float circleAmp;
uniform float torusAmp;
uniform float rectXAmp;
uniform float rectYAmp;
uniform float rectZAmp;
uniform float multAmp;
uniform float mult2Amp;
uniform float torusRotate;
uniform float warpAmp;
uniform float ballRot;
uniform float noiseAmp;

uniform sampler2D textureReturn;
uniform sampler2D textureRandom;

// ------

vec2 vInvert( vec2 _uv ) {
  return vec2( 0.0, 1.0 ) + vec2( 1.0, -1.0 ) * _uv;
}

// ------

mat2 rotate2D( float _t ) {
  return mat2( cos( _t ), sin( _t ), -sin( _t ), cos( _t ) );
}

vec4 random( vec2 _uv ) {
  return texture2D( textureRandom, _uv );
}

#pragma glslify: noise = require( ./noise )
#pragma glslify: prng = require( ./prng )

vec3 randomSphere( inout vec4 seed ) {
  vec3 v;
  for ( int i = 0; i < 10; i ++ ) {
    v = vec3(
      prng( seed ),
      prng( seed ),
      prng( seed )
    ) * 2.0 - 1.0;
    if ( length( v ) < 1.0 ) { break; }
  }
  return v;
}

// ------

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 puv = vec2( ( floor( gl_FragCoord.x / particlePixels ) * particlePixels + 0.5 ) / resolution.x, uv.y );
  float number = ( ( gl_FragCoord.x - 0.5 ) / particlePixels ) + ( ( gl_FragCoord.y - 0.5 ) * particlesSqrt );
  float mode = mod( gl_FragCoord.x, particlePixels );
  vec2 dpix = vec2( 1.0 ) / resolution;

  vec4 seed = texture2D( textureRandom, puv );
  prng( seed );

  vec4 pos = texture2D( textureReturn, puv );
  vec4 vel = texture2D( textureReturn, puv + dpix * V.yx );
  vec4 col = texture2D( textureReturn, puv + dpix * V.yx * 2.0 );
  vec4 other = texture2D( textureReturn, puv + dpix * V.yx * 3.0 );

  float dt = deltaTime;

  float timing = number / particlesSqrt / particlesSqrt * frames / PARTICLE_LIFE_SPEED;
  float timingI = floor( timing );
  float timingF = fract( timing );
  if ( timingI == mod( frame, frames / PARTICLE_LIFE_SPEED ) ) {
    float phase = ( timing / frames + floor( frame / frames * PARTICLE_LIFE_SPEED ) / PARTICLE_LIFE_SPEED ) * 2.0 * PI;
    pos.xyz = circleAmp * vec3(
      sin( phase * 1024.0 ),
      cos( phase * 1024.0 ),
      0.0
    );

    pos.xyz += circleAmp * torusAmp * vec3(
      cos( phase * 15840.0 ) * sin( phase * 1024.0 ),
      cos( phase * 15840.0 ) * cos( phase * 1024.0 ),
      sin( phase * 15840.0 )
    );

    pos.zx = rotate2D( ballRot / circleAmp * pos.y * 100.0 ) * pos.zx;

    pos.x += rectXAmp * ( 0.5 - smoothstep( -0.1, 0.1, sin( phase * 1024.7 ) ) );
    pos.y += rectYAmp * ( 0.5 - smoothstep( -0.1, 0.1, sin( phase * 1025.1 ) ) );
    pos.z += rectZAmp * ( 0.5 - smoothstep( -0.1, 0.1, sin( phase * 1025.5 ) ) );

    float multRect = ( 1.0 - floor( mod( phase * 8192.0, 3.0 ) ) );
    float mult2Rect = ( 1.0 - floor( mod( phase * 8192.0 / 3.0, 3.0 ) ) );
    pos.x += multAmp * 0.4 * cos( phase ) * multRect;
    pos.y += multAmp * 0.4 * sin( phase ) * multRect;
    pos.x -= mult2Amp * 0.4 * sin( phase ) * mult2Rect;
    pos.y += mult2Amp * 0.4 * cos( phase ) * mult2Rect;

    pos.z += warpAmp * ( 4.0 - floor( mod( phase * 8192.0, 9.0 ) ) );

    pos.yz = rotate2D( -torusRotate ) * pos.yz;
    pos.zx = rotate2D( torusRotate ) * pos.zx;

    pos.z += 0.5 * exp( -mod( phase, 0.125 * PI * 2.0 ) * 5.0 ) * noise( vec4( phase * 1024.0, 4.0, 4.0, 4.0 ) );

    pos.w = 1.0;

    vel.xyz = 0.1 * randomSphere( seed );
    col.xyz = vec3( 0.1, 0.9, 0.5 ) + 0.1 * vec3( prng( seed ), prng( seed ), prng( seed ) );
    other = vec4( 0.0 );

    dt = deltaTime * ( 1.0 - timingF );
  }

  pos.w = pos.w * exp( -dt * 4.0 * PARTICLE_LIFE_SPEED );

  float noiseAmp = ( 0.1 + 0.9 * smoothstep( -0.4, 0.8, sin( pos.x * 9.0 + time * PI * 16.0 ) ) ) * 400.0;
  vel.xyz += vec3(
    noise( vec4( pos.xyz * 2.0 + 8.0, 1.0 ) ) - 0.1,
    noise( vec4( pos.xyz * 2.0 + 8.0, 2.0 ) ) + 0.1,
    noise( vec4( pos.xyz * 2.0 + 8.0, 3.0 ) )
  ) * noiseAmp * dt;

  pos.xyz += vel.xyz * dt;

  gl_FragColor = (
    mode < 1.0 ? pos :
    mode < 2.0 ? vel :
    mode < 3.0 ? col :
    other
  );
}