#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

precision highp float;

varying vec3 vPos;
varying float vLife;

uniform bool depth;

uniform float time;
uniform vec2 resolution;
uniform vec3 cameraPos;
uniform vec3 lightPos;

// ------

vec3 catColor( float _p ) {
  return 0.5 + 0.5 * vec3(
    cos( _p ),
    cos( _p + PI / 3.0 * 2.0 ),
    cos( _p + PI / 3.0 * 4.0 )
  );
}

void main() {
  vec3 color = 0.3 + 0.7 * catColor( 1.0 + vLife * 3.0 );
  color *= 0.3 * vLife + 0.7 * smoothstep( 0.9, 1.0, vLife );
  float shape = smoothstep( 0.5, 0.4, length( gl_PointCoord - 0.5 ) );
  gl_FragColor = vec4( color, shape );
}