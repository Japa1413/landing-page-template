"""
Testes unitários para UserService.

Testa o serviço de usuários com mocks do repositório.
"""

from datetime import datetime
from unittest.mock import Mock

import pytest

from src.domain.entities.user import User
from src.domain.repositories.user_repository import UserRepositoryInterface
from src.services.user_service import UserService


class TestUserService:
    """Testes para UserService."""
    
    def setup_method(self):
        """Setup antes de cada teste."""
        self.mock_repository = Mock(spec=UserRepositoryInterface)
        self.service = UserService(self.mock_repository)
    
    def test_create_user_success(self):
        """Testa criação de usuário com sucesso."""
        # Arrange
        email = "user@example.com"
        name = "John Doe"
        expected_user = User(
            id=1,
            email=email,
            name=name,
            created_at=datetime.now()
        )
        self.mock_repository.find_by_email.return_value = None
        self.mock_repository.save.return_value = expected_user
        
        # Act
        result = self.service.create_user(email, name)
        
        # Assert
        assert result.email == email
        assert result.name == name
        self.mock_repository.find_by_email.assert_called_once()
        self.mock_repository.save.assert_called_once()
    
    def test_create_user_invalid_email(self):
        """Testa criação de usuário com email inválido."""
        # Arrange
        email = "invalid-email"
        name = "John Doe"
        
        # Act & Assert
        with pytest.raises(ValueError, match="Invalid email format"):
            self.service.create_user(email, name)
        
        self.mock_repository.find_by_email.assert_not_called()
        self.mock_repository.save.assert_not_called()
    
    def test_create_user_invalid_name(self):
        """Testa criação de usuário com nome inválido."""
        # Arrange
        email = "user@example.com"
        name = ""
        
        # Act & Assert
        with pytest.raises(ValueError, match="Invalid name"):
            self.service.create_user(email, name)
        
        self.mock_repository.find_by_email.assert_not_called()
        self.mock_repository.save.assert_not_called()
    
    def test_create_user_duplicate_email(self):
        """Testa erro ao criar usuário com email duplicado."""
        # Arrange
        email = "user@example.com"
        name = "John Doe"
        existing_user = User(id=1, email=email, name="Existing User")
        self.mock_repository.find_by_email.return_value = existing_user
        
        # Act & Assert
        with pytest.raises(ValueError, match="Email already exists"):
            self.service.create_user(email, name)
        
        self.mock_repository.find_by_email.assert_called_once()
        self.mock_repository.save.assert_not_called()
    
    def test_get_user_by_id_success(self):
        """Testa busca de usuário por ID com sucesso."""
        # Arrange
        user_id = 1
        expected_user = User(
            id=user_id,
            email="user@example.com",
            name="John Doe"
        )
        self.mock_repository.find_by_id.return_value = expected_user
        
        # Act
        result = self.service.get_user_by_id(user_id)
        
        # Assert
        assert result == expected_user
        self.mock_repository.find_by_id.assert_called_once_with(user_id)
    
    def test_get_user_by_id_invalid(self):
        """Testa erro ao buscar com ID inválido."""
        # Arrange
        invalid_id = -1
        
        # Act & Assert
        with pytest.raises(ValueError, match="Invalid user_id"):
            self.service.get_user_by_id(invalid_id)
        
        self.mock_repository.find_by_id.assert_not_called()
    
    def test_update_user_name_success(self):
        """Testa atualização de nome com sucesso."""
        # Arrange
        user_id = 1
        new_name = "Jane Doe"
        existing_user = User(
            id=user_id,
            email="user@example.com",
            name="John Doe"
        )
        self.mock_repository.find_by_id.return_value = existing_user
        self.mock_repository.save.return_value = existing_user
        
        # Act
        result = self.service.update_user_name(user_id, new_name)
        
        # Assert
        assert result.name == new_name
        self.mock_repository.find_by_id.assert_called_once_with(user_id)
        self.mock_repository.save.assert_called_once()
    
    def test_update_user_name_not_found(self):
        """Testa erro ao atualizar usuário inexistente."""
        # Arrange
        user_id = 999
        new_name = "Jane Doe"
        self.mock_repository.find_by_id.return_value = None
        
        # Act & Assert
        with pytest.raises(ValueError, match="User not found"):
            self.service.update_user_name(user_id, new_name)
        
        self.mock_repository.save.assert_not_called()
    
    def test_delete_user_success(self):
        """Testa remoção de usuário com sucesso."""
        # Arrange
        user_id = 1
        self.mock_repository.delete.return_value = True
        
        # Act
        result = self.service.delete_user(user_id)
        
        # Assert
        assert result is True
        self.mock_repository.delete.assert_called_once_with(user_id)
    
    def test_delete_user_invalid_id(self):
        """Testa erro ao remover com ID inválido."""
        # Arrange
        invalid_id = 0
        
        # Act & Assert
        with pytest.raises(ValueError, match="Invalid user_id"):
            self.service.delete_user(invalid_id)
        
        self.mock_repository.delete.assert_not_called()
    
    def test_service_requires_repository_interface(self):
        """Testa que serviço requer interface correta."""
        # Act & Assert
        with pytest.raises(TypeError, match="must implement"):
            UserService("not a repository")

