/**
 * Lazy Loading de Imagens
 * Carrega imagens apenas quando visíveis
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Inicializa lazy loading
     */
    function initLazyLoading() {
        // Verifica suporte para Intersection Observer
        if (!('IntersectionObserver' in window)) {
            // Fallback: carrega todas as imagens
            loadAllImages();
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Carrega 50px antes de aparecer
        });

        // Observa todas as imagens com data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

        // Observa imagens de fundo
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(bg => {
            imageObserver.observe(bg);
        });
    }

    /**
     * Carrega uma imagem
     */
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Cria nova imagem para pré-carregar
        const imageLoader = new Image();
        
        imageLoader.onload = function() {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        };

        imageLoader.onerror = function() {
            img.classList.add('error');
            img.alt = 'Erro ao carregar imagem';
        };

        imageLoader.src = src;
    }

    /**
     * Carrega imagem de fundo
     */
    function loadBackground(element) {
        const bg = element.getAttribute('data-bg');
        if (!bg) return;

        const imageLoader = new Image();
        
        imageLoader.onload = function() {
            element.style.backgroundImage = `url(${bg})`;
            element.removeAttribute('data-bg');
            element.classList.add('loaded');
        };

        imageLoader.onerror = function() {
            element.classList.add('error');
        };

        imageLoader.src = bg;
    }

    /**
     * Carrega todas as imagens (fallback)
     */
    function loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            loadImage(img);
        });

        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(bg => {
            loadBackground(bg);
        });
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoading);
    } else {
        initLazyLoading();
    }
})();

