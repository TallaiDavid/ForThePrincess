const gameArea = document.getElementById('gameArea');
const cat = document.getElementById('cat');
const protectBtn = document.getElementById('protectBtn');
const heartsDiv = document.getElementById('hearts');
const timerSpan = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const victoryScreen = document.getElementById('victory');

let hp = 5;
let isProtected = false;
let timeLeft = 50;
let gameRunning = true;
let alienActive = false; // 👉 csak 1 alien lehet egyszerre

// ❤️ Szívek kirajzolása
function renderHearts() {
  heartsDiv.innerHTML = '';
  for (let i = 0; i < hp; i++) {
    const heart = document.createElement('img');
    heart.src = 'assets/szivecske.png';
    heart.classList.add('heart');
    heartsDiv.appendChild(heart);
  }
}
renderHearts();

// 🛡️ Protect funkció
protectBtn.addEventListener('click', activateProtect);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') activateProtect();
});

function activateProtect() {
  if (isProtected || !gameRunning) return;
  isProtected = true;
  protectBtn.textContent = '💖 Aktív!';
  spawnLoveEffects();

  setTimeout(() => {
    isProtected = false;
    protectBtn.textContent = '💖 Protect';
  }, 3000);
}

// 💞 Protect animációk és üzenetek
function spawnLoveEffects() {
  const messages = [
    'az alien sose foghat el, ha veled vagyok',
    'mindig megmentelek a bajból',
    'imádlak nyuszika, ijesszük el együtt a gonoszt'
  ];

  for (let i = 0; i < 5; i++) {
    const purr = document.createElement('img');
    purr.src = 'assets/purr.gif';
    purr.classList.add('purr');
    purr.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    purr.style.top = Math.random() * (window.innerHeight - 450) + 'px';
    document.body.appendChild(purr);
    setTimeout(() => purr.remove(), 3000);

    const msg = document.createElement('div');
    msg.classList.add('love-msg');
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    msg.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    msg.style.top = Math.random() * (window.innerHeight - 450) + 'px';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
  }
}

// 👽 Alien támadás
function spawnAlien() {
  if (!gameRunning || alienActive) return;
  alienActive = true;

  const alien = document.createElement('img');
  alien.src = 'assets/alien.gif';
  alien.classList.add('alien');
  alien.style.right = '-120px';
  alien.style.bottom = '20px';
  gameArea.appendChild(alien);

  // 🎲 random sebesség: 3s, 5s, 6s beérkezés
  const durations = [3, 5, 6];
  const chosen = durations[Math.floor(Math.random() * durations.length)];
  const totalDistance = 800 + 120; // kb. az alien induló pontjától a cicáig
  const totalFrames = chosen * 60; // 60 FPS
  const movePerFrame = totalDistance / totalFrames;
  let currentRight = -120;

  const move = setInterval(() => {
    if (!gameRunning) return clearInterval(move);

    currentRight += movePerFrame;
    alien.style.right = `${currentRight}px`;

    // 🎥 Az alien lassan, folyamatosan látszódik, ahogy közeledik
    alien.style.opacity = Math.min(1, 0.3 + (currentRight / 800));

    const catRect = cat.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();

    // 💥 Ütközés
    if (
      !(catRect.right < alienRect.left ||
        catRect.left > alienRect.right ||
        catRect.bottom < alienRect.top ||
        catRect.top > alienRect.bottom)
    ) {
      if (!isProtected) {
        hp--;
        renderHearts();
        if (hp <= 0) endGame(false);
      }
      alien.remove();
      clearInterval(move);
      alienActive = false;
    }

    // 🛡️ Védekezés esetén alien eltűnik
    if (isProtected) {
      alien.style.opacity = '0';
      setTimeout(() => {
        alien.remove();
        alienActive = false;
      }, 400);
      clearInterval(move);
    }

    // Ha elérte a cicát
    if (currentRight >= 800) {
      alien.remove();
      clearInterval(move);
      alienActive = false;
    }
  }, 16);
}


// ⏳ időzítő
let gameTimer = setInterval(() => {
  if (!gameRunning) return;
  timeLeft--;
  timerSpan.textContent = timeLeft;
  if (timeLeft <= 0) endGame(true);
}, 1000);

// 👾 Alien spawn időzítése (ritkább)
const alienInterval = setInterval(() => {
  if (gameRunning && !alienActive && Math.random() < 0.5) spawnAlien();
}, 4000);

// 🔚 Játék vége
function endGame(victory) {
  gameRunning = false;
  clearInterval(gameTimer);
  clearInterval(alienInterval);
  document.querySelectorAll('.alien').forEach(a => a.remove());
  if (victory) victoryScreen.classList.remove('hidden');
  else gameOverScreen.classList.remove('hidden');
}

document.getElementById('retryBtn').onclick = () => location.reload();
document.getElementById('menuBtn').onclick = () => location.href = 'game.html';
document.getElementById('menuBtn2').onclick = () => location.href = 'game.html';
