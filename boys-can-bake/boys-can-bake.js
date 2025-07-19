const body = document.body;
const cartBtn = document.getElementById('nav-cart');
const productsContainer = document.getElementById('products-container');

// Product data as array of objects
const products = [
  {
    name: 'Banana Bread',
    image: 'imgs/chocolate-chip-banana-bread.jpg',
    alt: 'Chocolate chip banana bread',
    description: 'Moist, sweet, and loaded with flavor, our Chocolate Chip Banana Bread combines ripe bananas with rich chocolate chips for the perfect balance of comfort and indulgence. Baked fresh and made with love.',
    price: 5
  },
  {
    name: 'Strawberry Muffins',
    image: 'imgs/strawberry-muffins.jpg',
    alt: 'Strawberry muffins',
    description: "Soft, fluffy, and bursting with real strawberries, our Strawberry Muffins are a delightful treat perfect for any time of day. Made with fresh ingredients and a hint of sweetness, they're a fruity favorite you won't want to miss!",
    price: 4
  },
  {
    name: 'Chocolate Chip Cookies',
    image: 'imgs/chocolate-chip-cookies.jpg',
    alt: 'Chocolate chip cookies',
    description: 'Our Chocolate Chip Cookies are everything a cookie should be—soft in the middle, lightly crisp on the edges, and generously filled with rich chocolate chips. Made with high-quality ingredients, each cookie is a delicious blend of buttery sweetness and chocolatey goodness.',
    price: 3
  }
];

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Render products dynamically
function renderProducts() {
  productsContainer.innerHTML = ''; // clear container

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-info');

    productDiv.innerHTML = `
      <h2>${product.name}</h2>
      <p class="price">$${product.price}</p>
      <img src="${product.image}" alt="${product.alt}">
      <button>Add to cart</button>
      <p>${product.description}</p>
    `;

    productsContainer.appendChild(productDiv);
  });
}

// Add event listeners to all Add to cart buttons
function addAddToCartListeners() {
  const addButtons = document.querySelectorAll('.product-info button');
  addButtons.forEach(button => {
    button.addEventListener('click', e => {
      const productName = e.target.closest('.product-info').querySelector('h2').textContent;
      // Use object to track quantities
      cart[productName] = (cart[productName] || 0) + 1;
      saveCart();
      updateCartDisplay();
    });
  });
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculate total price using reduce on cart entries
function calculateTotalPrice() {
  return Object.entries(cart).reduce((total, [itemName, qty]) => {
    // Find product price using array find
    const product = products.find(p => p.name === itemName);
    return total + (product ? product.price * qty : 0);
  }, 0);
}

// Update the cart button display with total item count
function updateCartDisplay() {
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  cartBtn.textContent = `Cart (${totalItems})`;
  updateSpecialBanner();
}

// Create and update the special banner message
function updateSpecialBanner() {
  let banner = document.getElementById('special-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'special-banner';
    banner.style.padding = '1rem';
    banner.style.backgroundColor = '#e0f7fa';
    banner.style.margin = '0 0 1rem 0';
    banner.style.textAlign = 'center';
    banner.style.fontWeight = 'bold';
    banner.style.color = '#00796b';
    banner.style.position = 'sticky';
    banner.style.top = '0';
    banner.style.zIndex = '1000';
    banner.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    body.prepend(banner);
  }

  const totalPrice = calculateTotalPrice();

  if (totalPrice >= 20) {
    banner.textContent = "🎉 Congrats! You qualify for free shipping!";
    banner.style.display = 'block';
  } else if (Object.keys(cart).length === 0) {
    banner.textContent = "Your cart is empty — add something yummy!";
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

// Show cart popup with current items and total price
function showCartPopup() {
  const oldPopup = document.getElementById('cart-popup');
  if (oldPopup) oldPopup.remove();

  const popup = document.createElement('div');
  popup.id = 'cart-popup';

  const title = document.createElement('h3');
  title.textContent = 'Your Cart';
  popup.appendChild(title);

  if (Object.keys(cart).length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Your cart is empty.';
    popup.appendChild(emptyMsg);
  } else {
    const list = document.createElement('ul');

    // Use forEach over cart entries to list each item
    Object.entries(cart).forEach(([itemName, qty]) => {
      const product = products.find(p => p.name === itemName);
      if (!product) return;

      const li = document.createElement('li');

      // Name and quantity
      const itemSpan = document.createElement('span');
      itemSpan.textContent = `${itemName} × ${qty}`;
      li.appendChild(itemSpan);

      // Remove button to decrease quantity
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn');
      removeBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (cart[itemName] > 1) {
          cart[itemName]--;
        } else {
          delete cart[itemName];
        }
        saveCart();
        updateCartDisplay();
        showCartPopup();
      });
      li.appendChild(removeBtn);

      list.appendChild(li);
    });

    popup.appendChild(list);

    // Total price line
    const totalLine = document.createElement('p');
    totalLine.style.fontWeight = 'bold';
    totalLine.style.marginTop = '0.75rem';
    totalLine.textContent = `Total: $${calculateTotalPrice()}`;
    popup.appendChild(totalLine);

    // Clear cart button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear Cart';
    clearBtn.style.marginBottom = '0.5rem';
    clearBtn.addEventListener('click', e => {
      e.stopPropagation();
      cart = {};
      saveCart();
      updateCartDisplay();
      showCartPopup();
    });
    popup.appendChild(clearBtn);
  }

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    popup.remove();
  });
  popup.appendChild(closeBtn);

  body.appendChild(popup);
}

cartBtn.addEventListener('click', showCartPopup);

// Initialize app: render products, add listeners, update cart display
function init() {
  renderProducts();
  addAddToCartListeners();
  updateCartDisplay();
}

init();
