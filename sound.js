let currentAudio = null;

function playSound(id) {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = document.getElementById(id);
  currentAudio.play();
}