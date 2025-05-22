const btn = document.getElementById("music-toggle");
const music = document.getElementById("bg-music");
let isPlaying = false;

function playMusic() {
  music.volume = 1.0;
  music
    .play()
    .then(() => {
      btn.innerHTML = "🔈";
      isPlaying = true;
    })
    .catch((err) => {
      console.log("Error de reproducción:", err);
    });
}

btn.addEventListener("click", () => {
  if (!isPlaying) {
    playMusic();
  } else {
    music.pause();
    btn.innerHTML = "🔊";
    isPlaying = false;
  }
});

// ✅ Detectar si se debe reproducir automáticamente
window.addEventListener("DOMContentLoaded", () => {
  const shouldPlay = localStorage.getItem("playMusic");
  if (shouldPlay === "true") {
    playMusic();
    localStorage.removeItem("playMusic"); // lo usamos solo una vez
  }
});
