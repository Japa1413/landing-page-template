"""
Implementação em memória do repositório de usuários.

Útil para testes e desenvolvimento, não persiste dados
após encerramento da aplicação.
"""

from typing import Dict, List, Optional

from src.domain.entities.user import User
from src.domain.repositories.user_repository import UserRepositoryInterface


class InMemoryUserRepository(UserRepositoryInterface):
    """
    Repositório de usuários em memória.
    
    Implementação simples que armazena usuários em um
    dicionário em memória. Não é thread-safe.
    
    Attributes:
        _users: Dicionário de usuários indexado por ID
        _emails: Dicionário de emails indexado por email
        _next_id: Próximo ID a ser atribuído
    """
    
    def __init__(self):
        """Inicializa o repositório vazio."""
        self._users: Dict[int, User] = {}
        self._emails: Dict[str, int] = {}
        self._next_id: int = 1
    
    def save(self, user: User) -> User:
        """
        Salva um usuário.
        
        Args:
            user: Usuário a ser salvo
            
        Returns:
            User: Usuário salvo com ID atribuído
            
        Raises:
            ValueError: Se email já existir
        """
        # Verifica se email já existe (para atualizações)
        if user.id is None:
            # Novo usuário
            if user.email in self._emails:
                raise ValueError(f"Email already exists: {user.email}")
            
            user.id = self._next_id
            self._next_id += 1
        else:
            # Atualização - verifica se email mudou e se novo email já existe
            existing_user = self._users.get(user.id)
            if existing_user and existing_user.email != user.email:
                if user.email in self._emails:
                    raise ValueError(f"Email already exists: {user.email}")
                # Remove email antigo do índice
                del self._emails[existing_user.email]
        
        # Salva usuário
        self._users[user.id] = user
        self._emails[user.email] = user.id
        
        return user
    
    def find_by_id(self, user_id: int) -> Optional[User]:
        """
        Busca usuário por ID.
        
        Args:
            user_id: ID do usuário
            
        Returns:
            Optional[User]: Usuário encontrado ou None
        """
        return self._users.get(user_id)
    
    def find_by_email(self, email: str) -> Optional[User]:
        """
        Busca usuário por email.
        
        Args:
            email: Email do usuário
            
        Returns:
            Optional[User]: Usuário encontrado ou None
        """
        user_id = self._emails.get(email.lower())
        if user_id:
            return self._users.get(user_id)
        return None
    
    def find_all(self) -> List[User]:
        """
        Lista todos os usuários.
        
        Returns:
            List[User]: Lista de todos os usuários
        """
        return list(self._users.values())
    
    def delete(self, user_id: int) -> bool:
        """
        Remove um usuário.
        
        Args:
            user_id: ID do usuário a ser removido
            
        Returns:
            bool: True se removido com sucesso, False caso contrário
        """
        user = self._users.get(user_id)
        if user:
            del self._users[user_id]
            del self._emails[user.email]
            return True
        return False

