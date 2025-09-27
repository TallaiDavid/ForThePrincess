const container = document.querySelector(".video-list");

// Fix videólista
const videos = [
    "Lies of P_20250821194244.mp4",
    "Lies of P_20250825214232.mp4",
    "Lies of P_20250829234023.mp4",
    "Lies of P_20250907003759.mp4",
    "Lies of P_20250913003211.mp4",
    "Lies of P_20250914182459.mp4",
    "Lies of P_20250921114246.mp4",
    "Lies of P_20250927000526.mp4",
    "Lies of P_20250927015401.mp4",
    "Lies of P_ROMEO.mp4"
];

// Videók generálása
videos.forEach(video => {
  const div = document.createElement("div");
  div.className = "video-card";

  let extraText = "";
  if(video.toUpperCase().includes("ROMEO")) {
    div.classList.add("highlight"); // extra osztály a wow effekthez
    extraText = `<p style="text-align:center; margin-top:0.5rem; color:#ff3366; font-weight:bold;">
                   itt a hear me out-od, hercegnő :p
                 </p>`;
  }

  div.innerHTML = `
    <video controls>
      <source src="assets/videos/${video}" type="video/mp4">
      A böngésződ nem támogatja a videólejátszást.
    </video>
    ${extraText}
  `;
  container.appendChild(div);
});

// Scroll animáció
const cards = document.querySelectorAll(".video-card");
window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const boxTop = card.getBoundingClientRect().top;
    if (boxTop < triggerBottom) card.classList.add("show");
  });
});

// Egyszeri trigger
window.dispatchEvent(new Event("scroll"));
