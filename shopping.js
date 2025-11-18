/* shopping.js
   - EmailJS: uses service_py8rcea and template_t2mpoji
   - IMPORTANT: replace YOUR_PUBLIC_KEY with your EmailJS public key
*/

// init EmailJS (replace with your public key)
(function(){
  emailjs.init("xramZcvk8oBxW0PMf"); // <-- put your EmailJS Public Key here
})();

// small helpers
function showPopup(text, duration = 2200) {
  const popup = document.getElementById("popup");
  const txt = document.getElementById("popupText");
  txt.textContent = text;
  popup.setAttribute("aria-hidden", "false");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
  }, duration);
}

function showStatus(text) {
  const el = document.getElementById("statusMessage");
  el.textContent = text;
  setTimeout(() => el.textContent = "", 3000);
}

function showHappyCat() {
  const cat = document.getElementById("happyCat");
  cat.style.display = "block";
  setTimeout(() => cat.style.display = "none", 2200);
}

// -------------------- GIFT REVEAL / CLAIM --------------------

document.addEventListener("DOMContentLoaded", () => {
  // click handlers for cards (flip)
  document.querySelectorAll(".gift-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
    });
  });

  // want buttons
  document.querySelectorAll(".want-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      claimGift(parseInt(id, 10), btn);
    });
  });

  // shopping
  document.getElementById("addItemBtn").addEventListener("click", addItem);
  document.getElementById("checkoutBtn").addEventListener("click", finishShopping);
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);

  // express
  document.getElementById("expressBtn").addEventListener("click", sendExpress);

  // initialize cart UI
  renderCart();
});

// map id → name
const giftNames = {
  1: "ajandek2_keyboard_png",
  2: "ajandek3_liesofp.jpg",
  3: "ajandek4_bunny.jpg"
};

/* === 🎁 AJÁNDÉK RULETTE === */

/* === RULETTE (vizuális spin + type parsing) === */
let chosenGift = null;
const cards = document.querySelectorAll(".gift-card");
const spinBtn = document.getElementById("spinButton");
const claimBtn = document.getElementById("claimGift");
const statusBox = document.getElementById("giftStatus");

function extractKeyword(filename) {
  // pl. "ajandek2_keyboard.png" -> "keyboard"
  if (!filename) return "";
  // vegyük az utolsó '_' utáni részt, és vágjuk le a kiterjesztést
  const noPath = filename.split('/').pop();
  const afterUnderscore = noPath.includes('_') ? noPath.split('_').slice(1).join('_') : noPath;
  const keyword = afterUnderscore.split('.')[0];
  return keyword.toLowerCase();
}

spinBtn.onclick = function () {
  spinBtn.disabled = true;
  statusBox.textContent = "Pörgetés... 🎲";

  // villogó/highlight animáció: időzített véletlen
  let flashes = 0;
  const maxFlashes = 18; // összes villanás
  const highlightInterval = 100; // ms
  const interval = setInterval(() => {
    // előző highlight eltávolítása
    cards.forEach(c => c.classList.remove("highlight"));
    const i = Math.floor(Math.random() * cards.length);
    cards[i].classList.add("highlight");
    flashes++;
    if (flashes >= maxFlashes) {
      clearInterval(interval);
      // végső nyertes
      const finalIndex = Math.floor(Math.random() * cards.length);
      const finalCard = cards[finalIndex];
      // flip: add .flip class to inner
      finalCard.classList.add("flip");
      chosenGift = finalCard.getAttribute("data-gift");
      // többi letiltása
      cards.forEach((c, idx) => {
        if (idx !== finalIndex) c.classList.add("disabled");
        c.classList.remove("highlight");
      });
      statusBox.textContent = "Nyeremény feltárva! 🎁";
      claimBtn.style.display = "block";
      // scroll to claim button (kicsit láthatóbbá téve)
      claimBtn.scrollIntoView({behavior:'smooth', block:'center'});
    }
  }, highlightInterval);
};

claimBtn.onclick = function () {
  if (!chosenGift) {
    showPopup("Nincs kiválasztott ajándék még!");
    return;
  }
  claimBtn.disabled = true;
  statusBox.textContent = "Kérelem küldése…";

  // a type mezőbe rakjuk a kulcsszót
  const keyword = extractKeyword(chosenGift); // pl. "keyboard"
  const templateParams = {
    time: new Date().toLocaleString(),
    category: "gift",
    details: chosenGift,
    type: keyword || "ajandek",
    extra: "Rulette választás"
  };

  emailjs.send("service_py8rcea", "template_t2mpoji", templateParams)
    .then(() => {
      showHappyCat();
      showPopup("📩 Megkaptam! Kövi talin átadom 🎁💖");
      statusBox.textContent = "Elküldve ✅";
      setTimeout(() => location.reload(), 1800);
    })
    .catch((err) => {
      console.error("Gift email failed:", err);
      claimBtn.disabled = false;
      statusBox.textContent = "❌ Hiba történt az email küldésekor.";
      showPopup("Hiba történt az üzenetküldésnél 😢");
    });
};


// -------------------- SHOPPING CART --------------------

let cart = []; 

function addItem() {
  const sel = document.getElementById("itemSelect");
  const item = sel.value;
  cart.push(item);
  renderCart();
  showStatus(`${item} hozzáadva a kosárhoz`);
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";
  cart.forEach((it, idx) => {
    const li = document.createElement("li");
    li.textContent = it;
    li.dataset.index = idx;
    list.appendChild(li);
  });
}

function clearCart() {
  cart = [];
  renderCart();
  showStatus("Kosár ürítve");
}

function finishShopping() {
  if (cart.length === 0) {
    showPopup("A kosár üres 😢");
    return;
  }

  const params = {
    type: "Shopping kosár",
    items: cart.join(", "),
    time: new Date().toLocaleString(),
    message: `Kérte a következőket: ${cart.join(", ")}`
  };

  // disable checkout to prevent double sends
  const btn = document.getElementById("checkoutBtn");
  btn.disabled = true;
  showStatus("Kérés küldése…");

  emailjs.send("service_py8rcea", "template_t2mpoji", params)
    .then(() => {
      showHappyCat();
      showPopup("Megkaptam! Kövi talin megveszem ❤️");
      showStatus("Elküldve ✅");
      cart = [];
      renderCart();
      btn.disabled = false;
    })
    .catch((err) => {
      console.error("Shopping email failed:", err);
      btn.disabled = false;
      showPopup("Hiba történt a vásárlásnál 😢");
      showStatus("Hiba a küldésnél");
    });
}

// -------------------- EXPRESS MODE --------------------

function sendExpress() {
  const link = document.getElementById("expressLink").value.trim();
  const comment = document.getElementById("expressComment").value.trim();

  if (!link) {
    showPopup("Írj be egy linket! 😮");
    return;
  }

  const params = {
    type: "Express mód",
    link: link,
    comment: comment,
    time: new Date().toLocaleString(),
    message: `Azonnali kérést küldött: ${link} (${comment})`
  };

  document.getElementById("expressBtn").disabled = true;
  showStatus("Express kérés küldése…");

  emailjs.send("service_py8rcea", "template_t2mpoji", params)
    .then(() => {
      showHappyCat();
      showPopup("Megkaptam! Indulok ASAP! 🏃‍♂️💨");
      showStatus("Elküldve ✅");
      document.getElementById("expressLink").value = "";
      document.getElementById("expressComment").value = "";
      document.getElementById("expressBtn").disabled = false;
    })
    .catch((err) => {
      console.error("Express email failed:", err);
      document.getElementById("expressBtn").disabled = false;
      showPopup("Express küldés sikertelen 😢");
      showStatus("Hiba a küldésnél");
    });
}
