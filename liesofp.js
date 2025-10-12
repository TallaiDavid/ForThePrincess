const gameArea = document.getElementById("gameArea");
const cat = document.getElementById("cat");
const protectBtn = document.getElementById("protectBtn");
const heartsDiv = document.getElementById("hearts");
const timerSpan = document.getElementById("timer");
const gameOverScreen = document.getElementById("gameOver");
const victoryScreen = document.getElementById("victory");

let hp = 5;
let isProtected = false;
let timeLeft = 40;
let gameRunning = true;
let obstacles = [];

function renderHearts() {
  heartsDiv.innerHTML = "";
  for (let i = 0; i < hp; i++) {
    const heart = document.createElement("img");
    heart.src = "assets/szivecske.png";
    heart.classList.add("heart");
    heartsDiv.appendChild(heart);
  }
}
renderHearts();

// Mozgás (fel/le)
let catY = 20;
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowUp" && catY < 300) catY += 50;
  if (e.key === "ArrowDown" && catY > 20) catY -= 50;
  cat.style.bottom = `${catY}px`;
});

// Protect mód
protectBtn.addEventListener("click", () => {
  if (isProtected || !gameRunning) return;
  isProtected = true;
  protectBtn.textContent = "⚔️ Aktív!";
  cat.src = "assets/car15.gif";

  const messages = [
    "megóvtad a cicát a puppetektől ❤️",
    "Proud of you, princess~",
    "soha nem hagylak el, még Krat legsötétebb utcáin sem 💀",
    "hazugság ide vagy oda, te mindig igazat mondasz nekem 💕",
    "a szíved erősebb, mint bármely puppet!"
  ];

  for (let i = 0; i < 6; i++) {
    const msg = document.createElement("div");
    msg.classList.add("love-msg");
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    msg.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
    msg.style.top = `${Math.random() * (window.innerHeight - 450)}px`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
  }

  setTimeout(() => {
    isProtected = false;
    protectBtn.textContent = "⚔️ Protect";
    cat.src = "assets/car2.gif";
  }, 3000);
});

// Akadály-generálás
function createObstacle() {
  const obstacle = document.createElement("img");
  obstacle.src = "assets/akadaly2.gif";
  obstacle.classList.add("obstacle");
  obstacle.style.left = "800px";
  obstacle.style.bottom = `${20 + Math.random() * 250}px`;
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);

  let moveInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(moveInterval);
      return;
    }

    let left = parseInt(obstacle.style.left);
    obstacle.style.left = `${left - 8}px`;

    if (left < -70) {
      obstacle.remove();
      obstacles = obstacles.filter(o => o !== obstacle);
      clearInterval(moveInterval);
    }

    const catRect = cat.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    if (
      !(catRect.right < obsRect.left ||
        catRect.left > obsRect.right ||
        catRect.bottom < obsRect.top ||
        catRect.top > obsRect.bottom)
    ) {
      if (!isProtected) {
        hp--;
        renderHearts();
        obstacle.remove();
        if (hp <= 0) endGame(false);
      } else {
        obstacle.remove();
      }
    }
  }, 30);
}

// Időzítő
let gameTimer = setInterval(() => {
  if (!gameRunning) return;
  timeLeft--;
  timerSpan.textContent = timeLeft;
  if (timeLeft <= 0) endGame(true);
}, 1000);

// Folyamatos akadályok
const obstacleSpawner = setInterval(() => {
  if (gameRunning) createObstacle();
}, 1800);

// Vége a játéknak
function endGame(victory) {
  gameRunning = false;
  clearInterval(gameTimer);
  clearInterval(obstacleSpawner);
  obstacles.forEach(o => o.remove());
  if (victory) victoryScreen.classList.remove("hidden");
  else gameOverScreen.classList.remove("hidden");
}

// Gombok
document.getElementById("retryBtn").onclick = () => location.reload();
document.getElementById("menuBtn").onclick = () => location.href = "game.html";
document.getElementById("menuBtn2").onclick = () => location.href = "game.html";
document.getElementById("menuBtn3").onclick = () => location.href = "game.html";
