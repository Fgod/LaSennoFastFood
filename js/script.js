document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const products = [
    { id: 1, name: 'Pollo Broaster', price: 19.00, image: 'https://pollossabroso.com/wp-content/uploads/2024/06/pollo-broaster.webp' },
    { id: 2, name: 'Broaster picante', price: 24.00, image: 'https://comeperuano.b-cdn.net/wp-content/uploads/2020/04/pollo-broaster-peruano.jpg' },
    { id: 3, name: 'Broaster acevichado', price: 24.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST6HXwVtiaXitgvf8WVoygINvlT6Hia-j6BA&s' },
    { id: 4, name: 'Salchibroaster', price: 23.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5JAEl7D9_PpcaH_2ne0HGdsugBdecYsqY1w&s' },
    { id: 5, name: 'Chicharron de pollo', price: 21.00, image: 'https://img-global.cpcdn.com/recipes/cee99e1255399123/1200x630cq70/photo.jpg' },
    { id: 6, name: 'Alitas BBQ', price: 24.00, image: 'https://tofuu.getjusto.com/orioneat-local/resized2/s7Fo8QeMQrwagRwmr-800-x.webp' },
    { id: 7, name: 'Alitas al Tamarindo', price: 24.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZucXU3mY0Cy_VThvs_8VgvrZODxOU1AtLg&s' },
    { id: 8, name: 'Alitas acevichadas', price: 26.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_7QyvPHQeJRujwrv3MJ9uajhH10hqrfcX3Q&s' },
    { id: 9, name: 'Alitas Teriyaki', price: 26.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu7qL4KRm29usfBr2vLlkNONjJ19-KUs71Q&s' },
    { id: 10, name: 'Anticucho de pollo', price: 25.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTltAuH6ask6Ywh8T4SQtqz-TQn3WYNqw1JDA&s' },
    { id: 11, name: 'Aeropuerto', price: 16.00, image: 'https://cluv360.com/public/uploads/products/meta/51FgTBLsHR9VGUJuDqAg9A1xkB0I6qOiRz2LW7Nx.jpeg' },
    { id: 12, name: 'Lomo Saltado', price: 26.00, image: 'https://i.ytimg.com/vi/sWXRJbGi6yQ/maxresdefault.jpg' },
    { id: 13, name: 'Brocheta de pollo', price: 20.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0nzIgfzN_WzuSRlMUe-p1vfiu-wA_rNGsA&s' },
    { id: 14, name: 'Brocheta mixta', price: 22.00, image: 'https://i.ytimg.com/vi/ck64PHg7KIw/sddefault.jpg' },
];

const cart = [];

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Asegura que no se dupliquen productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>S/ ${product.price.toFixed(2)}</p>
            <input type="number" id="quantity-${product.id}" value="1" min="1">
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    updateCart();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.quantity} x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)} 
            <button onclick="removeFromCart(${item.id})">Eliminar</button>`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function cancelOrder() {
    if (confirm('¿Estás seguro?')) {
        cart.length = 0;
        updateCart();
    }
}

document.getElementById('submit-order').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de enviar.');
        return;
    }
    alert('Pedido enviado con éxito. Gracias por tu compra.');
    cart.length = 0;
    updateCart();
});

function cancelOrder() {
    if (confirm('¿Estás seguro de que deseas cancelar el pedido?')) {
        cart.length = 0;
        updateCart();
    }
}

renderProducts();