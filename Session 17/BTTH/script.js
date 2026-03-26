const products = [
    { id: 1, name: "Bánh Chưng", price: 150000, img: "./img/banhchung.webp" },
    { id: 2, name: "Giò Lụa", price: 180000, img: "./img/giolua.jpg" },
    { id: 3, name: "Cành Đào", price: 500000, img: "./img/canhdao.webp" },
    { id: 4, name: "Mứt Tết", price: 120000, img: "./img/muttet.webp" },
    { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "./img/lixi.webp" },
    { id: 6, name: "Dưa Hấu", price: 60000, img: "./img/duahau.jpg" }
];

const cart = JSON.parse(localStorage.getItem("cart"));
// localStorage.setItem("cart", JSON.stringify(cart));


function renderProducts() {
    const productsList = document.getElementById("product-list");
    products.forEach((product) => {
        productsList.innerHTML += `<div class="product-card">
                    <img src="${product.img}" alt="">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString("vi-vn")}đ</p>
                    <button class="btn-add" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                </div>`
    })
}

function renderCart() {
    const cartList = document.getElementsByClassName("cart-list")[0];
    cartList.innerHTML = "";
    cart.forEach((item) => {
        cartList.innerHTML += `<li>
                        <span class="cart-item-name">${item.name}</span>
                        <div>
                            <span class="cart-item-price">${item.price.toLocaleString("vi-vn")}đ</span>
                            <button class="btn-remove">X</button>
                        </div>
                    </li>`
    })

    const emptyStr = document.getElementsByClassName("empty-msg")[0];
    if (cart.length !== 0 && emptyStr != undefined) {
        emptyStr.style.display = "none";
    }

    const totalElement = document.getElementById("total-price");
    totalElement.innerText = cart.reduce((total, item) => total + item.price, 0).toLocaleString("vi-vn") + "đ";
}

function addToCart(id) {
    let boughtProduct = products.find((product) => product.id === id);
    
    let cartItem = {
        id: boughtProduct.id,
        name: boughtProduct.name,
        price: boughtProduct.price,
        quantity:1
    }
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeFromCart(id){

}

renderProducts();
renderCart();