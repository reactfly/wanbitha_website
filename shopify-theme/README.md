# WanBitha — Shopify Theme

Tema customizado Shopify OS 2.0 para galeria de arte contemporânea.

## ✨ Características

- 🎨 **Dark Glassmorphism** — Estética premium com backdrop-blur, bordas translúcidas e gradientes rose/lavanda/gold
- 📱 **Mobile-First** — Layout responsivo com grid adaptativo e menu mobile
- 🇧🇷 **100% em Português** — Locale pt-BR padrão com todas as strings traduzidas
- ⚡ **OS 2.0 Nativo** — Templates JSON, sections em qualquer página, drag & drop no editor
- 🎯 **SEO Otimizado** — Schema.org, meta tags dinâmicas, semântica HTML5
- ♿ **Acessível** — Skip-to-content, ARIA labels, foco visível, contraste adequado

## 📁 Estrutura

```
shopify-theme/
├── assets/
│   ├── theme.css           # Design system completo (~700 linhas)
│   └── theme.js            # Interações (menu, gallery, animações)
├── config/
│   ├── settings_schema.json  # Configurações editáveis no Theme Editor
│   └── settings_data.json    # Valores padrão
├── layout/
│   └── theme.liquid         # Layout base (head, header, footer)
├── locales/
│   └── pt-BR.default.json  # Traduções pt-BR
├── sections/
│   ├── header.liquid        # Navbar glassmorphic fixa
│   ├── header-group.json    # Section group global
│   ├── hero-banner.liquid   # Banner fullscreen com CTA
│   ├── featured-collection.liquid  # Grid de produtos
│   ├── rich-text.liquid     # Sobre/texto editorial
│   ├── quote.liquid         # Citação/manifesto
│   ├── contact-form.liquid  # Formulário de contato
│   ├── main-product.liquid  # Página do produto
│   ├── main-collection.liquid  # Página da coleção
│   ├── main-cart.liquid     # Carrinho
│   ├── main-page.liquid     # Página genérica
│   ├── main-404.liquid      # Página 404
│   ├── footer.liquid        # Rodapé com newsletter
│   └── footer-group.json   # Section group global
├── snippets/
│   └── product-card.liquid  # Card reutilizável
└── templates/
    ├── index.json           # Homepage
    ├── product.json         # Produto
    ├── collection.json      # Coleção
    ├── cart.json            # Carrinho
    ├── page.json            # Página genérica
    ├── page.contact.json    # Contato
    └── 404.json             # 404
```

## 🚀 Deploy

### Via Shopify CLI (Recomendado)

```bash
# Instale o Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Login na loja
shopify auth login --store sua-loja.myshopify.com

# Desenvolvimento local com hot-reload
cd shopify-theme
shopify theme dev

# Deploy para a loja
shopify theme push
```

### Via Admin

1. Vá em **Loja Online → Temas → Adicionar Tema → Fazer upload do arquivo ZIP**
2. Compacte a pasta `shopify-theme/` como ZIP
3. Upload e ative

## 🎨 Customização

### Cores (Theme Editor)

| Variável           | Padrão    | Uso                        |
| ------------------ | --------- | -------------------------- |
| `color_background` | `#0d0610` | Fundo principal            |
| `color_accent`     | `#d946a8` | Rose — destaques, botões   |
| `color_secondary`  | `#c084fc` | Lavanda — gradientes       |
| `color_gold`       | `#fbbf24` | Dourado — detalhes premium |

### Fontes

- **Display**: Bodoni Moda (títulos, preços)
- **Editorial**: Cormorant Garamond (citações, descrições)
- **Body**: Inter (corpo do texto, labels)

### Sections Disponíveis

Todas as sections podem ser adicionadas a qualquer página via Theme Editor:

| Section                   | Uso                           |
| ------------------------- | ----------------------------- |
| **Banner Hero**           | Página inicial, landing pages |
| **Coleção Destaque**      | Destaques de produtos         |
| **Texto Rica**            | Sobre, bio, informações       |
| **Citação / Manifesto**   | Quotes, depoimentos           |
| **Formulário de Contato** | Página de contato             |

## 📝 Prerequisitos

- Shopify Plan: qualquer plano (Basic+)
- Shopify CLI 3.x+ para desenvolvimento local
- Node.js 18+ (para Shopify CLI)
