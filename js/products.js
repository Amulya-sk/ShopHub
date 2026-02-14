// ============================================
// PRODUCT DATA & MANAGEMENT
// ============================================

// Mock Product Database
const PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation and premium sound.',
    rating: 4.8,
    reviews: 234,
    badge: 'Sale',
    featured: true
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    description: 'Advanced smartwatch with health tracking and customizable watch faces.',
    rating: 4.6,
    reviews: 189,
    badge: 'New',
    featured: true
  },
  {
    id: 3,
    name: 'Designer Backpack',
    category: 'Fashion',
    price: 129.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    description: 'Stylish and durable backpack perfect for daily commute and travel.',
    rating: 4.7,
    reviews: 156,
    badge: null,
    featured: true
  },
  {
    id: 4,
    name: 'Luxury Sunglasses',
    category: 'Fashion',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    description: 'Premium polarized sunglasses with UV protection and elegant design.',
    rating: 4.9,
    reviews: 312,
    badge: 'Hot',
    featured: true
  },
  {
    id: 5,
    name: 'Portable Speaker',
    category: 'Electronics',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    description: 'Waterproof portable speaker with 360° sound and long battery life.',
    rating: 4.5,
    reviews: 278,
    badge: 'Sale',
    featured: false
  },
  {
    id: 6,
    name: 'Premium Sneakers',
    category: 'Fashion',
    price: 149.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    description: 'Comfortable and stylish sneakers for everyday wear.',
    rating: 4.7,
    reviews: 445,
    badge: null,
    featured: false
  },
  {
    id: 7,
    name: 'Digital Camera',
    category: 'Electronics',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
    description: 'Professional mirrorless camera with 4K video and wifi connectivity.',
    rating: 4.9,
    reviews: 167,
    badge: 'Sale',
    featured: true
  },
  {
    id: 8,
    name: 'Leather Wallet',
    category: 'Fashion',
    price: 59.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
    description: 'Genuine leather wallet with RFID protection and minimalist design.',
    rating: 4.6,
    reviews: 523,
    badge: null,
    featured: false
  },
  {
    id: 9,
    name: 'Fitness Tracker',
    category: 'Electronics',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
    description: 'Track your fitness goals with heart rate monitoring and sleep tracking.',
    rating: 4.4,
    reviews: 298,
    badge: 'New',
    featured: false
  },
  {
    id: 10,
    name: 'Winter Jacket',
    category: 'Fashion',
    price: 189.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    description: 'Warm and stylish winter jacket with water-resistant fabric.',
    rating: 4.8,
    reviews: 201,
    badge: 'Sale',
    featured: false
  },
  {
    id: 11,
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 69.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    description: 'RGB gaming mouse with programmable buttons and high DPI sensor.',
    rating: 4.7,
    reviews: 412,
    badge: null,
    featured: false
  },
  {
    id: 12,
    name: 'Crossbody Bag',
    category: 'Fashion',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop',
    description: 'Compact crossbody bag perfect for casual outings and travel.',
    rating: 4.5,
    reviews: 178,
    badge: 'Hot',
    featured: false
  }
];

// ============================================
// PRODUCT RENDERING
// ============================================

function createProductCard(product) {
  const badgeHTML = product.badge 
    ? `<div class="product-badge">${product.badge}</div>` 
    : '';
  
  const originalPriceHTML = product.originalPrice 
    ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` 
    : '';
  
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image-container">
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/500?text=${encodeURIComponent(product.name)}'">
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">$${product.price.toFixed(2)}</span>
            ${originalPriceHTML}
          </div>
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (products.length === 0) {
    container.innerHTML = '<p class="text-center text-muted">No products found.</p>';
    return;
  }
  
  container.innerHTML = products.map(product => createProductCard(product)).join('');
  
  // Add click handlers for product cards
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(card.dataset.productId);
        window.location.href = `product-detail.html?id=${productId}`;
      }
    });
  });
  
  // Add click handlers for add to cart buttons
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(btn.dataset.productId);
      addToCart(productId);
    });
  });
}

// ============================================
// FILTERING & SEARCH
// ============================================

let currentFilters = {
  category: 'all',
  priceRange: 'all',
  search: '',
  sort: 'featured'
};

function applyFilters() {
  let filtered = [...PRODUCTS];
  
  // Category filter
  if (currentFilters.category !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilters.category);
  }
  
  // Price range filter
  if (currentFilters.priceRange !== 'all') {
    const ranges = {
      'under50': [0, 50],
      '50to100': [50, 100],
      '100to200': [100, 200],
      'over200': [200, Infinity]
    };
    const [min, max] = ranges[currentFilters.priceRange];
    filtered = filtered.filter(p => p.price >= min && p.price < max);
  }
  
  // Search filter
  if (currentFilters.search) {
    const searchLower = currentFilters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Sort
  switch (currentFilters.sort) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }
  
  return filtered;
}

function updateProductDisplay() {
  const filtered = applyFilters();
  renderProducts(filtered, 'products-grid');
}

// ============================================
// PRODUCT DETAIL
// ============================================

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function renderProductDetail(productId) {
  const product = getProductById(productId);
  
  if (!product) {
    document.body.innerHTML = '<div class="container"><h1>Product not found</h1></div>';
    return;
  }
  
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  const originalPriceHTML = product.originalPrice 
    ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` 
    : '';
  
  const detailHTML = `
    <div class="product-detail-container">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/600?text=${encodeURIComponent(product.name)}'">
      </div>
      <div class="product-detail-info">
        <div class="product-category">${product.category}</div>
        <h1 class="product-title">${product.name}</h1>
        <div class="product-rating mb-lg">
          <span class="stars">${stars}</span>
          <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="product-price mb-lg">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          ${originalPriceHTML}
        </div>
        <p class="product-description mb-xl">${product.description}</p>
        <div class="product-actions">
          <button class="btn btn-primary btn-lg" id="add-to-cart-detail">
            Add to Cart
          </button>
          <button class="btn btn-outline btn-lg" onclick="window.location.href='products.html'">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('product-detail-content');
  if (container) {
    container.innerHTML = detailHTML;
    
    document.getElementById('add-to-cart-detail').addEventListener('click', () => {
      addToCart(product.id);
    });
  }
}

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.createProductCard = createProductCard;
  window.renderProducts = renderProducts;
  window.getProductById = getProductById;
  window.renderProductDetail = renderProductDetail;
  window.currentFilters = currentFilters;
  window.applyFilters = applyFilters;
  window.updateProductDisplay = updateProductDisplay;
}
