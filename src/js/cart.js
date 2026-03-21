import ShoppingCart from "./ShoppingCart.mjs";
import { qs, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const listElement = qs(".product-list");
const cart = new ShoppingCart(listElement);
cart.init();

function removeFromCart(itemIndex) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(itemIndex, 1);
  setLocalStorage("so-cart", cartItems);

  cart.init();
}

listElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    removeFromCart(e.target.dataset.id);
  }
});