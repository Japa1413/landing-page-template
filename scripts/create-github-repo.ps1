# Script para criar repositório no GitHub automaticamente
# Tenta usar GitHub CLI, se não disponível, fornece instruções

param(
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "suelen-maximo-landing-page",
    
    [Parameter(Mandatory=$false)]
    [string]$Description = "Landing page moderna para Dra. Suelen Silva Máximo - Advogada OAB/DF 27400",
    
    [Parameter(Mandatory=$false)]
    [switch]$Private = $false
)

Write-Host "🚀 Criando repositório no GitHub automaticamente..." -ForegroundColor Cyan
Write-Host ""

# Verificar se GitHub CLI está instalado
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if ($ghInstalled) {
    Write-Host "✅ GitHub CLI encontrado!" -ForegroundColor Green
    
    # Verificar autenticação
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Autenticado no GitHub CLI" -ForegroundColor Green
        Write-Host ""
        
        # Criar repositório
        Write-Host "📦 Criando repositório: $RepoName" -ForegroundColor Cyan
        
        $visibility = if ($Private) { "--private" } else { "--public" }
        
        gh repo create $RepoName --description $Description $visibility --source=. --remote=origin --push
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Repositório criado e código enviado com sucesso!" -ForegroundColor Green
            Write-Host ""
            Write-Host "🌐 Repositório: https://github.com/$(gh api user -q .login)/$RepoName" -ForegroundColor Cyan
            
            # Renomear branch para main se necessário
            $currentBranch = git branch --show-current
            if ($currentBranch -ne "main") {
                Write-Host ""
                Write-Host "🔄 Renomeando branch para 'main'..." -ForegroundColor Cyan
                git branch -M main
                git push -u origin main --force
            }
            
            Write-Host ""
            Write-Host "✅ Tudo pronto! Acesse o repositório no link acima." -ForegroundColor Green
            exit 0
        } else {
            Write-Host "❌ Erro ao criar repositório via GitHub CLI" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️  GitHub CLI não está autenticado" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Autenticando..." -ForegroundColor Cyan
        gh auth login
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Autenticado! Tentando criar repositório novamente..." -ForegroundColor Green
            gh repo create $RepoName --description $Description $visibility --source=. --remote=origin --push
        }
    }
} else {
    Write-Host "⚠️  GitHub CLI não encontrado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📥 Instalando GitHub CLI..." -ForegroundColor Cyan
    
    # Tentar instalar via winget
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        Write-Host "Instalando via winget..." -ForegroundColor Cyan
        winget install --id GitHub.cli
        Write-Host ""
        Write-Host "✅ GitHub CLI instalado! Por favor, execute este script novamente." -ForegroundColor Green
        Write-Host "   Ou autentique manualmente: gh auth login" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "❌ Não foi possível instalar automaticamente." -ForegroundColor Red
        Write-Host ""
        Write-Host "📋 Opções:" -ForegroundColor Cyan
        Write-Host "1. Instale GitHub CLI manualmente: https://cli.github.com/" -ForegroundColor White
        Write-Host "2. Ou crie o repositório manualmente no GitHub e execute:" -ForegroundColor White
        Write-Host "   .\scripts\setup-github.ps1 -GitHubUser SEU-USUARIO -RepoName $RepoName" -ForegroundColor Yellow
    }
}
