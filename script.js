let menuArray = [];
let cart = [];
const Menu = document.querySelector(".menu");
let yourCart = document.querySelector(".your-cart");
let cartBtnsArray;
async function fetchData() {
  const res = await fetch("data.json");
  const data = await res.json();
  menuArray = data;
  console.log(menuArray);
  displayMenu(menuArray);
  cartBtnsArray = document.querySelectorAll(".cart-btn");
  console.log(cartBtnsArray);
  addEventListenersToCartBtns();
}
fetchData();
function addEventListenersToCartBtns() {
  for (let i = 0; i < cartBtnsArray.length; i++) {
    cartBtnsArray[i].addEventListener("click", () => addToCart(i));
  }
}
function addToCart(i) {
  let item;
  if (cart.length > 0) {
    const cartItem = cart.find((cartItem) => cartItem.id === i);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({
        quantity: 1,
        name: menuArray[i].name,
        price: menuArray[i].price,
        id: i,
      });
    }
  } else {
    cart.push({
      quantity: 1,
      name: menuArray[i].name,
      price: menuArray[i].price,
      id: i,
    });
  }
  console.log(cart);
  cartDisplay();
}

function cartDisplay() {
  let totalAmount = 0;
  yourCart.innerHTML = "<h2>Your Cart</h2>";
  for (let i = 0; i < cart.length; i++) {
    yourCart.innerHTML += `
    <div>
         <h3>${cart[i].name}</h3>
         <p>${cart[i].quantity} x @${cart[i].price}$</p>
       </div>
      `;
    totalAmount += cart[i].price * cart[i].quantity;
  }
  yourCart.innerHTML += `
  total price ${totalAmount}
  `;
}
function displayMenu(menuArray) {
  if (menuArray.length > 0) {
    for (let i = 0; i < menuArray.length; i++)
      Menu.innerHTML += `
      <div class="menu-item">
      <div class="image1">
        <img class="menu-item-image" src=${menuArray[i].image.desktop} />
        <button class="cart-btn"> <ion-icon name="cart" class="cart-icon"></ion-icon>Add to Cart</button>
      </div>
         <div class="menu-item-desc">
        <p>${menuArray[i].category}</p>
        <h3>${menuArray[i].name}</h3>
        <p>$6.50</p>
      </div>
    
    `;
  }
}
