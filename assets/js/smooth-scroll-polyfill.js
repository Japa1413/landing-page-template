/**
 * Smooth Scroll Polyfill
 * Polyfill para navegadores que não suportam scroll-behavior: smooth
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    // Verifica se precisa do polyfill
    if ('scrollBehavior' in document.documentElement.style) {
        return; // Navegador já suporta
    }

    /**
     * Smooth scroll polyfill
     */
    function smoothScrollPolyfill() {
        // Intercepta cliques em links âncora
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const targetPosition = target.offsetTop - 80; // Offset para navbar
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Easing function (ease-in-out)
                const ease = percentage < 0.5
                    ? 2 * percentage * percentage
                    : 1 - Math.pow(-2 * percentage + 2, 2) / 2;

                window.scrollTo(0, startPosition + distance * ease);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    // Foca no elemento após scroll
                    target.focus();
                    if (target.tabIndex < 0) {
                        target.setAttribute('tabindex', '-1');
                    }
                }
            }

            window.requestAnimationFrame(step);
        });
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', smoothScrollPolyfill);
    } else {
        smoothScrollPolyfill();
    }
})();

