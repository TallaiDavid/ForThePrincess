document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  const cartItemsList = document.getElementById("cart-items");
  const closeCartBtn = document.getElementById("close-cart");
  const finalizeBtn = document.getElementById("finalize");

  let cart = [];

  // Termékek kattintás
  document.querySelectorAll(".product").forEach(product => {
    product.addEventListener("click", () => {
      const name = product.dataset.name;
      const img = product.dataset.img;

      cart.push({ name, img });
      cartCount.textContent = cart.length;

      // Animáció: termék ugrik a kosárba
      const imgClone = product.querySelector("img").cloneNode();
      imgClone.classList.add("flying-img");
      document.body.appendChild(imgClone);

      const rect = product.getBoundingClientRect();
      imgClone.style.top = rect.top + "px";
      imgClone.style.left = rect.left + "px";

      setTimeout(() => {
        imgClone.style.top = "20px";
        imgClone.style.left = window.innerWidth - 100 + "px";
        imgClone.style.transform = "scale(0.2)";
      }, 50);

      setTimeout(() => imgClone.remove(), 1000);
    });
  });

  // Kosár megnyitása
  cartIcon.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    cartItemsList.innerHTML = "";
    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${item.img}" alt="${item.name}" width="40"> ${item.name}`;
      cartItemsList.appendChild(li);
    });
  });

  // Bezárás
  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  // Finalize
  finalizeBtn.addEventListener("click", () => {
    alert("Siker! Ezt mind odaadom, hogy élőben is lássam a mosolyod :D");
    cartModal.classList.add("hidden");
    // Konfetti animáció
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * window.innerWidth + "px";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  });
});
