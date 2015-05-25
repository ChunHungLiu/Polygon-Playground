var audioContext = new AudioContext()

play(0.5, 1, 0.35)
play(1, 2, 0.35)
play(1.5, 4, 0.35)
play(2, 8, 0.35)
play(2.5, 20, 0.35)
play(3, 8, 0.35)
play(3.5, 4, 0.35)
play(4, 2, 0.35)


play(12.8, 1, 0.2)
play(13.1, 2, 0.2)
play(13.4, 4, 0.2)
play(13.7, 8, 0.2)
play(14, 20, 0.2)
play(14.3, 8, 0.2)
play(14.6, 4, 0.2)
play(15.1, 2, 0.2)


function play(startAfter, pitch, duration) {
  var time = audioContext.currentTime + startAfter

  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination) // change output

  oscillator.type = 'sine'
  oscillator.detune.value = pitch * 100 

  oscillator.start(time)
  oscillator.stop(time + duration)
}

var audioContext = new AudioContext()

