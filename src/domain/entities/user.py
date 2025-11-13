"""
Entidade User.

Representa um usuário no domínio da aplicação.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class User:
    """
    Entidade de usuário.
    
    Attributes:
        id: Identificador único do usuário
        email: Email do usuário (único)
        name: Nome completo do usuário
        created_at: Data de criação do registro
        updated_at: Data da última atualização
        
    Example:
        >>> user = User(
        ...     id=1,
        ...     email="user@example.com",
        ...     name="John Doe"
        ... )
        >>> print(user.email)
        user@example.com
    """
    
    id: Optional[int]
    email: str
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    def __post_init__(self):
        """Validação pós-inicialização."""
        if not self.email:
            raise ValueError("Email cannot be empty")
        if not self.name:
            raise ValueError("Name cannot be empty")
    
    def update_name(self, new_name: str) -> None:
        """
        Atualiza o nome do usuário.
        
        Args:
            new_name: Novo nome do usuário
            
        Raises:
            ValueError: Se new_name estiver vazio
        """
        if not new_name:
            raise ValueError("Name cannot be empty")
        self.name = new_name
        self.updated_at = datetime.now()

