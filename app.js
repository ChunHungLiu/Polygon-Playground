

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material, mesh;

function setup() {

  var W = window.innerWidth, H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( W, H );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
  camera.position.z = 500;

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

  spotLight1 = new THREE.SpotLight( 0xffffff, 0.88 );
  spotLight1.position.set( 100, 1000, 100 );
  spotLight1.castShadow = true;
  spotLight1.shadowDarkness = 0.2;
  scene.add( spotLight1 );

  spotLight2 = new THREE.SpotLight( 0xffffff, 0.1 );
  spotLight2.position.set( 100, 1000, 100 );
  spotLight2.castShadow = true;
  spotLight2.shadowDarkness = 0.2;
  scene.add( spotLight2 );


}

function draw() {

  requestAnimationFrame( draw );
  
  // experiment with code from the snippets menu here
  mesh.rotation.x = Date.now() * 0.0005;  
  mesh.rotation.y = Date.now() * 0.0002;  
  mesh.rotation.z = Date.now() * 0.001;
  renderer.render( scene, camera );

}

setup();
draw();
