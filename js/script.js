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
