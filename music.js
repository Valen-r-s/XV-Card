const btn = document.getElementById("music-toggle");
const music = document.getElementById("bg-music");
let isPlaying = false;

function playMusic() {
  music.volume = 1.0;
  music
    .play()
    .then(() => {
      btn.innerHTML = "🎵";
      isPlaying = true;
    })
    .catch((err) => {
      console.log("Error al reproducir música:", err);
    });
}

function pauseMusic() {
  music.pause();
  btn.innerHTML = "🎵";
  isPlaying = false;
}

btn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});
