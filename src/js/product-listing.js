import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const search = getParam("search");

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement, search);

productList.init();

const titleElement = document.querySelector(".products h2");
if (category) {
  const formattedCategory = category.replace(/-/g, " ");
  titleElement.innerHTML += `: ${formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}`;
} else if (search) {
  titleElement.innerHTML = `Search results for: ${search}`;
}