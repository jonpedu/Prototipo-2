# Script de Inicialização Automática - IVP-SAT Protótipo 2
# Interface Visual de Programação para Satélites

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IVP-SAT - Protótipo 2" -ForegroundColor Cyan
Write-Host "  Inicializando Sistema..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Variáveis de controle
$backendProcess = $null
$frontendProcess = $null
$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

# Função para limpar processos ao sair
function Stop-Services {
    Write-Host ""
    Write-Host "Encerrando serviços..." -ForegroundColor Yellow
    
    if ($backendProcess -and !$backendProcess.HasExited) {
        Write-Host "Parando Backend..." -ForegroundColor Yellow
        Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
    }
    
    if ($frontendProcess -and !$frontendProcess.HasExited) {
        Write-Host "Parando Frontend..." -ForegroundColor Yellow
        Stop-Process -Id $frontendProcess.Id -Force -ErrorAction SilentlyContinue
    }
    
    Write-Host "Serviços encerrados." -ForegroundColor Green
    exit
}

# Registrar handler para Ctrl+C
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Stop-Services }
$null = Register-ObjectEvent -InputObject ([System.Console]) -EventName CancelKeyPress -Action { Stop-Services }

# Verificar Python
Write-Host "[1/4] Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = py --version 2>&1
    Write-Host "[OK] Python encontrado: $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "[ERRO] Python nao encontrado! Instale Python 3.8 ou superior." -ForegroundColor Red
    Write-Host "Download: https://www.python.org/downloads/" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar Node.js
Write-Host "[2/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "[OK] Node.js encontrado: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "[ERRO] Node.js nao encontrado! Instale Node.js 16 ou superior." -ForegroundColor Red
    Write-Host "Download: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar e instalar dependências do Backend
Write-Host "[3/4] Configurando Backend..." -ForegroundColor Yellow
if (Test-Path $backendPath) {
    Set-Location $backendPath
    
    # Verificar se requirements.txt existe
    if (Test-Path "requirements.txt") {
        Write-Host "Instalando dependencias Python..." -ForegroundColor Cyan
        py -m pip install -r requirements.txt --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Dependencias do Backend instaladas" -ForegroundColor Green
        }
        else {
            Write-Host "[AVISO] Erro ao instalar algumas dependencias" -ForegroundColor Yellow
        }
    }
}
else {
    Write-Host "[ERRO] Diretorio backend nao encontrado!" -ForegroundColor Red
    exit 1
}

# Verificar e instalar dependências do Frontend
Write-Host "[4/4] Configurando Frontend..." -ForegroundColor Yellow
Set-Location $PSScriptRoot
if (Test-Path $frontendPath) {
    Set-Location $frontendPath
    
    # Verificar se node_modules existe
    if (!(Test-Path "node_modules")) {
        Write-Host "Instalando dependências Node.js (primeira execução)..." -ForegroundColor Cyan
        Write-Host "Isso pode levar alguns minutos..." -ForegroundColor Cyan
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Dependencias do Frontend instaladas" -ForegroundColor Green
        }
        else {
            Write-Host "[ERRO] Erro ao instalar dependencias do Frontend" -ForegroundColor Red
            Set-Location $PSScriptRoot
            exit 1
        }
    }
    else {
        Write-Host "[OK] Dependencias do Frontend ja instaladas" -ForegroundColor Green
    }
}
else {
    Write-Host "[ERRO] Diretorio frontend nao encontrado!" -ForegroundColor Red
    exit 1
}

# Retornar ao diretório raiz
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Iniciando Serviços..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Iniciar Backend
Write-Host "Iniciando Backend (Flask)..." -ForegroundColor Cyan
$backendCmd = "cd '$backendPath'; py app.py"
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd -PassThru
Start-Sleep -Seconds 3

if ($backendProcess.HasExited) {
    Write-Host "[ERRO] Erro ao iniciar o Backend!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Backend iniciado (PID: $($backendProcess.Id))" -ForegroundColor Green
Write-Host "  URL: http://localhost:5000" -ForegroundColor Gray

# Iniciar Frontend
Write-Host "Iniciando Frontend (React)..." -ForegroundColor Cyan
$env:BROWSER = "none"  # Evitar abrir navegador automaticamente
$frontendCmd = "cd '$frontendPath'; npm start"
$frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd -PassThru
Start-Sleep -Seconds 5

if ($frontendProcess.HasExited) {
    Write-Host "[ERRO] Erro ao iniciar o Frontend!" -ForegroundColor Red
    Stop-Services
    exit 1
}
Write-Host "[OK] Frontend iniciado (PID: $($frontendProcess.Id))" -ForegroundColor Green
Write-Host "  URL: http://localhost:3000" -ForegroundColor Gray

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Sistema Pronto!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "[APP] Acesse a aplicacao em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "[API] Backend em: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANTE:" -ForegroundColor Yellow
Write-Host "   - Use navegadores baseados em Chromium (Chrome, Edge, Opera)" -ForegroundColor White
Write-Host "   - Conecte o ESP32 via USB antes de usar a conexao serial" -ForegroundColor White
Write-Host ""
Write-Host "Para encerrar, pressione Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Aguardar 5 segundos e abrir navegador
Start-Sleep -Seconds 5
Write-Host "Abrindo navegador..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

# Manter o script rodando
Write-Host "Monitorando serviços..." -ForegroundColor Gray
Write-Host ""

try {
    while ($true) {
        # Verificar se os processos ainda estão rodando
        if ($backendProcess.HasExited) {
            Write-Host "[ERRO] Backend encerrado inesperadamente!" -ForegroundColor Red
            Stop-Services
            break
        }
        
        if ($frontendProcess.HasExited) {
            Write-Host "[ERRO] Frontend encerrado inesperadamente!" -ForegroundColor Red
            Stop-Services
            break
        }
        
        Start-Sleep -Seconds 2
    }
}
finally {
    Stop-Services
}
<#
.SYNOPSIS
    Script unificado de instalação e inicialização do Prototipo-2 (IVP-SAT)

.DESCRIPTION
    Este script verifica dependências, instala pacotes se necessário,
    e inicia frontend e backend em janelas separadas do PowerShell.

.PARAMETER Install
    Força a instalação de dependências antes de iniciar

.PARAMETER SkipBackend
    Inicia apenas o frontend

.PARAMETER SkipFrontend
    Inicia apenas o backend

.EXAMPLE
    .\start.ps1
    Verifica dependências e inicia ambos os servidores

.EXAMPLE
    .\start.ps1 -Install
    Instala dependências e depois inicia os servidores
#>

param(
    [switch]$Install = $false,
    [switch]$SkipBackend = $false,
    [switch]$SkipFrontend = $false
)

$root = $PSScriptRoot

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   IVP-SAT - Prototipo 2" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Node.js não encontrado! Instale em: https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verificar Python
Write-Host "Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = py --version
    Write-Host "✓ Python: $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Python não encontrado! Instale em: https://python.org" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Verificar se precisa instalar dependências
$needsInstall = $Install
if (-not $needsInstall) {
    $frontendNodeModules = Join-Path $root "frontend\node_modules"
    $backendRequirements = Join-Path $root "backend\requirements.txt"
    
    if (-not (Test-Path $frontendNodeModules)) {
        Write-Host "⚠ node_modules não encontrado no frontend" -ForegroundColor Yellow
        $needsInstall = $true
    }
}

# Instalar dependências se necessário
if ($needsInstall) {
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "   Instalando Dependências" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Backend
    Write-Host "Instalando backend..." -ForegroundColor Yellow
    $backendPath = Join-Path $root "backend"
    Set-Location -LiteralPath $backendPath
    py -m pip install -r requirements.txt
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Erro ao instalar dependências do backend" -ForegroundColor Red
        Set-Location -LiteralPath $root
        exit 1
    }
    Write-Host "✓ Backend instalado" -ForegroundColor Green
    
    # Frontend
    Write-Host "Instalando frontend (pode demorar)..." -ForegroundColor Yellow
    $frontendPath = Join-Path $root "frontend"
    Set-Location -LiteralPath $frontendPath
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Erro ao instalar dependências do frontend" -ForegroundColor Red
        Set-Location -LiteralPath $root
        exit 1
    }
    Write-Host "✓ Frontend instalado" -ForegroundColor Green
    
    Set-Location -LiteralPath $root
    Write-Host ""
}

# Iniciar servidores
Write-Host "================================" -ForegroundColor Green
Write-Host "   Iniciando Servidores" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

if (-not $SkipBackend) {
    Write-Host "Abrindo backend em nova janela..." -ForegroundColor Yellow
    $backendScript = Join-Path $root "start-backend.ps1"
    Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "`"$backendScript`""
    Write-Host "✓ Backend iniciado" -ForegroundColor Green
    Start-Sleep -Seconds 2
}

if (-not $SkipFrontend) {
    Write-Host "Abrindo frontend em nova janela..." -ForegroundColor Yellow
    $frontendScript = Join-Path $root "start-frontend.ps1"
    Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "`"$frontendScript`""
    Write-Host "✓ Frontend iniciado" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "   Servidores Iniciados!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Verifique as janelas abertas para os logs dos servidores." -ForegroundColor Gray
Write-Host "Feche as janelas ou pressione Ctrl+C nelas para parar." -ForegroundColor Gray
Write-Host ""
