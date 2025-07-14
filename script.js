// Orange Sadfrogger - Website JavaScript

// DOM Elements
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const accordionItems = document.querySelectorAll('.accordion-item');
const copyButton = document.getElementById('copyAddress');
const contractAddress = document.querySelector('.contract-address code');
const logo = document.querySelector('.logo');

// Mobile Navigation Toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Make sure logo remains visible on mobile
if (logo) {
    logo.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Accordion functionality
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already open
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Copy contract address functionality
copyButton.addEventListener('click', () => {
    const textToCopy = contractAddress.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Change button text temporarily
            const originalText = copyButton.textContent;
            copyButton.textContent = 'COPIED!';
            
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
            alert('Could not copy text. Please copy manually.');
        });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tokenomics-card, .roadmap-card, .step-card, .social-link');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for animation
document.querySelectorAll('.tokenomics-card, .roadmap-card, .step-card, .social-link').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Run on page load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Marquee animation pause on hover
const marquee = document.querySelector('.marquee div');
if (marquee) {
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });
}

// Preload images for better performance
const preloadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        const src = image.getAttribute('src');
        if (src) {
            const newImage = new Image();
            newImage.src = src;
        }
    });
};

window.addEventListener('load', preloadImages); 