// CAROUSEL
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

// Escuchar cuando se hace clic en los botones
nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; // Volver al inicio
    }
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Ir al último
    }
    updateCarousel();
});

// Función para actualizar el desplazamiento del carrusel
function updateCarousel() {
    const imageWidth = images[0].clientWidth; // Ancho de una imagen
    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Asegurarse de que el carrusel responda cuando se redimensione la ventana
window.addEventListener('resize', updateCarousel);

// Inicializar el carrusel con el tamaño correcto
window.addEventListener('load', updateCarousel);

// CARRITO
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const quantitySpan = document.getElementById("quantity");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const addToCartBtn = document.getElementById("add-to-cart");
    const closeModal = document.getElementById("closeModal"); // Asegúrate de que coincide con tu HTML
    let quantity = 1;

    let selectedItem = {}; // Almacena temporalmente el artículo seleccionado

    // Evento para abrir el modal al hacer clic en la imagen
    document.querySelectorAll(".gallery-item img").forEach((image) => {
        image.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalTitle.textContent = this.alt;
            modalPrice.textContent = this.dataset.price; // Usando el atributo data-price

            // Almacena la información del producto seleccionado
            selectedItem.name = this.alt;
            selectedItem.price = parseFloat(this.dataset.price.replace('€', ''));
            quantity = 1; // Reiniciar cantidad al abrir el modal
            quantitySpan.textContent = quantity; // Mostrar cantidad inicial
        });
    });

    // Cerrar el modal al hacer clic en la 'X'
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Aumentar y disminuir cantidad
    increaseBtn.addEventListener("click", function () {
        quantity++;
        quantitySpan.textContent = quantity;
    });

    decreaseBtn.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    // Añadir al carrito
    addToCartBtn.addEventListener("click", function () {
        for (let i = 0; i < quantity; i++) {
            addToCart(selectedItem.name, selectedItem.price); // Añadir la cantidad especificada
        }
        modal.style.display = "none"; // Cierra el modal tras añadir
        quantity = 1; // Reinicia la cantidad
        quantitySpan.textContent = quantity;
    });

    // Cierra el modal si se hace clic fuera de él
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});


// Variables globales
let cart = []; // Arreglo para el carrito
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Función para abrir el modal del carrito
function openCart() {
    cartModal.style.display = "flex";
    updateCart();
}

// Función para cerrar el modal del carrito
function closeCart() {
    cartModal.style.display = "none";
}

// Función para actualizar el contenido del carrito
function updateCart() {
    cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
    let total = 0; // Variable para calcular el total

    // Recorremos los artículos en el carrito
    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `${item.name} - ${item.price}€<br/>`;
        cartItemsContainer.appendChild(div);
        total += item.price; // Sumar al total
    });

    cartTotal.innerHTML = `Total: ${total}€`; // Actualizar el total
}

// Event listener para el icono del carrito
document.querySelector(".icon").onclick = openCart;

// Event listener para cerrar el carrito
document.getElementById("closeCart").onclick = closeCart;

// Función para añadir una copa al carrito
function addToCart(name, price) {
    cart.push({ name, price }); // Añadir el artículo al carrito
    alert(`${name} ha sido añadido al carrito.`);
}

// Ejemplo de cómo añadir una copa al carrito al hacer clic en cada copa
// Esta parte se ha removido ya que el añadir al carrito ahora se hace desde el modal.
