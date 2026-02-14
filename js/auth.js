// ============================================
// AUTHENTICATION MANAGEMENT
// ============================================

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('ecommerce-user') !== null;
}

// Get current user
function getCurrentUser() {
    const userJson = localStorage.getItem('ecommerce-user');
    return userJson ? JSON.parse(userJson) : null;
}

// Login user
function login(email, password) {
    // Get users from localStorage
    const usersJson = localStorage.getItem('ecommerce-users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store user session (without password)
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('ecommerce-user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid email or password' };
}

// Register new user
function register(userData) {
    const { name, email, password } = userData;

    // Validation
    if (!name || !email || !password) {
        return { success: false, error: 'All fields are required' };
    }

    if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: 'Invalid email format' };
    }

    // Get existing users
    const usersJson = localStorage.getItem('ecommerce-users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if email already exists
    if (users.some(u => u.email === email)) {
        return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('ecommerce-users', JSON.stringify(users));

    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('ecommerce-user', JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
}

// Logout user
function logout() {
    localStorage.removeItem('ecommerce-user');
    window.location.href = 'index.html';
}

// Update user profile
function updateProfile(updates) {
    const user = getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in' };

    const updatedUser = { ...user, ...updates };
    localStorage.setItem('ecommerce-user', JSON.stringify(updatedUser));

    // Also update in users array
    const usersJson = localStorage.getItem('ecommerce-users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('ecommerce-users', JSON.stringify(users));
    }

    return { success: true, user: updatedUser };
}

// Update UI based on auth state
function updateAuthUI() {
    const user = getCurrentUser();
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');

    if (authButtons && userMenu) {
        if (user) {
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');

            const userName = document.getElementById('user-name');
            if (userName) {
                userName.textContent = user.name;
            }
        } else {
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }
}

// Form validation helpers
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showFormError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;

    // Remove existing error
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Add new error
    if (message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    } else {
        input.classList.remove('error');
    }
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

// Export functions
if (typeof window !== 'undefined') {
    window.isLoggedIn = isLoggedIn;
    window.getCurrentUser = getCurrentUser;
    window.login = login;
    window.register = register;
    window.logout = logout;
    window.updateProfile = updateProfile;
    window.updateAuthUI = updateAuthUI;
    window.validateEmail = validateEmail;
    window.validatePassword = validatePassword;
    window.showFormError = showFormError;
    window.clearFormErrors = clearFormErrors;
}
