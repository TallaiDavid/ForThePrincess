const gameArea = document.getElementById('gameArea');
const cat = document.getElementById('cat');
const protectBtn = document.getElementById('protectBtn');
const heartsDiv = document.getElementById('hearts');
const timerSpan = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const victoryScreen = document.getElementById('victory');

let hp = 5;
let isProtected = false;
let timeLeft = 40;
let gameRunning = true;
let obstacles = [];

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

// Cica mozgás
let catY = 20;
document.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  if (e.key === 'ArrowUp' && catY < 300) catY += 50;
  if (e.key === 'ArrowDown' && catY > 20) catY -= 50;
  cat.style.bottom = `${catY}px`;
});

// Protect gomb
protectBtn.addEventListener('click', () => {
  if (isProtected || !gameRunning) return;
  isProtected = true;
  protectBtn.textContent = '💖 Aktív!';

  // random mondatok
  const messages = [
    'te vagy életem fénypontja',
    'Dáma szeret téged!',
    'tetszik amikor a lovaglásról beszélsz ><',
    'jobb élőben látni Dámát, mint személyesen'
  ];

  // több purr.gif + love message random helyen
  for (let i = 0; i < 6; i++) {
    // purr.gif
    const purr = document.createElement('img');
    purr.src = 'assets/purr.gif';
    purr.classList.add('purr');
    const randX = Math.random() * (window.innerWidth - 100);
    const randY = Math.random() * (window.innerHeight - 450);
    purr.style.left = `${randX}px`;
    purr.style.top = `${randY}px`;
    document.body.appendChild(purr);
    setTimeout(() => purr.remove(), 3000);

    // love-msg
    const msg = document.createElement('div');
    msg.classList.add('love-msg');
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    const msgX = Math.random() * (window.innerWidth - 200);
    const msgY = Math.random() * (window.innerHeight - 450);
    msg.style.left = `${msgX}px`;
    msg.style.top = `${msgY}px`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
  }

  // shield hatás ideje
  setTimeout(() => {
    isProtected = false;
    protectBtn.textContent = '💖 Protect';
  }, 3000);
});


// Akadályok
function createObstacle() {
  const obstacle = document.createElement('img');
  obstacle.src = 'assets/akadaly1.jpg';
  obstacle.classList.add('obstacle');
  obstacle.style.left = '800px';
  obstacle.style.bottom = `${20 + Math.random() * 250}px`;
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);

  let moveInterval = setInterval(() => {
    if (!gameRunning) return clearInterval(moveInterval);
    let left = parseInt(obstacle.style.left);
    obstacle.style.left = `${left - 7}px`;

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

// Időzítő és akadály-generálás
let gameTimer = setInterval(() => {
  if (!gameRunning) return;
  timeLeft--;
  timerSpan.textContent = timeLeft;
  if (timeLeft <= 0) endGame(true);
}, 1000);

// Több akadály
setInterval(() => {
  if (gameRunning) createObstacle();
}, 2000);

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
document.getElementById('menuBtn2').onclick = () => location.href = 'game.html';
