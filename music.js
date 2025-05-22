const btn = document.getElementById("music-toggle");
const music = document.getElementById("bg-music");
let isPlaying = false;

btn.addEventListener("click", () => {
  if (!isPlaying) {
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
  } else {
    music.pause();
    btn.innerHTML = "🔊";
    isPlaying = false;
  }
});
