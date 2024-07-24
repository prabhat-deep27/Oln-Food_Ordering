document.addEventListener('DOMContentLoaded', function() {
    let cart = [];

    // Fetch food items from the server (if applicable)
    // Mocked data for demonstration
    const foodItems = [
        { name: 'Momos', price: 80.00 },
        { name: 'Pizza', price: 100.00 },
        { name: 'Chicken Tikka', price: 180.00 },
        { name: 'Chicken Mushroom', price: 120.00 }
    ];

    const foodItemsList = document.getElementById('foodItemsList');
    const foodItemSelect = document.getElementById('foodItemSelect');

    foodItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        foodItemsList.appendChild(li);

        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        option.dataset.price = item.price; // add data attribute for price
        foodItemSelect.appendChild(option);
    });

    // Handle form submission
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const foodItem = document.getElementById('foodItemSelect').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const customerName = document.getElementById('customerName').value;

        // Validate form fields
        if (foodItem && quantity > 0 && customerName) {
            const cartItem = { foodItem, quantity, customerName };
            addToCart(cartItem);
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    function addToCart(item) {
        // Check if item already in cart
        const existingItem = cart.find(cartItem => cartItem.foodItem === item.foodItem);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cartItemsList');
        const cartTotalElement = document.getElementById('cartTotal');
        const placeOrderButton = document.getElementById('placeOrderButton');

        // Clear current cart display
        cartItemsList.innerHTML = '';

        // Calculate total price
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity} x ${item.foodItem}`;
            cartItemsList.appendChild(li);

            const price = parseFloat(document.querySelector(`#foodItemSelect option[value="${item.foodItem}"]`).dataset.price);
            total += price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);
        placeOrderButton.disabled = cart.length === 0;
    }

    // Place Order
    document.getElementById('placeOrderButton').addEventListener('click', function() {
        if (cart.length > 0) {
            fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cart)
            })
            .then(response => response.json())
            .then(order => {
                document.getElementById('confirmationMessage').textContent = 'Order placed successfully!';
                cart = [];
                updateCartDisplay();
                console.log(order);
            })
            .catch(error => {
                document.getElementById('confirmationMessage').textContent = 'Failed to place order.';
                console.error('Error:', error);
            });
        }
    });
});
