const dropzone = document.getElementById("dropzone");
const preview = document.getElementById("preview");

// 🔹 LocalStorage-ból töltsük vissza a képeket induláskor
window.addEventListener("load", () => {
  const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  savedImages.forEach(src => addImage(src));
  placeRandomGifs();
});

// 🔹 Drag & Drop események
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");

  const files = e.dataTransfer.files;
  handleFiles(files);
});

// 🔹 Kép feldolgozása
function handleFiles(files) {
  [...files].forEach(file => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgSrc = e.target.result;
      addImage(imgSrc);

      // Mentés LocalStorage-be
      let savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
      savedImages.push(imgSrc);
      localStorage.setItem("galleryImages", JSON.stringify(savedImages));
    };
    reader.readAsDataURL(file);
  });
}

// 🔹 Kép megjelenítése
function addImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("gallery-img");
  preview.appendChild(img);
}

// --- Random gifek ---
const gifContainer = document.getElementById("random-gifs");
const gifList = ["car5.gif", "car13.gif", "car10.gif", "car9.gif"];

// Hány gifet tegyen ki egyszerre
const gifCount = 4;

function placeRandomGifs() {
  gifContainer.innerHTML = ""; // töröljük a régieket

  for (let i = 0; i < gifCount; i++) {
    const img = document.createElement("img");
    img.src = `assets/${gifList[i]}`;
    img.classList.add("floating-gif");

    // random pozíció
    img.style.position = "absolute";
    img.style.top = Math.random() * 80 + "vh";
    img.style.left = Math.random() * 80 + "vw";

    gifContainer.appendChild(img);
  }
}
