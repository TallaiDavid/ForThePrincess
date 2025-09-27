const quizData = {
  basic: [
    { question: "Mi a kedvenc színed?", answers: ["Piros", "Kék", "Rózsaszín", "Fekete"], correct: 2 },
    { question: "Melyik állat a legcukibb?", answers: ["Kutya", "Cica", "Nyuszi", "Alpaka"], correct: 1 },
    { question: "Melyik évszak a legjobb?", answers: ["Tavasz", "Nyár", "Ősz", "Tél"], correct: 0 },
    { question: "Melyik ital a legfrissítőbb?", answers: ["Tea", "Kávé", "Limonádé", "Forró csoki"], correct: 2 },
    { question: "Ki a legjobb társaság?", answers: ["Te", "Én", "Mindkettő", "Egyik se"], correct: 2 }
  ],
  liesofp: [
    { question: "Ki a King of Riddles?", answers: ["Arlecchino", "Venigni", "King of Puppets", "Red Fox"], correct: 0 },
    { question: "Pinocchio és Romeo között milyen kapcsolat volt?", answers: ["Ellenségek", "Testvérek", "Barátok", "Szomszédok"], correct: 2 },
    { question: "Miért kell Sophiának szenvedni?", answers: ["Nem kell, békében haljon meg, eleget szenvedett", "Ő miért tud Pinocchioval beszélni és én miért nem >:("], correct: 0 },
    { question: "Hányszor hazudott eddig Dávid?", answers: ["Egyszer sem, he a good guy", "Lehet pááárszor", "Folyamat hazudik"], correct: 1 },
    { question: "Ki volt a főellenség az Opera House-ban?", answers: ["King of Puppets", "Romeo", "Walker", "Simon Manus"], correct: 1 },
    { question: "Melyik fegyver volt az egyik legerősebb?", answers: ["Picket Staff", "Electric Coil Stick", "Greatsword of Fate", "Puppet Ripper"], correct: 3 },
    { question: "Kinek a bizalmát kellett többszörösen megszerezni?", answers: ["Antonia", "Venigni", "Red Fox & Black Cat", "Sophia"], correct: 2 }
  ],
  horses: [
    { question: "Melyik lónak a legjobb a futása?", answers: ["Telivér", "Arab telivér", "Lipicai", "Shetlandi póni"], correct: 1 },
    { question: "Melyik ló híres a szépségéről?", answers: ["Fríz", "Mustang", "Appaloosa", "Quarter"], correct: 0 },
    { question: "Melyik ló ismert intelligenciájáról?", answers: ["Arab telivér", "Csikó", "Shire", "Lipicai"], correct: 0 },
    { question: "Melyik ló a legerősebb?", answers: ["Fríz", "Shire", "Arab telivér", "Quarter"], correct: 1 },
    { question: "Dáma a legszebb paci a világon?", answers: ["Igen", "Igen"], correct: 0, dama: true }
  ]
};

let currentGame = null;
let currentIndex = 0;
let score = 0;
let questions = [];

function startGame(game) {
  currentGame = game;
  currentIndex = 0;
  score = 0;
  document.getElementById("result").innerHTML = "";
  document.getElementById("dama-img").style.display = "none";
  questions = [...quizData[game]].sort(() => Math.random() - 0.5);
  loadQuestion();
}

function loadQuestion() {
  if (currentIndex >= questions.length) {
    endGame();
    return;
  }

  const quizDiv = document.getElementById("quiz");
  const q = questions[currentIndex];

  quizDiv.innerHTML = `
    <div class="question">${q.question}</div>
    <div class="answers">
      ${q.answers.map((a, i) => `<button onclick="checkAnswer(${i})">${a}</button>`).join("")}
    </div>
  `;

  // Motivációs GIF alul, csak meme3
  const motivationalDiv = document.getElementById("motivational");
  if (currentIndex === 2 || currentIndex === 3) {
    motivationalDiv.style.display = "block";
  } else {
    motivationalDiv.style.display = "none";
  }

  // Dáma kép a quiz alatt
  const damaImg = document.getElementById("dama-img");
  if (q.dama) {
    damaImg.style.display = "block";
  } else {
    damaImg.style.display = "none";
  }
}

function checkAnswer(answer) {
  if (answer === questions[currentIndex].correct) score++;
  currentIndex++;
  loadQuestion();
}

function endGame() {
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("result").innerText = `Vége a játéknak! Pontszám: ${score}/${questions.length}`;
  document.getElementById("dama-img").style.display = "none";
  document.getElementById("motivational").style.display = "none";
  spawnHappyCats();
}

function spawnHappyCats() {
  const cats = ["car11.gif", "car3.gif", "car8.gif"];
  cats.forEach(cat => {
    const img = document.createElement("img");
    img.src = `assets/${cat}`;
    img.className = "happy-cat";
    img.style.left = Math.random() * (window.innerWidth - 120) + "px";
    img.style.top = Math.random() * (window.innerHeight - 120) + "px";
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 4000);
  });
}
