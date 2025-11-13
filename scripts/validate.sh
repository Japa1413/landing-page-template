#!/bin/bash

# Script de validação completa do código
# Executa linter, type checker, testes e verifica cobertura

set -e  # Para em caso de erro

echo "🔍 Validando código..."

# Verifica se ambiente virtual está ativado
if [ -z "$VIRTUAL_ENV" ]; then
    echo "⚠️  Ambiente virtual não detectado. Ativando..."
    if [ -d "venv" ]; then
        source venv/bin/activate
    else
        echo "❌ Ambiente virtual não encontrado. Execute scripts/setup.sh primeiro."
        exit 1
    fi
fi

# Linter
echo ""
echo "📋 Executando linter (flake8)..."
flake8 src/ tests/ || {
    echo "❌ Linter falhou!"
    exit 1
}
echo "✅ Linter passou"

# Type checking
echo ""
echo "🔎 Executando type checker (mypy)..."
mypy src/ --ignore-missing-imports || {
    echo "⚠️  Type checker encontrou problemas (continuando...)"
}
echo "✅ Type checking concluído"

# Testes
echo ""
echo "🧪 Executando testes..."
pytest tests/ -v || {
    echo "❌ Testes falharam!"
    exit 1
}
echo "✅ Todos os testes passaram"

# Cobertura
echo ""
echo "📊 Verificando cobertura de testes..."
pytest --cov=src --cov-report=term-missing --cov-fail-under=80 || {
    echo "❌ Cobertura abaixo de 80%!"
    exit 1
}
echo "✅ Cobertura acima de 80%"

echo ""
echo "✅ Validação completa passou!"

