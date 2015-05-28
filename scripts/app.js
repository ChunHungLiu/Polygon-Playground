
// ======================================================

// global for web audio data
var dataArray;


// /////////////////////////////////////////////
// /////////////// datGUI setup ////////////////
// /////////////////////////////////////////////


//Define the controller constructor
var AxisControlsConstructor = function() {
  this.rotationX = 0.0005;
  this.rotationY = 0.0005;
  this.rotationZ = 0.0005;
};
// create the gui
var gui = new dat.GUI();

// instantiate the controls
var AxisControls = new AxisControlsConstructor();

// declare the folder
var f1 = gui.addFolder('Axit Rotation')

// add controls to folder
f1.add(AxisControls, 'rotationX', 0, .2);
f1.add(AxisControls, 'rotationY', 0, .2);
f1.add(AxisControls, 'rotationZ', 0, .2);

// /////////////////////////////////////////////
// /////////////////////////////////////////////




//------------------------

// THREE.JS
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material, mesh;

// temporary global for vector points
var points = [
  new THREE.Vector3( 35.03, 18.67, 59 ),
  new THREE.Vector3( 41.02, -89.52, -56.53 ),
  new THREE.Vector3( -1.77, -56.52, 97.48 ),
  new THREE.Vector3( -2.17, -55.2, -99.59 ),
  new THREE.Vector3( 30.41, 6.23, 93.24 ),
  new THREE.Vector3( -2.17, -23.35, 89.44 ),
  new THREE.Vector3( 85.82, -50.71, 30.72 ),
  new THREE.Vector3( -78, -1.84, -17.91 ),
  new THREE.Vector3( -4.11, 96.3, -71.78 ),
];

function updateGeometry(){
  geometry.verticesNeedUpdate = true;
}

function setup() {

  //----SETUP ENVIRONMENT----
  // instantiate the THREE scene
  scene = new THREE.Scene(); 

  // instantiate webGL as the renderer
  renderer = new THREE.WebGLRenderer();
  // declare and set the width+height of the renderer
  var W = window.innerWidth, H = window.innerHeight;
  renderer.setSize( W, H );
  document.body.appendChild( renderer.domElement );

  // set the camera perspective
  camera = new THREE.PerspectiveCamera( 80, W/H, 1, 10000 );
  camera.position.z = 300;
  //-------------------------


  // ---SETUP 3d OBJECT -----

  material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
  geometry = new THREE.ConvexGeometry( points );
  mesh = new THREE.Mesh(geometry, material);
  
  // addes mesh to the scene
  scene.add(mesh);
  // ------------------------


  // ------- LIGHTING -------
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
  // -----------------------

  // HELPERS
  // var grid = new THREE.GridHelper(50, 5)
  // var color = new THREE.Color("RGB(255,0,0)");
  // scence.add( grid );


  //------WEB AUDIO API-----
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // instantiating new AudioContext
  var context = new AudioContext(),
      settings = {
          id: 'keyboard',
          width: 200,
          height: 50,
          startNote: 'A2',
          whiteNotesColour: '#fff',
          blackNotesColour: '#000',
          borderColour: '#000',
          activeColour: 'yellow',
          octaves: 2
      },
      keyboard = new QwertyHancock(settings);

  var analyser = context.createAnalyser();
  analyser.fftsize = 2048;
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  

  masterGain = context.createGain();
  nodes = [];

  masterGain.gain.value = 0.3;
  masterGain.connect(context.destination); 

  keyboard.keyDown = function (note, frequency) {
      var oscillator = context.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.connect(masterGain);
      oscillator.detune.value = 2
      oscillator.start(0);
      nodes.push(oscillator);


      oscillator.connect(analyser);
      analyser.connect(context.destination);
      

      var bufferLength = analyser.frequencyBinCount
      var dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(dataArray);

      console.log(dataArray);

      
      AxisControls.rotationX += Math.random() / 500;
      AxisControls.rotationY += Math.random() / 500;
      AxisControls.rotationZ += Math.random() / 500;
      console.log(dataArray);

      mesh.geometry.vertices[1].z = dataArray[50] / 10;
      mesh.geometry.vertices[3].x = dataArray[50] / 10;
      mesh.geometry.vertices[5].y = dataArray[50] / 10;

      for (var i = 0; i < mesh.geometry.vertices.length; i++){
        // mesh.geometry.vertices[i].x += dataArray[50] / dataArray[25];
        // mesh.geometry.vertices[i].y += dataArray[50] / dataArray[200];
        // mesh.geometry.vertices[i].z += dataArray[50] / dataArray[15];

      }
        updateGeometry();


  };

  keyboard.keyUp = function (note, frequency) {
      var new_nodes = [];

      for (var i = 0; i < nodes.length; i++) {
          if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
              nodes[i].stop(0);
              nodes[i].disconnect();
          } else {
              new_nodes.push(nodes[i]);
          }
      }

      nodes = new_nodes;
  };
  //------------------------

}

function draw() {
  // take rotation values from AxisControls
  mesh.rotation.x += AxisControls.rotationX;
  mesh.rotation.y += AxisControls.rotationY;
  mesh.rotation.z += AxisControls.rotationZ;

  requestAnimationFrame( draw );
  renderer.render( scene, camera );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);
setup();
draw();