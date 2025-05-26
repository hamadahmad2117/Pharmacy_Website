// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Header scroll effect with enhanced animation
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.background = currentScroll > 50 ? 'rgba(255, 255, 255, 0.95)' : '#fff';
        header.style.boxShadow = currentScroll > 50 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
    }
    lastScroll = currentScroll;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .product-card, .contact-form, .about');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('animate');
        }
    });
};

// Initial check for elements in view
animateOnScroll();

// Add scroll event listener with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        animateOnScroll();
    });
});

// Contact form handling with animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animate form submission
        this.classList.add('fade-out');
        
        // Get form data
        const formData = new FormData(this);
        const formProps = Object.fromEntries(formData);
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message fade-in';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your message!</h3>
            <p>We will get back to you soon.</p>
        `;
        
        this.parentNode.appendChild(successMessage);
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('fade-in');
            successMessage.classList.add('fade-out');
            setTimeout(() => successMessage.remove(), 500);
            this.classList.remove('fade-out');
        }, 5000);
    });
}

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('fade-in');
    });
});