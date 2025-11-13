/**
 * Web Vitals Monitoring
 * Monitora Core Web Vitals e envia para Analytics
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Envia métrica para Analytics
     */
    function sendToAnalytics(metric) {
        if (typeof gtag === 'undefined') {
            console.log('Web Vital:', metric);
            return;
        }

        gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
        });
    }

    /**
     * Inicializa monitoramento de Web Vitals
     */
    function initWebVitals() {
        // Verifica se a biblioteca está disponível
        if (typeof webVitals === 'undefined') {
            // Carrega a biblioteca dinamicamente
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.umd.js';
            script.onload = function() {
                startMonitoring();
            };
            document.head.appendChild(script);
        } else {
            startMonitoring();
        }
    }

    /**
     * Inicia o monitoramento
     */
    function startMonitoring() {
        if (typeof webVitals === 'undefined') {
            console.warn('Web Vitals library not loaded');
            return;
        }

        // Largest Contentful Paint (LCP)
        webVitals.onLCP(sendToAnalytics);

        // First Input Delay (FID)
        webVitals.onFID(sendToAnalytics);

        // Cumulative Layout Shift (CLS)
        webVitals.onCLS(sendToAnalytics);

        // First Contentful Paint (FCP)
        webVitals.onFCP(sendToAnalytics);

        // Time to First Byte (TTFB)
        webVitals.onTTFB(sendToAnalytics);

        // Interaction to Next Paint (INP)
        if (webVitals.onINP) {
            webVitals.onINP(sendToAnalytics);
        }
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWebVitals);
    } else {
        initWebVitals();
    }
})();

