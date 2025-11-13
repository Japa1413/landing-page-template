# 🚀 Guia Rápido: Criar Repositório no GitHub

## ✅ Projeto Salvo e Pronto!

O projeto está **100% salvo localmente** e pronto para ser enviado ao GitHub.

---

## 📋 Passo a Passo Rápido

### 1️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name:** `suelen-maximo-landing-page`
   - **Description:** `Landing page moderna para Dra. Suelen Silva Máximo - Advogada OAB/DF 27400`
   - **Visibility:** ✅ Public (ou Private se preferir)
   - ❌ **NÃO marque** "Initialize with README" (já temos)
   - ❌ **NÃO adicione** .gitignore (já temos)
   - ❌ **NÃO adicione** license (já temos)
3. Clique em **"Create repository"**

---

### 2️⃣ Conectar e Enviar Código

#### Opção A: Usando o Script Automático (Recomendado)

```powershell
# Execute no PowerShell na pasta do projeto
.\scripts\setup-github.ps1 -GitHubUser "SEU-USUARIO" -RepoName "suelen-maximo-landing-page"
```

**Com SSH:**
```powershell
.\scripts\setup-github.ps1 -GitHubUser "SEU-USUARIO" -RepoName "suelen-maximo-landing-page" -UseSSH
```

#### Opção B: Manualmente

```powershell
# 1. Adicionar remote (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/suelen-maximo-landing-page.git

# 2. Renomear branch para main (se necessário)
git branch -M main

# 3. Fazer push
git push -u origin main
```

---

## 🔐 Autenticação

### Se usar HTTPS:
- Você precisará de um **Personal Access Token**
- GitHub > Settings > Developer settings > Personal access tokens > Generate new token
- Use o token como senha ao fazer push

### Se usar SSH (Recomendado):
- Configure sua chave SSH no GitHub
- Mais seguro e não precisa digitar senha

---

## ✅ Verificação

Após o push, acesse:
```
https://github.com/SEU-USUARIO/suelen-maximo-landing-page
```

Verifique que:
- ✅ Todos os arquivos estão lá
- ✅ README.md está sendo exibido
- ✅ Commits aparecem no histórico

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- **[Setup GitHub Completo](docs/09_SCRIPTS_UTILITARIOS/SETUP_GITHUB.md)**
- **[Comandos Git Úteis](docs/09_SCRIPTS_UTILITARIOS/COMANDOS_GIT.md)**

---

## 🎯 Status Atual

- ✅ Projeto salvo localmente
- ✅ Todos os commits feitos
- ✅ Estrutura organizada
- ✅ Documentação completa
- ⏳ Aguardando criação do repositório no GitHub

---

**Próximo passo:** Criar o repositório no GitHub e executar o script de setup!

