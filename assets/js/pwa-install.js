/**
 * PWA Install Prompt
 * Gerencia o prompt de instalação do Progressive Web App
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    let deferredPrompt;
    let installButton;

    /**
     * Inicializa o PWA install prompt
     */
    function initPWAInstall() {
        // Cria botão de instalação se não existir
        createInstallButton();

        // Escuta o evento beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            // Previne o prompt automático
            e.preventDefault();
            deferredPrompt = e;
            
            // Mostra o botão de instalação
            showInstallButton();
        });

        // Escuta quando o app é instalado
        window.addEventListener('appinstalled', () => {
            console.log('PWA instalado com sucesso');
            hideInstallButton();
            deferredPrompt = null;
            
            // Track no Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_install', {
                    'event_category': 'PWA',
                    'event_label': 'App Installed'
                });
            }
        });

        // Verifica se já está instalado
        if (window.matchMedia('(display-mode: standalone)').matches) {
            hideInstallButton();
        }
    }

    /**
     * Cria o botão de instalação
     */
    function createInstallButton() {
        // Verifica se já existe
        if (document.getElementById('pwa-install-btn')) {
            installButton = document.getElementById('pwa-install-btn');
            return;
        }

        installButton = document.createElement('button');
        installButton.id = 'pwa-install-btn';
        installButton.className = 'pwa-install-btn';
        installButton.setAttribute('aria-label', 'Instalar aplicativo');
        installButton.innerHTML = `
            <i class="fas fa-download" aria-hidden="true"></i>
            <span>Instalar App</span>
        `;

        // Adiciona ao body
        document.body.appendChild(installButton);

        // Adiciona evento de clique
        installButton.addEventListener('click', installPWA);
    }

    /**
     * Mostra o botão de instalação
     */
    function showInstallButton() {
        if (installButton) {
            installButton.classList.add('visible');
            installButton.setAttribute('aria-hidden', 'false');
        }
    }

    /**
     * Esconde o botão de instalação
     */
    function hideInstallButton() {
        if (installButton) {
            installButton.classList.remove('visible');
            installButton.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Instala o PWA
     */
    async function installPWA() {
        if (!deferredPrompt) {
            return;
        }

        // Mostra o prompt de instalação
        deferredPrompt.prompt();

        // Espera pela resposta do usuário
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('Usuário aceitou a instalação');
        } else {
            console.log('Usuário rejeitou a instalação');
        }

        deferredPrompt = null;
        hideInstallButton();
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPWAInstall);
    } else {
        initPWAInstall();
    }
})();

