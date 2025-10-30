// EmailJS init
(function(){
  emailjs.init("xramZcvk8oBxW0PMf"); // ide írd be az EmailJS publikus kulcsodat!
})();

// --- E-mail küldés ---
function sendRequest(type) {
  const templateParams = {
    type,
    option: getOptionText(type),
    message: `A hercegnő most a(z) "${type}" opciót választotta 💌`
  };

  emailjs.send('service_py8rcea', 'template_j4hx6rs', templateParams)
    .then(() => showStatus("✅ Kérés elküldve, máris intézkedek 💖"))
    .catch(() => showStatus("❌ Hiba történt az üzenet küldésekor."));
}

// --- opció szövegek ---
function getOptionText(type) {
  switch (type) {
    case 'Pénz levonás':
      return document.getElementById("moneyOption").value + " Ft";
    case 'Fuvar / Találkozás':
      return document.getElementById("visitOption").value;
    case 'Hívás / Beszélgetés':
      return document.getElementById("talkOption").value;
    case 'Durci mód':
      return document.getElementById("ignoreOption").value;
    default:
      return "ismeretlen opció";
  }
}

// --- státusz üzenet ---
function showStatus(msg) {
  const el = document.getElementById("statusMessage");
  el.textContent = msg;
  el.style.opacity = 1;
  setTimeout(() => {
    el.style.opacity = 0;
  }, 4000);
}
