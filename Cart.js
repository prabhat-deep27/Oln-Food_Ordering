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
        price: 120
    },
    {
        id: 2,
        name: 'Chowien',
        image: '2.jpeg',
        price: 360
    },
    {
        id: 3,
        name: 'Dosa',
        image: '3.jpeg',
        price: 160
    },
    {
        id: 4,
        name: 'Pav Bhaji',
        image: '4.jpeg',
        price: 200
    },
    {
        id: 5,
        name: 'Masala Chap',
        image: '5.jpeg',
        price: 240
    },
    {
        id: 6,
        name: 'Chole Bhature',
        image: '6.jpeg',
        price: 140
    },
    {
        id:7,
        name: "Kabab Parathe",
        image:"7.jpeg",
        price:80 
    },
    {
        id:8,
        name: 'Bati Chokha',
        image:'8.jpeg',
        price:140
    }
];
let listCards = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
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