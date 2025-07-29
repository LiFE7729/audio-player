const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: getComputedStyle(document.documentElement).getPropertyValue('--wave'),
  progressColor: getComputedStyle(document.documentElement).getPropertyValue('--progress'),
  height: 128,
  responsive: true
});

wavesurfer.load('audio/demo.mp3');

const playBtn = document.getElementById('play');
const rewindBtn = document.getElementById('rewind');
const skipBtn = document.getElementById('skip');

playBtn.addEventListener('click', () => {
  wavesurfer.playPause();
  playBtn.textContent = wavesurfer.isPlaying() ? '⏸️' : '▶️';
});

rewindBtn.addEventListener('click', () => {
  wavesurfer.setCurrentTime(wavesurfer.getCurrentTime() - 15);
});

skipBtn.addEventListener('click', () => {
  wavesurfer.setCurrentTime(wavesurfer.getCurrentTime() + 15);
});
