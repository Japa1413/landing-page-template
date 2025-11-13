# 📁 Estrutura do Projeto

Documentação da organização completa do projeto.

---

## 🗂️ Estrutura de Diretórios

```
Suelen Maximo/
│
├── 📄 index.html              # Página principal da landing page
├── 📄 manifest.json           # PWA manifest
├── 📄 sw.js                   # Service Worker (PWA)
├── 📄 sitemap.xml             # Sitemap para SEO
├── 📄 robots.txt              # Robots.txt para SEO
├── 📄 README.md               # Documentação principal
├── 📄 LICENSE                 # Licença do projeto
│
├── 📁 assets/                 # Assets da landing page
│   ├── 📁 css/                # Estilos
│   │   ├── style.css          # Estilos principais
│   │   ├── dark-mode.css      # Modo escuro temático
│   │   ├── modern-enhancements.css  # Melhorias modernas
│   │   └── skeleton.css       # Skeleton screens
│   │
│   ├── 📁 js/                 # JavaScript
│   │   ├── main.js            # JavaScript principal
│   │   ├── dark-mode.js       # Toggle modo escuro
│   │   ├── lazy-load.js       # Lazy loading
│   │   ├── form-validation.js # Validação de formulário
│   │   ├── pwa-install.js     # PWA install prompt
│   │   ├── web-vitals.js      # Web Vitals monitoring
│   │   ├── modern-enhancements.js  # Melhorias modernas
│   │   └── smooth-scroll-polyfill.js  # Smooth scroll
│   │
│   └── 📁 images/             # Imagens
│       └── README_IMAGENS.md  # Guia de imagens necessárias
│
├── 📁 docs/                   # Documentação completa
│   ├── README.md              # Índice da documentação
│   ├── ESTRUTURA_PROJETO.md   # Este arquivo
│   │
│   ├── 📁 01_PROJETO/         # Documentação inicial
│   │   ├── ATUALIZACAO_DRA_SUELEN.md
│   │   ├── PROJETO_COMPLETO.md
│   │   └── TESTE_LANDING_PAGE.md
│   │
│   ├── 📁 02_ARQUITETURA/     # Arquitetura técnica
│   │   └── README.md
│   │
│   ├── 📁 03_DESENVOLVIMENTO/ # Guias de desenvolvimento
│   │   └── README.md
│   │
│   ├── 📁 04_DOCUMENTACAO/    # Referências de API
│   │   └── API.md
│   │
│   ├── 📁 05_MELHORIAS/       # Documentação de melhorias
│   │   ├── CORRECOES_BOTOES.md
│   │   ├── MELHORIAS_BAIXA_PRIORIDADE.md
│   │   ├── MELHORIAS_MEDIA_PRIORIDADE.md
│   │   ├── MELHORIAS_MODERNAS_SOFISTICADAS.md
│   │   └── RESUMO_FINAL_MELHORIAS.md
│   │
│   ├── 📁 06_ANALISES/        # Análises técnicas
│   │   └── ANALISE_E_MELHORIAS.md
│   │
│   ├── 📁 07_GUIA_FINALIZACAO/  # Guia para finalização
│   │   └── INFORMACOES_PARA_FINALIZACAO.md
│   │
│   ├── 📁 08_CHANGELOG/       # Histórico de mudanças
│   │   ├── README.md
│   │   └── CHANGELOG.md
│   │
│   └── 📁 09_SCRIPTS_UTILITARIOS/  # Scripts auxiliares
│       ├── README.md
│       └── test-server.ps1
│
├── 📁 scripts/                # Scripts de automação (Python)
│   ├── check_docstrings.py
│   ├── generate_docs.py
│   ├── setup.ps1
│   ├── setup.sh
│   └── validate.sh
│
├── 📁 src/                    # Código Python (exemplo)
│   ├── domain/
│   ├── infrastructure/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── 📁 tests/                  # Testes Python
│   ├── integration/
│   └── unit/
│
├── 📄 pyproject.toml          # Configuração Python
├── 📄 requirements.txt         # Dependências Python
└── 📄 requirements-dev.txt     # Dependências desenvolvimento
```

---

## 📋 Categorização de Arquivos

### 🎨 Landing Page (Raiz)
Arquivos essenciais da landing page que devem permanecer na raiz:
- `index.html` - Página principal
- `manifest.json` - PWA manifest
- `sw.js` - Service Worker
- `sitemap.xml` - SEO
- `robots.txt` - SEO
- `README.md` - Documentação principal

### 📚 Documentação (`docs/`)
Toda a documentação organizada por categorias:
- **01_PROJETO/** - Documentação inicial e histórico
- **02_ARQUITETURA/** - Arquitetura técnica
- **03_DESENVOLVIMENTO/** - Guias de desenvolvimento
- **04_DOCUMENTACAO/** - Referências de API
- **05_MELHORIAS/** - Melhorias implementadas
- **06_ANALISES/** - Análises técnicas
- **07_GUIA_FINALIZACAO/** - Guia para finalização
- **08_CHANGELOG/** - Histórico de versões
- **09_SCRIPTS_UTILITARIOS/** - Scripts auxiliares

### 🎨 Assets (`assets/`)
Recursos visuais e scripts da landing page:
- **css/** - Estilos
- **js/** - JavaScript
- **images/** - Imagens (adicionar aqui)

### 🐍 Python (Opcional)
Código Python de exemplo (pode ser removido se não necessário):
- `src/` - Código fonte
- `tests/` - Testes
- `scripts/` - Scripts Python
- `pyproject.toml` - Configuração
- `requirements*.txt` - Dependências

---

## 🎯 Convenções de Organização

### Nomenclatura de Pastas
- **Numeração:** Pastas numeradas (01_, 02_, etc.) para ordem lógica
- **Maiúsculas:** Nomes em MAIÚSCULAS para categorias principais
- **Snake_case:** Para nomes compostos

### Nomenclatura de Arquivos
- **README.md:** Em cada pasta para documentação
- **MAIÚSCULAS.md:** Para documentos principais
- **camelCase.js:** Para arquivos JavaScript
- **kebab-case.css:** Para arquivos CSS

### Estrutura de Documentação
Cada pasta de documentação deve conter:
1. `README.md` - Índice e descrição da categoria
2. Arquivos `.md` específicos da categoria

---

## 📝 Regras de Organização

### ✅ Arquivos que DEVEM ficar na raiz:
- `index.html`
- `manifest.json`
- `sw.js`
- `sitemap.xml`
- `robots.txt`
- `README.md`
- `LICENSE`

### ✅ Arquivos que DEVEM estar em `docs/`:
- Todos os arquivos `.md` de documentação
- Changelog
- Scripts utilitários relacionados à documentação

### ✅ Arquivos que DEVEM estar em `assets/`:
- CSS, JavaScript, imagens
- Recursos estáticos da landing page

### ⚠️ Arquivos Python (Opcional):
- Podem ser mantidos se necessário
- Podem ser removidos se não forem usados
- Estão separados da landing page

---

## 🔍 Como Encontrar Documentos

### Por Categoria:
- **Projeto:** `docs/01_PROJETO/`
- **Arquitetura:** `docs/02_ARQUITETURA/`
- **Desenvolvimento:** `docs/03_DESENVOLVIMENTO/`
- **Melhorias:** `docs/05_MELHORIAS/`
- **Finalização:** `docs/07_GUIA_FINALIZACAO/`
- **Changelog:** `docs/08_CHANGELOG/`

### Por Índice:
Consulte `docs/README.md` para índice completo.

---

## 📦 Manutenção

### Adicionar Novo Documento:
1. Identifique a categoria apropriada
2. Coloque na pasta numerada correspondente
3. Atualize o `README.md` da categoria
4. Atualize `docs/README.md` se necessário

### Adicionar Nova Categoria:
1. Crie pasta com numeração sequencial
2. Adicione `README.md` na pasta
3. Atualize `docs/README.md`
4. Atualize este arquivo

---

**Última atualização:** 2025-01-11  
**Versão:** 1.0.0

