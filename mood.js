const catZone = document.getElementById("cat-zone");
const foodZone = document.getElementById("food-zone");
const wordCloud = document.getElementById("word-cloud");
const slider = document.getElementById("moodSlider");
const message = document.querySelector(".mood-message");
const cat = document.getElementById("virtualCat");

let fed = false;
let clicked = false;

const catQuotes = [
  "Gyerünk Princess, ma is gyönyörű vagy 💖",
  "Ha szomorú vagy, itt dorombolok neked 🐱",
  "Ma ettél már? 🍜",
  "Nyugi, minden rendben lesz 🌸",
  "Minden nap egy új esély 🌈"
];

const encouragingWords = [
  "Ügyes vagy hercegnő 💕",
  "Büszke vagyok rád 🌸",
  "Te vagy a napfény ☀️",
  "Én mindig itt vagyok neked 🤍",
  "Legszebb lány vagy 💖",
  "Szeretlek! 💖",
  "Minden rendben lesz 🌸",
  "Örülök, hogy itt vagy 💕",
  "Boldog napot! ☀️",
  "Csodás vagy mindig 😻"
];

// Slider esemény
slider.addEventListener("input", () => {
  const val = slider.value;

  if (val < 30) {
    message.textContent = "😿 Szomorú hangulat";
    cat.src = "assets/sad-cat.gif";
    foodZone.classList.remove("hidden");
  } else if (val < 70) {
    message.textContent = "🙂 Közepes hangulat";
    cat.src = "assets/car6.gif";
    foodZone.classList.add("hidden");
  } else {
    message.textContent = "😺 Boldog hangulat!";
    cat.src = "assets/happy-cat.gif";
    foodZone.classList.add("hidden");
    showWordCloud();
  }
});

// Cica kattintás = shake + purr
catZone.addEventListener("click", () => {
  cat.classList.add("shake");
  setTimeout(() => cat.classList.remove("shake"), 500);
  triggerPurrEffect(cat);
  clicked = true;
  checkTransition();
});

// Purr effekt
function triggerPurrEffect(catEl) {
  for (let i = 0; i < 5; i++) {
    const purr = document.createElement("img");
    purr.src = "assets/purr.gif";
    purr.className = "purr";
    purr.style.left = `${catEl.offsetLeft + Math.random() * 200 - 100}px`;
    purr.style.top = `${catEl.offsetTop + Math.random() * 150 - 50}px`;
    document.body.appendChild(purr);
    setTimeout(() => purr.remove(), 3000);
  }
}

// Hal etetés
const fish = document.getElementById("fish");
fish.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", "fish"));

catZone.addEventListener("dragover", (e) => e.preventDefault());
catZone.addEventListener("drop", () => {
  triggerPurrEffect(cat);
  fed = true;
  setTimeout(checkTransition, 500);
});

// Ellenőrizzük, hogy mindkettő megtörtént-e
function checkTransition() {
  if (fed && clicked) {
    cat.src = "assets/happy-cat.gif";
    slider.value = 100; // slider automatikusan boldogra vált
    message.textContent = "😺 Boldog hangulat!";
    foodZone.classList.add("hidden");
    showWordCloud();
  }
}

// Felhők, több szöveg több helyen
function showWordCloud() {
  wordCloud.classList.remove("hidden");
  wordCloud.innerHTML = "";
  encouragingWords.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.left = Math.random() * 90 + "vw";
    span.style.top = Math.random() * 70 + "vh";
    span.style.animationDelay = `${i * 0.3}s`;
    wordCloud.appendChild(span);
  });
}
