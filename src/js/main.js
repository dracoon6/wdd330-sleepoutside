import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const count = cart.length;

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

updateCartCount();