// Función principal para alternar mapas conceptuales
function toggleMap(mapId) {
    const map = document.getElementById(mapId);
    const allMaps = document.querySelectorAll('.mind-map');
    
    // Cerrar todos los otros mapas
    allMaps.forEach(m => {
        if (m.id !== mapId) {
            m.classList.remove('active');
        }
    });
    
    // Alternar el mapa clickeado
    if (map.classList.contains('active')) {
        map.classList.remove('active');
    } else {
        map.classList.add('active');
        // Hacer scroll suave hacia el mapa
        setTimeout(() => {
            map.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Indicador de progreso de scroll
window.addEventListener('scroll', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolled + '%';
    }
});

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

// Botón para volver arriba (aparece al hacer scroll)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    
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
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear botón de scroll to top
    createScrollToTopButton();
    
    // Observar las tarjetas para animaciones
    const cards = document.querySelectorAll('.branch, .concept-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Mensaje de bienvenida en consola (easter egg)
    console.log('%c¡Bienvenido a Wiki: Detrás de la Carne! 🌱', 
        'font-size: 20px; font-weight: bold; color: #8D9B6A; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cSitio creado con propósito educativo y reflexivo.', 
        'font-size: 14px; color: #6B7A4A;');
});

// Efecto parallax suave en el scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Aquí puedes agregar efectos parallax si lo deseas
            ticking = false;
        });
        ticking = true;
    }
});
