# Script para configurar conexão com GitHub
# Execute este script APÓS criar o repositório no GitHub

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUser,
    
    [Parameter(Mandatory=$true)]
    [string]$RepoName,
    
    [Parameter(Mandatory=$false)]
    [switch]$UseSSH = $false
)

Write-Host "🚀 Configurando conexão com GitHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar se já existe remote
$existingRemote = git remote -v 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Já existe um remote configurado:" -ForegroundColor Yellow
    Write-Host $existingRemote
    $response = Read-Host "Deseja substituir? (s/N)"
    if ($response -ne "s" -and $response -ne "S") {
        Write-Host "❌ Operação cancelada." -ForegroundColor Red
        exit
    }
    git remote remove origin 2>$null
}

# Construir URL
if ($UseSSH) {
    $repoUrl = "git@github.com:$GitHubUser/$RepoName.git"
    Write-Host "📡 Usando SSH..." -ForegroundColor Green
} else {
    $repoUrl = "https://github.com/$GitHubUser/$RepoName.git"
    Write-Host "🌐 Usando HTTPS..." -ForegroundColor Green
}

# Adicionar remote
Write-Host ""
Write-Host "➕ Adicionando remote 'origin'..." -ForegroundColor Cyan
git remote add origin $repoUrl

# Verificar remote
Write-Host ""
Write-Host "✅ Remote configurado:" -ForegroundColor Green
git remote -v

# Renomear branch para main (se necessário)
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host ""
    Write-Host "🔄 Renomeando branch '$currentBranch' para 'main'..." -ForegroundColor Cyan
    git branch -M main
}

# Verificar se há commits
$commitCount = (git log --oneline 2>$null | Measure-Object -Line).Lines
if ($commitCount -eq 0) {
    Write-Host ""
    Write-Host "⚠️  Nenhum commit encontrado. Faça commits antes de fazer push." -ForegroundColor Yellow
    exit
}

# Perguntar se deseja fazer push
Write-Host ""
Write-Host "📊 Commits locais: $commitCount" -ForegroundColor Cyan
$response = Read-Host "Deseja fazer push agora? (s/N)"
if ($response -eq "s" -or $response -eq "S") {
    Write-Host ""
    Write-Host "📤 Fazendo push para GitHub..." -ForegroundColor Cyan
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
        Write-Host "🌐 Repositório: https://github.com/$GitHubUser/$RepoName" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao fazer push. Verifique:" -ForegroundColor Red
        Write-Host "   1. Autenticação (SSH key ou token)" -ForegroundColor Yellow
        Write-Host "   2. Permissões do repositório" -ForegroundColor Yellow
        Write-Host "   3. URL do repositório" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "ℹ️  Para fazer push manualmente, execute:" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Configuração concluída!" -ForegroundColor Green

