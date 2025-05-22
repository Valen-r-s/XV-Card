window.addEventListener("load", () => {
  const scrollTarget = document.body.scrollHeight;
  const scrollDuration = 80000; // duración hacia abajo
  const returnDuration = 1000; // duración hacia arriba
  const start = window.scrollY;
  const startTime = performance.now();

  let userScrolled = false;
  let animationFrame;

  function cancelScrollOnUserInput() {
    userScrolled = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    console.log("🛑 Scroll automático cancelado por el usuario.");
  }

  // Detectar cualquier interacción táctil, mouse o teclado
  [
    "wheel",
    "touchstart",
    "touchmove",
    "keydown",
    "pointerdown",
    "mousedown",
  ].forEach((evt) => {
    window.addEventListener(evt, cancelScrollOnUserInput, { passive: true });
  });

  function smoothScroll(currentTime) {
    if (userScrolled) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);
    window.scrollTo(0, start + (scrollTarget - start) * progress);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(smoothScroll);
    } else {
      // ⬆️ Iniciar scroll hacia arriba INMEDIATAMENTE
      const upStart = window.scrollY;
      const upStartTime = performance.now();

      function scrollUp(currentTime) {
        if (userScrolled) return;

        const elapsedUp = currentTime - upStartTime;
        const progressUp = Math.min(elapsedUp / returnDuration, 1);
        window.scrollTo(0, upStart - upStart * progressUp);

        if (progressUp < 1) {
          animationFrame = requestAnimationFrame(scrollUp);
        }
      }

      animationFrame = requestAnimationFrame(scrollUp);
    }
  }

  // Iniciar scroll automático inmediatamente al cargar
  animationFrame = requestAnimationFrame(smoothScroll);
});
