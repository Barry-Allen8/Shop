// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (!toggle || !mobileNav) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.contains('active');
        
        if (isActive) {
            toggle.classList.remove('active');
            mobileNav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        } else {
            toggle.classList.add('active');
            mobileNav.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileNav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 720 && toggle.classList.contains('active')) {
            toggle.classList.remove('active');
            mobileNav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
}

function initRevealAnimations() {
    const targets = document.querySelectorAll('section, .offer-tile, .job-card, .reason-card, .blog-card, .counter-card, .step-card, .testimonial-card, .media-card');

    if (targets.length === 0) {
        return;
    }

    targets.forEach((el) => el.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach((el) => observer.observe(el));
}

// Gallery functionality
let galleryIndex = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function updateGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    
    if (!galleryTrack) {
        return;
    }
    
    const galleryItems = Array.from(galleryTrack.children);
    
    if (galleryItems.length === 0) {
        return;
    }

    const style = getComputedStyle(galleryTrack);
    const gapValue = parseFloat(style.columnGap || style.gap || '24');
    const itemWidth = galleryItems[0].getBoundingClientRect().width + gapValue;
    const visibleItems = Math.max(1, Math.round(galleryTrack.parentElement.offsetWidth / itemWidth));
    const maxIndex = Math.max(0, galleryItems.length - visibleItems);

    galleryIndex = clamp(galleryIndex, 0, maxIndex);
    const offset = galleryIndex * itemWidth;

    galleryTrack.style.transform = `translateX(-${offset}px)`;
}

function handleGalleryNav(direction) {
    const galleryTrack = document.querySelector('.gallery-track');
    
    if (!galleryTrack) {
        return;
    }

    const step = direction === 'next' ? 1 : -1;
    galleryIndex += step;
    updateGallery();
}

function initGallery() {
    const galleryButtons = document.querySelectorAll('.gallery-controls [data-direction]');
    
    galleryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const direction = button.dataset.direction;
            handleGalleryNav(direction);
        });
    });
    
    window.addEventListener('resize', updateGallery);
    updateGallery();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initGallery();
    initRevealAnimations();
});
