import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
    this.originalProducts = []; // Store the original list of products
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.originalProducts = [...this.products]; // Save a copy of the original order
    this.renderList(this.products);

    const sortElement = document.querySelector("#product-sort");
    if (sortElement) {
      sortElement.addEventListener("change", () => {
        this.sortList(sortElement.value);
      });
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  sortList(criterion) {
    if (criterion === "name") {
      this.products.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criterion === "price") {
      this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else { // Handle "Default" or any other unknown criterion
      this.products = [...this.originalProducts]; // Reset to the original order
    }
    this.renderList(this.products);
  }
}