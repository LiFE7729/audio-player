// 1. Grab theme colors from CSS
const waveColor = getComputedStyle(document.documentElement).getPropertyValue('--wave').trim();
const progressColor = getComputedStyle(document.documentElement).getPropertyValue('--progress').trim();

// 2. Create WaveSurfer instance
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

// 3. Load your audio file
wavesurfer.load('audio/demo.mp3');

// 4. Play/Pause button logic
const playBtn = document.getElementById('play');
playBtn.addEventListener('click', () => {
  wavesurfer.playPause();
  playBtn.textContent = wavesurfer.isPlaying() ? '⏸️' : '▶️';
});

// 5. Equalizer filters setup
const audioCtx = wavesurfer.backend.ac;

const bassEQ = audioCtx.createBiquadFilter();
bassEQ.type = "lowshelf";
bassEQ.frequency.value = 200;

const midEQ = audioCtx.createBiquadFilter();
midEQ.type = "peaking";
midEQ.frequency.value = 1000;
midEQ.Q.value = 1;

const trebleEQ = audioCtx.createBiquadFilter();
trebleEQ.type = "highshelf";
trebleEQ.frequency.value = 3000;

// Connect filters
wavesurfer.backend.setFilter([bassEQ, midEQ, trebleEQ]);

// 6. EQ sliders and live values
const bassSlider = document.getElementById("bass");
const midSlider = document.getElementById("mid");
const trebleSlider = document.getElementById("treble");

const bassLabel = document.getElementById("bassValue");
const midLabel = document.getElementById("midValue");
const trebleLabel = document.getElementById("trebleValue");

bassSlider.addEventListener("input", (e) => {
  const val = e.target.value;
  bassEQ.gain.value = val;
  bassLabel.textContent = `${val} dB`;
});

midSlider.addEventListener("input", (e) => {
  const val = e.target.value;
  midEQ.gain.value = val;
  midLabel.textContent = `${val} dB`;
});

trebleSlider.addEventListener("input", (e) => {
  const val = e.target.value;
  trebleEQ.gain.value = val;
  trebleLabel.textContent = `${val} dB`;
});

// 7. Scroll-reveal animation for equalizer
function revealEqualizerOnScroll() {
  const eqSection = document.getElementById('equalizer');
  const rect = eqSection.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.9) {
    eqSection.classList.add('visible');
    window.removeEventListener('scroll', revealEqualizerOnScroll);
  }
}

window.addEventListener('scroll', revealEqualizerOnScroll);

// Call once on load in case section is already visible
revealEqualizerOnScroll();
