// Timer: számolja a 2025.08.19 óta eltelt időt
function updateTimer() {
  const startDate = new Date("2025-08-19T00:00:00");
  const now = new Date();

  let diff = now - startDate;

  // átváltás
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  diff -= years * (1000 * 60 * 60 * 24 * 365);

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  diff -= months * (1000 * 60 * 60 * 24 * 30);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  document.getElementById("timer").textContent =
    `${years} év, ${months} hónap, ${days} nap, ${hours} óra, ${minutes} perc, ${seconds} mp`;
}

setInterval(updateTimer, 1000);
updateTimer();
