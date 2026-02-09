// Photo Slider Variables
let currentPhotoIndex = 0;
const totalPhotos = 39;
let autoSlideInterval;

// Create confetti effect
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff69b4', '#ff1493', '#ff85c1', '#ffc0cb', '#da70d6'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
}

// Navigate to gifts page
function goToNextPage() {
    window.location.href = 'gifts.html';
}

// Photo Slider Functions
function showPhoto(index) {
    const images = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.slider-dot');
    const counter = document.getElementById('photo-counter');
    
    // Remove active class from all images and dots
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current image and dot
    if (images[index]) {
        images[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Update counter
    counter.textContent = `${index + 1} / ${totalPhotos}`;
    
    currentPhotoIndex = index;
}

function nextPhoto() {
    let newIndex = currentPhotoIndex + 1;
    if (newIndex >= totalPhotos) {
        newIndex = 0;
    }
    showPhoto(newIndex);
    resetAutoSlide();
}

function previousPhoto() {
    let newIndex = currentPhotoIndex - 1;
    if (newIndex < 0) {
        newIndex = totalPhotos - 1;
    }
    showPhoto(newIndex);
    resetAutoSlide();
}

function goToPhoto(index) {
    showPhoto(index);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextPhoto();
    }, 3000); // Change photo every 3 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function initializeSlider() {
    // Create dots
    const dotsContainer = document.getElementById('slider-dots');
    for (let i = 0; i < totalPhotos; i++) {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToPhoto(i);
        dotsContainer.appendChild(dot);
    }
    
    // Start auto slide
    startAutoSlide();
}

// Initialize on page load
window.addEventListener('load', () => {
    createConfetti();
    initializeSlider();
});
