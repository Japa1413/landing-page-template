#!/bin/bash

# Script de setup do ambiente de desenvolvimento
# Configura ambiente virtual, instala dependências e configura hooks

set -e  # Para em caso de erro

echo "🚀 Configurando ambiente de desenvolvimento..."

# Verifica Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3.9 ou superior."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Python ${PYTHON_VERSION} encontrado"

# Cria virtual environment
if [ ! -d "venv" ]; then
    echo "📦 Criando ambiente virtual..."
    python3 -m venv venv
else
    echo "✅ Ambiente virtual já existe"
fi

# Ativa virtual environment
echo "🔌 Ativando ambiente virtual..."
source venv/bin/activate

# Atualiza pip
echo "⬆️  Atualizando pip..."
pip install --upgrade pip

# Instala dependências
echo "📥 Instalando dependências de produção..."
pip install -r requirements.txt

echo "📥 Instalando dependências de desenvolvimento..."
pip install -r requirements-dev.txt

# Configura pre-commit hooks
echo "🪝 Configurando pre-commit hooks..."
pre-commit install

# Executa testes iniciais
echo "🧪 Executando testes iniciais..."
pytest tests/ -v

echo ""
echo "✅ Setup completo!"
echo ""
echo "Para ativar o ambiente virtual, execute:"
echo "  source venv/bin/activate"
echo ""
echo "Para executar o projeto:"
echo "  python -m src.main"
echo ""
echo "Para executar testes:"
echo "  pytest"

