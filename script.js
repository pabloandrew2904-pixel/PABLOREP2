// ==================== ESPERAR A QUE EL DOM ESTÉ LISTO ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MODO OSCURO ====================
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Cargar preferencia guardada del localStorage
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    // Toggle modo oscuro al hacer clic
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Guardar preferencia en localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
        
        // Animación extra al hacer clic
        darkModeToggle.style.transform = 'scale(0.9) rotate(360deg)';
        setTimeout(() => {
            darkModeToggle.style.transform = '';
        }, 400);
    });
    
    // ==================== SCROLL PROGRESS BAR ====================
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ==================== TOGGLE TOPICS ====================
    const topicItems = document.querySelectorAll('.topic-item');
    
    topicItems.forEach(item => {
        const header = item.querySelector('.topic-header');
        
        header.addEventListener('click', () => {
            // Cerrar todos los demás topics en la misma dimensión
            const parentDimension = item.closest('.dimension-card');
            const siblingsInDimension = parentDimension.querySelectorAll('.topic-item');
            
            siblingsInDimension.forEach(sibling => {
                if (sibling !== item && sibling.classList.contains('active')) {
                    sibling.classList.remove('active');
                }
            });
            
            // Toggle el item clickeado
            item.classList.toggle('active');
            
            // Scroll suave al item si se está abriendo
            if (item.classList.contains('active')) {
                setTimeout(() => {
                    const itemTop = item.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top: itemTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // ==================== SCROLL TO TOP BUTTON ====================
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== INTERSECTION OBSERVER PARA ANIMACIONES ====================
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

    // Observar elementos con clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ==================== SMOOTH SCROLL PARA ENLACES ====================
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

    // ==================== EFECTO PARALLAX SUAVE ====================
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const parallaxElements = document.querySelectorAll('.central-card, .dimension-card');
                
                parallaxElements.forEach((el, index) => {
                    const speed = 0.5 + (index * 0.1);
                    const yPos = -(scrolled * speed / 100);
                    el.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // ==================== MANEJO DE IMÁGENES ====================
    const images = document.querySelectorAll('.topic-image');
    
    // Cargar imágenes cuando el topic se active
    topicItems.forEach(item => {
        const header = item.querySelector('.topic-header');
        
        header.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                const img = item.querySelector('.topic-image');
                if (img && !img.complete) {
                    img.style.opacity = '0';
                    img.onload = () => {
                        setTimeout(() => {
                            img.style.transition = 'opacity 0.5s ease';
                            img.style.opacity = '1';
                        }, 100);
                    };
                }
            }
        });
    });

    // Error handling para imágenes
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Imagen no disponible:', this.src);
            this.style.display = 'none';
        });
        
        // Precargar imagen al estar visible
        img.loading = 'eager';
    });

    // ==================== ANIMACIÓN DE NÚMEROS (SI HAY ESTADÍSTICAS) ====================
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Observar elementos con atributo data-count
    const numberElements = document.querySelectorAll('[data-count]');
    
    if (numberElements.length > 0) {
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateNumber(entry.target, target);
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numberElements.forEach(el => numberObserver.observe(el));
    }

    // ==================== EFECTO HOVER EN DIMENSION CARDS ====================
    const dimensionCards = document.querySelectorAll('.dimension-card');
    
    dimensionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==================== PREVENIR SCROLL HORIZONTAL ====================
    document.body.style.overflowX = 'hidden';

    // ==================== CONSOLE MESSAGE ====================
    console.log('%c🌱 Wiki: Detrás de la Carne', 
        'font-size: 24px; font-weight: bold; color: #8D9B6A; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
    );
    console.log('%cSitio web educativo desarrollado con propósito reflexivo', 
        'font-size: 14px; color: #6B7A4A;'
    );
    console.log('%c💚 Cada pequeña acción cuenta', 
        'font-size: 12px; color: #5C5148; font-style: italic;'
    );

    // ==================== DETECTAR SI ES PRIMERA VISITA ====================
    if (!sessionStorage.getItem('visited')) {
        sessionStorage.setItem('visited', 'true');
        
        // Pequeña animación de bienvenida
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.8s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
        // ESC para cerrar todos los topics abiertos
        if (e.key === 'Escape') {
            const activeTopics = document.querySelectorAll('.topic-item.active');
            activeTopics.forEach(topic => topic.classList.remove('active'));
        }
        
        // Home para scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End para scroll to bottom
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        
        // D para toggle dark mode
        if (e.key === 'd' || e.key === 'D') {
            if (!e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                darkModeToggle.click();
            }
        }
    });

    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Throttle para scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==================== RESPONSIVE BEHAVIOR ====================
    function checkViewport() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Ajustes específicos para móvil
            document.querySelectorAll('.topic-image').forEach(img => {
                img.style.height = '200px';
            });
        } else {
            document.querySelectorAll('.topic-image').forEach(img => {
                img.style.height = '250px';
            });
        }
    }

    checkViewport();
    window.addEventListener('resize', throttle(checkViewport, 250));

    // ==================== LOADING STATE ====================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Iniciar animaciones después de que todo esté cargado
        setTimeout(() => {
            const fadeIns = document.querySelectorAll('.fade-in');
            fadeIns.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 200);
    });

    // ==================== ACCESSIBILITY ====================
    // Añadir atributos ARIA dinámicamente
    topicItems.forEach((item, index) => {
        const header = item.querySelector('.topic-header');
        const content = item.querySelector('.topic-content');
        
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', `topic-content-${index}`);
        header.setAttribute('tabindex', '0');
        
        content.setAttribute('id', `topic-content-${index}`);
        content.setAttribute('role', 'region');
        
        // Soporte para Enter/Space en teclado
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
        
        // Actualizar aria-expanded cuando cambie el estado
        const mutationObserver = new MutationObserver(() => {
            const isActive = item.classList.contains('active');
            header.setAttribute('aria-expanded', isActive);
        });
        
        mutationObserver.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    // ==================== ERROR HANDLING PARA IMÁGENES ====================
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Imagen no cargada:', this.src);
        });
    });

    // ==================== ANIMACIÓN INICIAL DEL BOTÓN DARK MODE ====================
    setTimeout(() => {
        darkModeToggle.style.animation = 'pulse-ring 2s ease-in-out';
        setTimeout(() => {
            darkModeToggle.style.animation = '';
        }, 2000);
    }, 1000);

    // ==================== TOOLTIP PARA BOTÓN DARK MODE ====================
    let tooltipTimeout;
    darkModeToggle.addEventListener('mouseenter', () => {
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => {
            console.log('💡 Tip: Presiona "D" para cambiar el modo oscuro');
        }, 2000);
    });

    darkModeToggle.addEventListener('mouseleave', () => {
        clearTimeout(tooltipTimeout);
    });

}); // Fin DOMContentLoaded
