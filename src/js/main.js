import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs"; 

loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = qs(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const count = cart.length;

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

updateCartCount();