window.addEventListener("load", () => {
  const scrollTarget = document.body.scrollHeight;
  const scrollDuration = 80000;
  const start = window.scrollY;
  const startTime = performance.now();

  let userScrolled = false;
  let animationFrame;

  function cancelScrollOnUserInput() {
    userScrolled = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
  }

  // 🔐 Escucha eventos de usuario desde el principio
  window.addEventListener("wheel", cancelScrollOnUserInput, { passive: true });
  window.addEventListener("touchstart", cancelScrollOnUserInput, {
    passive: true,
  });
  window.addEventListener("keydown", cancelScrollOnUserInput);
  window.addEventListener("pointerdown", cancelScrollOnUserInput);

  function smoothScroll(currentTime) {
    if (userScrolled) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);

    window.scrollTo(0, start + (scrollTarget - start) * progress);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(smoothScroll);
    } else {
      // 🕒 Esperar 2 segundos antes de volver arriba
      setTimeout(() => {
        const upStart = window.scrollY;
        const upStartTime = performance.now();

        function scrollUp(currentTime) {
          if (userScrolled) return;

          const elapsedUp = currentTime - upStartTime;
          const progressUp = Math.min(elapsedUp / 1000, 1);

          window.scrollTo(0, upStart - upStart * progressUp);

          if (progressUp < 1) {
            animationFrame = requestAnimationFrame(scrollUp);
          }
        }

        animationFrame = requestAnimationFrame(scrollUp);
      }, 1000);
    }
  }
  setTimeout(() => {
    if (!userScrolled) {
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  }, 0.1);
});
