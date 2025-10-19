// Función para alternar acordeones
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.toggle-icon');
    const isActive = content.classList.contains('active');

    // Cerrar todos los acordeones abiertos en la misma sección
    const parentSection = button.closest('.section-card');
    parentSection.querySelectorAll('.accordion-content.active').forEach(openContent => {
        if(openContent !== content) {
            openContent.classList.remove('active');
            openContent.style.maxHeight = null;
            const openButton = openContent.previousElementSibling;
            const openIcon = openButton.querySelector('.toggle-icon');
            openIcon.classList.remove('rotate');
            openIcon.textContent = '+';
        }
    });
    
    // Alternar el acordeón clickeado
    content.classList.toggle('active');
    icon.classList.toggle('rotate');

    if (content.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.textContent = '+';
    } else {
        content.style.maxHeight = null;
        icon.textContent = '+';
    }
}

// Scroll suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Indicador de progreso de scroll
window.addEventListener('scroll', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// Animación de entrada para las tarjetas al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las tarjetas de sección
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Efecto parallax suave en el fondo
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('body::before');
            if (parallax) {
                document.body.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Botón para volver arriba (aparece al hacer scroll)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8D9B6A, #6B7A4A);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        pointer-events: none;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'all';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

// Inicializar botón de scroll to top
createScrollToTopButton();

// Animación de contador para números (si quieres agregar estadísticas animadas)
const animateNumbers = () => {
    const numbers = document.querySelectorAll('[data-count]');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target.toLocaleString();
            }
        };
        
        updateNumber();
    });
};

// Mensaje de bienvenida en consola (easter egg)
console.log('%c¡Bienvenido a Wiki: Detrás de la Carne! 🌱', 
    'font-size: 20px; font-weight: bold; color: #8D9B6A; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cSitio creado con propósito educativo y reflexivo.', 
    'font-size: 14px; color: #6B7A4A;');
