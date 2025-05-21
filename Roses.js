const container = document.querySelector(".text-card .petal-container");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.style.left = Math.random() * 100 + "%";
  petal.style.top = Math.random() * container.offsetHeight + "px";
  petal.style.animationDuration = 5 + Math.random() * 4 + "s";
  petal.style.opacity = 0.5 + Math.random() * 0.5;
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;

  container.appendChild(petal);

  setTimeout(() => petal.remove(), 10000);
}

function generatePetals(amount = 1) {
  for (let i = 0; i < amount; i++) {
    createPetal();
  }
}

setInterval(() => generatePetals(2), 200); // 🌸 2 pétalos cada 200ms
