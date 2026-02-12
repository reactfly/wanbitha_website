@echo off
echo ╔══════════════════════════════════════════════════╗
echo ║  Wanessa Bitha - Deploy Script                   ║
echo ╚══════════════════════════════════════════════════╝
echo.

echo [1/4] Verificando dependências...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo.
echo [2/4] Executando build de produção...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build
    pause
    exit /b 1
)

echo.
echo [3/4] Verificando arquivos gerados...
if not exist "dist\index.html" (
    echo ❌ Erro: dist\index.html não encontrado
    pause
    exit /b 1
)

echo ✅ Build concluído com sucesso!
echo.
echo [4/4] Próximos passos:
echo.
echo 📦 Opção 1 - Deploy Automático (GitHub + Amplify):
echo    1. git add .
echo    2. git commit -m "Deploy: production build"
echo    3. git push origin main
echo    4. Amplify fará deploy automaticamente
echo.
echo 📤 Opção 2 - Upload Manual:
echo    1. Acesse seu painel de hospedagem
echo    2. Faça upload de TODOS os arquivos da pasta 'dist'
echo    3. Configure redirecionamento SPA (veja DEPLOY.md)
echo.
echo 🌐 Opção 3 - Vercel/Netlify:
echo    1. Arraste a pasta 'dist' no site
echo    2. Ou use: vercel --prod
echo.
echo 📁 Arquivos prontos em: dist\
echo.

pause
