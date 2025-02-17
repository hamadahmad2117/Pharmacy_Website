document.addEventListener('DOMContentLoaded', function() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingCost = 5.99;

    // Display order items and calculate total
    function displayOrderSummary() {
        let subtotal = 0;
        orderItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderItemsContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        // Update totals
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        const total = subtotal + shippingCost;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Format card number with spaces
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for(let i = 0; i < value.length; i++) {
            if(i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
    });

    // Format expiry date
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if(value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value.substring(0, 5); // Limit to MM/YY format
    });

    // Format CVV
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        e.target.value = value.substring(0, 3); // Limit to 3 digits
    });

    // Handle form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const cardNumber = cardNumberInput.value;
        const expiry = expiryInput.value;
        const cvv = cvvInput.value;

        if (!name || !email || !address || !cardNumber || !expiry || !cvv) {
            alert('Please fill in all required fields');
            return;
        }

        // Simulate payment processing
        const payButton = document.querySelector('.pay-button');
        payButton.disabled = true;
        payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        setTimeout(() => {
            // Clear cart after successful payment
            localStorage.removeItem('cartItems');
            
            // Show success message
            alert('Payment successful! Thank you for your purchase.');
            
            // Redirect to home page
            window.location.href = 'index.html';
        }, 2000);
    });

    // Initialize order summary
    displayOrderSummary();
});
