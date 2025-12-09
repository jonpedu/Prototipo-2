# 🧪 Guia de Testes - IVP-SAT

## Objetivo

Este documento fornece um roteiro completo para testar todas as funcionalidades do IVP-SAT.

---

## ✅ Checklist de Testes

### 1. Instalação e Configuração

#### Backend
- [ ] Dependências Python instaladas sem erros
- [ ] Servidor Flask inicia na porta 5000
- [ ] Endpoint `/api/health` responde com status "ok"
- [ ] Endpoint `/api/generate_code` aceita requisições POST

#### Frontend
- [ ] Dependências Node.js instaladas sem erros
- [ ] Aplicação React inicia na porta 3000
- [ ] Página carrega sem erros no console
- [ ] Todos os componentes renderizam corretamente

### 2. Interface do Usuário

#### Header (Cabeçalho)
- [ ] Logo e título são exibidos corretamente
- [ ] Dropdown de seleção de placa mostra "ESP32"
- [ ] Botão "Conectar" está visível e habilitado
- [ ] Botões "Salvar" e "Carregar" estão visíveis

#### BlockLibrary (Biblioteca de Blocos)
- [ ] Todas as 5 categorias são exibidas
- [ ] Total de 13 blocos está correto
- [ ] Ícones dos blocos são exibidos
- [ ] Categorias podem ser expandidas/colapsadas
- [ ] Blocos podem ser arrastados

#### Canvas (Área de Trabalho)
- [ ] Grade de fundo é exibida
- [ ] Controles de zoom funcionam
- [ ] Pan (arrastar fundo) funciona
- [ ] MiniMap é exibido no canto inferior direito

#### PropertiesPanel (Painel de Propriedades)
- [ ] Painel aparece ao clicar em um bloco
- [ ] Propriedades corretas são exibidas
- [ ] Inputs permitem edição
- [ ] Botão de fechar funciona

### 3. Funcionalidades Básicas

#### Adicionar Blocos
- [ ] Arrastar bloco da biblioteca para canvas funciona
- [ ] Bloco é renderizado no canvas
- [ ] Bloco tem estilo correto (cor, ícone)
- [ ] Handles (pontos de conexão) são visíveis

#### Conectar Blocos
- [ ] Arrastar de handle de saída para entrada funciona
- [ ] Linha de conexão é exibida
- [ ] Conexão é animada
- [ ] Múltiplas conexões podem ser criadas

#### Editar Propriedades
- [ ] Clicar em bloco abre painel de propriedades
- [ ] Editar texto atualiza o bloco
- [ ] Editar número atualiza o bloco
- [ ] Selecionar opção atualiza o bloco
- [ ] Mudanças são refletidas visualmente no bloco

#### Remover Elementos
- [ ] Selecionar bloco e pressionar Delete remove o bloco
- [ ] Conexões do bloco removido são deletadas
- [ ] Clicar em conexão e Delete remove apenas a conexão

### 4. Geração de Código

#### Comunicação com Backend
- [ ] Aplicação se conecta ao backend automaticamente
- [ ] Requisição para gerar código é enviada
- [ ] Resposta com código MicroPython é recebida
- [ ] Erros de comunicação são tratados

#### Qualidade do Código
- [ ] Código gerado tem estrutura válida
- [ ] Imports necessários estão presentes
- [ ] Funções auxiliares são definidas
- [ ] Função main() existe
- [ ] Bloco "Iniciar Missão" é reconhecido
- [ ] Ordem de execução está correta

### 5. Web Serial API

#### Verificação de Suporte
- [ ] Aplicação detecta se navegador suporta Web Serial
- [ ] Mensagem de erro clara se não suportado

#### Conexão com Hardware
- [ ] Botão "Conectar" abre diálogo de seleção de porta
- [ ] Lista de portas disponíveis é exibida
- [ ] Conexão é estabelecida com sucesso
- [ ] Status muda para "Conectado"
- [ ] Nome da porta é exibido

#### Upload de Código
- [ ] Botão "Enviar" só fica ativo quando conectado
- [ ] Barra de progresso é exibida durante upload
- [ ] Percentual de progresso é atualizado
- [ ] Mensagem de sucesso aparece ao concluir
- [ ] Código é executado no ESP32

#### Desconexão
- [ ] Botão "Desconectar" funciona
- [ ] Status muda para "Desconectado"
- [ ] Recursos são liberados corretamente

### 6. Gerenciamento de Projetos

#### Salvar em XML
- [ ] Botão "Salvar" gera arquivo XML
- [ ] Download do arquivo inicia automaticamente
- [ ] Nome do arquivo tem timestamp
- [ ] Arquivo contém todos os nodes
- [ ] Arquivo contém todas as edges
- [ ] Posições dos blocos são salvas
- [ ] Propriedades dos blocos são salvas

#### Carregar de XML
- [ ] Botão "Carregar" abre diálogo de arquivo
- [ ] Apenas arquivos .xml são aceitos
- [ ] Arquivo é lido corretamente
- [ ] Nodes são recriados no canvas
- [ ] Edges são recriadas
- [ ] Posições são restauradas
- [ ] Propriedades são restauradas

#### Validação de XML
- [ ] Arquivo inválido mostra mensagem de erro
- [ ] Arquivo corrompido é tratado graciosamente

### 7. Blocos Específicos

#### Controle
- [ ] **Iniciar Missão:** Renderiza corretamente, sem propriedades

#### Sensores
- [ ] **Ler Temperatura:** Propriedade "variável" editável
- [ ] **Ler Umidade:** Propriedade "variável" editável
- [ ] **Ler Pressão:** Propriedade "variável" editável
- [ ] **Ler Acelerômetro:** Propriedades "variável" e "faixa" editáveis
- [ ] **Ler Bateria:** Propriedade "variável" editável

#### Atuadores
- [ ] **LED Branco:** Propriedade "estado" (on/off) editável
- [ ] **LED RGB:** Propriedades R, G, B (0-255) editáveis
- [ ] **Buzzer:** Propriedade "duração" editável

#### Lógica
- [ ] **Aguardar:** Propriedade "tempo" editável
- [ ] **Se/Então:** Propriedade "condição" editável, 2 saídas

#### Dados
- [ ] **Gravar SD:** Propriedade "variável" editável
- [ ] **Enviar WiFi:** Propriedade "variável" editável

### 8. Mensagens e Feedback

#### Mensagens de Sucesso
- [ ] Conexão estabelecida
- [ ] Código enviado com sucesso
- [ ] Projeto salvo
- [ ] Projeto carregado

#### Mensagens de Erro
- [ ] Falha na conexão
- [ ] Erro ao enviar código
- [ ] Erro ao salvar projeto
- [ ] Erro ao carregar projeto
- [ ] Backend não disponível

#### Mensagens de Aviso
- [ ] Conecte ao satélite primeiro
- [ ] Adicione blocos antes de enviar
- [ ] Navegador não suporta Web Serial

### 9. Usabilidade

#### Responsividade
- [ ] Interface funciona em tela grande (>1920px)
- [ ] Interface funciona em tela média (1366px)
- [ ] Interface funciona em tela pequena (1024px)
- [ ] Componentes se ajustam corretamente

#### Performance
- [ ] Canvas renderiza suavemente com 10 blocos
- [ ] Canvas renderiza suavemente com 50 blocos
- [ ] Zoom é fluido
- [ ] Pan é fluido
- [ ] Drag & drop é responsivo

#### Acessibilidade
- [ ] Controles são acessíveis via teclado
- [ ] Cores têm contraste adequado
- [ ] Ícones são compreensíveis
- [ ] Mensagens são claras

### 10. Integração Completa

#### Fluxo Completo: Criar → Conectar → Enviar
1. [ ] Criar programa visual no canvas
2. [ ] Conectar ao ESP32
3. [ ] Enviar código
4. [ ] Verificar execução no hardware

#### Fluxo Completo: Criar → Salvar → Carregar
1. [ ] Criar programa visual
2. [ ] Salvar em XML
3. [ ] Limpar canvas
4. [ ] Carregar XML
5. [ ] Verificar que tudo foi restaurado

---

## 🧪 Casos de Teste Detalhados

### Teste 1: Programa Simples
**Objetivo:** Verificar fluxo básico

**Passos:**
1. Arraste "Iniciar Missão"
2. Arraste "Ler Temperatura"
3. Conecte os dois blocos
4. Clique em "Ler Temperatura"
5. Mude variável para "temp"
6. Conecte ao ESP32
7. Envie código

**Resultado Esperado:**
- Código gerado inclui leitura de temperatura
- Upload bem-sucedido
- ESP32 executa o código

### Teste 2: Programa com Condicional
**Objetivo:** Verificar lógica condicional

**Passos:**
1. Arraste "Iniciar Missão"
2. Arraste "Ler Temperatura"
3. Arraste "Se/Então"
4. Configure condição: "temperatura > 25"
5. Arraste "LED RGB" (vermelho para sim)
6. Arraste "LED Branco OFF" (para não)
7. Conecte tudo
8. Envie código

**Resultado Esperado:**
- Código inclui estrutura if/else
- LED acende vermelho se temperatura > 25
- LED branco desligado caso contrário

### Teste 3: Salvamento e Restauração
**Objetivo:** Verificar persistência de dados

**Passos:**
1. Crie programa com 5 blocos
2. Configure propriedades personalizadas
3. Salve em XML
4. Feche e reabra a aplicação
5. Carregue o XML

**Resultado Esperado:**
- Todos os blocos são restaurados
- Posições são mantidas
- Propriedades são preservadas
- Conexões são recriadas

### Teste 4: Múltiplos Sensores
**Objetivo:** Verificar coleta de dados múltiplos

**Passos:**
1. Crie sequência: Temperatura → Umidade → Pressão → Bateria
2. Configure variáveis diferentes
3. Adicione "Gravar SD" no final
4. Envie código

**Resultado Esperado:**
- Todas as leituras são realizadas
- Dados são gravados no SD
- Ordem de execução está correta

### Teste 5: Tratamento de Erros
**Objetivo:** Verificar robustez

**Cenários:**
1. Enviar sem bloco "Iniciar"
2. Carregar XML inválido
3. Conectar sem hardware
4. Upload com porta fechada
5. Backend offline

**Resultado Esperado:**
- Mensagens de erro claras
- Aplicação não trava
- Usuário sabe o que fazer

---

## 📊 Relatório de Testes

### Template de Relatório

```markdown
## Relatório de Teste - IVP-SAT

**Data:** [Data do teste]
**Testador:** [Seu nome]
**Versão:** 1.0.0
**Navegador:** [Chrome/Edge + versão]
**SO:** [Windows/Linux + versão]

### Hardware Testado
- [ ] ESP32 DevKit v1
- [ ] PION CanSat v2
- [ ] Outro: ___________

### Resumo
- Testes Executados: ___/100
- Testes Passaram: ___
- Testes Falharam: ___
- Taxa de Sucesso: ___%

### Problemas Encontrados
1. [Descrição do problema]
   - Severidade: Alta/Média/Baixa
   - Reproduzível: Sim/Não
   - Passos para reproduzir: ...

### Observações
[Comentários gerais sobre a experiência]

### Recomendações
[Sugestões de melhorias]
```

---

## 🐛 Bugs Conhecidos

### Frontend
- [ ] Nenhum bug crítico conhecido

### Backend
- [ ] Nenhum bug crítico conhecido

### Integração
- [ ] Primeira conexão pode demorar alguns segundos
- [ ] Upload muito rápido pode falhar (solução: tentar novamente)

---

## ✅ Critérios de Aceitação

Para considerar o MVP pronto:

### Obrigatório (Must Have)
- [x] 100% dos blocos funcionais
- [x] Conexão via Web Serial funciona
- [x] Código MicroPython gerado corretamente
- [x] Upload para ESP32 funciona
- [x] Salvamento/Carregamento XML funciona

### Importante (Should Have)
- [x] Interface responsiva
- [x] Mensagens de feedback
- [x] Tratamento de erros
- [x] Documentação completa

### Desejável (Nice to Have)
- [x] Animações suaves
- [x] Guia visual
- [x] Exemplos prontos
- [ ] Testes automatizados

---

## 🎯 Próximos Passos

Após completar todos os testes:

1. **Correção de Bugs:** Resolver problemas encontrados
2. **Otimização:** Melhorar performance se necessário
3. **Documentação:** Atualizar com novos achados
4. **Demo:** Preparar demonstração para TCC
5. **Feedback:** Coletar opinião de usuários reais

---

**Use este guia para garantir a qualidade do IVP-SAT!** ✅

**Boa sorte com os testes!** 🧪
