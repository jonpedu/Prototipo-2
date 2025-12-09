from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def generate_micropython_code(flow_data):
    """
    Gera código MicroPython a partir dos dados do fluxo visual.
    
    Args:
        flow_data: Dicionário contendo 'nodes' e 'edges'
    
    Returns:
        String com código MicroPython gerado
    """
    nodes = flow_data.get('nodes', [])
    edges = flow_data.get('edges', [])
    
    # Criar mapa de conexões
    connections = {}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source not in connections:
            connections[source] = []
        connections[source].append(target)
    
    # Encontrar nó inicial
    start_node = None
    for node in nodes:
        if node.get('type') == 'start':
            start_node = node
            break
    
    if not start_node:
        return "# Erro: Nenhum bloco 'Iniciar Missão' encontrado"
    
    # Gerar código
    code_lines = [
        "# Código gerado automaticamente pelo IVP-SAT",
        "# Hardware: PION CanSat / ESP32",
        "",
        "from machine import Pin, I2C, ADC",
        "from time import sleep",
        "import json",
        "",
        "# Configuração inicial dos pinos",
        "i2c = I2C(0, scl=Pin(22), sda=Pin(21))",
        "",
        "# LEDs",
        "led_branco = Pin(2, Pin.OUT)",
        "led_r = Pin(25, Pin.OUT)",
        "led_g = Pin(26, Pin.OUT)",
        "led_b = Pin(27, Pin.OUT)",
        "",
        "# Buzzer",
        "buzzer = Pin(12, Pin.OUT)",
        "",
        "# Bateria",
        "adc_bateria = ADC(Pin(34))",
        "adc_bateria.atten(ADC.ATTN_11DB)",
        "",
        "# Funções auxiliares",
        "def ler_temperatura():",
        "    # Simulação - implementar leitura do BME280",
        "    return 25.0",
        "",
        "def ler_umidade():",
        "    # Simulação - implementar leitura do BME280",
        "    return 60.0",
        "",
        "def ler_pressao():",
        "    # Simulação - implementar leitura do BME280",
        "    return 1013.25",
        "",
        "def ler_acelerometro():",
        "    # Simulação - implementar leitura do MPU6050",
        "    return {'x': 0.0, 'y': 0.0, 'z': 9.8}",
        "",
        "def ler_bateria():",
        "    valor = adc_bateria.read()",
        "    voltagem = (valor / 4095.0) * 3.3 * 2",
        "    porcentagem = min(100, max(0, (voltagem - 3.0) / 1.2 * 100))",
        "    return porcentagem",
        "",
        "def ligar_led_branco(estado):",
        "    led_branco.value(1 if estado else 0)",
        "",
        "def definir_cor_rgb(r, g, b):",
        "    led_r.value(r)",
        "    led_g.value(g)",
        "    led_b.value(b)",
        "",
        "def emitir_som(duracao):",
        "    buzzer.value(1)",
        "    sleep(duracao)",
        "    buzzer.value(0)",
        "",
        "def gravar_sd(dados):",
        "    try:",
        "        with open('/sd/dados.txt', 'a') as f:",
        "            f.write(str(dados) + '\\n')",
        "    except:",
        "        print('Erro ao gravar no SD')",
        "",
        "def enviar_wifi(dados):",
        "    # Implementar envio via WiFi",
        "    print('Enviando:', dados)",
        "",
        "# Programa principal",
        "def main():",
    ]
    
    # Gerar código do fluxo
    indent = "    "
    visited = set()
    
    def process_node(node_id, level=1):
        if node_id in visited:
            return []
        visited.add(node_id)
        
        node = next((n for n in nodes if n['id'] == node_id), None)
        if not node:
            return []
        
        node_type = node.get('type')
        node_data = node.get('data', {})
        lines = []
        current_indent = indent * level
        
        if node_type == 'start':
            lines.append(f"{current_indent}# Início da missão")
            lines.append(f"{current_indent}print('Missão iniciada!')")
            
        elif node_type == 'read_temperature':
            var_name = node_data.get('variable', 'temperatura')
            lines.append(f"{current_indent}{var_name} = ler_temperatura()")
            lines.append(f"{current_indent}print(f'Temperatura: {{{var_name}}}°C')")
            
        elif node_type == 'read_humidity':
            var_name = node_data.get('variable', 'umidade')
            lines.append(f"{current_indent}{var_name} = ler_umidade()")
            lines.append(f"{current_indent}print(f'Umidade: {{{var_name}}}%')")
            
        elif node_type == 'read_pressure':
            var_name = node_data.get('variable', 'pressao')
            lines.append(f"{current_indent}{var_name} = ler_pressao()")
            lines.append(f"{current_indent}print(f'Pressão: {{{var_name}}} hPa')")
            
        elif node_type == 'read_accelerometer':
            var_name = node_data.get('variable', 'acelerometro')
            lines.append(f"{current_indent}{var_name} = ler_acelerometro()")
            lines.append(f"{current_indent}print(f'Acelerômetro: {{{var_name}}}')")
            
        elif node_type == 'read_battery':
            var_name = node_data.get('variable', 'bateria')
            lines.append(f"{current_indent}{var_name} = ler_bateria()")
            lines.append(f"{current_indent}print(f'Bateria: {{{var_name}}}%')")
            
        elif node_type == 'led_white':
            estado = node_data.get('state', 'on')
            estado_bool = 'True' if estado == 'on' else 'False'
            lines.append(f"{current_indent}ligar_led_branco({estado_bool})")
            
        elif node_type == 'led_rgb':
            r = node_data.get('red', 0)
            g = node_data.get('green', 0)
            b = node_data.get('blue', 0)
            lines.append(f"{current_indent}definir_cor_rgb({r}, {g}, {b})")
            
        elif node_type == 'buzzer':
            duracao = node_data.get('duration', 0.5)
            lines.append(f"{current_indent}emitir_som({duracao})")
            
        elif node_type == 'wait':
            tempo = node_data.get('time', 1)
            lines.append(f"{current_indent}sleep({tempo})")
            
        elif node_type == 'if':
            condition = node_data.get('condition', 'True')
            lines.append(f"{current_indent}if {condition}:")
            # Processar nós filhos do if
            if node_id in connections:
                for next_id in connections[node_id]:
                    lines.extend(process_node(next_id, level + 1))
            return lines  # Retornar aqui para evitar processar conexões novamente
            
        elif node_type == 'save_sd':
            var_name = node_data.get('variable', 'dados')
            lines.append(f"{current_indent}gravar_sd({var_name})")
            
        elif node_type == 'send_wifi':
            var_name = node_data.get('variable', 'dados')
            lines.append(f"{current_indent}enviar_wifi({var_name})")
        
        # Processar próximos nós
        if node_id in connections:
            for next_id in connections[node_id]:
                lines.extend(process_node(next_id, level))
        
        return lines
    
    # Processar a partir do nó inicial
    main_code = process_node(start_node['id'])
    code_lines.extend(main_code)
    
    # Finalizar código
    code_lines.extend([
        "",
        "# Executar programa",
        "try:",
        "    main()",
        "except Exception as e:",
        "    print(f'Erro: {e}')",
    ])
    
    return '\n'.join(code_lines)


@app.route('/api/generate_code', methods=['POST'])
def generate_code():
    """
    Endpoint para gerar código MicroPython a partir do fluxo visual.
    
    Espera JSON com formato:
    {
        "nodes": [...],
        "edges": [...]
    }
    """
    try:
        flow_data = request.get_json()
        
        if not flow_data:
            return jsonify({
                'error': 'Dados inválidos'
            }), 400
        
        code = generate_micropython_code(flow_data)
        
        return jsonify({
            'code': code,
            'success': True
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Endpoint de health check"""
    return jsonify({
        'status': 'ok',
        'message': 'IVP-SAT API está funcionando'
    })


if __name__ == '__main__':
    print("🚀 IVP-SAT Backend iniciado!")
    print("📡 Servidor rodando em http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
