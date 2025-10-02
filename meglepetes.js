// --- Konfetti ---
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// --- Rap szöveg ---
const rapLines = [
  "Hercegnő, mikor rád nézek, szebb lesz a világ,",
  "Minden mosolyod újabb csodát csinál.",
  "Szemedben csillagok, fénylő ragyogás,",
  "Nélküled minden csak szürke árnyalás.",
  "Neked dobban a szívem minden ütemre,",
  "Nélküled a nap se kelne fel reggelre.",
  "Én vagyok a cica, aki rappelve vallja,",
  "Te vagy a legszebb, a szívem legszebb csodája. ❤️"
];

document.getElementById("startRap").addEventListener("click", () => {
  const rapCat = document.getElementById("rapCat");
  const rapText = document.getElementById("rapText");
  const rapper2Container = document.getElementById("rapper2Container");

  rapCat.src = "assets/rapper1.gif"; 
  rapText.innerHTML = "";
  rapper2Container.innerHTML = "";

  // Random mennyiségű rapper2 (5–8 db)
  const count = Math.floor(Math.random() * 4) + 5;
  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = "assets/rapper2.gif";
    img.className = "rapper2";
    img.style.top = `${Math.random() * 80 + 10}%`;
    img.style.left = `${Math.random() * 80 + 10}%`;
    rapper2Container.appendChild(img);
  }

  launchConfetti();

  // Első 2 sor azonnal
  rapText.innerHTML += `<p>${rapLines[0]}</p>`;
  rapText.innerHTML += `<p>${rapLines[1]}</p>`;
  let i = 2;

  const interval = setInterval(() => {
    if (i < rapLines.length) {
      rapText.innerHTML += `<p>${rapLines[i]}</p>`;
      i++;
    } else {
      clearInterval(interval);
      launchConfetti();
      // rapper2 eltűnik
      rapper2Container.innerHTML = "";
    }
  }, 2000);
});

// --- Riddles ---
const riddles = [
  { q: "Ki hazudik többet: az ember vagy a báb?", a: ["Az ember", "A báb"], correct: 0 },
  { q: "Mi az, ami mindennek a gyökere, mégis láthatatlan?", a: ["A hazugság", "A vér"], correct: 0 },
  { q: "Mi születik könnyből, és hal meg fényben?", a: ["A gyertya", "Az álmok"], correct: 0 },
  { q: "Ki az, aki sosem alszik, mégis mindig álmodik?", a: ["A város", "A bábmester"], correct: 0 },
  { q: "Mi az, ami mindig változik, de sosem hazudik?", a: ["Az idő", "A történet"], correct: 0 },
  { q: "A bábnak kell hazudnia, hogy emberré váljon. Igaz vagy hamis?", a: ["Igaz", "Hamis"], correct: 0 }
];

const riddleContainer = document.getElementById("riddleContainer");
const riddleResult = document.getElementById("riddleResult");
const timerMessage = document.getElementById("timerMessage");

function getRandomRiddle() {
  return riddles[Math.floor(Math.random() * riddles.length)];
}

function setLock() {
  const unlockTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("riddleLock", unlockTime);
  updateTimer();
}

function updateTimer() {
  const lock = localStorage.getItem("riddleLock");
  if (!lock) return;
  const diff = lock - Date.now();
  if (diff > 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    timerMessage.textContent = `⏳ Várnod kell még: ${hours} óra ${mins} perc ${secs} mp`;
    setTimeout(updateTimer, 1000);
  } else {
    localStorage.removeItem("riddleLock");
    timerMessage.textContent = "";
    riddleContainer.innerHTML = `<button id="startRiddle">Kezdjük!</button>`;
    document.getElementById("startRiddle").addEventListener("click", playRiddle);
  }
}

function playRiddle() {
  const lock = localStorage.getItem("riddleLock");
  if (lock && Date.now() < lock) {
    // Ha már próbált egyszer és időkorlát van
    riddleContainer.innerHTML = `<p>😔 Sajnálom hercegnő, próbálkozz holnap 😉</p>`;
    updateTimer();
    return;
  }

  const r = getRandomRiddle();
  let html = `<p>${r.q}</p>`;
  r.a.forEach((ans, i) => {
    html += `<button class="answerBtn" data-i="${i}">${ans}</button>`;
  });
  riddleContainer.innerHTML = html;

  document.querySelectorAll(".answerBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".answerBtn").forEach(b => b.disabled = true);

      if (parseInt(btn.dataset.i) === r.correct) {
        riddleResult.innerHTML = `<p>🎉 Helyes válasz, princess! Nyertél egy IRL ajándékot! 🎁</p>
                                  <img src="assets/car3.gif" class="result-cat">`;
        launchConfetti();
      } else {
        riddleResult.innerHTML = `<p>😿 Ez most nem sikerült... térj vissza holnap!</p>
                                  <img src="assets/car6.gif" class="result-cat">`;
        setLock();
      }
    });
  });
}


document.getElementById("startRiddle").addEventListener("click", playRiddle);
updateTimer();
