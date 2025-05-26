document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items') || document.createElement('div');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cart-total-amount') || document.querySelector('.cart-total');
    
    // Create cart items container if it doesn't exist (for firstaid.html)
    if (!document.getElementById('cart-items')) {
        cartItemsContainer.id = 'cart-items';
        cartItemsContainer.className = 'cart-items';
        cartSidebar.insertBefore(cartItemsContainer, cartTotalElement);
    }

    // Verify elements exist
    if (!cartIcon || !cartSidebar || !cartItemsContainer || !cartTotalElement || !cartCount) {
        console.error('Cart elements missing:', {
            cartIcon: !!cartIcon,
            cartSidebar: !!cartSidebar,
            cartItemsContainer: !!cartItemsContainer,
            cartTotalElement: !!cartTotalElement,
            cartCountElement: !!cartCount
        });
        return;
    }

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                    <button class="remove-btn" data-index="${index}">✕</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        
        updateCartCount();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Add item to cart
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
        cartSidebar.classList.remove('hidden');

        // Feedback for "Add to Cart" button
        const button = event.target;
        button.textContent = 'Added!';
        button.classList.add('added');
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.classList.remove('added');
        }, 1000);
    }

    // Toggle cart sidebar
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('hidden');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.add('hidden');
        }
    });

    // Handle "Add to Cart" button clicks
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-item, .product-card');
            let name, price;

            // Handle different price extraction methods
            if (button.getAttribute('data-name') && button.getAttribute('data-price')) {
                // For vitamins.html (data attributes)
                name = button.getAttribute('data-name');
                price = parseFloat(button.getAttribute('data-price'));
            } else {
                // For firstaid.html and menu.html
                name = productCard.querySelector('h3').textContent;
                const priceText = productCard.querySelector('.price, p').textContent.match(/\$[\d.]+/)[0];
                price = parseFloat(priceText.replace('$', ''));
            }

            if (!name || isNaN(price)) {
                console.error('Invalid product data:', { name, price });
                return;
            }

            addToCart(name, price);
        });
    });

    // Handle quantity changes and removal
    cartItemsContainer.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('quantity-btn')) {
            if (e.target.classList.contains('plus')) {
                cart[index].quantity += 1;
            } else if (e.target.classList.contains('minus') && cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            }
            updateCartDisplay();
        } else if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-item')) {
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'payment.html';
        });
    }

    // Product filtering (for menu.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    const searchInput = document.getElementById('product-search');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
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
    }

    // Search functionality (for menu.html)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            productItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    }

    // Initialize cart display
    updateCartDisplay();
});