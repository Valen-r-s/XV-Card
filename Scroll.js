window.addEventListener("load", () => {
  const scrollTarget = document.body.scrollHeight;
  const scrollDuration = 100000; // duración de bajada
  const scrollUpDuration = 2000; // duración de subida
  const start = window.scrollY;
  const startTime = performance.now();
  let userScrolled = false;
  let scrollDownCanceled = false;

  // Detectar interacción del usuario
  function cancelScrollOnUserInput() {
    userScrolled = true;
  }

  window.addEventListener("wheel", cancelScrollOnUserInput, { passive: true });
  window.addEventListener("touchstart", cancelScrollOnUserInput, {
    passive: true,
  });
  window.addEventListener("keydown", cancelScrollOnUserInput); // para usuarios con teclado

  // Scroll hacia abajo (lineal)
  function scrollDown(currentTime) {
    if (userScrolled) {
      scrollDownCanceled = true;
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);

    window.scrollTo(0, start + (scrollTarget - start) * progress);

    if (progress < 1) {
      requestAnimationFrame(scrollDown);
    } else if (!scrollDownCanceled) {
      // Después de llegar al fondo, subir
      const returnStart = window.scrollY;
      const returnStartTime = performance.now();

      function scrollUp(currentTime) {
        if (userScrolled) return;

        const elapsedUp = currentTime - returnStartTime;
        const progressUp = Math.min(elapsedUp / scrollUpDuration, 1);

        window.scrollTo(0, returnStart - returnStart * progressUp);

        if (progressUp < 1) {
          requestAnimationFrame(scrollUp);
        }
      }

      requestAnimationFrame(scrollUp);
    }
  }

  setTimeout(() => {
    if (!userScrolled) {
      requestAnimationFrame(scrollDown);
    }
  }, 0.1);
});
