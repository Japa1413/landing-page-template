# Script de setup do ambiente de desenvolvimento (Windows PowerShell)
# Configura ambiente virtual, instala dependências e configura hooks

Write-Host "🚀 Configurando ambiente de desenvolvimento..." -ForegroundColor Cyan

# Verifica Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ $pythonVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Python não encontrado. Por favor, instale Python 3.9 ou superior." -ForegroundColor Red
    exit 1
}

# Cria virtual environment
if (-not (Test-Path "venv")) {
    Write-Host "📦 Criando ambiente virtual..." -ForegroundColor Yellow
    python -m venv venv
} else {
    Write-Host "✅ Ambiente virtual já existe" -ForegroundColor Green
}

# Ativa virtual environment
Write-Host "🔌 Ativando ambiente virtual..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Atualiza pip
Write-Host "⬆️  Atualizando pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Instala dependências
Write-Host "📥 Instalando dependências de produção..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host "📥 Instalando dependências de desenvolvimento..." -ForegroundColor Yellow
pip install -r requirements-dev.txt

# Configura pre-commit hooks
Write-Host "🪝 Configurando pre-commit hooks..." -ForegroundColor Yellow
pre-commit install

# Executa testes iniciais
Write-Host "🧪 Executando testes iniciais..." -ForegroundColor Yellow
pytest tests/ -v

Write-Host ""
Write-Host "✅ Setup completo!" -ForegroundColor Green
Write-Host ""
Write-Host "Para ativar o ambiente virtual, execute:" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Para executar o projeto:" -ForegroundColor Cyan
Write-Host "  python -m src.main" -ForegroundColor White
Write-Host ""
Write-Host "Para executar testes:" -ForegroundColor Cyan
Write-Host "  pytest" -ForegroundColor White

