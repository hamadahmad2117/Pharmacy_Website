document.addEventListener('DOMContentLoaded', () => {
    console.log('payment.js loaded');

    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingCost = 5.99;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verify elements exist
    if (!orderItemsContainer || !subtotalElement || !totalElement) {
        console.error('Order summary elements missing:', {
            orderItemsContainer: !!orderItemsContainer,
            subtotalElement: !!subtotalElement,
            totalElement: !!totalElement
        });
        return;
    }

    function updateOrderSummary() {
        console.log('Updating order summary:', cart);
        orderItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            orderItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('order-item');
                itemElement.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                orderItemsContainer.appendChild(itemElement);
                subtotal += item.price * item.quantity;
            });
        }

        const total = subtotal + shippingCost;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
        console.log(`Order summary updated: Subtotal $${subtotal.toFixed(2)}, Total $${total.toFixed(2)}`);
    }

    // Initialize order summary on page load
    updateOrderSummary();
});