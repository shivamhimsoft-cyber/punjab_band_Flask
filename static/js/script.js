// Punjab Band - Enhanced Script.js (Professional Multi-Page Setup)
// All code wrapped in DOMContentLoaded for safety

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navbar Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.getElementById('navbar');
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Close on outside click (enhanced UX)
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navbar.classList.remove('active');
                }
            }, { once: true });
        });
    }

    // Header Sticky on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });

    // Gallery Filter (Enhanced: Case-insensitive, smooth show/hide)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.textContent.toLowerCase().trim();
                galleryItems.forEach(item => {
                    const altText = item.querySelector('img')?.alt.toLowerCase() || '';
                    if (filterValue === 'all' || altText.includes(filterValue)) {
                        item.style.opacity = '0';
                        item.style.display = 'block';
                        // Fade in animation
                        setTimeout(() => { item.style.opacity = '1'; }, 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // Form Submissions with AJAX (No page reload, better UX)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            try {
                const response = await fetch(bookingForm.action || '/booking', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    alert('Thank you! Your booking request has been submitted. We will contact you shortly.');
                    bookingForm.reset();
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Form error:', error);
                alert('Network issue. Please check your connection.');
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action || '/contact', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you shortly.');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Form error:', error);
                alert('Network issue. Please check your connection.');
            }
        });
    }

    // Close Offer Banner (Manual + Auto-hide after 5s)
    const closeOffer = document.querySelector('.close-offer');
    const offerBanner = document.querySelector('.offer-banner');
    if (closeOffer) {
        closeOffer.addEventListener('click', () => {
            offerBanner.style.opacity = '0';
            setTimeout(() => { offerBanner.style.display = 'none'; }, 300);
        });
    }
    if (offerBanner) {
        // Auto-hide after 5 seconds
        setTimeout(() => {
            offerBanner.style.opacity = '0';
            setTimeout(() => { offerBanner.style.display = 'none'; }, 300);
        }, 5000);
    }

    // Fade-in on Scroll (Professional Animation for Sections)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections (add 'fade-in' class to .services-grid, .team-members, etc. in CSS)
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize Hero Slider
    initHeroSlider();

    // Initialize Map (if needed, but iframe handles it)
    initMap();
});

// Hero Image Slider (Enhanced: Auto-slide + Dots Clickable)
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    // Show initial slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Dots click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            // Restart auto-slide
            startAutoSlide();
        });
    });

    // Auto-slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Initial setup
    showSlide(0);
    startAutoSlide();
}

// Google Maps Init (Iframe already embedded, but for future)
function initMap() {
    // If you add dynamic map later: new google.maps.Map(...);
    console.log('Map initialized (using iframe embed).');
}

// Close mobile menu on resize (if desktop)
window.addEventListener('resize', () => {
    const navbar = document.getElementById('navbar');
    if (window.innerWidth > 991 && navbar) {
        navbar.classList.remove('active');
    }
});