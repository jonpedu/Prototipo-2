# Script de Inicialização - IVP-SAT
# Execute com: .\start.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   IVP-SAT - Iniciando" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Função para iniciar backend
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot\backend
    
    # Verificar se há ambiente virtual
    if (Test-Path ".\venv\Scripts\Activate.ps1") {
        .\venv\Scripts\Activate.ps1
    }
    
    python app.py
}

Write-Host "✓ Backend iniciado (Job ID: $($backendJob.Id))" -ForegroundColor Green

# Aguardar um pouco para o backend iniciar
Start-Sleep -Seconds 3

# Função para iniciar frontend
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot\frontend
    $env:BROWSER = "none"  # Evitar abrir múltiplas janelas
    npm start
}

Write-Host "✓ Frontend iniciado (Job ID: $($frontendJob.Id))" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "   Servidores Rodando!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pressione Ctrl+C para parar os servidores" -ForegroundColor Gray
Write-Host ""

# Aguardar e mostrar logs
try {
    while ($true) {
        $backendOutput = Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
        $frontendOutput = Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue
        
        if ($backendOutput) {
            Write-Host "[Backend] $backendOutput" -ForegroundColor Cyan
        }
        
        if ($frontendOutput) {
            Write-Host "[Frontend] $frontendOutput" -ForegroundColor Magenta
        }
        
        Start-Sleep -Milliseconds 500
    }
}
finally {
    # Parar jobs quando Ctrl+C é pressionado
    Write-Host ""
    Write-Host "Parando servidores..." -ForegroundColor Yellow
    Stop-Job -Job $backendJob, $frontendJob
    Remove-Job -Job $backendJob, $frontendJob
    Write-Host "✓ Servidores parados" -ForegroundColor Green
}
