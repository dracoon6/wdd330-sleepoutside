import { getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.renderCartItems();
  }

  renderCartItems() {
    if (this.cartItems.length === 0) {
      this.listElement.innerHTML = "<li>Your cart is empty.</li>";
      return;
    }

    const html = this.cartItems
      .map((item, index) => this.cartItemTemplate(item, index))
      .join("");

    this.listElement.innerHTML = html;
  }

  cartItemTemplate(item, index) {
    return `
      <li class="cart-card divider">
        <span class="cart-card__remove" data-id="${index}">X</span>
        <a href="#" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}" />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
        <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </li>
    `;
  }
}