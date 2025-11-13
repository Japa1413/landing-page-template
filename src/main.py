"""
Ponto de entrada principal da aplicação.

Demonstra o uso dos serviços e repositórios.
"""

from src.domain.entities.user import User
from src.infrastructure.repositories.in_memory_user_repository import (
    InMemoryUserRepository,
)
from src.services.user_service import UserService


def main():
    """
    Função principal que demonstra o uso do sistema.
    
    Cria usuários, lista, atualiza e remove, demonstrando
    todas as operações CRUD.
    """
    # Inicializa dependências
    repository = InMemoryUserRepository()
    service = UserService(repository)
    
    print("=== Sistema de Gerenciamento de Usuários ===\n")
    
    # Cria usuários
    try:
        user1 = service.create_user(
            email="joao.silva@example.com",
            name="João Silva"
        )
        print(f"✅ Usuário criado: {user1.name} ({user1.email})")
        
        user2 = service.create_user(
            email="maria.santos@example.com",
            name="Maria Santos"
        )
        print(f"✅ Usuário criado: {user2.name} ({user2.email})")
        
    except ValueError as e:
        print(f"❌ Erro ao criar usuário: {e}")
        return
    
    # Lista todos os usuários
    print("\n--- Lista de Usuários ---")
    users = service.list_all_users()
    for user in users:
        print(f"  - {user.name} ({user.email})")
    
    # Busca usuário por ID
    print("\n--- Busca por ID ---")
    found_user = service.get_user_by_id(user1.id)
    if found_user:
        print(f"  Usuário encontrado: {found_user.name}")
    
    # Atualiza nome
    print("\n--- Atualização ---")
    try:
        updated_user = service.update_user_name(
            user_id=user1.id,
            new_name="João Silva Santos"
        )
        print(f"✅ Nome atualizado: {updated_user.name}")
    except ValueError as e:
        print(f"❌ Erro ao atualizar: {e}")
    
    # Remove usuário
    print("\n--- Remoção ---")
    deleted = service.delete_user(user2.id)
    if deleted:
        print(f"✅ Usuário removido: {user2.name}")
    
    # Lista final
    print("\n--- Lista Final ---")
    final_users = service.list_all_users()
    for user in final_users:
        print(f"  - {user.name} ({user.email})")
    
    print("\n=== Fim ===")


if __name__ == "__main__":
    main()

