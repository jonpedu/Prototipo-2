# 🚀 Primeiros Passos - IVP-SAT

## Bem-vindo!

Este guia vai te ajudar a começar com o IVP-SAT em **5 minutos**! ⏱️

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [ ] **Node.js** (v16+) - [Download](https://nodejs.org)
- [ ] **Python** (v3.8+) - [Download](https://python.org)
- [ ] **Chrome** ou **Edge** (para Web Serial API)
- [ ] **Driver USB** para ESP32 (CH340 ou CP2102)

---

## 🎯 Instalação em 3 Passos

### **Opção A: Automática (Recomendado)**

```powershell
# Execute no PowerShell (como Administrador)
.\install.ps1
```

### **Opção B: Manual**

**1. Backend:**
```powershell
cd backend
pip install -r requirements.txt
```

**2. Frontend:**
```powershell
cd frontend
npm install
```

---

## 🏃 Executando a Aplicação

### **Opção A: Script Único**

```powershell
.\start.ps1
```
Isso iniciará backend e frontend automaticamente!

### **Opção B: Manual (2 Terminais)**

**Terminal 1 - Backend:**
```powershell
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

A aplicação abrirá em: **http://localhost:3000** 🌐

---

## 📝 Seu Primeiro Programa

### 1️⃣ Adicione o Bloco Inicial

1. Encontre **"🚀 Iniciar Missão"** na biblioteca (esquerda)
2. Arraste para o canvas (centro)
3. Solte!

### 2️⃣ Adicione um Sensor

1. Em **"Sensores"**, arraste **"🌡️ Ler Temperatura"**
2. Coloque abaixo do bloco inicial
3. **Conecte**: Arraste do círculo inferior do "Iniciar" para o círculo superior do "Temperatura"

### 3️⃣ Adicione Gravação de Dados

1. Em **"Dados"**, arraste **"💾 Gravar no SD"**
2. Conecte ao bloco de temperatura

### 4️⃣ Configure Propriedades

1. Clique no bloco "Ler Temperatura"
2. No painel direito, veja as propriedades
3. Deixe como está por enquanto

**Seu primeiro fluxo está pronto!** 🎉

```
🚀 Iniciar Missão
    ↓
🌡️ Ler Temperatura
    ↓
💾 Gravar no SD
```

---

## 🔌 Conectando ao Hardware

### 1️⃣ Conecte o ESP32

1. Conecte o ESP32 ao seu computador via USB
2. Aguarde o Windows reconhecer o dispositivo

### 2️⃣ Conecte no IVP-SAT

1. Clique em **"Conectar ao Satélite"** no cabeçalho
2. Selecione a porta COM do seu ESP32
3. Veja o status mudar para **"🟢 Conectado"**

### 3️⃣ Envie o Código

1. Clique em **"Enviar para o Satélite"**
2. Aguarde a barra de progresso completar
3. Pronto! Seu código está rodando! ✅

---

## 💾 Salvando Seu Trabalho

### Salvar Projeto

1. Clique em **"💾 Salvar"** no cabeçalho
2. Um arquivo XML será baixado
3. Guarde em local seguro!

### Carregar Projeto

1. Clique em **"📁 Carregar"**
2. Selecione o arquivo XML
3. Seu projeto será restaurado!

---

## 🆘 Problemas Comuns

### ❌ "Backend não está rodando"
**Solução:** Execute `python app.py` na pasta `backend`

### ❌ "Não consigo conectar ao ESP32"
**Soluções:**
- Use Chrome ou Edge
- Verifique se o driver USB está instalado
- Tente outra porta USB
- Reinicie o navegador

### ❌ "Upload falha"
**Soluções:**
- Desconecte e reconecte o ESP32
- Feche outros programas que usam a porta serial
- Adicione o bloco "Iniciar Missão"

### ❌ "Página em branco"
**Solução:** Execute `npm install` e `npm start` na pasta `frontend`

---

## 📚 Próximos Passos

1. ✅ **Teste o exemplo:** Carregue `exemplo-telemetria.xml`
2. 📖 **Leia o guia:** Veja `GUIA_RAPIDO.md` para mais detalhes
3. 🎨 **Veja o visual:** Confira `GUIA_VISUAL.md` para entender a interface
4. 🏗️ **Aprenda mais:** Leia `ARQUITETURA.md` para entender como funciona

---

## 🎓 Tutoriais Rápidos

### Tutorial 1: LED Piscante
```
🚀 Iniciar → 💡 LED On → ⏱️ Aguardar 1s → 💡 LED Off → ⏱️ Aguardar 1s
```

### Tutorial 2: Alerta de Temperatura
```
🚀 Iniciar → 🌡️ Ler Temp → 🔀 Se temp>30 → 🔊 Buzzer
```

### Tutorial 3: Telemetria Completa
```
🚀 Iniciar → 🌡️ Temp → 💧 Umidade → 🌪️ Pressão → 💾 Gravar SD
```

---

## 🌟 Dicas Profissionais

💡 **Use nomes descritivos** para variáveis  
💡 **Salve frequentemente** seu trabalho  
💡 **Teste em partes** antes de enviar tudo  
💡 **Use o painel de propriedades** para configurar blocos  
💡 **Organize o canvas** para facilitar leitura  

---

## 📞 Precisa de Ajuda?

1. **Console do Navegador (F12)** - Veja erros técnicos
2. **GUIA_RAPIDO.md** - Instruções detalhadas
3. **COMPATIBILIDADE.md** - Requisitos do sistema
4. **SUMARIO.md** - Índice completo da documentação

---

## ✨ Recursos Úteis

| Recurso | Descrição |
|---------|-----------|
| `exemplo-telemetria.xml` | Projeto pronto para testar |
| `GUIA_VISUAL.md` | Guia com ilustrações |
| `ARQUITETURA.md` | Documentação técnica |
| Chrome DevTools (F12) | Debug e inspeção |

---

## 🎉 Parabéns!

Você está pronto para começar a programar seu nanossatélite! 🛰️

**Boa sorte com seu projeto!** 🚀

---

**IVP-SAT v1.0.0**  
**Criado com ❤️ para educação STEM**
