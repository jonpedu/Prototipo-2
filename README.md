# IVP-SAT - Interface Visual de Programação para Satélites

Protótipo funcional de ferramenta educacional para programar nanossatélites (PION CanSat/ESP32) diretamente pelo navegador.

## 🚀 Características

- **Programação Visual**: Interface drag-and-drop com blocos de programação
- **Conexão Direta**: Conecte e envie código para ESP32 via Web Serial API
- **Gerenciamento de Projetos**: Salve e carregue projetos em formato XML
- **Geração de Código**: Converte blocos visuais em MicroPython
- **Baseado no Hardware PION CanSat**: Suporte completo aos sensores e atuadores

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- Python 3.8 ou superior
- Navegador compatível com Web Serial API (Chrome, Edge, Opera)

## 🛠️ Instalação

### Backend (Python/Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

O servidor estará disponível em `http://localhost:5000`

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📦 Estrutura do Projeto

```
pv2/
├── backend/           # API Flask para geração de código
│   ├── app.py
│   └── requirements.txt
├── frontend/          # Aplicação React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🎯 Blocos Disponíveis

### Controle
- **Iniciar Missão**: Ponto de entrada do programa

### Sensores
- **Ler Temperatura**: BME280 (°C)
- **Ler Umidade**: BME280 (%)
- **Ler Pressão**: BME280 (hPa)
- **Ler Acelerômetro**: MPU6050 (X, Y, Z)
- **Ler Nível da Bateria**: Porcentagem de carga

### Atuadores
- **LED Branco**: Ligar/Desligar
- **LED RGB**: Definir cor (R, G, B)
- **Buzzer**: Emitir som

### Lógica
- **Aguardar**: Delay em segundos
- **Se/Então**: Condicional

### Dados
- **Gravar no Cartão SD**: Salvar dados
- **Enviar via WiFi**: Transmitir dados

## 🔌 Conectar ao Hardware

1. Conecte o ESP32 via USB
2. Clique em "Conectar ao Satélite" no cabeçalho
3. Selecione a porta serial do dispositivo
4. Programe visualmente sua missão
5. Clique em "Enviar para o Satélite"

## 📄 Licença

Este é um projeto educacional desenvolvido para TCC.
