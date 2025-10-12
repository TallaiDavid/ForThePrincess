const bubble = document.getElementById("bubble");
const homeless = document.getElementById("homeless");
const clown = document.getElementById("clown");
const hero = document.getElementById("hero");
const finalScene = document.getElementById("finalScene");
const loveText = document.getElementById("loveText");
const spotifyFrame = document.getElementById("spotifyFrame");
const music = document.getElementById("music");

// --- Üzenetek sorrendben ---
const messages = [
  "olyan csendes ez a város...",
  "senki sincs már mellettem...",
  "talán jobb is így..."
];

let i = 0;
function showMessages() {
  if (i < messages.length) {
    bubble.textContent = messages[i];
    bubble.style.opacity = 1;
    setTimeout(() => {
      bubble.style.opacity = 0;
      i++;
      setTimeout(showMessages, 1500);
    }, 2500);
  } else {
    setTimeout(startEnemies, 2000);
  }
}
showMessages();

// --- Ellenségek támadása ---
function startEnemies() {
  homeless.style.opacity = 1;
  clown.style.opacity = 1;

  setTimeout(() => {
    heroAppears();
  }, 4000);
}

// --- Hős megjelenése ---
function heroAppears() {
  hero.style.opacity = 1;
  hero.style.top = "40px";

  setTimeout(() => {
    homeless.style.opacity = 0;
    clown.style.opacity = 0;
    bubble.textContent = "Gyere velem nyuszi! Én megvédelek a bajtól! 💖";
    bubble.style.opacity = 1;
  }, 2000);

  setTimeout(() => {
    transitionToFinal();
  }, 7000);
}

// --- Dreamland jelenetre váltás ---
function transitionToFinal() {
  const scene = document.getElementById("scene");
  scene.style.transition = "opacity 3s";
  scene.style.opacity = 0;

  setTimeout(() => {
    scene.style.display = "none";
    finalScene.classList.add("visible");

    // YouTube zene csak most induljon
    

    // szöveg és Spotify fade-in késleltetve
    setTimeout(() => {
      loveText.style.opacity = 1;
    }, 1500);

    setTimeout(() => {
      spotifyFrame.style.opacity = 1;
    }, 3500);
  }, 3000);
}

