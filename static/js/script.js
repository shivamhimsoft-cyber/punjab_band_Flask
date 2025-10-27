// static\js\script.js

// Navbar Mobile Toggle (Custom)
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.getElementById('navbar');
    
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
});

// Smooth scrolling for navigation links (close menu on click) + X icon close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.remove('active');
        }
        
        // Scroll to section
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Gallery filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.textContent.toLowerCase();
        galleryItems.forEach(item => {
            if (filter === 'all' || item.querySelector('img').alt.toLowerCase().includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your booking request has been submitted. We will contact you shortly to confirm the details.');
        bookingForm.reset();
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
    });
}

// Close offer banner (manual close)
const closeOffer = document.querySelector('.close-offer');
if (closeOffer) {
    closeOffer.addEventListener('click', () => {
        document.querySelector('.offer-banner').style.display = 'none';
    });
}

// Auto-hide offer banner after 2 seconds (as per your code)
document.addEventListener('DOMContentLoaded', () => {
    const offerBanner = document.querySelector('.offer-banner');
    if (offerBanner) {
        setTimeout(() => {
            offerBanner.style.display = 'none';
        }, 2000);
    }
});

// Hero Image Slider Auto-Slide
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Auto-slide every 4 seconds
setInterval(nextSlide, 4000);

// Initial active slide
if (slides.length > 0) {
    slides[0].classList.add('active');
}

// Initialize the map
function initMap() {
    // Google Maps API is loaded via the iframe embed for simplicity
}

// Initialize functions when page has loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});