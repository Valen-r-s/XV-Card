const countdown = document.getElementById("countdown");
const deadline = new Date("2025-06-28T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance <= 0) {
    clearInterval(timer); // Detener el contador
    countdown.innerHTML = `
      <div class="time-box"><span>00</span><small>Días</small></div>
      <div class="separator">:</div>
      <div class="time-box"><span>00</span><small>Horas</small></div>
      <div class="separator">:</div>
      <div class="time-box"><span>00</span><small>Minutos</small></div>
      <div class="separator">:</div>
      <div class="time-box"><span>00</span><small>Segundos</small></div>
    `;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `
    <div class="time-box"><span>${String(days).padStart(
      2,
      "0"
    )}</span><small>Días</small></div>
    <div class="separator">:</div>
    <div class="time-box"><span>${String(hours).padStart(
      2,
      "0"
    )}</span><small>Horas</small></div>
    <div class="separator">:</div>
    <div class="time-box"><span>${String(minutes).padStart(
      2,
      "0"
    )}</span><small>Minutos</small></div>
    <div class="separator">:</div>
    <div class="time-box"><span>${String(seconds).padStart(
      2,
      "0"
    )}</span><small>Segundos</small></div>
  `;
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
