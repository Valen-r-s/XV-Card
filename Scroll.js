const scrollBtn = document.getElementById("scroll-toggle");
let scrollActive = false;
let scrollCanceledByUser = false;
let animationFrame = null;

function cancelScroll() {
  scrollCanceledByUser = true;
  if (animationFrame) cancelAnimationFrame(animationFrame);
  scrollBtn.innerHTML = "▶";
  scrollActive = false;
  console.log("🛑 Scroll pausado");
}

// Escucha interacciones del usuario (mouse, teclado, dedo)
[
  "wheel",
  "touchstart",
  "touchmove",
  "keydown",
  "pointerdown",
  "mousedown",
].forEach((evt) => {
  window.addEventListener(
    evt,
    () => {
      if (scrollActive) cancelScroll();
    },
    { passive: true }
  );
});

function smoothScrollToBottomAndBack() {
  const scrollTarget = document.body.scrollHeight;
  const scrollDuration = 80000;
  const returnDuration = 1000;
  const start = window.scrollY;
  const startTime = performance.now();
  scrollCanceledByUser = false;

  function scrollDown(currentTime) {
    if (scrollCanceledByUser) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);
    window.scrollTo(0, start + (scrollTarget - start) * progress);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(scrollDown);
    } else {
      const upStart = window.scrollY;
      const upStartTime = performance.now();

      function scrollUp(currentTime) {
        if (scrollCanceledByUser) return;

        const elapsedUp = currentTime - upStartTime;
        const progressUp = Math.min(elapsedUp / returnDuration, 1);
        window.scrollTo(0, upStart - upStart * progressUp);

        if (progressUp < 1) {
          animationFrame = requestAnimationFrame(scrollUp);
        } else {
          scrollActive = false;
          scrollBtn.innerHTML = "▶";
        }
      }

      animationFrame = requestAnimationFrame(scrollUp);
    }
  }

  animationFrame = requestAnimationFrame(scrollDown);
}

// 🎮 Botón toggle de scroll
scrollBtn.addEventListener("click", () => {
  if (scrollActive) {
    cancelScroll(); // si está activo, detener
  } else {
    scrollActive = true;
    scrollBtn.innerHTML = "||";
    smoothScrollToBottomAndBack(); // si está pausado, iniciar desde donde está
  }
});
