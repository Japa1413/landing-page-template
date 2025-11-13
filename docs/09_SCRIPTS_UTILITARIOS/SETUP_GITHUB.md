# 🚀 Setup do Repositório GitHub

Guia para criar e configurar o repositório no GitHub.

---

## 📋 Pré-requisitos

1. ✅ Conta no GitHub
2. ✅ Git instalado e configurado
3. ✅ SSH key configurada (recomendado) ou token de acesso

---

## 🔧 Passo a Passo

### 1. Criar Repositório no GitHub

#### Opção A: Via Interface Web
1. Acesse [GitHub.com](https://github.com)
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name:** `suelen-maximo-landing-page` (ou nome desejado)
   - **Description:** `Landing page moderna para Dra. Suelen Silva Máximo - Advogada OAB/DF 27400`
   - **Visibility:** 
     - ✅ **Public** (recomendado para portfolio)
     - ⚠️ **Private** (se preferir privado)
   - ❌ **NÃO** marque "Initialize with README" (já temos)
   - ❌ **NÃO** adicione .gitignore (já temos)
   - ❌ **NÃO** adicione license (já temos)
5. Clique em **"Create repository"**

#### Opção B: Via GitHub CLI (se instalado)
```bash
gh repo create suelen-maximo-landing-page --public --description "Landing page moderna para Dra. Suelen Silva Máximo"
```

---

### 2. Conectar Repositório Local ao GitHub

#### Se o repositório foi criado vazio:

```bash
# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/suelen-maximo-landing-page.git

# Ou com SSH (recomendado):
git remote add origin git@github.com:SEU-USUARIO/suelen-maximo-landing-page.git
```

#### Verificar remote:
```bash
git remote -v
```

---

### 3. Fazer Push do Código

```bash
# Renomear branch para main (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

---

## 🔐 Autenticação

### Opção 1: SSH (Recomendado)
1. Gere uma chave SSH se não tiver:
   ```bash
   ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
   ```
2. Adicione a chave ao GitHub:
   - Copie a chave pública: `cat ~/.ssh/id_ed25519.pub`
   - GitHub > Settings > SSH and GPG keys > New SSH key

### Opção 2: Personal Access Token
1. GitHub > Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Selecione escopos: `repo`
4. Use o token como senha ao fazer push

### Opção 3: GitHub CLI
```bash
gh auth login
```

---

## ✅ Verificação

Após o push, verifique:
1. Acesse o repositório no GitHub
2. Confirme que todos os arquivos estão lá
3. Verifique o README.md está sendo exibido

---

## 📝 Comandos Úteis

### Ver status:
```bash
git status
```

### Ver commits:
```bash
git log --oneline
```

### Verificar remote:
```bash
git remote -v
```

### Atualizar do GitHub:
```bash
git pull origin main
```

### Fazer push de mudanças:
```bash
git add .
git commit -m "descrição da mudança"
git push origin main
```

---

## 🎯 Próximos Passos

Após criar o repositório:

1. ✅ **GitHub Pages** (se desejar hospedar no GitHub):
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

2. ✅ **Adicionar Topics** (tags):
   - No repositório, clique em ⚙️ (Settings)
   - Adicione: `landing-page`, `advocacia`, `html`, `css`, `javascript`, `pwa`

3. ✅ **Adicionar Descrição**:
   - Edite a descrição do repositório

4. ✅ **README Badges** (opcional):
   - Adicione badges ao README.md

---

## 🆘 Troubleshooting

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin URL_DO_REPOSITORIO
```

### Erro: "failed to push"
```bash
# Verificar autenticação
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"

# Tentar novamente
git push -u origin main
```

### Erro: "permission denied"
- Verificar SSH key ou token
- Verificar permissões do repositório

---

## 📚 Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [SSH Keys Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

**Última atualização:** 2025-01-11

