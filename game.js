// --- DREAMLAND MECHANIKA ---
// ha mind a 4 gombra legalább egyszer rákattintottak, megnyílik a wall.gif

const buttons = {
  lovarda: document.getElementById("lovardaBtn"),
  liesofp: document.getElementById("liesBtn"),
  alien: document.getElementById("alienBtn"),
  egyetem: document.getElementById("egyetemBtn")
};

const wallGif = document.getElementById("wallGif");
const dreamMsg = document.getElementById("dreamMsg");

// localStorage: menti, h melyik játékokra kattintott
let played = JSON.parse(localStorage.getItem("playedGames")) || {
  lovarda: false,
  liesofp: false,
  alien: false,
  egyetem: false
};

// amikor rákattint egy gombra
function startGame(name) {
  played[name] = true;
  localStorage.setItem("playedGames", JSON.stringify(played));
  window.location.href = `${name}.html`;
}

// betöltéskor megnézi, megnyílt-e a dreamland
document.addEventListener("DOMContentLoaded", () => {
  const allPlayed = Object.values(played).every(v => v);
  if (allPlayed) activateDreamland();
});

// Dreamland megnyitása
function activateDreamland() {
  const wall = document.getElementById("wallGif");
  wall.classList.add("glow-effect");
  dreamMsg.textContent = "✨ A Dreamland kapuja megnyílt! Kattints a csillogó ablakra 💖";

  wall.style.cursor = "pointer";
  wall.addEventListener("click", () => {
    wall.classList.add("portal-anim");
    dreamMsg.textContent = "🌌 Átlépsz egy új világba...";
    setTimeout(() => (window.location.href = "dreamland.html"), 1500);
  });
}
