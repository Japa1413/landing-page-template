"""
Serviço de gerenciamento de usuários.

Implementa casos de uso relacionados a usuários,
seguindo o padrão Service Layer.
"""

from datetime import datetime
from typing import List, Optional

from src.domain.entities.user import User
from src.domain.repositories.user_repository import UserRepositoryInterface
from src.utils.validators import validate_email, validate_name


class UserService:
    """
    Serviço para gerenciamento de usuários.
    
    Este serviço fornece operações CRUD para usuários,
    incluindo validação e regras de negócio.
    
    Attributes:
        repository: Repositório de usuários (injetado)
        
    Example:
        >>> repository = InMemoryUserRepository()
        >>> service = UserService(repository)
        >>> user = service.create_user("user@example.com", "John Doe")
        >>> print(user.email)
        user@example.com
    """
    
    def __init__(self, repository: UserRepositoryInterface):
        """
        Inicializa o serviço com dependências.
        
        Args:
            repository: Repositório de usuários
            
        Raises:
            TypeError: Se repository não implementar UserRepositoryInterface
        """
        if not isinstance(repository, UserRepositoryInterface):
            raise TypeError(
                "repository must implement UserRepositoryInterface"
            )
        self.repository = repository
    
    def create_user(self, email: str, name: str) -> User:
        """
        Cria um novo usuário.
        
        Args:
            email: Email do usuário (deve ser único)
            name: Nome completo do usuário
            
        Returns:
            User: Usuário criado
            
        Raises:
            ValueError: Se email ou name inválidos
            ValueError: Se email já existir
        """
        # Valida email
        if not validate_email(email):
            raise ValueError(f"Invalid email format: {email}")
        
        # Valida nome
        if not validate_name(name):
            raise ValueError(f"Invalid name: {name}")
        
        # Verifica se email já existe
        existing_user = self.repository.find_by_email(email)
        if existing_user:
            raise ValueError(f"Email already exists: {email}")
        
        # Cria usuário
        user = User(
            id=None,
            email=email.lower().strip(),
            name=name.strip(),
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        return self.repository.save(user)
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        Busca usuário por ID.
        
        Args:
            user_id: ID do usuário
            
        Returns:
            Optional[User]: Usuário encontrado ou None
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError(f"Invalid user_id: {user_id}")
        
        return self.repository.find_by_id(user_id)
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Busca usuário por email.
        
        Args:
            email: Email do usuário
            
        Returns:
            Optional[User]: Usuário encontrado ou None
        """
        if not validate_email(email):
            raise ValueError(f"Invalid email format: {email}")
        
        return self.repository.find_by_email(email.lower().strip())
    
    def list_all_users(self) -> List[User]:
        """
        Lista todos os usuários.
        
        Returns:
            List[User]: Lista de todos os usuários
        """
        return self.repository.find_all()
    
    def update_user_name(self, user_id: int, new_name: str) -> User:
        """
        Atualiza o nome de um usuário.
        
        Args:
            user_id: ID do usuário
            new_name: Novo nome
            
        Returns:
            User: Usuário atualizado
            
        Raises:
            ValueError: Se user_id inválido ou usuário não encontrado
            ValueError: Se new_name inválido
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError(f"Invalid user_id: {user_id}")
        
        if not validate_name(new_name):
            raise ValueError(f"Invalid name: {new_name}")
        
        user = self.repository.find_by_id(user_id)
        if not user:
            raise ValueError(f"User not found: {user_id}")
        
        user.update_name(new_name.strip())
        return self.repository.save(user)
    
    def delete_user(self, user_id: int) -> bool:
        """
        Remove um usuário.
        
        Args:
            user_id: ID do usuário a ser removido
            
        Returns:
            bool: True se removido com sucesso
            
        Raises:
            ValueError: Se user_id inválido
        """
        if not isinstance(user_id, int) or user_id <= 0:
            raise ValueError(f"Invalid user_id: {user_id}")
        
        return self.repository.delete(user_id)

