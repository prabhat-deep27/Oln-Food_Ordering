let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Momows',
        image: '1.jpeg',
        price: 120,
        category: 'chinese'
    },
    {
        id: 2,
        name: 'Chowien',
        image: '2.jpeg',
        price: 360,
        category: 'chinese'
    },
    {
        id: 3,
        name: 'Dosa',
        image: '3.jpeg',
        price: 160,
        category: 'south indian'
    },
    {
        id: 4,
        name: 'Pav Bhaji',
        image: '4.jpeg',
        price: 200,
        category: 'indian'
    },
    {
        id: 5,
        name: 'Masala Chap',
        image: '5.jpeg',
        price: 240,
        category: 'indian'
    },
    {
        id: 6,
        name: 'Chole Bhature',
        image: '6.jpeg',
        price: 140,
        category: 'indian'
    },
    {
        id:7,
        name: "Kabab Parathe",
        image:"7.jpeg",
        price:80,
        category: 'indian' 
    },
    {
        id:8,
        name: 'Bati Chokha',
        image:'8.jpeg',
        price:140,
        category: 'indian'
    },
    {
        id: 9,
        name: 'Red Sauce Pasta',
        image: '9.jpeg',
        price: 240,
        category: 'chinese'
    }
];
let listCards = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.id = value.category.replace(/\s+/g, '-').toLowerCase();
        newDiv.innerHTML = `
        <img src = "Cart/image/${value.image}"/>
        <div class = "title">${value.name}</div>
        <div class= "price">${value.price.toLocaleString()}</div>
        <button onclick = "addToCard(${key})">Add to Card</button> `;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key]==null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity; 
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML  = `
            <div><img src= "Cart/image/${value.image}"/></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>${value.quantity}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function filterByCategory(category) {
    let items = document.querySelectorAll('.item');
    items.forEach(item => {
        if (category === 'all' || item.id === category.toLowerCase()) {
            item.style.display = 'inline-block'; // Show the item
        } else {
            item.style.display = 'none';  // Hide the item
        }
    });
}


filterByCategory('all');