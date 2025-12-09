# Script de Instalação - IVP-SAT
# Execute com: .\install.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   IVP-SAT - Instalação" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js encontrado: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "  Instale em: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verificar Python
Write-Host "Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ Python encontrado: $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Python não encontrado!" -ForegroundColor Red
    Write-Host "  Instale em: https://python.org" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "   Instalando Backend" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

# Criar ambiente virtual (opcional)
$createVenv = Read-Host "Criar ambiente virtual Python? (s/n)"
if ($createVenv -eq "s") {
    Write-Host "Criando ambiente virtual..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "Ativando ambiente virtual..." -ForegroundColor Yellow
    .\venv\Scripts\Activate.ps1
}

# Instalar dependências Python
Write-Host "Instalando dependências Python..." -ForegroundColor Yellow
pip install -r requirements.txt

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependências do backend instaladas!" -ForegroundColor Green
}
else {
    Write-Host "✗ Erro ao instalar dependências do backend" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "   Instalando Frontend" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

# Instalar dependências Node
Write-Host "Instalando dependências Node.js..." -ForegroundColor Yellow
Write-Host "(Isso pode levar alguns minutos...)" -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependências do frontend instaladas!" -ForegroundColor Green
}
else {
    Write-Host "✗ Erro ao instalar dependências do frontend" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "   Instalação Concluída!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar o projeto:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Backend (em um terminal):" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
if ($createVenv -eq "s") {
    Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
}
Write-Host "   python app.py" -ForegroundColor White
Write-Host ""
Write-Host "2. Frontend (em outro terminal):" -ForegroundColor Yellow
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "A aplicação abrirá em: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Leia o arquivo GUIA_RAPIDO.md para mais informações!" -ForegroundColor Gray
Write-Host ""
