import xorshift from './xorshift';
xorshift( 45347586789 );
import GLCat from './glcat';
import step from './step';
import Tweak from './tweak';
import Automaton from './automaton.min';

const glslify = require( 'glslify' );

// ------

const clamp = ( _value, _min, _max ) => Math.min( Math.max( _value, _min ), _max );
const saturate = ( _value ) => clamp( _value, 0.0, 1.0 );

// ------

let automaton = new Automaton( {
  gui: divAutomaton,
  data: `
  {"rev":20170418,"length":1,"resolution":1000,"params":{"circleAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.25,"value":0.5052161848926047,"mode":4,"params":{"rate":4000,"damp":1},"mods":[false,false,false,false]},{"time":0.5,"value":0.15,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.625,"value":0.4,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.75,"value":0.5,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.875,"value":0.3710626521795857,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":100,"mode":5,"params":{"gravity":300,"bounce":0.3},"mods":[false,false,false,false]}],"rectXAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.625,"value":0.5,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.75,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"rectYAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.625,"value":0.5,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.75,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"multAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.25,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5,"value":1,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]}],"mult2Amp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5,"value":1,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]}],"rectZAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.625,"value":0.5,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.75,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"lissAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.12241581186540826,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.25,"value":0.45,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.375,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"torusAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.625,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.75,"value":0.3,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.875,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"torusRotate":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]}],"warpAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.75,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.875,"value":0.2,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"ballRot":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.125,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.25,"value":0.18070346103469181,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":0.625,"value":0,"mode":4,"params":{"rate":10000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"noiseAmp":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.875,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}]},"gui":{"snap":{"enable":true,"bpm":"120","offset":"0"}}}
`
} );
let auto = automaton.auto;

// ------

let width = canvas.width = 320;
let height = canvas.height = 320;

let gl = canvas.getContext( 'webgl' );
let glCat = new GLCat( gl );
gl.disable( gl.DEPTH_TEST );

// ------

let tweak = new Tweak( divTweak );

// ------

let totalFrame = 0;
let frame = 0;
let frames = 200;
let time = 0.0;
let init = true;
let secs = 1.0;
let deltaTime = 0.0;

let timeUpdate = () => {
  let reset = false;

  totalFrame ++;
  frame ++;
  if ( frames <= frame ) {
    frame = 0;
    reset = true;
  }
  
  let prevTime = time;
  time = secs * frame / frames;
  deltaTime = ( time + ( reset ? secs : 0.0 ) ) - prevTime;

  init = false;
};

// ------

let particlePixels = 4;
let particlesSqrt = 400;
let particles = particlesSqrt * particlesSqrt;

let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );
let vboParticle = glCat.createVertexbuffer( ( () => {
  let ret = [];
  for ( let i = 0; i < particlesSqrt * particlesSqrt; i ++ ) {
    let ix = i % particlesSqrt;
    let iy = Math.floor( i / particlesSqrt );

    ret.push( ix * particlePixels );
    ret.push( iy );
  }
  return ret;
} )() );

// ------

let vertQuad = glslify( './shader/quad.vert' );

let programReturn = glCat.createProgram(
  vertQuad,
  glslify( './shader/return.frag' )
);

let programPcompute = glCat.createProgram(
  vertQuad,
  glslify( './shader/pcompute.frag' )
);

let programPrender = glCat.createProgram(
  glslify( './shader/prender.vert' ),
  glslify( './shader/prender.frag' )
);

let programBloom = glCat.createProgram(
  vertQuad,
  glslify( './shader/bloom.frag' )
);

let programPost = glCat.createProgram(
  vertQuad,
  glslify( './shader/post.frag' )
);

// ------

let framebufferReturn = glCat.createFloatFramebuffer( width, height );
let framebufferPcomputeReturn = glCat.createFloatFramebuffer( particlesSqrt * particlePixels, particlesSqrt );
let framebufferPcompute = glCat.createFloatFramebuffer( particlesSqrt * particlePixels, particlesSqrt );
let framebufferPrender = glCat.createFloatFramebuffer( width, height );
let framebufferPrev = glCat.createFloatFramebuffer( width, height );
let framebufferMotion = glCat.createFloatFramebuffer( width, height );
let framebufferMotionSel = glCat.createFloatFramebuffer( width, height );
let framebufferBloom = glCat.createFloatFramebuffer( width, height );
let framebufferBloomTemp = glCat.createFloatFramebuffer( width, height );
let framebufferPost = glCat.createFloatFramebuffer( width, height );
let framebufferOut = glCat.createFloatFramebuffer( width, height );
let framebufferMosh = glCat.createFloatFramebuffer( width, height );

// ------

let textureRandomSize = 256;

let textureRandomUpdate = ( _tex ) => {
  glCat.setTextureFromArray( _tex, textureRandomSize, textureRandomSize, ( () => {
    let len = textureRandomSize * textureRandomSize * 4;
    let ret = new Uint8Array( len );
    for ( let i = 0; i < len; i ++ ) {
      ret[ i ] = Math.floor( xorshift() * 256.0 );
    }
    return ret;
  } )() );
};

let textureRandom = glCat.createTexture();
glCat.textureWrap( textureRandom, gl.REPEAT );
textureRandomUpdate( textureRandom );

// ------

let renderA = document.createElement( 'a' );

let saveFrame = () => {
  renderA.href = canvas.toDataURL();
  renderA.download = ( '0000' + totalFrame ).slice( -5 ) + '.png';
  renderA.click();
};

// ------

let cameraPos = [ 0.0, 0.0, 0.0 ];

let render = () => {
  gl.viewport( 0, 0, particlesSqrt * particlePixels, particlesSqrt );
  glCat.useProgram( programReturn );
  gl.bindFramebuffer( gl.FRAMEBUFFER, framebufferPcomputeReturn.framebuffer );
  gl.blendFunc( gl.ONE, gl.ONE );
  glCat.clear( 0.0, 0.0, 0.0, 0.0 );

  glCat.attribute( 'p', vboQuad, 2 );

  glCat.uniform2fv( 'resolution', [ particlesSqrt * particlePixels, particlesSqrt ] );

  glCat.uniformTexture( 'texture', framebufferPcompute.texture, 0 );

  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

  // ------

  gl.viewport( 0, 0, particlesSqrt * particlePixels, particlesSqrt );
  glCat.useProgram( programPcompute );
  gl.bindFramebuffer( gl.FRAMEBUFFER, framebufferPcompute.framebuffer );
  gl.blendFunc( gl.ONE, gl.ONE );
  glCat.clear( 0.0, 0.0, 0.0, 0.0 );

  glCat.attribute( 'p', vboQuad, 2 );

  glCat.uniform1f( 'time', time );
  glCat.uniform1f( 'particlesSqrt', particlesSqrt );
  glCat.uniform1f( 'particlePixels', particlePixels );
  glCat.uniform1f( 'frame', frame % frames );
  glCat.uniform1f( 'frames', frames );
  glCat.uniform1i( 'init', init );
  glCat.uniform1f( 'deltaTime', deltaTime );
  glCat.uniform2fv( 'resolution', [ particlesSqrt * particlePixels, particlesSqrt ] );

  glCat.uniform1f( 'circleAmp', auto( 'circleAmp' ) );
  glCat.uniform1f( 'torusAmp', auto( 'torusAmp' ) );
  glCat.uniform1f( 'rectXAmp', auto( 'rectXAmp' ) );
  glCat.uniform1f( 'rectYAmp', auto( 'rectYAmp' ) );
  glCat.uniform1f( 'rectZAmp', auto( 'rectZAmp' ) );
  glCat.uniform1f( 'multAmp', auto( 'multAmp' ) );
  glCat.uniform1f( 'mult2Amp', auto( 'mult2Amp' ) );
  glCat.uniform1f( 'torusRotate', auto( 'torusRotate' ) );
  glCat.uniform1f( 'warpAmp', auto( 'warpAmp' ) );
  glCat.uniform1f( 'ballRot', auto( 'ballRot' ) );

  glCat.uniformTexture( 'textureReturn', framebufferPcomputeReturn.texture, 0 );
  glCat.uniformTexture( 'textureRandom', textureRandom, 1 );

  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

  // ------

  gl.viewport( 0, 0, width, height );
  glCat.useProgram( programPrender );
  gl.bindFramebuffer( gl.FRAMEBUFFER, framebufferPrender.framebuffer );
  gl.blendFunc( gl.SRC_ALPHA, gl.ONE );
  glCat.clear( 0.0, 0.0, 0.0, 1.0 );

  glCat.attribute( 'vuv', vboParticle, 2 );

  glCat.uniform1i( 'depth', false );
  glCat.uniform1f( 'time', time );
  glCat.uniform2fv( 'resolution', [ width, height ] );
  glCat.uniform2fv( 'resolutionPcompute', [ particlesSqrt * particlePixels, particlesSqrt ] );
  glCat.uniform3fv( 'cameraPos', cameraPos );

  glCat.uniformTexture( 'texturePcompute', framebufferPcompute.texture, 0 );

  gl.drawArrays( gl.POINTS, 0, particles );

  // ------

  for ( let i = 0; i < 4; i ++ ) {
    let gaussVar = 5.0 * Math.pow( i + 1.0, 4.0 );

    // ------

    gl.viewport( 0, 0, width, height );
    glCat.useProgram( programBloom );
    gl.bindFramebuffer( gl.FRAMEBUFFER, framebufferBloomTemp.framebuffer );
    gl.blendFunc( gl.ONE, gl.ONE );
    glCat.clear( 0.0, 0.0, 0.0, 1.0 );

    glCat.attribute( 'p', vboQuad, 2 );

    glCat.uniform1i( 'isVert', false );
    glCat.uniform1f( 'gaussVar', gaussVar );
    glCat.uniform2fv( 'resolution', [ width, height ] );

    glCat.uniformTexture( 'texture', framebufferPrender.texture, 0 );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    // ------

    gl.viewport( 0, 0, width, height );
    glCat.useProgram( programBloom );
    gl.bindFramebuffer( gl.FRAMEBUFFER, framebufferBloom.framebuffer );
    gl.blendFunc( gl.ONE, gl.ONE );
    if ( i === 0 ) { glCat.clear( 0.0, 0.0, 0.0, 1.0 ); }

    glCat.attribute( 'p', vboQuad, 2 );

    glCat.uniform1i( 'isVert', true );
    glCat.uniform1f( 'gaussVar', gaussVar );
    glCat.uniform2fv( 'resolution', [ width, height ] );

    glCat.uniformTexture( 'texture', framebufferBloomTemp.texture, 0 );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  }

  // ------

  gl.viewport( 0, 0, width, height );
  glCat.useProgram( programPost );
  gl.bindFramebuffer( gl.FRAMEBUFFER, framebufferPost.framebuffer );
  gl.blendFunc( gl.ONE, gl.ONE );
  glCat.clear( 0.0, 0.0, 0.0, 1.0 );

  glCat.attribute( 'p', vboQuad, 2 );

  glCat.uniform1f( 'time', time );
  glCat.uniform2fv( 'resolution', [ width, height ] );

  glCat.uniformTexture( 'textureBloom', framebufferBloom.texture, 0 );
  glCat.uniformTexture( 'textureDry', framebufferPrender.texture, 1 );

  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

  // ------

  gl.viewport( 0, 0, width, height );
  glCat.useProgram( programReturn );
  gl.bindFramebuffer( gl.FRAMEBUFFER, null );
  gl.blendFunc( gl.ONE, gl.ONE );
  glCat.clear( 0.0, 0.0, 0.0, 1.0 );

  glCat.attribute( 'p', vboQuad, 2 );

  glCat.uniform2fv( 'resolution', [ width, height ] );

  glCat.uniformTexture( 'texture', framebufferPost.texture, 0 );

  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}

// ------

let update = () => {
  if ( !tweak.checkbox( 'play', { value: true } ) ) {
    setTimeout( update, 10 );
    return;
  }

  cameraPos = [ 0.0, 0.0, 2.0 ];

  automaton.update( time );
  render();

  console.log( totalFrame );

  timeUpdate();

  if ( tweak.checkbox( 'save', { value: false } ) ) {
    saveFrame();
  }
  
  requestAnimationFrame( update );
};

// ------

step( {
  0: ( done ) => {
    update();
  }
} );

window.addEventListener( 'keydown', ( _e ) => {
  if ( _e.which === 27 ) {
    tweak.checkbox( 'play', { set: false } );
  }
} );
