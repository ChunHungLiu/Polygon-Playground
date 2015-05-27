


// AUDIO

// var audioContext = new AudioContext()

// play(0.5, 1, 0.35)
// play(1, 2, 0.35)
// play(1.5, 4, 0.35)
// play(2, 8, 0.35)
// play(2.5, 20, 0.35)
// play(3, 8, 0.35)
// play(3.5, 4, 0.35)
// play(4, 2, 0.35)


// play(12.8, 1, 0.2)
// play(13.1, 2, 0.2)
// play(13.4, 4, 0.2)
// play(13.7, 8, 0.2)
// play(14, 20, 0.2)
// play(14.3, 8, 0.2)
// play(14.6, 4, 0.2)
// play(14.9, 2, 0.2)


// function play(startAfter, pitch, duration) {
//   var time = audioContext.currentTime + startAfter

//   var oscillator = audioContext.createOscillator()
//   oscillator.connect(audioContext.destination) // change output

//   oscillator.type = 'sine'
//   oscillator.detune.value = pitch * 100 

//   oscillator.start(time)
//   oscillator.stop(time + duration)
// }

// var audioContext = new AudioContext()




// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// var analyser = audioCtx.createAnalyser();

// source = audioCtx.createMediaStreamSource(stream);
// source.connect(analyser);
// analyser.connect(distortion);


// ======================================================

// THREE.JS

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material, mesh;

function setup() {

  var W = window.innerWidth, H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( W, H );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 80, W/H, 1, 10000 );
  camera.position.z = 300;

  scene = new THREE.Scene();
  
  geometry = new THREE.IcosahedronGeometry(150, 0);
  material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading, color: 0xff0000, ambient: 0xffffff, emissive: 0x24479b, specular: 0xfa0000, shininess: 100});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  ambientLight = new THREE.AmbientLight( 0x000000 );
  scene.add( ambientLight );

  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0);
  scene.add( hemisphereLight );

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.position.set( -0.2, 0.46, 0.29 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );

  spotLight1 = new THREE.SpotLight( 0xffffff, 0.77 );
  spotLight1.position.set( 100, 1000, 100 );
  spotLight1.castShadow = true;
  spotLight1.shadowDarkness = 0.2;
  scene.add( spotLight1 );

  spotLight2 = new THREE.SpotLight( 0xffffff, 0.99 );
  spotLight2.position.set( -220, -900, 100 );
  spotLight2.castShadow = true;
  spotLight2.shadowDarkness = 0.2;
  scene.add( spotLight2 );


}

function draw() {

  requestAnimationFrame( draw );
  
  mesh.rotation.x = Date.now() * 0.0005;  
  mesh.rotation.y = Date.now() * 0.0002;  
  mesh.rotation.z = Date.now() * 0.0001;
  renderer.render( scene, camera );

}

setup();
draw();






