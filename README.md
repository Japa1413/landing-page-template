# 🏛️ Landing Page Template - Profissional

Template moderno e sofisticado para landing pages profissionais (advocacia, medicina, consultoria, etc.).

---

## ✨ Características

- 🎨 **Design Moderno e Sofisticado**
  - Tema marrom/burgundy com dourado (customizável)
  - Modo escuro temático
  - Glassmorphism e efeitos 3D
  - Animações fluidas e micro-interações

- 📱 **Totalmente Responsivo**
  - Mobile-first
  - Adaptável a todos os dispositivos
  - Touch-friendly

- ⚡ **Performance Otimizada**
  - Lazy loading de imagens
  - Service Worker (PWA)
  - Web Vitals monitorados
  - Carregamento rápido

- ♿ **Acessibilidade**
  - WCAG 2.1 AA
  - Navegação por teclado
  - Screen readers
  - ARIA labels

- 🔍 **SEO Otimizado**
  - Schema.org structured data
  - Sitemap.xml
  - Meta tags completas
  - Open Graph e Twitter Cards

- 📲 **PWA (Progressive Web App)**
  - Instalável
  - Funciona offline
  - App-like experience

---

## 🚀 Início Rápido

### 1. Clone o Repositório

```bash
git clone https://github.com/Japa1413/landing-page-template.git
cd landing-page-template
```

### 2. Configure o Template

1. Edite o arquivo `config.template.json` com suas informações
2. Execute o script de configuração:
   ```bash
   # Windows
   .\scripts\configure-template.ps1
   
   # Linux/Mac
   ./scripts/configure-template.sh
   ```

### 3. Personalize

- Adicione suas imagens em `assets/images/`
- Ajuste cores no `assets/css/style.css`
- Personalize textos no `index.html`

### 4. Visualize

Abra `index.html` no navegador ou use um servidor local:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

---

## 📁 Estrutura do Projeto

```
.
├── index.html                 # Página principal
├── config.template.json       # Arquivo de configuração
├── manifest.json              # PWA manifest
├── sw.js                      # Service Worker
├── sitemap.xml                # Sitemap para SEO
├── robots.txt                 # Robots.txt para SEO
├── assets/
│   ├── css/                   # Estilos CSS
│   ├── js/                     # JavaScript
│   └── images/                 # Imagens
├── docs/                       # Documentação completa
└── scripts/                    # Scripts de automação
```

---

## ⚙️ Configuração

### Arquivo de Configuração

Edite `config.template.json` com suas informações:

```json
{
  "site": {
    "name": "Seu Nome",
    "title": "Seu Título",
    "url": "https://www.seusite.com.br"
  },
  "professional": {
    "name": "Nome Completo",
    "registration": {
      "type": "OAB",
      "state": "DF",
      "number": "00000"
    }
  },
  "contact": {
    "phone": {
      "whatsapp": "5500000000000"
    },
    "email": "contato@seusite.com.br"
  }
}
```

### Google Analytics

Edite `index.html` e substitua `G-XXXXXXXXXX` pelo seu ID do GA4.

### Formulário de Contato

Configure o backend para receber os dados do formulário ou use um serviço como:
- Formspree
- EmailJS
- Backend próprio

---

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `assets/css/style.css`:

```css
:root {
    --primary-color: #7A3E1A;
    --secondary-color: #D4AF37;
    --burgundy: #6B1F2F;
}
```

### Imagens Necessárias

- `logo.png` - Logo principal
- `professional-photo.jpg` - Foto profissional
- `favicon.ico` - Ícone do site
- Ícones PWA (opcional)

---

## 📚 Documentação

📖 **[Ver Documentação Completa](docs/README.md)**

### Seções Principais:
- [Guia de Configuração](docs/07_GUIA_FINALIZACAO/INFORMACOES_PARA_FINALIZACAO.md)
- [Arquitetura](docs/02_ARQUITETURA/README.md)
- [Melhorias Implementadas](docs/05_MELHORIAS/)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos (Grid, Flexbox, Custom Properties)
- **JavaScript (Vanilla)** - Interatividade
- **PWA** - Progressive Web App
- **Service Worker** - Funcionalidade offline

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor web (para produção)
- Editor de texto (para personalização)

---

## 🌐 Deploy

### GitHub Pages
1. Faça push do código
2. Vá em Settings > Pages
3. Selecione a branch `main`
4. Acesse via `https://seu-usuario.github.io/repositorio`

### Netlify
1. Conecte o repositório
2. Deploy automático a cada push

### Vercel
1. Importe o projeto
2. Deploy automático

---

## 📝 Licença

Este template é fornecido como está. Sinta-se livre para usar e modificar conforme necessário.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no repositório.

---

**Desenvolvido com ❤️ seguindo as melhores práticas de desenvolvimento web**

**Versão:** 1.0.0 - Template Profissional  
**Última atualização:** 2025-01-11
