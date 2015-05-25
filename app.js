

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material, mesh;

function setup() {

  var W = window.innerWidth, H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( W, H );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
  camera.position.z = 400;
  camera.position.y = 1;

  scene = new THREE.Scene();
  
  
  // paste your code from the geometryGUI here

  geometry = new THREE.CubeGeometry(100, 100, 100);
  material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  

  
  
}

function draw() {

  requestAnimationFrame( draw );
  
  // experiment with code from the snippets menu here
  mesh.rotation.x = Date.now() * 0.001; 
  mesh.rotation.y = Date.now() * 0.001; 
  mesh.rotation.z = Date.now() * 0.0001;

  renderer.render( scene, camera );

}

setup();
draw();