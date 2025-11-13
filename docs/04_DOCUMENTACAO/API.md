# Documentação da API

Este documento descreve a API do projeto, incluindo classes, métodos e funções públicas.

## 📦 Módulos Principais

### `src.domain.entities.user`

#### Classe `User`

Entidade que representa um usuário no domínio da aplicação.

**Atributos:**
- `id: Optional[int]` - Identificador único do usuário
- `email: str` - Email do usuário (único)
- `name: str` - Nome completo do usuário
- `created_at: Optional[datetime]` - Data de criação do registro
- `updated_at: Optional[datetime]` - Data da última atualização

**Métodos:**

##### `update_name(new_name: str) -> None`

Atualiza o nome do usuário.

**Parâmetros:**
- `new_name: str` - Novo nome do usuário

**Raises:**
- `ValueError` - Se new_name estiver vazio

**Exemplo:**
```python
user = User(id=1, email="user@example.com", name="John Doe")
user.update_name("Jane Doe")
```

---

### `src.domain.repositories.user_repository`

#### Interface `UserRepositoryInterface`

Interface para repositório de usuários, seguindo o padrão Repository.

**Métodos Abstratos:**

##### `save(user: User) -> User`

Salva um usuário.

**Parâmetros:**
- `user: User` - Usuário a ser salvo

**Returns:**
- `User` - Usuário salvo com ID atribuído

**Raises:**
- `ValueError` - Se email já existir

##### `find_by_id(user_id: int) -> Optional[User]`

Busca usuário por ID.

**Parâmetros:**
- `user_id: int` - ID do usuário

**Returns:**
- `Optional[User]` - Usuário encontrado ou None

##### `find_by_email(email: str) -> Optional[User]`

Busca usuário por email.

**Parâmetros:**
- `email: str` - Email do usuário

**Returns:**
- `Optional[User]` - Usuário encontrado ou None

##### `find_all() -> List[User]`

Lista todos os usuários.

**Returns:**
- `List[User]` - Lista de todos os usuários

##### `delete(user_id: int) -> bool`

Remove um usuário.

**Parâmetros:**
- `user_id: int` - ID do usuário a ser removido

**Returns:**
- `bool` - True se removido com sucesso, False caso contrário

---

### `src.services.user_service`

#### Classe `UserService`

Serviço para gerenciamento de usuários. Implementa casos de uso relacionados a usuários.

**Construtor:**

##### `__init__(repository: UserRepositoryInterface)`

Inicializa o serviço com dependências.

**Parâmetros:**
- `repository: UserRepositoryInterface` - Repositório de usuários

**Raises:**
- `TypeError` - Se repository não implementar UserRepositoryInterface

**Métodos:**

##### `create_user(email: str, name: str) -> User`

Cria um novo usuário.

**Parâmetros:**
- `email: str` - Email do usuário (deve ser único)
- `name: str` - Nome completo do usuário

**Returns:**
- `User` - Usuário criado

**Raises:**
- `ValueError` - Se email ou name inválidos
- `ValueError` - Se email já existir

**Exemplo:**
```python
service = UserService(repository)
user = service.create_user("user@example.com", "John Doe")
```

##### `get_user_by_id(user_id: int) -> Optional[User]`

Busca usuário por ID.

**Parâmetros:**
- `user_id: int` - ID do usuário

**Returns:**
- `Optional[User]` - Usuário encontrado ou None

**Raises:**
- `ValueError` - Se user_id inválido

##### `get_user_by_email(email: str) -> Optional[User]`

Busca usuário por email.

**Parâmetros:**
- `email: str` - Email do usuário

**Returns:**
- `Optional[User]` - Usuário encontrado ou None

**Raises:**
- `ValueError` - Se email inválido

##### `list_all_users() -> List[User]`

Lista todos os usuários.

**Returns:**
- `List[User]` - Lista de todos os usuários

##### `update_user_name(user_id: int, new_name: str) -> User`

Atualiza o nome de um usuário.

**Parâmetros:**
- `user_id: int` - ID do usuário
- `new_name: str` - Novo nome

**Returns:**
- `User` - Usuário atualizado

**Raises:**
- `ValueError` - Se user_id inválido ou usuário não encontrado
- `ValueError` - Se new_name inválido

##### `delete_user(user_id: int) -> bool`

Remove um usuário.

**Parâmetros:**
- `user_id: int` - ID do usuário a ser removido

**Returns:**
- `bool` - True se removido com sucesso

**Raises:**
- `ValueError` - Se user_id inválido

---

### `src.infrastructure.repositories.in_memory_user_repository`

#### Classe `InMemoryUserRepository`

Implementação em memória do repositório de usuários. Útil para testes e desenvolvimento.

**Construtor:**

##### `__init__()`

Inicializa o repositório vazio.

**Métodos:**

Implementa todos os métodos de `UserRepositoryInterface`.

**Nota:** Esta implementação não é thread-safe e não persiste dados após encerramento da aplicação.

---

### `src.utils.validators`

#### Função `validate_email(email: str) -> bool`

Valida formato de email.

**Parâmetros:**
- `email: str` - Email a ser validado

**Returns:**
- `bool` - True se email válido, False caso contrário

**Exemplo:**
```python
if validate_email("user@example.com"):
    print("Email válido")
```

#### Função `validate_name(name: str) -> bool`

Valida nome de usuário.

**Parâmetros:**
- `name: str` - Nome a ser validado

**Returns:**
- `bool` - True se nome válido, False caso contrário

**Exemplo:**
```python
if validate_name("John Doe"):
    print("Nome válido")
```

#### Função `sanitize_string(value: str, max_length: Optional[int] = None) -> str`

Sanitiza string removendo espaços extras.

**Parâmetros:**
- `value: str` - String a ser sanitizada
- `max_length: Optional[int]` - Comprimento máximo (opcional)

**Returns:**
- `str` - String sanitizada

**Raises:**
- `TypeError` - Se value não for string
- `ValueError` - Se value exceder max_length após sanitização

**Exemplo:**
```python
sanitized = sanitize_string("  hello  ", max_length=10)
# Resultado: "hello"
```

---

## 🔄 Fluxos de Uso

### Criar e Gerenciar Usuário

```python
from src.infrastructure.repositories.in_memory_user_repository import (
    InMemoryUserRepository,
)
from src.services.user_service import UserService

# Inicializar
repository = InMemoryUserRepository()
service = UserService(repository)

# Criar usuário
user = service.create_user("user@example.com", "John Doe")

# Buscar usuário
found = service.get_user_by_id(user.id)

# Atualizar nome
updated = service.update_user_name(user.id, "Jane Doe")

# Listar todos
all_users = service.list_all_users()

# Remover usuário
service.delete_user(user.id)
```

### Validação de Dados

```python
from src.utils.validators import validate_email, validate_name

# Validar email
if validate_email("user@example.com"):
    # Processar email válido
    pass

# Validar nome
if validate_name("John Doe"):
    # Processar nome válido
    pass
```

---

## ⚠️ Tratamento de Erros

### Erros Comuns

#### `ValueError`

Lançado quando:
- Email ou nome inválidos
- Email duplicado
- ID inválido
- Usuário não encontrado

**Exemplo:**
```python
try:
    user = service.create_user("invalid-email", "John")
except ValueError as e:
    print(f"Erro: {e}")
```

#### `TypeError`

Lançado quando:
- Tipo de parâmetro incorreto
- Repository não implementa interface correta

**Exemplo:**
```python
try:
    service = UserService("not a repository")
except TypeError as e:
    print(f"Erro: {e}")
```

---

## 📝 Notas de Implementação

1. **Thread Safety:** `InMemoryUserRepository` não é thread-safe. Para uso em produção, considere implementação thread-safe ou use banco de dados.

2. **Persistência:** Dados em `InMemoryUserRepository` são perdidos ao encerrar a aplicação. Para persistência, implemente repositório com banco de dados.

3. **Validação:** Validações são feitas tanto no serviço quanto na entidade. Isso garante integridade dos dados.

4. **Dependency Injection:** Sempre injete dependências via construtor para facilitar testes e manutenção.

