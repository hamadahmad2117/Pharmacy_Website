document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded');

    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.querySelector('.cart-count');
    let cart = [];

    // Verify elements exist
    if (!cartIcon || !cartSidebar || !cartItemsContainer || !cartTotalElement || !cartCountElement) {
        console.error('Cart elements missing:', {
            cartIcon: !!cartIcon,
            cartSidebar: !!cartSidebar,
            cartItemsContainer: !!cartItemsContainer,
            cartTotalElement: !!cartTotalElement,
            cartCountElement: !!cartCountElement
        });
        return;
    }

    // Toggle cart sidebar
    cartIcon.addEventListener('click', () => {
        console.log('Cart icon clicked');
        cartSidebar.classList.toggle('hidden');
        console.log('Sidebar hidden:', cartSidebar.classList.contains('hidden'));
    });

    // Add to cart functionality (event delegation)
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            console.log('Add to cart button clicked');
            const button = event.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            if (!name || !price) {
                console.error('Missing data attributes:', { name, price });
                return;
            }

            const item = { name, price, quantity: 1 };
            const existingItem = cart.find(cartItem => cartItem.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
                console.log(`Incremented ${name} quantity to ${existingItem.quantity}`);
            } else {
                cart.push(item);
                console.log(`Added ${name} to cart`);
            }

            updateCart();
        }
    });

    function updateCart() {
        console.log('Updating cart:', cart);
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = itemCount;
        console.log(`Cart updated: Total $${total.toFixed(2)}, Items ${itemCount}`);
    }
});
