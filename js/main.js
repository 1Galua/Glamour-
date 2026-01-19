// 1. Burger Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// 2. LocalStorage 
const cookieBanner = document.getElementById('cookie-notice');
const acceptBtn = document.getElementById('accept-cookies');

window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('glamourAccepted')) {
        cookieBanner.style.display = 'block';
    }
});

acceptBtn.onclick = () => {
    localStorage.setItem('glamourAccepted', 'true');
    cookieBanner.style.display = 'none';
};

// 3.  Header Shadow (Scroll Logic)
window.onscroll = () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
        header.style.boxShadow = "none";
    }
};

// 4. Smooth Scroll Fix
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if(nav.classList.contains('nav-active')) nav.classList.remove('nav-active');
        }
    };
});