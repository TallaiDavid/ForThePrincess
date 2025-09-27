const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const messages = document.getElementById("messages");
const gifContainer = document.getElementById("gif-container");

let noClickCount = 0;

// Random üzenetek ha a "Nem" gombot nyomja
const noMessages = [
  "Biztos vagy benne? 🥺",
  "Tuti??",
  "Extra tuti?? 😳",
  "Most egyedül kell shoppingolnom?? 🥺",
  "Jóó, de azért gondold át még egyszer! "
];

noBtn.addEventListener("click", () => {
  noClickCount++;

  // Random helyre ugrás
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Üzenet a question alá
  messages.innerHTML = "";
  if(noClickCount <= noMessages.length){
    const p = document.createElement("p");
    p.textContent = noMessages[noClickCount - 1];
    messages.appendChild(p);
  }

  // 6. kattintás után extra gif (car14)
  if(noClickCount === 6){
    for(let i=0; i<5; i++){
      const gif = document.createElement("img");
      gif.src = "assets/car14.gif";
      gif.classList.add("extra-no-gif"); // külön class
      gif.style.position = "absolute";
      gif.style.width = "120px";
      gif.style.left = `${Math.random() * (window.innerWidth - 120)}px`;
      gif.style.top = `${Math.random() * (window.innerHeight - 120)}px`;
      gif.style.animation = "pop-in 1s ease forwards";
      gifContainer.appendChild(gif);
    }
  }
});

// Ha az "Igen"-t nyomja → cuki gifek spawn + eltüntetjük a car14 gifeket
yesBtn.addEventListener("click", () => {
  // eltüntetjük a car14 gifeket
  document.querySelectorAll(".extra-no-gif").forEach(el => el.remove());

  // spawn random car3 / car8 gifek
  for (let i = 0; i < 5; i++) {
    const gif = document.createElement("img");
    gif.src = Math.random() > 0.5 ? "assets/car3.gif" : "assets/car8.gif";
    gif.style.position = "absolute";
    gif.style.width = "100px";
    gif.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    gif.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    gif.style.animation = "pop-in 1s ease forwards";
    gifContainer.appendChild(gif);
  }
});
