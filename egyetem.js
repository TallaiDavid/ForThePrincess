const gameArea = document.getElementById('gameArea');
const cat = document.getElementById('cat');
const protectBtn = document.getElementById('protectBtn');
const superProtectBtn = document.getElementById('superProtectBtn');
const heartsDiv = document.getElementById('hearts');
const timerSpan = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const victoryScreen = document.getElementById('victory');
const superTimerDiv = document.getElementById('superTimer');

let hp = 3; // piros szívek
let goldHearts = 0; // arany szívek
let isProtected = false;
let timeLeft = 60;
let gameRunning = true;
let obstacles = [];
let protectCount = 0;
let superProtectUses = 0;

function renderHearts() {
  heartsDiv.innerHTML = '';
  for (let i = 0; i < hp; i++) {
    const heart = document.createElement('img');
    heart.src = 'assets/szivecske.png';
    heart.classList.add('heart');
    heartsDiv.appendChild(heart);
  }
  for (let i = 0; i < goldHearts; i++) {
    const gheart = document.createElement('img');
    gheart.src = 'assets/szivecske2.png';
    gheart.classList.add('heart');
    heartsDiv.appendChild(gheart);
  }
}
renderHearts();

// mozgás
let catY = 20;
document.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  if (e.key === 'ArrowUp' && catY < 300) catY += 50;
  if (e.key === 'ArrowDown' && catY > 20) catY -= 50;
  cat.style.bottom = `${catY}px`;
});

// Protect logika
protectBtn.addEventListener('click', () => {
  if (isProtected || !gameRunning) return;
  isProtected = true;
  protectBtn.textContent = '💖 Aktív!';

  protectCount++;
  if (protectCount === 3) {
    superProtectBtn.style.display = 'inline-block';
    showFloatingText("Unlockoltad a szupererőd! Megállítottad az időt!");
  }

  const messages = [
    'aktiváltad a tanuló cicust',
    'minden zh immúnis rád',
    'okos cica vagy hercegnő!',
  ];

  for (let i = 0; i < 4; i++) {
    const msg = document.createElement('div');
    msg.classList.add('love-msg');
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    msg.style.position = 'fixed';
    msg.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    msg.style.top = Math.random() * (window.innerHeight - 400) + 'px';
    msg.style.backgroundColor = 'rgba(255, 192, 203, 0.8)';
    msg.style.padding = '6px 10px';
    msg.style.borderRadius = '10px';
    msg.style.animation = 'fadeMsg 3s ease-in-out forwards';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }

  setTimeout(() => {
    isProtected = false;
    protectBtn.textContent = '💖 Protect';
  }, 3000);
});

// Super Protection
superProtectBtn.addEventListener('click', () => {
  if (!gameRunning) return;
  superProtectUses++;
  if (superProtectUses > 2) {
    superProtectBtn.style.display = 'none';
    return;
  }

  // 💖 mindig 3 piros + max 2 arany szív legyen
  if (hp < 3) hp = 3;
  if (goldHearts < 2) goldHearts = 2;
  renderHearts();

  // ⏰ időből -10 mp (de ne menjen 0 alá)
  timeLeft = Math.max(timeLeft - 10, 0);
  timerSpan.textContent = timeLeft;

  gameRunning = false;
  cat.src = 'assets/car17.gif';
  launchConfetti();

  let superTime = 10;
  superTimerDiv.textContent = `🌟 Super Power: ${superTime}s`;

  const interval = setInterval(() => {
    superTime--;
    superTimerDiv.textContent = `🌟 Super Power: ${superTime}s`;
    if (superTime <= 0) {
      clearInterval(interval);
      superTimerDiv.textContent = '';
      cat.src = 'assets/car2.gif';
      gameRunning = true;
    }
  }, 1800);

  if (superProtectUses === 2) {
    // a második használat után eltűnik
    setTimeout(() => {
      superProtectBtn.style.display = 'none';
    }, 10000);
  }
});


// akadály generálás
function createObstacle() {
  const obstacle = document.createElement('img');
  obstacle.src = Math.random() > 7.9 ? 'assets/akadaly3.jpg' : 'assets/akadaly4.gif';
  obstacle.classList.add('obstacle');
  obstacle.style.left = '800px';
  obstacle.style.bottom = `${20 + Math.random() * 250}px`;
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);

  let moveInterval = setInterval(() => {
    if (!gameRunning) return;
    let left = parseInt(obstacle.style.left);
    obstacle.style.left = `${left - 11}px`;

    if (left < -60) {
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
        if (goldHearts > 0) goldHearts--;
        else hp--;
        renderHearts();
        obstacle.remove();
        if (hp <= 0) endGame(false);
      } else {
        obstacle.remove();
      }
    }
  }, 30);
}

// idő és spawn
let gameTimer = setInterval(() => {
  if (!gameRunning) return;
  timeLeft--;
  timerSpan.textContent = timeLeft;
  if (timeLeft <= 0) endGame(true);
}, 1000);

setInterval(() => {
  if (gameRunning) createObstacle();
}, 2000);

// confetti
function launchConfetti() {
  for (let i = 0; i < 25; i++) {
    const conf = document.createElement('div');
    conf.classList.add('confetti');
    conf.style.left = Math.random() * window.innerWidth + 'px';
    conf.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 3000);
  }
}

function showFloatingText(msg) {
  const text = document.createElement('div');
  text.textContent = msg;
  text.style.position = 'fixed';
  text.style.top = '100px';
  text.style.left = '50%';
  text.style.transform = 'translateX(-50%)';
  text.style.backgroundColor = 'rgba(255, 223, 0, 0.9)';
  text.style.padding = '10px 20px';
  text.style.borderRadius = '10px';
  text.style.fontWeight = 'bold';
  text.style.animation = 'fadeMsg 3s ease-in-out forwards';
  document.body.appendChild(text);
  setTimeout(() => text.remove(), 3000);
}

// endgame
function endGame(victory) {
  gameRunning = false;
  clearInterval(gameTimer);
  obstacles.forEach(o => o.remove());
  if (victory) {
    victoryScreen.classList.remove('hidden');
  } else {
    gameOverScreen.classList.remove('hidden');
  }
}

document.getElementById('retryBtn').onclick = () => location.reload();
document.getElementById('menuBtn').onclick = () => location.href = 'game.html';
document.getElementById('retryBtn2').onclick = () => location.reload();
document.getElementById('menuBtn2').onclick = () => location.href = 'game.html';
