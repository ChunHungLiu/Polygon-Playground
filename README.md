Demo(in progress): http://torquemad.github.io/TERMITE/

#Mozilla's Web Audio API

The Web Audio API is a relatively new api used for creating and manipulating audio. It can be usd in many apps such as games, synthesizers and audio production.

Everything MUSt lives within 'new AudioContext', think of this like a canvas for sound.

You can also analyze output sounds using the analyzerNode. The data is provided back to you in an audio buffer (pretty much just a giant array of data)

Within audio context, lives 4 different 'nodes': source, transformation, analyzation, destination

- source: audio files, oscillators, etc
- transfomation: delay, filter, compression, something that transforms the sound signal
- analyzation: information about the audio data (can be used for audio visualisation)
- destination: i.e the speakers

###Flow
- instanciate an audio context
- create oscillator (produces a wave pattern)  + set frequency value  
- connect the oscillator to destination(speakers) + start oscillator
- add effects (detune, pitch, etc)
- analyze the audio
- output the sound

Trickey eh?

# WebGL + Three.js

WebGL (Web Graphics Library) is a Javascript API for rendering 3d / 2d graphics compatible with the web browser. It's been stable for about 2-3 years. Although this is Javascript, if feels like an alien language.


Three.js: a library that uses the WebGL source, packages a lot of the noise in to a lot of nice objects and methods to make life easier.

