"""
Testes unitários para entidade User.

Testa a entidade User isoladamente.
"""

from datetime import datetime

import pytest

from src.domain.entities.user import User


class TestUser:
    """Testes para entidade User."""
    
    def test_create_user_success(self):
        """Testa criação de usuário com sucesso."""
        user = User(
            id=1,
            email="user@example.com",
            name="John Doe"
        )
        
        assert user.id == 1
        assert user.email == "user@example.com"
        assert user.name == "John Doe"
    
    def test_create_user_without_id(self):
        """Testa criação de usuário sem ID."""
        user = User(
            id=None,
            email="user@example.com",
            name="John Doe"
        )
        
        assert user.id is None
        assert user.email == "user@example.com"
    
    def test_create_user_empty_email(self):
        """Testa erro ao criar usuário com email vazio."""
        with pytest.raises(ValueError, match="Email cannot be empty"):
            User(id=1, email="", name="John Doe")
    
    def test_create_user_empty_name(self):
        """Testa erro ao criar usuário com nome vazio."""
        with pytest.raises(ValueError, match="Name cannot be empty"):
            User(id=1, email="user@example.com", name="")
    
    def test_update_name_success(self):
        """Testa atualização de nome com sucesso."""
        user = User(
            id=1,
            email="user@example.com",
            name="John Doe"
        )
        
        user.update_name("Jane Doe")
        
        assert user.name == "Jane Doe"
        assert user.updated_at is not None
        assert isinstance(user.updated_at, datetime)
    
    def test_update_name_empty(self):
        """Testa erro ao atualizar nome vazio."""
        user = User(
            id=1,
            email="user@example.com",
            name="John Doe"
        )
        
        with pytest.raises(ValueError, match="Name cannot be empty"):
            user.update_name("")

