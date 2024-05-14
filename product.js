/*logout*/

var logoutIcon = document.querySelector(".fa-sign-out");

logoutIcon.addEventListener("click", function() {
    var confirmLogout = confirm("Click OK if you want to log out.");
    if (confirmLogout) {
        alert("Logged out");
        window.location.href ="index.html";
    }
});


const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  cartModalOverlay.style.transform = cartModalOverlay.style.transform === 'translateX(-200%)' ? 'translateX(0)' : 'translateX(-200%)';
});

const closeBtn = document.querySelector('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')) {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
});

const addToCart = document.querySelectorAll('.fa-cart-plus');

addToCart.forEach((button) => {
  button.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
  const button = event.target;
  const cartItem = button.parentElement;
  const price = cartItem.querySelector('.product-price').innerText;
  const imageSrc = cartItem.querySelector('.product-img').src;
  addItemToCart(price, imageSrc);
  updateCartPrice();
}

function addItemToCart(price, imageSrc) {
  const productRow = document.createElement('div');
  productRow.classList.add('product-row');

  const cartRows = document.querySelector('.product-rows');

  const cartImages = document.querySelectorAll('.cart-image');

  for (const img of cartImages) {
    if (img.src === imageSrc) {
      alert('This item has already been added to the cart');
      return;
    }
  }

  productRow.innerHTML = `
    <div class="product-row">
      <img class="cart-image" src="${imageSrc}" alt="">
      <span class="cart-price">${price}</span>
      <input class="product-quantity" type="number" value="1">
      <button class="remove-btn">Remove</button>
    </div>
  `;

  cartRows.appendChild(productRow);

  const removeBtn = productRow.querySelector('.remove-btn');
  removeBtn.addEventListener('click', removeItem);

  const quantityInput = productRow.querySelector('.product-quantity');
  quantityInput.addEventListener('change', updateCartPrice);

  const cartTitle = document.querySelector('.cart-title');
  cartTitle.textContent = 'Your Cart';

  updatePurchaseButton();
}

function removeItem(event) {
  const btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartPrice();
}

function updateCartPrice() {
  let total = 0;
  const productRows = document.querySelectorAll('.product-row');

  productRows.forEach((cartRow) => {
    const priceElement = cartRow.querySelector('.cart-price');
    const quantityElement = cartRow.querySelector('.product-quantity');
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total += price * quantity;
  });

  document.querySelector('.total-price').innerText = `$${total.toFixed(2)}`;
  document.querySelector('.cart-quantity').textContent = productRows.length;

  const cartTitle = document.querySelector('.cart-title');
  cartTitle.textContent = productRows.length === 0 ? 'Cart is empty' : 'Your Cart';

  updatePurchaseButton();
}

function updatePurchaseButton() {
  const purchaseBtn = document.querySelector('.purchase-btn');
  const productRows = document.querySelectorAll('.product-row');

  if (productRows.length === 0) {
    purchaseBtn.disabled = true;
  } else {
    purchaseBtn.disabled = false;
  }
}

// Purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

purchaseBtn.addEventListener('click', purchaseBtnClicked);

function purchaseBtnClicked() {
  alert('Thank you for your purchase!');
  const cartItems = document.querySelector('.product-rows');
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartPrice();
}
