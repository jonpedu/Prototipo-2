# Arquitetura do Sistema - IVP-SAT

## 📐 Visão Geral

O IVP-SAT é uma aplicação web full-stack composta por três camadas principais:

```
┌─────────────────────────────────────────────────┐
│              NAVEGADOR (Cliente)                │
│  ┌───────────────────────────────────────────┐  │
│  │     Interface Visual (React + React Flow) │  │
│  │  • Canvas de programação                  │  │
│  │  • Biblioteca de blocos                   │  │
│  │  • Painel de propriedades                 │  │
│  └───────────────────────────────────────────┘  │
│                      │                          │
│                      ↓                          │
│  ┌───────────────────────────────────────────┐  │
│  │      Web Serial API (Chrome/Edge)         │  │
│  │  • Conexão direta com hardware            │  │
│  │  • Upload de código MicroPython           │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                       │
                       ↓ HTTP/REST
┌─────────────────────────────────────────────────┐
│           BACKEND (Servidor Python)             │
│  ┌───────────────────────────────────────────┐  │
│  │        API Flask (Port 5000)              │  │
│  │  • Geração de código MicroPython          │  │
│  │  • Validação de fluxo                     │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                       │
                       ↓ USB Serial
┌─────────────────────────────────────────────────┐
│              HARDWARE (ESP32)                   │
│  ┌───────────────────────────────────────────┐  │
│  │    PION CanSat / ESP32 DevKit             │  │
│  │  • Sensores (BME280, MPU6050)             │  │
│  │  • Atuadores (LEDs, Buzzer)               │  │
│  │  • MicroPython Runtime                    │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## 🏗️ Componentes Frontend

### 1. App.js (Componente Principal)
- **Responsabilidade:** Orquestração da aplicação
- **Estado:** Gerencia nodes, edges, seleção
- **Biblioteca:** React Flow para canvas interativo

### 2. Header.js
- **Responsabilidade:** Barra de ferramentas superior
- **Funcionalidades:**
  - Seleção de placa (ESP32)
  - Conexão via Web Serial API
  - Upload de código
  - Salvar/Carregar projetos XML
  - Indicadores de status

### 3. BlockLibrary.js
- **Responsabilidade:** Sidebar com blocos disponíveis
- **Funcionalidades:**
  - Categorização de blocos
  - Drag & Drop para canvas
  - Expansão/colapso de categorias

### 4. PropertiesPanel.js
- **Responsabilidade:** Painel de configuração
- **Funcionalidades:**
  - Edição de propriedades do bloco selecionado
  - Inputs dinâmicos baseados em tipo
  - Validação de valores

### 5. CustomNode.js
- **Responsabilidade:** Renderização visual dos blocos
- **Características:**
  - Estilo baseado em categoria
  - Handles para conexões
  - Preview de propriedades

## 🔧 Serviços Frontend

### apiService.js
```javascript
// Comunicação com backend
POST /api/generate_code
  ← { nodes: [...], edges: [...] }
  → { code: "...", success: true }
```

### serialService.js
```javascript
// Comunicação com hardware
class SerialService {
  connect()        // Solicita porta serial
  disconnect()     // Fecha conexão
  uploadCode()     // Envia código MicroPython
  startReading()   // Lê output serial
}
```

### xmlUtils.js
```javascript
// Gerenciamento de projetos
exportToXML(flowData)     // Salva em XML
importFromXML(file)       // Carrega de XML
```

## ⚙️ Backend (Flask)

### Endpoints

#### POST /api/generate_code
**Request:**
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

**Response:**
```json
{
  "code": "# Código MicroPython gerado...",
  "success": true
}
```

#### GET /api/health
**Response:**
```json
{
  "status": "ok",
  "message": "IVP-SAT API está funcionando"
}
```

### Geração de Código

```python
def generate_micropython_code(flow_data):
    # 1. Extrair nodes e edges
    # 2. Criar mapa de conexões
    # 3. Encontrar nó inicial (start)
    # 4. Gerar imports e configurações
    # 5. Processar cada nó em ordem
    # 6. Retornar código completo
```

## 📊 Fluxo de Dados

### 1. Criação de Programa Visual

```
Usuário arrasta bloco
    ↓
BlockLibrary dispatch evento
    ↓
App.js cria novo node
    ↓
React Flow renderiza CustomNode
    ↓
Estado atualizado (nodes state)
```

### 2. Configuração de Propriedades

```
Usuário clica em bloco
    ↓
App.js atualiza selectedNode
    ↓
PropertiesPanel é renderizado
    ↓
Usuário edita propriedades
    ↓
onUpdateNode callback
    ↓
Estado do node atualizado
```

### 3. Conexão de Blocos

```
Usuário arrasta de handle de saída
    ↓
React Flow gerencia conexão
    ↓
onConnect callback
    ↓
Edge adicionado ao estado
    ↓
Conexão visual renderizada
```

### 4. Upload para Hardware

```
Usuário clica "Enviar"
    ↓
Header.js chama apiService
    ↓
Backend gera código MicroPython
    ↓
serialService.uploadCode(code)
    ↓
Web Serial API envia dados
    ↓
ESP32 recebe e executa código
```

## 🗄️ Estrutura de Dados

### Node (Bloco)
```javascript
{
  id: "node_0",              // ID único
  type: "read_temperature",  // Tipo do bloco
  position: { x: 100, y: 200 }, // Posição no canvas
  data: {                    // Dados personalizados
    type: "read_temperature",
    label: "Ler Temperatura",
    variable: "temperatura"
  }
}
```

### Edge (Conexão)
```javascript
{
  id: "edge_0",           // ID único
  source: "node_0",       // ID do nó origem
  target: "node_1",       // ID do nó destino
  sourceHandle: null,     // Handle específico (opcional)
  targetHandle: null,
  animated: true          // Animação visual
}
```

### Block Definition
```javascript
{
  id: "read_temperature",
  type: "read_temperature",
  category: "Sensores",
  label: "Ler Temperatura",
  icon: "🌡️",
  color: "#ef4444",
  inputs: 1,
  outputs: 1,
  defaultData: { variable: "temperatura" },
  properties: [
    {
      name: "variable",
      label: "Nome da Variável",
      type: "text",
      default: "temperatura"
    }
  ]
}
```

## 🔐 Segurança

### Frontend
- **CORS:** Configurado no backend para aceitar requisições do frontend
- **Web Serial API:** Requer permissão explícita do usuário
- **Validação:** Inputs validados no cliente

### Backend
- **Flask-CORS:** Protege contra requisições não autorizadas
- **Validação:** Verifica estrutura dos dados recebidos
- **Sanitização:** Evita injeção de código malicioso

### Hardware
- **Conexão Local:** Apenas via USB, sem exposição de rede
- **Código Gerado:** Revisável antes do upload
- **Sandbox:** MicroPython executa em ambiente isolado

## 📈 Escalabilidade

### MVP (Atual)
- ✅ Execução local
- ✅ Um dispositivo por vez
- ✅ Salvamento local (XML)

### Futuras Melhorias
- [ ] Múltiplos dispositivos simultâneos
- [ ] Salvamento em nuvem
- [ ] Compartilhamento de projetos
- [ ] Simulação antes do upload
- [ ] Biblioteca de componentes comunitários

## 🧪 Testes

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
pytest
```

### Integração
- Testes manuais com hardware real
- Validação de código gerado
- Testes de upload em diferentes placas

## 📦 Deployment

### Desenvolvimento
- Frontend: `npm start` (localhost:3000)
- Backend: `python app.py` (localhost:5000)

### Produção (Futuro)
- Frontend: Build estático servido por Nginx/Apache
- Backend: WSGI server (Gunicorn) + Nginx reverse proxy
- HTTPS obrigatório para Web Serial API

## 🔄 Versionamento

### Formato de Versão: MAJOR.MINOR.PATCH
- **MAJOR:** Mudanças incompatíveis
- **MINOR:** Novas funcionalidades compatíveis
- **PATCH:** Correções de bugs

### Versão Atual: 1.0.0 (MVP)
- Primeira versão funcional
- Funcionalidades principais implementadas
- Pronto para testes e demonstrações

---

**Documentação técnica completa**
**Projeto:** IVP-SAT - TCC 8º Período
**Data:** Outubro 2025
