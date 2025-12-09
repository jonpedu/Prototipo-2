# IVP-SAT - Interface Visual de Programação para Satélites

Ferramenta educacional web para programar nanossatélites (PION CanSat/ESP32) usando programação visual drag-and-drop.

## 🚀 Início Rápido

### Pré-requisitos
- **Node.js** v16+ → [Download](https://nodejs.org)
- **Python** 3.8+ → [Download](https://python.org)
- **Navegador** Chrome, Edge ou Opera (suporte Web Serial API)

### Instalação Automática (Recomendado)

```powershell
# Execute no PowerShell na pasta do projeto
.\start.ps1
```

O script irá:
- ✅ Verificar Python e Node.js
- ✅ Instalar dependências automaticamente
- ✅ Iniciar backend (Flask) e frontend (React)
- ✅ Abrir o navegador automaticamente

### Instalação Manual

**Backend:**
```powershell
cd backend
py -m pip install -r requirements.txt
py app.py
```

**Frontend (em outro terminal):**
```powershell
cd frontend
npm install
npm start
```

Acesse: `http://localhost:3000`

## 📋 Características

- **Programação Visual Drag-and-Drop** - Interface intuitiva com 13 blocos de programação
- **Conexão Serial Direta** - Envie código para ESP32 via Web Serial API (sem cabos extras)
- **Geração Automática de Código** - Converte blocos visuais em MicroPython
- **Gerenciamento de Projetos** - Salve e carregue missões em formato XML
- **Hardware PION CanSat** - Suporte completo aos sensores e atuadores

## 🎯 Blocos Disponíveis

### 🔵 Controle
- **Iniciar Missão** - Ponto de entrada obrigatório do programa

### 🟢 Sensores
- **Ler Temperatura** - BME280 (°C)
- **Ler Umidade** - BME280 (%)
- **Ler Pressão** - BME280 (hPa)
- **Ler Acelerômetro** - MPU6050 (X, Y, Z)
- **Ler Nível da Bateria** - Porcentagem de carga

### 🟡 Atuadores
- **LED Branco** - Ligar/Desligar
- **LED RGB** - Definir cor (R, G, B)
- **Buzzer** - Emitir som (frequência Hz, duração)

### 🟣 Lógica
- **Aguardar** - Delay em segundos
- **Se/Então** - Estrutura condicional

### 🟠 Dados
- **Gravar no Cartão SD** - Salvar dados em arquivo
- **Enviar via WiFi** - Transmitir dados por rede

## 📖 Como Usar

### 1. Criar um Programa

1. Arraste o bloco **"Iniciar Missão"** para o canvas (obrigatório)
2. Adicione blocos de sensores, atuadores ou lógica
3. Conecte os blocos clicando e arrastando entre os pontos de conexão
4. Configure propriedades clicando nos blocos (nome de variáveis, valores, etc.)

### 2. Conectar ao Hardware

1. Conecte o ESP32 via USB
2. Clique em **"Conectar ao Satélite"** no cabeçalho
3. Selecione a porta COM do ESP32 no popup
4. Aguarde confirmação de conexão

### 3. Enviar Código

1. Clique em **"Enviar para o Satélite"**
2. O código MicroPython será gerado automaticamente
3. O código será enviado para o ESP32 via serial
4. Observe o monitor serial para feedback

### 4. Salvar/Carregar Projetos

- **Salvar**: Clique em 💾 para exportar como XML
- **Carregar**: Clique em 📁 para importar XML salvo

## 🛠️ Estrutura do Projeto

```
Prototipo-2/
├── backend/              # API Flask (Python)
│   ├── app.py           # Geração de código MicroPython
│   └── requirements.txt # Dependências: Flask, Flask-CORS
│
├── frontend/            # Interface React
│   ├── src/
│   │   ├── components/  # Header, BlockLibrary, PropertiesPanel, CustomNode
│   │   ├── services/    # apiService (HTTP), serialService (Web Serial)
│   │   └── utils/       # blockDefinitions, xmlUtils
│   └── package.json
│
├── start.ps1            # Script de inicialização automática
├── exemplo-telemetria.xml # Projeto de exemplo
└── README.md            # Este arquivo
```

## 🔧 Solução de Problemas

### Erro: Python não encontrado
```powershell
# Verifique se Python está instalado
py --version

# Se não estiver instalado, baixe em: https://python.org
```

### Erro: Node.js não encontrado
```powershell
# Verifique se Node.js está instalado
node --version

# Se não estiver instalado, baixe em: https://nodejs.org
```

### Erro: Backend não inicia
```powershell
# Instale as dependências manualmente
cd backend
py -m pip install Flask Flask-CORS python-dotenv
```

### Erro: Frontend não inicia
```powershell
# Limpe node_modules e reinstale
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Erro: "Conectar ao Satélite" não funciona
- ✅ Use Chrome, Edge ou Opera (Firefox/Safari não suportam Web Serial API)
- ✅ Instale o driver CH340 ou CP2102 para ESP32
- ✅ Verifique se o ESP32 está conectado corretamente via USB

### Porta 3000 ou 5000 já em uso
```powershell
# Windows: Matar processo na porta
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou altere a porta no código
```

## 🧪 Testando a Instalação

### 1. Verificar Backend
```powershell
# Teste o endpoint de saúde
curl http://localhost:5000/api/health
# Resposta esperada: {"status":"ok"}
```

### 2. Verificar Frontend
- Abra `http://localhost:3000`
- Deve exibir a interface do IVP-SAT
- Verifique se todos os blocos aparecem na biblioteca lateral

### 3. Testar Geração de Código
1. Adicione bloco "Iniciar Missão"
2. Adicione bloco "Ler Temperatura"
3. Conecte os dois blocos
4. Abra o console do navegador (F12)
5. Clique em "Gerar Código" (se disponível no painel)
6. Verifique se código MicroPython é exibido

## 📚 Documentação Adicional

- **[ARQUITETURA.md](ARQUITETURA.md)** - Detalhes técnicos da arquitetura, componentes e fluxo de dados
- **[COMPATIBILIDADE.md](COMPATIBILIDADE.md)** - Requisitos do sistema, navegadores compatíveis e drivers necessários

## 🎓 Exemplo Prático

Carregue o arquivo `exemplo-telemetria.xml` para ver um programa completo que:
1. Lê temperatura e umidade
2. Grava os dados no cartão SD
3. Liga LED quando temperatura > 25°C
4. Repete a cada 5 segundos

## 🔒 Segurança e Privacidade

- ✅ Código processado **localmente** no navegador
- ✅ Nenhum dado é enviado para servidores externos
- ✅ Conexão serial é **direta** entre navegador e ESP32
- ✅ Sem coleta de dados ou telemetria

## 📄 Licença

Projeto educacional desenvolvido para TCC (Trabalho de Conclusão de Curso).

## 🤝 Contribuições

Este é um projeto educacional. Sugestões e melhorias são bem-vindas!

## 📞 Suporte

Para problemas ou dúvidas:
1. Consulte a seção **Solução de Problemas** acima
2. Verifique a documentação em [COMPATIBILIDADE.md](COMPATIBILIDADE.md)
3. Revise a arquitetura técnica em [ARQUITETURA.md](ARQUITETURA.md)

---

**Desenvolvido com ❤️ para educação em tecnologia espacial**
