"""
Utilitários de validação.

Contém funções para validação de dados comuns.
"""

import re
from typing import Optional


def validate_email(email: str) -> bool:
    """
    Valida formato de email.
    
    Args:
        email: Email a ser validado
        
    Returns:
        bool: True se email válido, False caso contrário
        
    Example:
        >>> validate_email("user@example.com")
        True
        >>> validate_email("invalid-email")
        False
    """
    if not email or not isinstance(email, str):
        return False
    
    # Regex básico para validação de email
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_name(name: str) -> bool:
    """
    Valida nome de usuário.
    
    Args:
        name: Nome a ser validado
        
    Returns:
        bool: True se nome válido, False caso contrário
        
    Example:
        >>> validate_name("John Doe")
        True
        >>> validate_name("")
        False
    """
    if not name or not isinstance(name, str):
        return False
    
    # Nome deve ter pelo menos 2 caracteres e apenas letras e espaços
    trimmed_name = name.strip()
    if len(trimmed_name) < 2:
        return False
    
    # Permite letras, espaços e alguns caracteres especiais comuns
    pattern = r'^[a-zA-ZÀ-ÿ\s\-\']+$'
    return bool(re.match(pattern, trimmed_name))


def sanitize_string(value: str, max_length: Optional[int] = None) -> str:
    """
    Sanitiza string removendo espaços extras.
    
    Args:
        value: String a ser sanitizada
        max_length: Comprimento máximo (opcional)
        
    Returns:
        str: String sanitizada
        
    Raises:
        ValueError: Se value exceder max_length após sanitização
    """
    if not isinstance(value, str):
        raise TypeError(f"Expected str, got {type(value).__name__}")
    
    sanitized = value.strip()
    
    if max_length and len(sanitized) > max_length:
        raise ValueError(
            f"String length {len(sanitized)} exceeds maximum {max_length}"
        )
    
    return sanitized

