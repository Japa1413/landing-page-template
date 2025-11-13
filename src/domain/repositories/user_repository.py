"""
Interface de repositório para usuários.

Define o contrato para persistência de usuários,
seguindo o padrão Repository.
"""

from abc import ABC, abstractmethod
from typing import List, Optional

from src.domain.entities.user import User


class UserRepositoryInterface(ABC):
    """
    Interface para repositório de usuários.
    
    Esta interface define os métodos necessários para
    persistência de usuários, permitindo diferentes
    implementações (banco de dados, memória, etc).
    """
    
    @abstractmethod
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
        pass
    
    @abstractmethod
    def find_by_id(self, user_id: int) -> Optional[User]:
        """
        Busca usuário por ID.
        
        Args:
            user_id: ID do usuário
            
        Returns:
            Optional[User]: Usuário encontrado ou None
        """
        pass
    
    @abstractmethod
    def find_by_email(self, email: str) -> Optional[User]:
        """
        Busca usuário por email.
        
        Args:
            email: Email do usuário
            
        Returns:
            Optional[User]: Usuário encontrado ou None
        """
        pass
    
    @abstractmethod
    def find_all(self) -> List[User]:
        """
        Lista todos os usuários.
        
        Returns:
            List[User]: Lista de todos os usuários
        """
        pass
    
    @abstractmethod
    def delete(self, user_id: int) -> bool:
        """
        Remove um usuário.
        
        Args:
            user_id: ID do usuário a ser removido
            
        Returns:
            bool: True se removido com sucesso, False caso contrário
        """
        pass

