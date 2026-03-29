import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.products');
myCheckout.init();

document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

// listening for submit on the form
document.querySelector('#checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // checkout() handles its own internal validation check via the form object
  myCheckout.checkout();
});