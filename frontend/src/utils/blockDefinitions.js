/**
 * Definição de todos os blocos disponíveis no IVP-SAT
 * Baseado no hardware PION CanSat Educacional
 */

export const blockCategories = {
    CONTROL: 'Controle',
    SENSORS: 'Sensores',
    ACTUATORS: 'Atuadores',
    LOGIC: 'Lógica',
    DATA: 'Dados'
};

export const blockDefinitions = [
    // ==================== CONTROLE ====================
    {
        id: 'start',
        type: 'start',
        category: blockCategories.CONTROL,
        label: 'Iniciar Missão',
        description: 'Ponto de entrada do programa',
        icon: '🚀',
        color: '#10b981',
        inputs: 0,
        outputs: 1,
        defaultData: {},
        properties: []
    },

    // ==================== SENSORES ====================
    {
        id: 'read_temperature',
        type: 'read_temperature',
        category: blockCategories.SENSORS,
        label: 'Ler Temperatura',
        description: 'Lê temperatura do sensor BME280 (°C)',
        icon: '🌡️',
        color: '#ef4444',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'temperatura'
        },
        properties: [
            {
                name: 'variable',
                label: 'Nome da Variável',
                type: 'text',
                default: 'temperatura'
            }
        ]
    },
    {
        id: 'read_humidity',
        type: 'read_humidity',
        category: blockCategories.SENSORS,
        label: 'Ler Umidade',
        description: 'Lê umidade relativa do sensor BME280 (%)',
        icon: '💧',
        color: '#3b82f6',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'umidade'
        },
        properties: [
            {
                name: 'variable',
                label: 'Nome da Variável',
                type: 'text',
                default: 'umidade'
            }
        ]
    },
    {
        id: 'read_pressure',
        type: 'read_pressure',
        category: blockCategories.SENSORS,
        label: 'Ler Pressão',
        description: 'Lê pressão atmosférica do sensor BME280 (hPa)',
        icon: '🌪️',
        color: '#8b5cf6',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'pressao'
        },
        properties: [
            {
                name: 'variable',
                label: 'Nome da Variável',
                type: 'text',
                default: 'pressao'
            }
        ]
    },
    {
        id: 'read_accelerometer',
        type: 'read_accelerometer',
        category: blockCategories.SENSORS,
        label: 'Ler Acelerômetro',
        description: 'Lê aceleração do MPU6050 (X, Y, Z)',
        icon: '📊',
        color: '#f59e0b',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'acelerometro',
            range: '2g'
        },
        properties: [
            {
                name: 'variable',
                label: 'Nome da Variável',
                type: 'text',
                default: 'acelerometro'
            },
            {
                name: 'range',
                label: 'Faixa de Medição',
                type: 'select',
                options: ['2g', '4g', '8g', '16g'],
                default: '2g'
            }
        ]
    },
    {
        id: 'read_battery',
        type: 'read_battery',
        category: blockCategories.SENSORS,
        label: 'Ler Nível da Bateria',
        description: 'Lê nível de carga da bateria (%)',
        icon: '🔋',
        color: '#84cc16',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'bateria'
        },
        properties: [
            {
                name: 'variable',
                label: 'Nome da Variável',
                type: 'text',
                default: 'bateria'
            }
        ]
    },

    // ==================== ATUADORES ====================
    {
        id: 'led_white',
        type: 'led_white',
        category: blockCategories.ACTUATORS,
        label: 'LED Branco',
        description: 'Liga ou desliga o LED branco',
        icon: '💡',
        color: '#64748b',
        inputs: 1,
        outputs: 1,
        defaultData: {
            state: 'on'
        },
        properties: [
            {
                name: 'state',
                label: 'Estado',
                type: 'select',
                options: [
                    { value: 'on', label: 'Ligar' },
                    { value: 'off', label: 'Desligar' }
                ],
                default: 'on'
            }
        ]
    },
    {
        id: 'led_rgb',
        type: 'led_rgb',
        category: blockCategories.ACTUATORS,
        label: 'LED RGB',
        description: 'Define cor do LED RGB',
        icon: '🌈',
        color: '#ec4899',
        inputs: 1,
        outputs: 1,
        defaultData: {
            red: 255,
            green: 0,
            blue: 0
        },
        properties: [
            {
                name: 'red',
                label: 'Vermelho (0-255)',
                type: 'number',
                min: 0,
                max: 255,
                default: 255
            },
            {
                name: 'green',
                label: 'Verde (0-255)',
                type: 'number',
                min: 0,
                max: 255,
                default: 0
            },
            {
                name: 'blue',
                label: 'Azul (0-255)',
                type: 'number',
                min: 0,
                max: 255,
                default: 0
            }
        ]
    },
    {
        id: 'buzzer',
        type: 'buzzer',
        category: blockCategories.ACTUATORS,
        label: 'Buzzer',
        description: 'Emite som por determinado tempo',
        icon: '🔊',
        color: '#f97316',
        inputs: 1,
        outputs: 1,
        defaultData: {
            duration: 0.5
        },
        properties: [
            {
                name: 'duration',
                label: 'Duração (segundos)',
                type: 'number',
                min: 0.1,
                max: 10,
                step: 0.1,
                default: 0.5
            }
        ]
    },

    // ==================== LÓGICA ====================
    {
        id: 'wait',
        type: 'wait',
        category: blockCategories.LOGIC,
        label: 'Aguardar',
        description: 'Pausa a execução por X segundos',
        icon: '⏱️',
        color: '#06b6d4',
        inputs: 1,
        outputs: 1,
        defaultData: {
            time: 1
        },
        properties: [
            {
                name: 'time',
                label: 'Tempo (segundos)',
                type: 'number',
                min: 0.1,
                max: 3600,
                step: 0.1,
                default: 1
            }
        ]
    },
    {
        id: 'if',
        type: 'if',
        category: blockCategories.LOGIC,
        label: 'Se/Então',
        description: 'Executa bloco se condição for verdadeira',
        icon: '🔀',
        color: '#a855f7',
        inputs: 1,
        outputs: 2,
        defaultData: {
            condition: 'temperatura > 25'
        },
        properties: [
            {
                name: 'condition',
                label: 'Condição',
                type: 'text',
                default: 'temperatura > 25',
                placeholder: 'Ex: temperatura > 25'
            }
        ]
    },

    // ==================== DADOS ====================
    {
        id: 'save_sd',
        type: 'save_sd',
        category: blockCategories.DATA,
        label: 'Gravar no SD',
        description: 'Salva dados no cartão SD',
        icon: '💾',
        color: '#14b8a6',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'dados'
        },
        properties: [
            {
                name: 'variable',
                label: 'Variável a Gravar',
                type: 'text',
                default: 'dados'
            }
        ]
    },
    {
        id: 'send_wifi',
        type: 'send_wifi',
        category: blockCategories.DATA,
        label: 'Enviar via WiFi',
        description: 'Transmite dados via WiFi',
        icon: '📡',
        color: '#0ea5e9',
        inputs: 1,
        outputs: 1,
        defaultData: {
            variable: 'dados'
        },
        properties: [
            {
                name: 'variable',
                label: 'Variável a Enviar',
                type: 'text',
                default: 'dados'
            }
        ]
    }
];

/**
 * Obtém definição de um bloco pelo tipo
 */
export const getBlockDefinition = (type) => {
    return blockDefinitions.find(block => block.type === type);
};

/**
 * Obtém blocos por categoria
 */
export const getBlocksByCategory = (category) => {
    return blockDefinitions.filter(block => block.category === category);
};

/**
 * Obtém todas as categorias únicas
 */
export const getAllCategories = () => {
    return Object.values(blockCategories);
};
