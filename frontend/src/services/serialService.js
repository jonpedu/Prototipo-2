/**
 * Serviço para comunicação com ESP32 via Web Serial API
 */
export class SerialService {
    constructor() {
        this.port = null;
        this.reader = null;
        this.writer = null;
        this.isConnected = false;
    }

    /**
     * Verifica se o navegador suporta Web Serial API
     * @returns {boolean}
     */
    isSupported() {
        return 'serial' in navigator;
    }

    /**
     * Solicita permissão e conecta à porta serial
     * @returns {Promise<Object>} Informações da porta conectada
     */
    async connect() {
        if (!this.isSupported()) {
            throw new Error('Web Serial API não é suportada neste navegador. Use Chrome, Edge ou Opera.');
        }

        try {
            // Solicitar ao usuário para selecionar uma porta serial
            this.port = await navigator.serial.requestPort();

            // Abrir a porta com configurações para ESP32
            await this.port.open({
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
            });

            this.isConnected = true;

            // Obter informações da porta
            const info = this.port.getInfo();

            return {
                connected: true,
                portInfo: info,
                portName: `USB Serial (VID: ${info.usbVendorId}, PID: ${info.usbProductId})`
            };
        } catch (error) {
            console.error('Erro ao conectar:', error);
            throw new Error('Falha ao conectar à porta serial: ' + error.message);
        }
    }

    /**
     * Desconecta da porta serial
     */
    async disconnect() {
        try {
            if (this.reader) {
                await this.reader.cancel();
                this.reader = null;
            }

            if (this.writer) {
                await this.writer.close();
                this.writer = null;
            }

            if (this.port) {
                await this.port.close();
                this.port = null;
            }

            this.isConnected = false;
        } catch (error) {
            console.error('Erro ao desconectar:', error);
            throw error;
        }
    }

    /**
     * Envia código MicroPython para o ESP32
     * @param {string} code - Código a ser enviado
     * @param {Function} onProgress - Callback para progresso
     */
    async uploadCode(code, onProgress = () => { }) {
        if (!this.isConnected || !this.port) {
            throw new Error('Não conectado a nenhuma porta serial');
        }

        try {
            onProgress('Preparando upload...', 0);

            // Obter writer
            const textEncoder = new TextEncoderStream();
            const writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
            this.writer = textEncoder.writable.getWriter();

            // Interromper programa atual (Ctrl+C)
            onProgress('Interrompendo programa atual...', 10);
            await this.sendControl('c');
            await this.delay(100);

            // Enviar Ctrl+C novamente para garantir
            await this.sendControl('c');
            await this.delay(100);

            // Entrar no modo paste (Ctrl+E)
            onProgress('Entrando em modo de paste...', 20);
            await this.sendControl('e');
            await this.delay(200);

            // Enviar código linha por linha
            onProgress('Enviando código...', 30);
            const lines = code.split('\n');
            const totalLines = lines.length;

            for (let i = 0; i < totalLines; i++) {
                await this.writer.write(lines[i] + '\n');
                const progress = 30 + (i / totalLines) * 50;
                onProgress(`Enviando linha ${i + 1}/${totalLines}...`, progress);

                // Pequeno delay para não sobrecarregar o buffer
                if (i % 10 === 0) {
                    await this.delay(10);
                }
            }

            // Sair do modo paste (Ctrl+D)
            onProgress('Finalizando upload...', 85);
            await this.sendControl('d');
            await this.delay(500);

            // Soft reset para executar o código (Ctrl+D novamente)
            onProgress('Reiniciando ESP32...', 95);
            await this.sendControl('d');
            await this.delay(100);

            onProgress('Upload concluído!', 100);

            // Liberar writer
            this.writer.releaseLock();
            this.writer = null;

        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            if (this.writer) {
                this.writer.releaseLock();
                this.writer = null;
            }
            throw new Error('Falha ao enviar código: ' + error.message);
        }
    }

    /**
     * Envia um caractere de controle
     * @param {string} char - Caractere (a, b, c, d, e, etc)
     */
    async sendControl(char) {
        const code = char.charCodeAt(0) - 96; // Ctrl+C = 3, Ctrl+D = 4, etc
        await this.writer.write(String.fromCharCode(code));
    }

    /**
     * Lê dados da porta serial
     * @param {Function} onData - Callback chamado quando dados são recebidos
     */
    async startReading(onData) {
        if (!this.isConnected || !this.port) {
            throw new Error('Não conectado a nenhuma porta serial');
        }

        try {
            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
            this.reader = textDecoder.readable.getReader();

            // Ler dados continuamente
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) {
                    break;
                }
                if (value) {
                    onData(value);
                }
            }
        } catch (error) {
            console.error('Erro ao ler dados:', error);
        } finally {
            if (this.reader) {
                this.reader.releaseLock();
                this.reader = null;
            }
        }
    }

    /**
     * Para a leitura de dados
     */
    async stopReading() {
        if (this.reader) {
            await this.reader.cancel();
            this.reader = null;
        }
    }

    /**
     * Utilitário para delay
     * @param {number} ms - Milissegundos
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Obtém status da conexão
     * @returns {boolean}
     */
    getConnectionStatus() {
        return this.isConnected;
    }
}

export const serialService = new SerialService();
