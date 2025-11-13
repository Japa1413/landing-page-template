"""
Testes de integração para UserService.

Testa o serviço com repositório real (em memória).
"""

import pytest

from src.domain.entities.user import User
from src.infrastructure.repositories.in_memory_user_repository import (
    InMemoryUserRepository,
)
from src.services.user_service import UserService


class TestUserServiceIntegration:
    """Testes de integração para UserService."""
    
    def setup_method(self):
        """Setup antes de cada teste."""
        self.repository = InMemoryUserRepository()
        self.service = UserService(self.repository)
    
    def test_create_and_retrieve_user(self):
        """Testa criação e recuperação de usuário."""
        # Arrange & Act
        user = self.service.create_user(
            email="user@example.com",
            name="John Doe"
        )
        
        # Assert
        assert user.id is not None
        assert user.email == "user@example.com"
        assert user.name == "John Doe"
        
        # Recupera usuário
        retrieved = self.service.get_user_by_id(user.id)
        assert retrieved is not None
        assert retrieved.email == user.email
        assert retrieved.name == user.name
    
    def test_create_multiple_users(self):
        """Testa criação de múltiplos usuários."""
        # Arrange & Act
        user1 = self.service.create_user(
            email="user1@example.com",
            name="User One"
        )
        user2 = self.service.create_user(
            email="user2@example.com",
            name="User Two"
        )
        
        # Assert
        all_users = self.service.list_all_users()
        assert len(all_users) == 2
        assert user1.id != user2.id
    
    def test_find_by_email(self):
        """Testa busca por email."""
        # Arrange
        user = self.service.create_user(
            email="user@example.com",
            name="John Doe"
        )
        
        # Act
        found = self.service.get_user_by_email("user@example.com")
        
        # Assert
        assert found is not None
        assert found.id == user.id
        assert found.email == user.email
    
    def test_update_user_name(self):
        """Testa atualização de nome."""
        # Arrange
        user = self.service.create_user(
            email="user@example.com",
            name="John Doe"
        )
        
        # Act
        updated = self.service.update_user_name(
            user_id=user.id,
            new_name="Jane Doe"
        )
        
        # Assert
        assert updated.name == "Jane Doe"
        assert updated.updated_at is not None
        
        # Verifica persistência
        retrieved = self.service.get_user_by_id(user.id)
        assert retrieved.name == "Jane Doe"
    
    def test_delete_user(self):
        """Testa remoção de usuário."""
        # Arrange
        user1 = self.service.create_user(
            email="user1@example.com",
            name="User One"
        )
        user2 = self.service.create_user(
            email="user2@example.com",
            name="User Two"
        )
        
        # Act
        deleted = self.service.delete_user(user1.id)
        
        # Assert
        assert deleted is True
        assert self.service.get_user_by_id(user1.id) is None
        assert self.service.get_user_by_id(user2.id) is not None
        assert len(self.service.list_all_users()) == 1
    
    def test_duplicate_email_prevention(self):
        """Testa prevenção de email duplicado."""
        # Arrange
        self.service.create_user(
            email="user@example.com",
            name="First User"
        )
        
        # Act & Assert
        with pytest.raises(ValueError, match="Email already exists"):
            self.service.create_user(
                email="user@example.com",
                name="Second User"
            )
    
    def test_complete_user_lifecycle(self):
        """Testa ciclo completo de vida do usuário."""
        # Create
        user = self.service.create_user(
            email="lifecycle@example.com",
            name="Lifecycle User"
        )
        assert user.id is not None
        
        # Read
        retrieved = self.service.get_user_by_id(user.id)
        assert retrieved is not None
        
        # Update
        updated = self.service.update_user_name(
            user_id=user.id,
            new_name="Updated Name"
        )
        assert updated.name == "Updated Name"
        
        # Delete
        deleted = self.service.delete_user(user.id)
        assert deleted is True
        
        # Verify deletion
        assert self.service.get_user_by_id(user.id) is None

