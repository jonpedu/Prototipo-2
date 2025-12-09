# Backend - IVP-SAT

## API Flask para Geração de Código MicroPython

### 🚀 Início Rápido

```powershell
pip install -r requirements.txt
python app.py
```

Servidor disponível em: **http://localhost:5000**

---

## 📡 Endpoints

### GET /api/health
**Descrição:** Verifica se a API está funcionando

**Resposta:**
```json
{
  "status": "ok",
  "message": "IVP-SAT API está funcionando"
}
```

### POST /api/generate_code
**Descrição:** Gera código MicroPython a partir do fluxo visual

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "node_0",
      "type": "start",
      "position": { "x": 100, "y": 100 },
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "edge_0",
      "source": "node_0",
      "target": "node_1"
    }
  ]
}
```

**Resposta:**
```json
{
  "code": "# Código MicroPython gerado...",
  "success": true
}
```

---

## 📦 Dependências

- **Flask 3.0.0** - Framework web
- **Flask-CORS 4.0.0** - CORS headers
- **python-dotenv 1.0.0** - Variáveis de ambiente

---

## 🔧 Configuração

### Porta do Servidor
Por padrão: **5000**

Para mudar, edite `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=PORTA_DESEJADA)
```

### CORS
Configurado para aceitar requisições de qualquer origem em desenvolvimento.

Para produção, edite:
```python
CORS(app, resources={r"/api/*": {"origins": "http://seu-dominio.com"}})
```

---

## 🧪 Testes

### Testar Health Check
```powershell
curl http://localhost:5000/api/health
```

### Testar Geração de Código
```powershell
$body = '{"nodes":[],"edges":[]}' 
Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/generate_code" -ContentType "application/json" -Body $body
```

---

## 📁 Estrutura

```
backend/
├── app.py              # API principal
├── requirements.txt    # Dependências
└── README.md          # Este arquivo
```

---

## 🐛 Troubleshooting

### Porta já em uso
```powershell
Get-NetTCPConnection -LocalPort 5000
Stop-Process -Id [PID] -Force
```

### Módulos não encontrados
```powershell
pip install -r requirements.txt --force-reinstall
```

---

**Documentação completa:** Veja arquivos .md na raiz do projeto
