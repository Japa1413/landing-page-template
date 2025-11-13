/**
 * Modern Enhancements JavaScript
 * Adiciona interatividade moderna e sofisticada
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Inicializa melhorias modernas
     */
    function initModernEnhancements() {
        initScrollProgress();
        initParallaxEffects();
        initParticleEffect();
        initNumberCounters();
        initCardTilts();
    }

    /**
     * Barra de progresso de scroll
     */
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    /**
     * Efeitos de parallax suave
     */
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-logo, .hero-title, .about-photo');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                if (element) {
                    const speed = 0.5 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }

    /**
     * Efeito de partículas no hero
     */
    function initParticleEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        hero.appendChild(particlesContainer);

        // Cria partículas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Contadores animados para estatísticas
     */
    function initNumberCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    /**
     * Anima contador
     */
    function animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const prefix = text.replace(/\d/g, '').split('')[0] || '';
        const suffix = text.replace(/\d/g, '').slice(1) || '';
        
        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = prefix + number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }
        }, stepTime);
    }

    /**
     * Efeito de tilt nos cards
     */
    function initCardTilts() {
        const cards = document.querySelectorAll('.service-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModernEnhancements);
    } else {
        initModernEnhancements();
    }
})();

