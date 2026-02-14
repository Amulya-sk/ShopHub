// ============================================
// MAIN APPLICATION SCRIPT
// ============================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Initialize cart
    if (typeof initCart === 'function') {
        initCart();
    }

    // Update auth UI
    if (typeof updateAuthUI === 'function') {
        updateAuthUI();
    }

    // Setup mobile menu
    setupMobileMenu();

    // Setup scroll effects
    setupScrollEffects();

    // Setup search
    setupSearch();
}

// ============================================
// MOBILE MENU
// ============================================

function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.navbar-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.textContent = menu.classList.contains('active') ? '×' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                toggle.textContent = '☰';
            }
        });

        // Close menu when clicking a link
        menu.querySelectorAll('.navbar-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.textContent = '☰';
            });
        });
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================

function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function setupSearch() {
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (typeof currentFilters !== 'undefined' && typeof updateProductDisplay === 'function') {
                currentFilters.search = e.target.value;
                updateProductDisplay();
            }
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveNavLink);
} else {
    setActiveNavLink();
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Export utility functions
if (typeof window !== 'undefined') {
    window.formatCurrency = formatCurrency;
    window.formatDate = formatDate;
    window.debounce = debounce;
}
