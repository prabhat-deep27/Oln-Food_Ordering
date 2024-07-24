document.addEventListener('DOMContentLoaded', function() {
    // JavaScript code here
    fetch(' http://localhost:8080/api/orders')
        .then(response => response.json())
        .then(foodItems => {
            const foodItemsList = document.getElementById('foodItemsList');
            const foodItemSelect = document.getElementById('foodItemSelect');
            foodItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price}`;
                foodItemsList.appendChild(li);

                const option = document.createElement('option');
                option.value = item.name;
                option.textContent = item.name;
                foodItemSelect.appendChild(option);
            });
        });

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const foodItem = document.getElementById('foodItemSelect').value;
        const quantity = document.getElementById('quantity').value;
        const customerName = document.getElementById('customerName').value;

        if (foodItem && quantity > 0 && customerName) {
            fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ foodItem, quantity, customerName })
            })
            .then(response => response.json())
            .then(order => {
                document.getElementById('confirmationMessage').textContent = 'Order placed successfully!';
                console.log(order);
            });
        } else {
            alert('Please fill in all fields correctly.');
        }
    });
});  