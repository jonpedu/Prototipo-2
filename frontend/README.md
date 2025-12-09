# Frontend - IVP-SAT

## Interface React com React Flow

### 🚀 Início Rápido

```powershell
npm install
npm start
```

Aplicação disponível em: **http://localhost:3000**

---

## 🏗️ Estrutura

```
frontend/
├── public/
│   └── index.html          # HTML base
├── src/
│   ├── components/         # Componentes React
│   │   ├── Header.js       # Barra de ferramentas
│   │   ├── BlockLibrary.js # Biblioteca de blocos
│   │   ├── PropertiesPanel.js # Painel de propriedades
│   │   └── CustomNode.js   # Renderização de blocos
│   ├── services/           # Serviços
│   │   ├── apiService.js   # Comunicação com backend
│   │   └── serialService.js # Web Serial API
│   ├── utils/              # Utilitários
│   │   ├── blockDefinitions.js # Definição dos blocos
│   │   └── xmlUtils.js     # Import/Export XML
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos
│   ├── index.js            # Entry point
│   └── index.css           # Estilos globais
├── package.json            # Dependências
└── README.md              # Este arquivo
```

---

## 📦 Dependências Principais

- **React 18.2.0** - Framework UI
- **React Flow 11.10.4** - Canvas interativo
- **Axios 1.6.2** - Requisições HTTP
- **Lucide React 0.294.0** - Ícones
- **Fast XML Parser 4.3.2** - Manipulação XML

---

## 🎨 Componentes

### App.js
Componente principal que gerencia:
- Estado global (nodes, edges)
- Integração com React Flow
- Coordenação entre componentes

### Header.js
Barra de ferramentas com:
- Seleção de placa
- Conexão Web Serial
- Upload de código
- Gerenciamento de projetos

### BlockLibrary.js
Biblioteca lateral com:
- 13 blocos disponíveis
- 5 categorias
- Drag & drop para canvas

### PropertiesPanel.js
Painel de configuração com:
- Edição de propriedades
- Informações do bloco
- Validação de inputs

### CustomNode.js
Renderização visual dos blocos com:
- Ícone e título
- Preview de propriedades
- Handles de conexão

---

## 🔧 Configuração

### URL do Backend

Edite `src/services/apiService.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Porta do Servidor

Por padrão: **3000**

Para mudar, crie `.env`:
```
PORT=3001
```

---

## 🧪 Testes

### Executar Testes
```powershell
npm test
```

### Build de Produção
```powershell
npm run build
```

Gera pasta `build/` com arquivos otimizados.

---

## 🌐 Navegadores Suportados

| Navegador | Versão | Web Serial API |
|-----------|--------|----------------|
| Chrome | 89+ | ✅ |
| Edge | 89+ | ✅ |
| Opera | 75+ | ✅ |
| Firefox | - | ❌ |
| Safari | - | ❌ |

---

## 🎯 Features

### Interface Visual
- ✅ Drag & drop de blocos
- ✅ Pan e zoom no canvas
- ✅ Minimapa de navegação
- ✅ Edição de propriedades

### Conectividade
- ✅ Web Serial API
- ✅ Conexão com ESP32
- ✅ Upload de código
- ✅ Feedback em tempo real

### Gerenciamento
- ✅ Salvar em XML
- ✅ Carregar de XML
- ✅ Validação de projetos
- ✅ Mensagens de status

---

## 🐛 Troubleshooting

### Módulos não encontrados
```powershell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

### Porta já em uso
```powershell
# Encontrar processo
Get-NetTCPConnection -LocalPort 3000

# Matar processo
Stop-Process -Id [PID] -Force
```

### Erro de compilação
```powershell
# Limpar cache
npm cache clean --force
npm install
```

### Página em branco
1. Abra DevTools (F12)
2. Verifique erros no console
3. Verifique se backend está rodando
4. Limpe cache do navegador

---

## 📱 Responsividade

A interface se adapta a diferentes tamanhos de tela:

- **Desktop (>1920px):** Layout completo
- **Laptop (1366px):** Layout otimizado
- **Tablet (1024px):** Componentes ajustados
- **Mobile (<768px):** Layout vertical

---

## 🎨 Customização

### Cores dos Blocos

Edite `src/utils/blockDefinitions.js`:
```javascript
{
  id: 'read_temperature',
  color: '#ef4444',  // Mude esta cor
  // ...
}
```

### Adicionar Novo Bloco

1. Adicione definição em `blockDefinitions.js`
2. Adicione lógica de geração no backend
3. (Opcional) Crie componente customizado

---

**Documentação completa:** Veja arquivos .md na raiz do projeto
