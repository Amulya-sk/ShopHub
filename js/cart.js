// ============================================
// SHOPPING CART MANAGEMENT
// ============================================

// Cart state
let cart = [];

// Load cart from localStorage on initialization
function initCart() {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
    updateCartUI();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = window.PRODUCTS?.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        const item = cart[index];
        cart.splice(index, 1);
        saveCart();
        showNotification(`${item.name} removed from cart`);
        renderCartPage();
    }
}

// Update item quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCartPage();
        }
    }
}

// Get cart totals
function getCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;

    return {
        subtotal,
        tax,
        shipping,
        total,
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
}

// Update cart counter in navbar
function updateCartUI() {
    const { itemCount } = getCartTotals();
    const cartBadge = document.querySelector('.cart-badge');

    if (cartBadge) {
        cartBadge.textContent = itemCount;
        cartBadge.classList.toggle('hidden', itemCount === 0);
    }
}

// Render cart page
function renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');

    if (!cartItemsContainer || !cartSummaryContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p class="text-muted">Add some products to get started!</p>
        <a href="products.html" class="btn btn-primary mt-lg">Browse Products</a>
      </div>
    `;
        cartSummaryContainer.innerHTML = '';
        return;
    }

    // Render cart items
    const itemsHTML = cart.map(item => `
    <div class="cart-item" data-product-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/100?text=Product'">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
               onchange="updateQuantity(${item.id}, parseInt(this.value))">
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      <div class="cart-item-total">
        <p class="item-total-price">$${(item.price * item.quantity).toFixed(2)}</p>
        <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Remove item">
          <span>×</span>
        </button>
      </div>
    </div>
  `).join('');

    cartItemsContainer.innerHTML = itemsHTML;

    // Render cart summary
    const totals = getCartTotals();
    const summaryHTML = `
    <div class="cart-summary-card">
      <h3 class="mb-lg">Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal (${totals.itemCount} items)</span>
        <span>$${totals.subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Tax (10%)</span>
        <span>$${totals.tax.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${totals.shipping === 0 ? 'FREE' : '$' + totals.shipping.toFixed(2)}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-row summary-total">
        <span>Total</span>
        <span>$${totals.total.toFixed(2)}</span>
      </div>
      <button class="btn btn-primary w-full mt-lg" onclick="window.location.href='checkout.html'">
        Proceed to Checkout
      </button>
      <a href="products.html" class="btn btn-ghost w-full mt-sm">Continue Shopping</a>
    </div>
  `;

    cartSummaryContainer.innerHTML = summaryHTML;
}

// Apply coupon code
function applyCoupon(code) {
    const validCoupons = {
        'SAVE10': 0.1,
        'SAVE20': 0.2,
        'FREESHIP': 'free-shipping'
    };

    if (validCoupons[code.toUpperCase()]) {
        showNotification('Coupon applied successfully!');
        return validCoupons[code.toUpperCase()];
    } else {
        showNotification('Invalid coupon code', 'error');
        return null;
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    renderCartPage();
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export functions
if (typeof window !== 'undefined') {
    window.cart = cart;
    window.initCart = initCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.getCartTotals = getCartTotals;
    window.updateCartUI = updateCartUI;
    window.renderCartPage = renderCartPage;
    window.applyCoupon = applyCoupon;
    window.clearCart = clearCart;
    window.showNotification = showNotification;
}
