# 📝 Comandos Git Úteis

Coleção de comandos Git úteis para o projeto.

---

## 🚀 Comandos Básicos

### Status e Informações
```bash
# Ver status do repositório
git status

# Ver histórico de commits
git log --oneline

# Ver branches
git branch

# Ver remotes configurados
git remote -v
```

### Adicionar e Commitar
```bash
# Adicionar todos os arquivos
git add .

# Adicionar arquivo específico
git add arquivo.txt

# Commit com mensagem
git commit -m "descrição da mudança"

# Adicionar e commitar em um comando
git commit -am "descrição"
```

### Push e Pull
```bash
# Push para o GitHub
git push origin main

# Push pela primeira vez
git push -u origin main

# Pull do GitHub
git pull origin main

# Fetch (buscar sem merge)
git fetch origin
```

---

## 🔧 Configuração

### Configurar Usuário
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### Ver Configurações
```bash
git config --list
git config user.name
git config user.email
```

---

## 🌿 Branches

### Criar e Trocar de Branch
```bash
# Criar nova branch
git branch nova-branch

# Trocar para branch
git checkout nova-branch

# Criar e trocar em um comando
git checkout -b nova-branch

# Renomear branch atual
git branch -M main
```

### Merge
```bash
# Fazer merge de branch
git merge nome-da-branch

# Ver branches
git branch -a
```

---

## 📦 Repositório Remoto

### Adicionar Remote
```bash
# HTTPS
git remote add origin https://github.com/USUARIO/REPO.git

# SSH
git remote add origin git@github.com:USUARIO/REPO.git
```

### Remover Remote
```bash
git remote remove origin
```

### Alterar URL do Remote
```bash
git remote set-url origin NOVA_URL
```

---

## 🔄 Desfazer Mudanças

### Desfazer Modificações
```bash
# Desfazer mudanças em arquivo não commitado
git checkout -- arquivo.txt

# Desfazer todas as mudanças não commitadas
git checkout .

# Desfazer stage (unstage)
git reset HEAD arquivo.txt
```

### Desfazer Commit
```bash
# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (remove mudanças)
git reset --hard HEAD~1
```

---

## 📊 Histórico

### Ver Histórico
```bash
# Histórico simples
git log --oneline

# Histórico detalhado
git log

# Histórico com gráfico
git log --graph --oneline --all

# Histórico de arquivo específico
git log -- arquivo.txt
```

### Diferenças
```bash
# Ver diferenças não commitadas
git diff

# Ver diferenças de arquivo específico
git diff arquivo.txt

# Ver diferenças entre commits
git diff commit1 commit2
```

---

## 🏷️ Tags

### Criar Tag
```bash
# Tag anotada
git tag -a v1.0.0 -m "Versão 1.0.0"

# Tag simples
git tag v1.0.0
```

### Push Tags
```bash
# Push de uma tag
git push origin v1.0.0

# Push de todas as tags
git push --tags
```

---

## 🧹 Limpeza

### Limpar Arquivos Não Rastreados
```bash
# Ver o que será removido
git clean -n

# Remover arquivos não rastreados
git clean -f

# Remover diretórios também
git clean -fd
```

---

## 🔐 SSH

### Gerar Chave SSH
```bash
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
```

### Testar Conexão SSH
```bash
ssh -T git@github.com
```

---

## 📋 Workflow Recomendado

### 1. Antes de Começar
```bash
git pull origin main
```

### 2. Fazer Mudanças
```bash
# Editar arquivos...
```

### 3. Adicionar e Commitar
```bash
git add .
git commit -m "descrição clara da mudança"
```

### 4. Push
```bash
git push origin main
```

---

## 🆘 Comandos de Emergência

### Recuperar Arquivo Deletado
```bash
git checkout HEAD -- arquivo.txt
```

### Ver Mudanças de Outro Commit
```bash
git show commit-hash
```

### Criar Backup
```bash
git branch backup-$(date +%Y%m%d)
```

---

**Última atualização:** 2025-01-11

