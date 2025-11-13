/**
 * Form Validation em Tempo Real
 * Validação avançada de formulário com feedback visual
 * 
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Inicializa validação de formulário
     */
    function initFormValidation() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const fields = contactForm.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            // Validação em tempo real
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        // Validação antes de enviar
        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                showFirstError(fields);
            }
        });
    }

    /**
     * Valida um campo
     */
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove estados anteriores
        field.classList.remove('error', 'valid');
        removeErrorMessage(field);

        // Validação por tipo de campo
        switch (fieldName) {
            case 'name':
                isValid = validateName(value);
                if (!isValid) errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                break;

            case 'email':
                isValid = validateEmail(value);
                if (!isValid) errorMessage = 'Email inválido';
                break;

            case 'phone':
                isValid = validatePhone(value);
                if (!isValid) errorMessage = 'Telefone inválido';
                break;

            case 'subject':
                isValid = value !== '';
                if (!isValid) errorMessage = 'Selecione um assunto';
                break;

            case 'message':
                isValid = value.length >= 10;
                if (!isValid) errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                break;
        }

        // Aplica estado visual
        if (value !== '') {
            if (isValid) {
                field.classList.add('valid');
            } else {
                field.classList.add('error');
                showErrorMessage(field, errorMessage);
            }
        }

        return isValid;
    }

    /**
     * Valida nome
     */
    function validateName(name) {
        return name.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-\']+$/.test(name);
    }

    /**
     * Valida email
     */
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida telefone
     */
    function validatePhone(phone) {
        // Remove caracteres não numéricos
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }

    /**
     * Mostra mensagem de erro
     */
    function showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        errorDiv.setAttribute('aria-live', 'polite');
        
        field.parentElement.appendChild(errorDiv);
    }

    /**
     * Remove mensagem de erro
     */
    function removeErrorMessage(field) {
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Mostra primeiro erro e foca no campo
     */
    function showFirstError(fields) {
        const firstError = Array.from(fields).find(field => field.classList.contains('error'));
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormValidation);
    } else {
        initFormValidation();
    }
})();

