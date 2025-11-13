"""
Testes unitários para validadores.

Testa funções de validação isoladamente.
"""

import pytest

from src.utils.validators import (
    sanitize_string,
    validate_email,
    validate_name,
)


class TestValidateEmail:
    """Testes para validação de email."""
    
    def test_valid_email(self):
        """Testa email válido."""
        assert validate_email("user@example.com") is True
        assert validate_email("test.user@domain.co.uk") is True
        assert validate_email("user+tag@example.com") is True
    
    def test_invalid_email(self):
        """Testa emails inválidos."""
        assert validate_email("invalid-email") is False
        assert validate_email("@example.com") is False
        assert validate_email("user@") is False
        assert validate_email("user@domain") is False
        assert validate_email("") is False
    
    def test_invalid_types(self):
        """Testa tipos inválidos."""
        assert validate_email(None) is False
        assert validate_email(123) is False
        assert validate_email([]) is False


class TestValidateName:
    """Testes para validação de nome."""
    
    def test_valid_name(self):
        """Testa nomes válidos."""
        assert validate_name("John Doe") is True
        assert validate_name("Maria") is True
        assert validate_name("José da Silva") is True
        assert validate_name("Jean-Pierre") is True
        assert validate_name("O'Brien") is True
    
    def test_invalid_name(self):
        """Testa nomes inválidos."""
        assert validate_name("") is False
        assert validate_name("A") is False  # Muito curto
        assert validate_name("John123") is False  # Contém números
        assert validate_name("John@Doe") is False  # Caractere inválido
    
    def test_invalid_types(self):
        """Testa tipos inválidos."""
        assert validate_name(None) is False
        assert validate_name(123) is False
        assert validate_name([]) is False


class TestSanitizeString:
    """Testes para sanitização de strings."""
    
    def test_sanitize_removes_whitespace(self):
        """Testa remoção de espaços extras."""
        assert sanitize_string("  hello  ") == "hello"
        assert sanitize_string("\t\nworld\n\t") == "world"
    
    def test_sanitize_preserves_content(self):
        """Testa que conteúdo válido é preservado."""
        assert sanitize_string("John Doe") == "John Doe"
        assert sanitize_string("test@example.com") == "test@example.com"
    
    def test_sanitize_with_max_length(self):
        """Testa sanitização com comprimento máximo."""
        assert sanitize_string("hello", max_length=10) == "hello"
        assert sanitize_string("  hello  ", max_length=10) == "hello"
    
    def test_sanitize_exceeds_max_length(self):
        """Testa erro quando excede comprimento máximo."""
        with pytest.raises(ValueError, match="exceeds maximum"):
            sanitize_string("very long string", max_length=5)
    
    def test_sanitize_invalid_type(self):
        """Testa erro com tipo inválido."""
        with pytest.raises(TypeError):
            sanitize_string(123)
        with pytest.raises(TypeError):
            sanitize_string(None)

