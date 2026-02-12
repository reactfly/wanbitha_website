# 🚀 Guia de Deploy - Wanessa Bitha Portfolio

## Opções de Deploy

### 1️⃣ AWS Amplify (Recomendado) ⭐

#### Passo a Passo:

**A. Criar Repositório no GitHub**
```bash
# Se ainda não tem repositório Git
git init
git add .
git commit -m "Initial commit"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/wanessa-portfolio.git
git branch -M main
git push -u origin main
```

**B. Deploy no Amplify**
1. Acesse: https://console.aws.amazon.com/amplify/
2. Clique em **"Create new app"** → **"Host web app"**
3. Selecione **GitHub** → Autorize → Escolha seu repositório
4. Configure:
   - Branch: `main`
   - Build command: `npm run build`
   - Output directory: `dist`
5. Clique em **"Save and deploy"**

✅ Pronto! Seu site estará no ar em ~5 minutos.

---

### 2️⃣ Netlify (Alternativa Simples)

**Deploy via Interface:**
1. Acesse: https://app.netlify.com/
2. Arraste a pasta `dist` (depois de rodar `npm run build`)
3. Ou conecte com GitHub para deploy automático

**Configurações necessárias:**
- Build command: `npm run build`
- Publish directory: `dist`
- Adicionar arquivo `public/_redirects` (já existe):
  ```
  /*  /index.html  200
  ```

---

### 3️⃣ Vercel (Rápido e Fácil)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

Ou conecte via GitHub em: https://vercel.com/

---

### 4️⃣ Servidor Próprio (cPanel/FTP)

```bash
# 1. Build do projeto
npm run build

# 2. Upload da pasta 'dist' via FTP
# Copie todo conteúdo de 'dist/' para a pasta public_html do servidor

# 3. Configurar .htaccess (para SPA routing)
```

Criar arquivo `.htaccess` na raiz:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📋 Checklist Pré-Deploy

- [ ] Testar build local: `npm run build`
- [ ] Verificar se `dist/index.html` foi criado
- [ ] Testar preview: `npm run preview`
- [ ] Verificar todas as rotas funcionam
- [ ] Testar em mobile/tablet
- [ ] Remover console.logs desnecessários
- [ ] Verificar se não há API keys expostas

---

## 🌐 Domínio Personalizado

Após deploy, você pode adicionar seu domínio:

**Amplify/Netlify/Vercel:**
- Vá em configurações → Custom Domain
- Adicione seu domínio
- Configure DNS conforme instruções

**Exemplo DNS:**
```
Type    Name    Value
CNAME   www     seu-app.amplifyapp.com
ALIAS   @       seu-app.amplifyapp.com
```

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Verificar erros
npm run lint
```

---

## 📞 Suporte

- AWS Amplify: https://docs.amplify.aws/
- Netlify: https://docs.netlify.com/
- Vercel: https://vercel.com/docs

---

**Última atualização:** 2026
**Projeto:** Wanessa Bitha Portfolio
