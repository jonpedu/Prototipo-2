# Guia de Início Rápido - IVP-SAT

## 🚀 Instalação e Execução

### Passo 1: Backend (Python/Flask)

```powershell
# Navegar para o diretório do backend
cd backend

# (Opcional) Criar ambiente virtual
python -m venv venv
.\venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python app.py
```

O backend estará rodando em `http://localhost:5000`

### Passo 2: Frontend (React)

Em um novo terminal PowerShell:

```powershell
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar aplicação
npm start
```

O frontend abrirá automaticamente em `http://localhost:3000`

## 📝 Uso Básico

### 1. Criando seu Primeiro Programa

1. **Adicione o bloco "Iniciar Missão"**
   - Arraste da biblioteca de blocos para o canvas
   - Este é o ponto de entrada obrigatório

2. **Adicione blocos de sensores**
   - Arraste "Ler Temperatura", "Ler Umidade", etc.
   - Conecte-os ao bloco inicial

3. **Configure propriedades**
   - Clique em um bloco para abrir o painel de propriedades
   - Modifique valores como nome de variáveis

4. **Conecte os blocos**
   - Arraste do ponto de saída (em baixo) de um bloco
   - Para o ponto de entrada (em cima) de outro bloco

### 2. Conectando ao Hardware

1. **Conecte o ESP32 via USB**
   - Certifique-se de que os drivers estão instalados

2. **Clique em "Conectar ao Satélite"**
   - Selecione a porta COM do seu dispositivo
   - O status mudará para "Conectado"

3. **Envie o código**
   - Clique em "Enviar para o Satélite"
   - Aguarde a conclusão do upload

### 3. Salvando e Carregando Projetos

**Salvar:**
- Clique em "Salvar" no cabeçalho
- Um arquivo `.xml` será baixado

**Carregar:**
- Clique em "Carregar"
- Selecione um arquivo `.xml` previamente salvo
- O projeto será restaurado no canvas

## 🎯 Exemplo: Missão de Telemetria Básica

```
[Iniciar Missão]
    ↓
[Ler Temperatura] → temperatura
    ↓
[Ler Umidade] → umidade
    ↓
[Ler Bateria] → bateria
    ↓
[Gravar no SD] → temperatura, umidade, bateria
    ↓
[Aguardar] → 1 segundo
    ↓
(volta ao início)
```

## 🔧 Solução de Problemas

### Backend não inicia
- Verifique se o Python está instalado: `python --version`
- Verifique se as dependências foram instaladas
- Porta 5000 já está em uso? Altere em `app.py`

### Frontend não conecta ao backend
- Verifique se o backend está rodando
- Verifique o console do navegador (F12)
- Confirme que a URL em `apiService.js` está correta

### Não consigo conectar ao ESP32
- Use Chrome, Edge ou Opera (Web Serial API)
- Verifique se o driver USB está instalado
- Confirme que a porta serial não está em uso por outro programa

### Upload falha
- Certifique-se de que está conectado
- Adicione pelo menos um bloco "Iniciar Missão"
- Verifique a saída do console para erros

## 📚 Recursos Adicionais

### Estrutura de um Projeto XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="1.0" generator="IVP-SAT">
  <metadata>
    <title>Meu Projeto</title>
    <hardware>ESP32 - PION CanSat</hardware>
  </metadata>
  <nodes>
    <node id="node_0" type="start">
      <position x="250" y="100"/>
    </node>
    <!-- mais nós... -->
  </nodes>
  <edges>
    <edge source="node_0" target="node_1"/>
    <!-- mais conexões... -->
  </edges>
</project>
```

### Blocos Disponíveis

| Categoria | Blocos |
|-----------|--------|
| Controle | Iniciar Missão |
| Sensores | Temperatura, Umidade, Pressão, Acelerômetro, Bateria |
| Atuadores | LED Branco, LED RGB, Buzzer |
| Lógica | Aguardar, Se/Então |
| Dados | Gravar SD, Enviar WiFi |

### Atalhos de Teclado

- `Delete`: Remove o bloco selecionado
- `Scroll` no canvas: Zoom
- `Clique e arraste` no fundo: Pan
- `Clique duplo`: Reseta o zoom

## 🤝 Contribuindo

Este é um projeto acadêmico (TCC). Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto educacional - TCC 8º Período
