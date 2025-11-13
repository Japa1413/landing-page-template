/**
 * Dark Mode Toggle
 * Gerencia o modo escuro/claro da aplicação
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    const DARK_MODE_KEY = 'darkMode';
    const DARK_MODE_CLASS = 'dark-mode';

    /**
     * Inicializa o dark mode
     */
    function initDarkMode() {
        // Cria o botão de toggle
        createDarkModeToggle();

        // Verifica preferência salva ou do sistema
        const savedPreference = localStorage.getItem(DARK_MODE_KEY);
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const shouldBeDark = savedPreference !== null 
            ? savedPreference === 'true' 
            : systemPreference;

        if (shouldBeDark) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }

        // Escuta mudanças na preferência do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem(DARK_MODE_KEY) === null) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
    }

    /**
     * Cria o botão de toggle
     */
    function createDarkModeToggle() {
        // Verifica se já existe
        if (document.getElementById('dark-mode-toggle')) {
            return;
        }

        const toggle = document.createElement('button');
        toggle.id = 'dark-mode-toggle';
        toggle.className = 'dark-mode-toggle';
        toggle.setAttribute('aria-label', 'Alternar modo escuro/claro');
        toggle.setAttribute('aria-pressed', 'false');
        toggle.innerHTML = `
            <i class="fas fa-moon" aria-hidden="true"></i>
            <span class="sr-only">Modo escuro</span>
        `;

        // Adiciona ao navbar
        const navWrapper = document.querySelector('.nav-wrapper');
        if (navWrapper) {
            navWrapper.appendChild(toggle);
        } else {
            document.body.appendChild(toggle);
        }

        // Adiciona evento
        toggle.addEventListener('click', toggleDarkMode);
    }

    /**
     * Alterna o modo escuro
     */
    function toggleDarkMode() {
        const isDark = document.documentElement.classList.contains(DARK_MODE_CLASS);
        
        if (isDark) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    /**
     * Ativa o modo escuro
     */
    function enableDarkMode() {
        document.documentElement.classList.add(DARK_MODE_CLASS);
        localStorage.setItem(DARK_MODE_KEY, 'true');
        updateToggleButton(true);
        
        // Track no Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'dark_mode', {
                'event_category': 'UI',
                'event_label': 'Enabled'
            });
        }
    }

    /**
     * Desativa o modo escuro
     */
    function disableDarkMode() {
        document.documentElement.classList.remove(DARK_MODE_CLASS);
        localStorage.setItem(DARK_MODE_KEY, 'false');
        updateToggleButton(false);
        
        // Track no Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'dark_mode', {
                'event_category': 'UI',
                'event_label': 'Disabled'
            });
        }
    }

    /**
     * Atualiza o botão de toggle
     */
    function updateToggleButton(isDark) {
        const toggle = document.getElementById('dark-mode-toggle');
        if (!toggle) return;

        const icon = toggle.querySelector('i');
        const label = toggle.querySelector('.sr-only');
        
        if (isDark) {
            icon.className = 'fas fa-sun';
            label.textContent = 'Modo claro';
            toggle.setAttribute('aria-pressed', 'true');
        } else {
            icon.className = 'fas fa-moon';
            label.textContent = 'Modo escuro';
            toggle.setAttribute('aria-pressed', 'false');
        }
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        initDarkMode();
    }
})();

