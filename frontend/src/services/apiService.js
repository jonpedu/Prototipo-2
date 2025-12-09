import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Serviço para comunicação com o backend
 */
export const apiService = {
    /**
     * Gera código MicroPython a partir do fluxo visual
     * @param {Object} flowData - Dados do fluxo (nodes e edges)
     * @returns {Promise<string>} Código MicroPython gerado
     */
    async generateCode(flowData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/generate_code`, flowData);
            return response.data.code;
        } catch (error) {
            console.error('Erro ao gerar código:', error);
            throw new Error('Falha ao gerar código. Verifique se o backend está rodando.');
        }
    },

    /**
     * Verifica a saúde da API
     * @returns {Promise<Object>} Status da API
     */
    async healthCheck() {
        try {
            const response = await axios.get(`${API_BASE_URL}/health`);
            return response.data;
        } catch (error) {
            console.error('Erro ao verificar saúde da API:', error);
            throw error;
        }
    }
};
