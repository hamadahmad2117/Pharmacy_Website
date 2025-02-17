// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');
const searchInput = document.getElementById('product-search');

// Filter products by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        productItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    productItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('.description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
});

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');

// Update cart count
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <div class="cart-item-details">
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
    updateCartCount();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add item to cart
function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name,
            price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    cartSidebar.classList.remove('hidden');
}

// Remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart display
    updateCartDisplay();

    // Add to cart button clicks
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const name = productItem.querySelector('h3').textContent;
            const price = parseFloat(productItem.querySelector('.price').textContent.replace('$', ''));
            addToCart(name, price);
        });
    });

    // Remove from cart button clicks
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.closest('.remove-item')) {
            const index = e.target.closest('.remove-item').dataset.index;
            removeFromCart(index);
        }
    });

    // Toggle cart sidebar
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.toggle('hidden');
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        window.location.href = 'payment.html';
    });
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.add('hidden');
    }
});