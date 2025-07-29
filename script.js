const waveColor = getComputedStyle(document.documentElement).getPropertyValue('--wave').trim();
const progressColor = getComputedStyle(document.documentElement).getPropertyValue('--progress').trim();

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor,
  progressColor,
  height: 128,
  responsive: true,
  barWidth: 2,
  barGap: 2,
  barRadius: 2,
  cursorWidth: 1,
  normalize: true,
});

// Metadata
const titleEl = document.getElementById('song-title');
const artistEl = document.getElementById('song-artist');

const currentTrack = {
  title: "Demo Song",
  artist: "Your Name",
  file: "audio/demo.mp3"
};

titleEl.textContent = currentTrack.title;
artistEl.textContent = currentTrack.artist;

wavesurfer.load(currentTrack.file);

// Playback controls
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
