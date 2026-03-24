import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const count = cart.length;

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

updateCartCount();