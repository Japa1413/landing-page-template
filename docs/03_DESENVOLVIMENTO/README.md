# Guia de Desenvolvimento

Este documento contém informações sobre como desenvolver no projeto, convenções e boas práticas.

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Python 3.9 ou superior
- pip (gerenciador de pacotes Python)
- git

### Setup Inicial

```bash
# Clone o repositório
git clone <repository-url>
cd "Suelen Maximo"

# Execute o script de setup
bash scripts/setup.sh

# Ou configure manualmente:
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
pre-commit install
```

## 📝 Convenções de Código

### Nomenclatura

- **Classes:** PascalCase (`UserService`, `InMemoryUserRepository`)
- **Funções/Métodos:** snake_case (`create_user`, `validate_email`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Variáveis:** snake_case (`user_id`, `email_address`)

### Formatação

O projeto usa **Black** para formatação automática:

```bash
# Formatar código
black src/ tests/

# Verificar formatação
black --check src/ tests/
```

### Linting

O projeto usa **flake8** e **pylint**:

```bash
# Executar flake8
flake8 src/ tests/

# Executar pylint
pylint src/
```

### Type Hints

Sempre use type hints em funções públicas:

```python
def create_user(email: str, name: str) -> User:
    """Cria um novo usuário."""
    pass
```

## 📚 Estrutura de Arquivos

### Organização de Módulos

```
src/
├── domain/              # Camada de domínio
│   ├── entities/        # Entidades
│   └── repositories/    # Interfaces de repositório
├── services/            # Camada de aplicação
├── infrastructure/      # Camada de infraestrutura
│   └── repositories/    # Implementações concretas
└── utils/               # Utilitários
```

### Estrutura de Testes

```
tests/
├── unit/                # Testes unitários
└── integration/         # Testes de integração
```

## ✍️ Escrevendo Código

### Docstrings

Sempre documente funções e classes públicas:

```python
def calculate_total(items: List[Item], discount: float = 0.0) -> float:
    """
    Calcula o total de uma lista de itens com desconto opcional.
    
    Args:
        items: Lista de itens para calcular
        discount: Percentual de desconto (0.0 a 1.0). Padrão: 0.0
        
    Returns:
        float: Total calculado com desconto aplicado
        
    Raises:
        ValueError: Se discount < 0 ou > 1
        EmptyListError: Se items estiver vazia
        
    Example:
        >>> items = [Item(price=10.0), Item(price=20.0)]
        >>> calculate_total(items, discount=0.1)
        27.0
    """
    pass
```

### Tratamento de Erros

Sempre trate erros explicitamente:

```python
try:
    result = divide(a, b)
except ZeroDivisionError:
    logger.error(f"Division by zero: {a} / {b}")
    raise ValueError("Cannot divide by zero")
except TypeError as e:
    logger.error(f"Invalid types: {e}")
    raise
```

### Validação de Entrada

Valide sempre entradas de funções públicas:

```python
def create_user(email: str, name: str) -> User:
    if not validate_email(email):
        raise ValueError(f"Invalid email: {email}")
    if not validate_name(name):
        raise ValueError(f"Invalid name: {name}")
    # ...
```

## 🧪 Escrevendo Testes

### Estrutura de Testes

Use o padrão **Arrange-Act-Assert (AAA)**:

```python
def test_create_user_success(self):
    """Testa criação de usuário com sucesso."""
    # Arrange
    email = "user@example.com"
    name = "John Doe"
    expected_user = User(id=1, email=email, name=name)
    self.mock_repository.save.return_value = expected_user
    
    # Act
    result = self.service.create_user(email, name)
    
    # Assert
    assert result.email == email
    assert result.name == name
    self.mock_repository.save.assert_called_once()
```

### Nomenclatura de Testes

- Use nomes descritivos: `test_create_user_success`
- Descreva o comportamento esperado
- Use docstrings para explicar o teste

### Cobertura de Testes

- Meta: **> 80% de cobertura**
- Teste casos de sucesso e erro
- Teste casos extremos (edge cases)

### Executando Testes

```bash
# Todos os testes
pytest

# Com cobertura
pytest --cov=src --cov-report=html

# Apenas testes unitários
pytest tests/unit/

# Apenas testes de integração
pytest tests/integration/

# Teste específico
pytest tests/unit/test_user_service.py::TestUserService::test_create_user_success
```

## 🔄 Git Workflow

### Branches

- `main` - Código de produção
- `develop` - Desenvolvimento
- `feature/nome-da-funcionalidade` - Novas funcionalidades
- `fix/nome-do-bug` - Correções de bugs

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): adiciona autenticação JWT
fix(user): corrige validação de email
docs(api): atualiza documentação de endpoints
refactor(service): extrai lógica de validação
```

### Pull Requests

1. Crie branch a partir de `develop`
2. Desenvolva e teste
3. Execute `scripts/validate.sh`
4. Crie PR com descrição clara
5. Aguarde review
6. Após merge, delete a branch

## 🔍 Validação Antes de Commit

Execute o script de validação:

```bash
bash scripts/validate.sh
```

Isso executa:
- Linter (flake8, pylint)
- Type checker (mypy)
- Testes
- Verificação de cobertura

## 📖 Documentação

### Atualizando Documentação

Quando adicionar/modificar código:

1. Atualize docstrings
2. Atualize README.md se necessário
3. Atualize documentação de API se aplicável
4. Gere documentação: `python scripts/generate_docs.py`

### Documentação de Decisões

Para decisões arquiteturais importantes, crie um ADR (Architecture Decision Record) em `docs/02_ARQUITETURA/ADRs/`.

## 🐛 Debugging

### Logging

Use logging apropriado:

```python
import logging

logger = logging.getLogger(__name__)

logger.debug("Debug information")
logger.info("Informational message")
logger.warning("Warning message")
logger.error("Error message")
```

### Debugging no VS Code

Configure `.vscode/launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal"
        }
    ]
}
```

## ✅ Checklist Antes de PR

- [ ] Código formatado (black)
- [ ] Linter passou (flake8, pylint)
- [ ] Type checker passou (mypy)
- [ ] Todos os testes passando
- [ ] Cobertura > 80%
- [ ] Docstrings atualizadas
- [ ] README atualizado (se necessário)
- [ ] Commits seguem conventional commits
- [ ] Branch atualizada com develop

## 🚨 Problemas Comuns

### Import Errors

Certifique-se de que o Python encontra os módulos:

```bash
# Adicione src ao PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"
```

### Testes Falhando

1. Verifique se ambiente virtual está ativado
2. Verifique se dependências estão instaladas
3. Execute `pytest -v` para ver detalhes

### Pre-commit Hooks Falhando

Execute manualmente para ver erros:

```bash
pre-commit run --all-files
```

