/**
 * Global Animations for PorTaxPH
 * Handles scroll-reveal effects using Intersection Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once an element is revealed, we can stop observing it
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset the bottom to trigger earlier
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add ease-in to form containers on load
    const formContainers = document.querySelectorAll('.auth-card, .registration-card, .service-card');
    formContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        container.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    });
});
