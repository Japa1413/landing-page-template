# Projeto Exemplo - Programador Perfeito

Projeto demonstrando as melhores práticas de desenvolvimento: código limpo, arquitetura bem estruturada, documentação completa, testes e automação.

## 🚀 Início Rápido

### Pré-requisitos

- Python 3.9+
- pip
- git

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd "Suelen Maximo"

# Execute o script de setup
bash scripts/setup.sh

# Ou manualmente:
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### Uso

```bash
# Ative o ambiente virtual
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Execute o projeto
python -m src.main

# Execute testes
pytest

# Execute validação completa
bash scripts/validate.sh
```

## 📚 Documentação

- [Arquitetura](docs/02_ARQUITETURA/README.md)
- [Desenvolvimento](docs/03_DESENVOLVIMENTO/README.md)
- [API Reference](docs/04_DOCUMENTACAO/API.md)

## 🧪 Testes

```bash
# Executar todos os testes
pytest

# Com cobertura
pytest --cov=src --cov-report=html

# Apenas testes unitários
pytest tests/unit/

# Apenas testes de integração
pytest tests/integration/
```

## 🔧 Scripts Disponíveis

- `scripts/setup.sh` - Configura ambiente de desenvolvimento
- `scripts/validate.sh` - Valida código, testes e documentação
- `scripts/generate_docs.py` - Gera documentação automaticamente
- `scripts/check_docstrings.py` - Verifica docstrings em funções públicas

## 📝 Convenções de Commit

Este projeto segue [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): descrição
fix(scope): descrição
docs(scope): descrição
refactor(scope): descrição
```

## 🏗️ Estrutura do Projeto

```
.
├── src/                    # Código fonte
│   ├── domain/            # Entidades e lógica de negócio
│   ├── services/          # Serviços de aplicação
│   ├── repositories/      # Interfaces de repositório
│   ├── infrastructure/    # Implementações concretas
│   └── utils/             # Utilitários
├── tests/                 # Testes
│   ├── unit/              # Testes unitários
│   └── integration/       # Testes de integração
├── docs/                  # Documentação
│   ├── 02_ARQUITETURA/    # Documentação de arquitetura
│   ├── 03_DESENVOLVIMENTO/# Guias de desenvolvimento
│   └── 04_DOCUMENTACAO/   # Documentação de API
├── scripts/               # Scripts de automação
└── .github/               # Configurações GitHub
    └── workflows/         # CI/CD
```

## 📋 Checklist de Qualidade

- ✅ Código limpo e legível
- ✅ Testes com cobertura > 80%
- ✅ Documentação completa
- ✅ Git hooks configurados
- ✅ CI/CD configurado
- ✅ Scripts de automação

## 📝 Licença

MIT

