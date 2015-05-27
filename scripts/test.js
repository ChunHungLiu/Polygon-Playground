var letsDoThis = function() {
  var audioCtx = new AudioContext();
  var audio = document.getElementById('myAudio');
  var source = audioCtx.createMediaElementSource(audio);
  
  // connect the MediaElementSource to the analyser node 
  var analyser = audioCtx.createAnalyser();
  source.connect(analyser);

 
  // frequencyBinCount provides values receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
 
  // data should be received

  // loop
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     // console.log(frequencyData)
  }
  audio.start();
  renderFrame();
};