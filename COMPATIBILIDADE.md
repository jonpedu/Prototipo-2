# Compatibilidade e Requisitos - IVP-SAT

## 🌐 Navegadores Compatíveis

### ✅ Totalmente Compatível (Web Serial API)

| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| Google Chrome | 89+ | ✅ Recomendado |
| Microsoft Edge | 89+ | ✅ Recomendado |
| Opera | 75+ | ✅ Suportado |

### ⚠️ Compatibilidade Parcial

| Navegador | Status | Limitações |
|-----------|--------|------------|
| Brave | Versão recente | Funciona, mas pode exigir permissões extras |
| Chromium | 89+ | Funciona na maioria das distribuições |

### ❌ Não Compatível

| Navegador | Motivo |
|-----------|--------|
| Firefox | Web Serial API não implementada |
| Safari | Web Serial API não suportada |
| Internet Explorer | Não suporta tecnologias modernas |

## 💻 Requisitos do Sistema

### Hardware Mínimo
- **Processador:** Dual-core 1.6 GHz ou superior
- **RAM:** 4 GB (8 GB recomendado)
- **Espaço em Disco:** 500 MB livres
- **Porta USB:** Necessária para conexão com ESP32

### Software
- **Sistema Operacional:**
  - Windows 10/11
  - macOS 10.15+
  - Linux (Ubuntu 20.04+, Fedora 32+)
  
- **Node.js:** Versão 16.x ou superior
- **Python:** Versão 3.8 ou superior
- **Driver USB-Serial:** CH340 ou CP2102 (para ESP32)

## 🔌 Hardware Compatível

### Testado e Certificado
- ✅ **PION CanSat Educacional**
  - Microcontrolador: ESP32
  - Sensores: BME280, MPU6050
  - Comunicação: WiFi, Serial

### Potencialmente Compatível (não testado)
- ⚠️ Outras placas ESP32 com sensores similares
- ⚠️ ESP32-S2, ESP32-S3, ESP32-C3

## 📋 Drivers Necessários

### Windows
1. **CH340 Driver** (mais comum)
   - Download: http://www.wch.cn/downloads/CH341SER_EXE.html
   
2. **CP210x Driver** (alternativo)
   - Download: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

### macOS
- Drivers geralmente incluídos no sistema
- Se necessário: `brew install --cask silicon-labs-vcp-driver`

### Linux
- Drivers geralmente incluídos no kernel
- Adicionar usuário ao grupo dialout:
  ```bash
  sudo usermod -a -G dialout $USER
  ```
- Reiniciar sessão após o comando

## 🔒 Permissões e Segurança

### Web Serial API
- **Requer HTTPS** em produção (http://localhost funciona em desenvolvimento)
- **Requer interação do usuário** para solicitar acesso à porta serial
- **Permissões podem ser revogadas** pelo usuário a qualquer momento

### Políticas de Segurança
- A aplicação **NÃO** coleta dados do usuário
- Código gerado é processado **localmente**
- Upload de código é feito **diretamente do navegador** para o dispositivo

## 🧪 Testado Com

### Configurações de Teste
- **OS:** Windows 11, Ubuntu 22.04
- **Navegador:** Chrome 119, Edge 119
- **Hardware:** PION CanSat v2.0, ESP32 DevKit v1
- **Node.js:** v18.17.0, v20.5.0
- **Python:** 3.10.11, 3.11.4

## 🐛 Problemas Conhecidos

### Windows
- **Problema:** Driver CH340 não instala automaticamente
  - **Solução:** Instalar manualmente do site do fabricante

### macOS
- **Problema:** Acesso negado à porta serial
  - **Solução:** Verificar permissões em Preferências do Sistema > Segurança

### Linux
- **Problema:** Usuário sem permissão para acessar /dev/ttyUSB*
  - **Solução:** Adicionar ao grupo dialout e reiniciar

### Todos os Sistemas
- **Problema:** Upload falha no meio do processo
  - **Solução:** Desconectar e reconectar o ESP32, tentar novamente
  
- **Problema:** Backend não responde
  - **Solução:** Verificar se porta 5000 não está em uso

## 📊 Limitações Conhecidas

1. **Tamanho do Código:** Limitado pela memória flash do ESP32 (~4MB)
2. **Velocidade de Upload:** Limitada a 115200 baud (pode levar alguns segundos)
3. **Navegadores:** Apenas navegadores baseados em Chromium
4. **Conexão Simultânea:** Apenas uma instância pode se conectar ao ESP32 por vez

## 🔄 Atualizações Futuras

### Planejado
- [ ] Suporte para ESP32-S2/S3/C3
- [ ] Debug em tempo real via serial
- [ ] Monitor serial integrado
- [ ] Biblioteca de exemplos expandida
- [ ] Simulação 3D (fora do escopo MVP)

### Em Consideração
- [ ] Suporte para WebUSB (alternativa ao Web Serial)
- [ ] PWA (Progressive Web App)
- [ ] Salvamento em nuvem
- [ ] Colaboração em tempo real

## ✅ Verificação de Compatibilidade

Execute no console do navegador:

```javascript
if ('serial' in navigator) {
  console.log('✅ Web Serial API suportada!');
} else {
  console.log('❌ Web Serial API não suportada neste navegador');
}
```

## 📞 Suporte

Para problemas de compatibilidade:
1. Consulte este documento
2. Verifique o GUIA_RAPIDO.md
3. Consulte os logs do console (F12)
4. Verifique se o hardware está conectado corretamente

---

**Última atualização:** Outubro 2025
**Versão:** 1.0.0 (MVP)
