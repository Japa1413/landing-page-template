# 🧪 Guia de Teste - Landing Page

## ✅ Teste Rápido

A landing page já deve estar aberta no seu navegador!

## 🔍 O Que Testar

### 1. **Navegação**
- ✅ Clique nos links do menu (Início, Sobre, Serviços, etc.)
- ✅ Verifique se o scroll suave funciona
- ✅ Teste o menu mobile (redimensione a janela)
- ✅ Clique no botão "Voltar ao Topo" (aparece ao rolar a página)

### 2. **Responsividade**
- ✅ Redimensione a janela do navegador
- ✅ Teste em diferentes tamanhos:
  - Mobile (320px - 767px)
  - Tablet (768px - 1023px)
  - Desktop (1024px+)
- ✅ Verifique se o menu mobile aparece em telas pequenas

### 3. **Formulário de Contato**
- ✅ Tente enviar sem preencher campos (deve mostrar erro)
- ✅ Preencha todos os campos e envie
- ✅ Verifique a mensagem de sucesso
- ✅ Teste validação de email (tente email inválido)

### 4. **Animações**
- ✅ Role a página e veja as animações aparecerem
- ✅ Passe o mouse sobre os botões (efeito hover)
- ✅ Passe o mouse sobre os cards de serviços

### 5. **Links e Botões**
- ✅ Clique em "Agendar Consulta"
- ✅ Clique em "Conheça Nossos Serviços"
- ✅ Teste os links de redes sociais (no rodapé)
- ✅ Verifique se os links do rodapé funcionam

## 🚀 Teste com Servidor Local (Opcional)

Para testar com um servidor HTTP local (recomendado):

### Opção 1: Python
```powershell
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

### Opção 2: Usar o script
```powershell
.\test-server.ps1
```

## 📱 Teste em Dispositivos Reais

1. **Chrome DevTools:**
   - Pressione `F12`
   - Clique no ícone de dispositivo móvel
   - Escolha um dispositivo (iPhone, iPad, etc.)

2. **Teste em celular:**
   - Encontre seu IP local: `ipconfig` (procure IPv4)
   - No servidor Python, use: `python -m http.server 8000 --bind 0.0.0.0`
   - Acesse no celular: `http://SEU-IP:8000`

## 🐛 Problemas Comuns

### Página não carrega
- Verifique se todos os arquivos estão no lugar correto
- Verifique o console do navegador (F12 > Console)

### Estilos não aparecem
- Verifique se `assets/css/style.css` existe
- Verifique o console para erros de carregamento

### JavaScript não funciona
- Verifique se `assets/js/main.js` existe
- Verifique o console para erros JavaScript

### Fontes não carregam
- Verifique conexão com internet (Google Fonts)
- Verifique se há bloqueadores de conteúdo

## ✅ Checklist de Teste

- [ ] Página carrega corretamente
- [ ] Menu de navegação funciona
- [ ] Scroll suave entre seções
- [ ] Menu mobile funciona
- [ ] Formulário valida campos
- [ ] Formulário mostra mensagem de sucesso
- [ ] Botão "Voltar ao Topo" aparece e funciona
- [ ] Animações aparecem ao rolar
- [ ] Design responsivo funciona
- [ ] Todos os links funcionam
- [ ] Cores e estilos estão corretos
- [ ] Textos estão legíveis
- [ ] Imagens (placeholders) aparecem

## 🎨 Personalização Rápida

Para personalizar rapidamente:

1. **Cores:** Edite `assets/css/style.css` (variáveis no topo)
2. **Conteúdo:** Edite `index.html`
3. **Contato:** Procure por "contato@advocacia.com.br" e substitua

---

**Dica:** Mantenha o console do navegador aberto (F12) para ver erros!

