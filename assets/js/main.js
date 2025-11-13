/**
 * Landing Page - Advocacia
 * JavaScript principal da landing page
 * 
 * @author Programador Perfeito
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Inicialização quando DOM estiver pronto
     */
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollEffects();
        initContactForm();
        initAnimations();
        initBackToTop();
    });

    /**
     * Debounce function para otimizar performance
     */
    function debounce(func, wait) {
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

    /**
     * Navegação mobile e scroll
     */
    function initNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');

        if (!menuToggle || !navMenu || !navbar) {
            console.warn('Elementos de navegação não encontrados');
            return;
        }

        // Toggle menu mobile com ARIA
        menuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Fechar menu ao clicar em link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Navbar scroll effect com debounce
        const handleScroll = debounce(function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Active link on scroll com debounce
        const handleActiveLink = debounce(updateActiveNavLink, 100);
        window.addEventListener('scroll', handleActiveLink, { passive: true });
    }

    /**
     * Atualiza link ativo baseado na seção visível
     */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Efeitos de scroll suave
     */
    function initScrollEffects() {
        // Smooth scroll para links âncora
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Formulário de contato
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validação básica
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Validação de campos
                let isValid = true;
                const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
                
                requiredFields.forEach(field => {
                    const input = this.querySelector(`[name="${field}"]`);
                    if (!data[field] || data[field].trim() === '') {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                });

                // Validação de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (data.email && !emailRegex.test(data.email)) {
                    isValid = false;
                    this.querySelector('[name="email"]').classList.add('error');
                }

                if (!isValid) {
                    showNotification('Por favor, preencha todos os campos corretamente.', 'error');
                    return;
                }

                // Simulação de envio (aqui você integraria com backend)
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                const originalDisabled = submitButton.disabled;
                
                // Loading state
                submitButton.disabled = true;
                submitButton.classList.add('loading');
                submitButton.setAttribute('aria-busy', 'true');

                // Simula delay de envio (substitua por chamada real à API)
                setTimeout(() => {
                    try {
                        // Aqui faria a chamada real à API
                        // await fetch('/api/contact', { method: 'POST', body: formData });
                        
                        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                        contactForm.reset();
                    } catch (error) {
                        // Log apenas em desenvolvimento
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.error('Erro ao enviar formulário:', error);
                        }
                        showNotification('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por telefone.', 'error');
                    } finally {
                        submitButton.disabled = originalDisabled;
                        submitButton.classList.remove('loading');
                        submitButton.setAttribute('aria-busy', 'false');
                        submitButton.innerHTML = originalText;
                    }
                }, 1500);
            });

            // Remove erro ao digitar
            contactForm.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            });
        }
    }

    /**
     * Animações on scroll com Intersection Observer
     */
    function initAnimations() {
        // Verifica suporte para Intersection Observer
        if (!('IntersectionObserver' in window)) {
            // Fallback: adiciona classe imediatamente
            const animateElements = document.querySelectorAll(
                '.service-card, .experience-item, .testimonial-card, .about-content'
            );
            animateElements.forEach(el => el.classList.add('animate-in'));
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observa elementos para animação
        const animateElements = document.querySelectorAll(
            '.service-card, .experience-item, .testimonial-card, .about-content'
        );
        
        if (animateElements.length === 0) return;
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Botão voltar ao topo
     */
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        if (!backToTop) return;

        const handleScroll = debounce(function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
                backToTop.setAttribute('aria-hidden', 'false');
            } else {
                backToTop.classList.remove('visible');
                backToTop.setAttribute('aria-hidden', 'true');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Foca no conteúdo principal após scroll
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                setTimeout(() => {
                    mainContent.focus();
                    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }

    /**
     * Mostra notificação com ARIA live region
     */
    function showNotification(message, type = 'success') {
        // Remove notificação existente
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Cria ou obtém live region
        let liveRegion = document.getElementById('live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }

        // Atualiza live region
        liveRegion.textContent = message;

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" aria-hidden="true"></i>
                <span>${escapeHtml(message)}</span>
            </div>
        `;

        // Adiciona estilos inline básicos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Remove após 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * Escapa HTML para prevenir XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Adiciona estilos de animação dinamicamente
     */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease;
        }
        
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    `;
    document.head.appendChild(style);

})();

