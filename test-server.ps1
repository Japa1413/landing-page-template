# Script para iniciar servidor local de teste
# Use este script para testar a landing page com um servidor HTTP

Write-Host "🚀 Iniciando servidor local..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Escolha uma opção:" -ForegroundColor Yellow
Write-Host "1. Python HTTP Server (porta 8000)" -ForegroundColor White
Write-Host "2. PHP Server (porta 8000)" -ForegroundColor White
Write-Host "3. Node.js serve (porta 3000)" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Digite o número da opção (1-3)"

switch ($choice) {
    "1" {
        Write-Host "Iniciando servidor Python..." -ForegroundColor Green
        python -m http.server 8000
    }
    "2" {
        Write-Host "Iniciando servidor PHP..." -ForegroundColor Green
        php -S localhost:8000
    }
    "3" {
        Write-Host "Iniciando servidor Node.js..." -ForegroundColor Green
        npx serve -p 3000
    }
    default {
        Write-Host "Opção inválida. Iniciando servidor Python por padrão..." -ForegroundColor Yellow
        python -m http.server 8000
    }
}

