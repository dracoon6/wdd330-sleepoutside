import ShoppingCart from "./ShoppingCart.mjs";
import { qs, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const listElement = qs(".product-list");
const cart = new ShoppingCart(listElement);
cart.init();

function updateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartTotal = document.querySelector(".cart-total");
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    if (cartTotal) cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    if (cartFooter) cartFooter.classList.remove("hide");
  } else {
    if (cartFooter) cartFooter.classList.add("hide");
  }
}

function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const count = cartItems.length;

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

function removeFromCart(itemIndex) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(itemIndex, 1);
  setLocalStorage("so-cart", cartItems);

  cart.init();
  updateCartTotal();
  updateCartCount();
}

listElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    removeFromCart(e.target.dataset.id);
  }
});

qs("#checkoutButton")?.addEventListener("click", () => {
  window.location.href = "../checkout/index.html";
});

updateCartTotal();
updateCartCount();