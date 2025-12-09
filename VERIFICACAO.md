# ✅ Verificação de Instalação - IVP-SAT

## 🎯 Propósito

Este arquivo ajuda a verificar se todos os componentes do IVP-SAT foram instalados corretamente.

---

## 📁 Verificação de Arquivos

### Raiz do Projeto (pv2/)

Execute no PowerShell:
```powershell
Get-ChildItem -Name
```

**Arquivos esperados (15 itens):**
- [x] .gitignore
- [x] ARQUITETURA.md
- [x] COMPATIBILIDADE.md
- [x] exemplo-telemetria.xml
- [x] GUIA_RAPIDO.md
- [x] GUIA_VISUAL.md
- [x] INDICE.md
- [x] install.ps1
- [x] PRIMEIROS_PASSOS.md
- [x] README.md
- [x] start.ps1
- [x] SUMARIO.md
- [x] TESTES.md
- [x] backend/ (diretório)
- [x] frontend/ (diretório)

### Backend

Execute no PowerShell:
```powershell
cd backend; Get-ChildItem -Name; cd ..
```

**Arquivos esperados (2 itens):**
- [x] app.py
- [x] requirements.txt

### Frontend

Execute no PowerShell:
```powershell
cd frontend; Get-ChildItem -Name -Directory; cd ..
```

**Diretórios esperados (3 itens):**
- [x] public/
- [x] src/
- [x] node_modules/ (após `npm install`)

**Arquivos esperados:**
- [x] package.json

---

## 🔍 Verificação de Conteúdo

### 1. Verificar Backend

```powershell
cd backend
python app.py
```

**Resultado esperado:**
```
🚀 IVP-SAT Backend iniciado!
📡 Servidor rodando em http://localhost:5000
 * Serving Flask app 'app'
 * Debug mode: on
```

**Teste o endpoint:**
```powershell
curl http://localhost:5000/api/health
```

**Resposta esperada:**
```json
{"status":"ok","message":"IVP-SAT API está funcionando"}
```

### 2. Verificar Frontend

```powershell
cd frontend
npm start
```

**Resultado esperado:**
- Servidor inicia na porta 3000
- Navegador abre automaticamente
- Página IVP-SAT é exibida
- Nenhum erro no console (F12)

### 3. Verificar Dependências Python

```powershell
cd backend
pip list | Select-String -Pattern "Flask|CORS"
```

**Resultado esperado:**
```
Flask          3.0.0
Flask-CORS     4.0.0
```

### 4. Verificar Dependências Node.js

```powershell
cd frontend
npm list --depth=0 | Select-String -Pattern "react|reactflow|axios"
```

**Resultado esperado:**
```
├── react@18.2.0
├── reactflow@11.10.4
├── axios@1.6.2
```

---

## 🧪 Testes Rápidos

### Teste 1: API de Geração de Código

**Usando PowerShell:**
```powershell
$body = @{
    nodes = @(
        @{
            id = "node_0"
            type = "start"
            position = @{ x = 100; y = 100 }
            data = @{}
        }
    )
    edges = @()
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Method Post `
    -Uri "http://localhost:5000/api/generate_code" `
    -ContentType "application/json" `
    -Body $body
```

**Resultado esperado:**
- Resposta JSON com campo "code"
- Código MicroPython válido

### Teste 2: Interface Visual

**Checklist Manual:**
1. Abra http://localhost:3000
2. [ ] Logo 🛰️ está visível
3. [ ] Título "IVP-SAT" está visível
4. [ ] Biblioteca de blocos (esquerda) está visível
5. [ ] Canvas (centro) está visível
6. [ ] Botões no header estão visíveis

### Teste 3: Drag & Drop

**Checklist Manual:**
1. Arraste bloco "Iniciar Missão" para o canvas
2. [ ] Bloco aparece no canvas
3. [ ] Bloco tem ícone 🚀
4. [ ] Bloco tem título "Iniciar Missão"
5. [ ] Bloco tem handles (pontos de conexão)

### Teste 4: Carregar Exemplo

**Passos:**
1. Clique em "Carregar" no header
2. Selecione `exemplo-telemetria.xml`
3. [ ] Blocos aparecem no canvas
4. [ ] Conexões são criadas
5. [ ] Nenhum erro no console

---

## 🔧 Solução de Problemas

### Backend não inicia

**Erro:** `ModuleNotFoundError: No module named 'flask'`

**Solução:**
```powershell
cd backend
pip install -r requirements.txt
```

---

**Erro:** `Address already in use` (porta 5000)

**Solução:**
```powershell
# Encontrar processo na porta 5000
Get-NetTCPConnection -LocalPort 5000

# Matar processo (substitua PID)
Stop-Process -Id [PID] -Force
```

---

### Frontend não inicia

**Erro:** `'react-scripts' is not recognized`

**Solução:**
```powershell
cd frontend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

---

**Erro:** Página em branco

**Solução:**
1. Abra DevTools (F12)
2. Veja erros no console
3. Verifique se backend está rodando
4. Limpe cache (Ctrl+Shift+Delete)

---

### Dependências não instalam

**Erro Python:** Timeout ou erro de rede

**Solução:**
```powershell
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir
```

---

**Erro Node:** Timeout ou erro de rede

**Solução:**
```powershell
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install
```

---

## 📊 Checklist de Verificação Completa

### Instalação
- [ ] Python 3.8+ instalado
- [ ] Node.js 16+ instalado
- [ ] Chrome ou Edge instalado
- [ ] Dependências Python instaladas
- [ ] Dependências Node.js instaladas

### Estrutura de Arquivos
- [ ] Todos os 15 itens na raiz
- [ ] Backend com 2 arquivos
- [ ] Frontend com estrutura completa
- [ ] Documentação completa (8 arquivos .md)

### Funcionalidade
- [ ] Backend responde em localhost:5000
- [ ] Frontend carrega em localhost:3000
- [ ] API health check funciona
- [ ] Interface visual renderiza
- [ ] Drag & drop funciona
- [ ] Exemplo pode ser carregado

### Performance
- [ ] Backend inicia em < 5 segundos
- [ ] Frontend inicia em < 30 segundos
- [ ] Interface é responsiva
- [ ] Nenhum erro no console

---

## ✅ Status Final

Se você marcou todos os checkboxes acima:

```
╔═══════════════════════════════════════╗
║                                       ║
║   ✅ IVP-SAT INSTALADO COM SUCESSO!  ║
║                                       ║
║   Você está pronto para começar!     ║
║                                       ║
╚═══════════════════════════════════════╝
```

**Próximo passo:** Leia `PRIMEIROS_PASSOS.md`

---

Se algum item falhou:

```
╔═══════════════════════════════════════╗
║                                       ║
║   ⚠️ INSTALAÇÃO INCOMPLETA            ║
║                                       ║
║   Revise a seção de Solução          ║
║   de Problemas acima                 ║
║                                       ║
╚═══════════════════════════════════════╝
```

**Ajuda:** Consulte `GUIA_RAPIDO.md` ou `COMPATIBILIDADE.md`

---

## 🔄 Reinstalação Completa

Se nada funcionar, faça reinstalação limpa:

```powershell
# 1. Limpar instalações antigas
cd backend
Remove-Item venv -Recurse -Force -ErrorAction SilentlyContinue

cd ../frontend
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# 2. Reinstalar
cd ..
.\install.ps1
```

---

## 📞 Suporte

Se problemas persistirem:

1. **Console do navegador (F12)** - Veja erros JavaScript
2. **Terminal do backend** - Veja erros Python
3. **Documentação completa** - Consulte outros .md files
4. **GitHub Issues** - Reporte bugs (se aplicável)

---

## 📝 Log de Verificação

**Template para registro:**

```
Data: ___/___/2025
Sistema: Windows ___ / Linux ___
Python: ___.___.___ 
Node.js: ___.___.___ 
Navegador: Chrome ___ / Edge ___

Checklist Completo: Sim / Não
Problemas Encontrados: 
- ______________________
- ______________________

Tempo de Instalação: ___ minutos
Nota Geral (0-10): ___/10
```

---

**Boa sorte com a verificação!** ✅

Se tudo estiver ✅, você está pronto para programar satélites! 🛰️
