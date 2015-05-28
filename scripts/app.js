// Shapes which can be used later

// new THREE.CubeGeometry(200, 200, 200);
// new THREE.SphereGeometry(150, 100, 100);
// new THREE.IcosahedronGeometry(136.88, 0);
// new THREE.TorusGeometry(100, 40, 40, 40, 6.28);
// new THREE.TorusKnotGeometry(100, 40, 64, 8, 2, 3, 1);


// global for web audio data
var dataArray;

  var points = [
    new THREE.Vector3( 78.44, 54.07, -60.01 ),
    new THREE.Vector3( 56.27, -26.38, 12.46 ),
    new THREE.Vector3( -20.05, 28.56, 29.04 ),
    new THREE.Vector3( 81.05, 96.49, 73.14 ),
    new THREE.Vector3( -15.11, 17.76, 48.29 ),
    new THREE.Vector3( 19.41, 33.28, 15.8 ),
    new THREE.Vector3( -63.28, -84.1, -74.08 ),
    new THREE.Vector3( -38.67, -91.75, -10.46 ),
    new THREE.Vector3( -62.22, -33.21, -52 ),
  ];
// --------------------------------------------------------


// /////////////////////////////////////////////
// /////////////// datGUI setup ////////////////
// /////////////////////////////////////////////

//Define the controller constructor
var AxisControlsConstructor = function() {
  this.rotationX = 0.001;
  this.rotationY = 0.001;
  this.rotationZ = 0.001;
};

var VectorPointConstructor = function() {
}


var CameraControlsConstructor = function() {
  this.positionX = 50;
  this.positionY = -45;
  this.positionZ = 300;
};
// create the gui
var gui = new dat.GUI();

// instantiate the controls
var axisControls = new AxisControlsConstructor();
var cameraControls = new CameraControlsConstructor();
var vectorPointControls = new VectorPointConstructor();

// declare the folder
var f1 = gui.addFolder('Axit Rotation');
var f2 = gui.addFolder('Vector Points');
var f3 = gui.addFolder('Shape Colour');
var f4 = gui.addFolder('Lighting');
var f5 = gui.addFolder('Camera');
var f6 = gui.addFolder('Environment');

// render the folders as open
f1.open();

f2.open();

// add controls to folder
f1.add(axisControls, 'rotationX', 0, .2).listen();
f1.add(axisControls, 'rotationY', 0, .2).listen();
f1.add(axisControls, 'rotationZ', 0, .2).listen();

f5.add(cameraControls, 'positionX', -400, 400).listen();
f5.add(cameraControls, 'positionY', -400, 400).listen();
f5.add(cameraControls, 'positionZ', -400, 400).listen();




// /////////////////////////////////////////////
// ///////////////// three.js //////////////////
// /////////////////////////////////////////////

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material, mesh;
var vectorPointPositionControls;

var stuff = [];

var VectorPointPositionConstructor = function(i) {
  this.vectorX = mesh.geometry.vertices[1].x
  this.vectorY = mesh.geometry.vertices[1].y
  this.vectorZ = mesh.geometry.vertices[1].z
};


function updateGeometry(){
  geometry.verticesNeedUpdate = true;
}

function setup(context) {

  //----SETUP ENVIRONMENT----
  // instantiate the THREE scene
  scene = new THREE.Scene(); 

  // instantiate webGL as the renderer
  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor( 0xADD8E6 );


  // declare and set the width+height of the renderer
  var W = window.innerWidth, H = window.innerHeight;
  renderer.setSize( W, H );
  document.body.appendChild( renderer.domElement );

  // set the camera perspective
  camera = new THREE.PerspectiveCamera( 80, W/H, 1, 10000 );

  // ---SETUP 3d OBJECT -----

  material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
  geometry = new THREE.ConvexGeometry( points );
  mesh = new THREE.Mesh(geometry, material);
  
  for (var i = 0; i < points.length; i++) {
    vectorPointPositionControls = new VectorPointPositionConstructor();
    stuff.push(vectorPointPositionControls);
    var generateFolder = f2.addFolder('Point ' + i);
    generateFolder.add(stuff[i], 'vectorX', -100, 100).listen();
    generateFolder.add(stuff[i], 'vectorY', -100, 100).listen();
    generateFolder.add(stuff[i], 'vectorZ', -100, 100).listen();
    // instantiate the controls, loop through and retrieve individual vector points

    // generateFolder.add(vectorPointPositionControls, 'vectorY', -100, 100).listen();
    // generateFolder.add(vectorPointPositionControls, 'vectorZ', -100, 100).listen();
  }
  // addes mesh to the scene

  scene.add(mesh);




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

// /////////////////////////////////////////////
// ////////////// Web Audio API ////////////////
// /////////////////////////////////////////////

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

      // Change object properties on keydown from analyzer data
      console.log(dataArray);
      
      axisControls.rotationX += Math.random() / 500;
      axisControls.rotationY += Math.random() / 500;
      axisControls.rotationZ += Math.random() / 500;

      mesh.geometry.vertices[1].z = dataArray[150] / 5;
      mesh.geometry.vertices[2].x = dataArray[220] / 10;
      mesh.geometry.vertices[3].y = dataArray[33] / 30;
      mesh.geometry.vertices[4].x = dataArray[23] / 13;
      mesh.geometry.vertices[5].y = dataArray[55] / 13;
      mesh.geometry.vertices[6].z = dataArray[99] / 40;
      mesh.geometry.vertices[7].x = dataArray[156] / 10;

      // mesh.geometry.vertices[0].z = dataArray[50] / 10;
      // mesh.geometry.vertices[0].x = dataArray[50] / 10;
      // mesh.geometry.vertices[0].y = dataArray[50] / 10;
      // mesh.geometry.vertices[1].z = dataArray[50] / 10;
      // mesh.geometry.vertices[1].x = dataArray[50] / 10;
      // mesh.geometry.vertices[1].y = dataArray[50] / 10;
      // mesh.geometry.vertices[2].z = dataArray[50] / 10;
      // mesh.geometry.vertices[2].x = dataArray[50] / 10;
      // mesh.geometry.vertices[2].y = dataArray[50] / 10;
      // mesh.geometry.vertices[3].z = dataArray[50] / 10;
      // mesh.geometry.vertices[3].x = dataArray[50] / 10;
      // mesh.geometry.vertices[3].y = dataArray[50] / 10;
      // mesh.geometry.vertices[4].z = dataArray[50] / 10;
      // mesh.geometry.vertices[4].x = dataArray[50] / 10;
      // mesh.geometry.vertices[4].y = dataArray[50] / 10;
      // mesh.geometry.vertices[5].z = dataArray[50] / 10;
      // mesh.geometry.vertices[5].x = dataArray[50] / 10;
      // mesh.geometry.vertices[5].y = dataArray[50] / 10;
      // mesh.geometry.vertices[6].z = dataArray[50] / 10;
      // mesh.geometry.vertices[6].x = dataArray[50] / 10;
      // mesh.geometry.vertices[6].y = dataArray[50] / 10;
      // mesh.geometry.vertices[7].z = dataArray[50] / 10;
      // mesh.geometry.vertices[7].x = dataArray[50] / 10;
      // mesh.geometry.vertices[7].y = dataArray[50] / 10;

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

}

// /////////////////////////////////////////////
// //////////// Render 3d on page //////////////
// /////////////////////////////////////////////

function draw() {
  // take rotation values from datGUI axisControls
  mesh.rotation.x += axisControls.rotationX;
  mesh.rotation.y += axisControls.rotationY;
  mesh.rotation.z += axisControls.rotationZ;

  // take camera values from datGUI cameraControls
  camera.position.x = cameraControls.positionX;
  camera.position.y = cameraControls.positionY;
  camera.position.z = cameraControls.positionZ;

  // VECTOR POINTS
  // console.log(vectorPointPositionControls.vectorX);
  for(var i=0; i<3; i++) {
    mesh.geometry.vertices[i].x = stuff[i].vectorX;    
    mesh.geometry.vertices[i].y = stuff[i].vectorY; 
    mesh.geometry.vertices[i].z = stuff[i].vectorZ; 

  }

  updateGeometry();
  requestAnimationFrame( draw );
  renderer.render( scene, camera );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);

// buildVectorPointsFolders();
setup();
draw();