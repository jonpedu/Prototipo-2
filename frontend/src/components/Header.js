import React, { useState, useRef } from 'react';
import {
    Wifi,
    WifiOff,
    Upload,
    Download,
    FolderOpen,
    Save,
    AlertCircle,
    CheckCircle,
    Loader
} from 'lucide-react';
import { serialService } from '../services/serialService';
import { apiService } from '../services/apiService';
import { xmlUtils } from '../utils/xmlUtils';
import './Header.css';

const Header = ({ nodes, edges, onLoadProject }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [portName, setPortName] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('ESP32');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState(null);
    const fileInputRef = useRef(null);

    // Exibe mensagem temporária
    const showMessage = (text, type = 'info', duration = 3000) => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), duration);
    };

    // Conectar ao satélite
    const handleConnect = async () => {
        try {
            if (isConnected) {
                await serialService.disconnect();
                setIsConnected(false);
                setPortName('');
                showMessage('Desconectado do satélite', 'success');
            } else {
                const result = await serialService.connect();
                setIsConnected(true);
                setPortName(result.portName);
                showMessage('Conectado ao satélite com sucesso!', 'success');
            }
        } catch (error) {
            showMessage(error.message, 'error');
            console.error('Erro de conexão:', error);
        }
    };

    // Enviar código para o satélite
    const handleUpload = async () => {
        if (!isConnected) {
            showMessage('Conecte-se ao satélite primeiro', 'warning');
            return;
        }

        if (!nodes || nodes.length === 0) {
            showMessage('Adicione blocos ao canvas antes de enviar', 'warning');
            return;
        }

        try {
            setIsUploading(true);
            setUploadProgress(0);

            // Gerar código MicroPython
            showMessage('Gerando código MicroPython...', 'info');
            const flowData = { nodes, edges };
            const code = await apiService.generateCode(flowData);

            // Enviar para o ESP32
            await serialService.uploadCode(code, (status, progress) => {
                setUploadProgress(progress);
                console.log(status);
            });

            showMessage('Código enviado com sucesso!', 'success');
            setUploadProgress(0);
        } catch (error) {
            showMessage('Erro ao enviar código: ' + error.message, 'error');
            console.error('Erro de upload:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Salvar projeto em XML
    const handleSaveXML = () => {
        if (!nodes || nodes.length === 0) {
            showMessage('Não há nada para salvar', 'warning');
            return;
        }

        try {
            const flowData = { nodes, edges };
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `projeto-cansat-${timestamp}.xml`;

            xmlUtils.exportToXML(flowData, filename);
            showMessage('Projeto salvo com sucesso!', 'success');
        } catch (error) {
            showMessage('Erro ao salvar projeto: ' + error.message, 'error');
            console.error('Erro ao salvar:', error);
        }
    };

    // Carregar projeto de XML
    const handleLoadXML = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            showMessage('Carregando projeto...', 'info');
            const flowData = await xmlUtils.importFromXML(file);

            if (onLoadProject) {
                onLoadProject(flowData);
            }

            showMessage('Projeto carregado com sucesso!', 'success');
        } catch (error) {
            showMessage('Erro ao carregar projeto: ' + error.message, 'error');
            console.error('Erro ao carregar:', error);
        }

        // Limpar input
        event.target.value = '';
    };

    const handleLoadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <header className="header">
            <div className="header-content">
                {/* Logo e título */}
                <div className="header-brand">
                    <div className="logo">🛰️</div>
                    <div>
                        <h1 className="title">IVP-SAT</h1>
                        <p className="subtitle">Interface Visual de Programação para Satélites</p>
                    </div>
                </div>

                {/* Controles */}
                <div className="header-controls">
                    {/* Seleção de placa */}
                    <div className="control-group">
                        <label className="control-label">Placa:</label>
                        <select
                            className="board-select"
                            value={selectedBoard}
                            onChange={(e) => setSelectedBoard(e.target.value)}
                            disabled={isConnected}
                        >
                            <option value="ESP32">ESP32 (PION CanSat)</option>
                        </select>
                    </div>

                    {/* Status de conexão */}
                    <div className="control-group">
                        <button
                            className={`btn ${isConnected ? 'btn-connected' : 'btn-connect'}`}
                            onClick={handleConnect}
                            disabled={isUploading}
                        >
                            {isConnected ? (
                                <>
                                    <Wifi size={18} />
                                    <span>Conectado</span>
                                </>
                            ) : (
                                <>
                                    <WifiOff size={18} />
                                    <span>Conectar</span>
                                </>
                            )}
                        </button>
                        {isConnected && (
                            <div className="connection-status">
                                <CheckCircle size={14} className="status-icon-success" />
                                <span className="status-text">{portName}</span>
                            </div>
                        )}
                    </div>

                    {/* Botão de upload */}
                    <button
                        className="btn btn-upload"
                        onClick={handleUpload}
                        disabled={!isConnected || isUploading}
                        title={!isConnected ? 'Conecte ao satélite primeiro' : 'Enviar código para o satélite'}
                    >
                        {isUploading ? (
                            <>
                                <Loader size={18} className="spinner" />
                                <span>{uploadProgress.toFixed(0)}%</span>
                            </>
                        ) : (
                            <>
                                <Upload size={18} />
                                <span>Enviar</span>
                            </>
                        )}
                    </button>

                    {/* Separador */}
                    <div className="separator"></div>

                    {/* Gerenciamento de projetos */}
                    <div className="control-group">
                        <button
                            className="btn btn-secondary"
                            onClick={handleSaveXML}
                            title="Salvar projeto em XML"
                        >
                            <Save size={18} />
                            <span>Salvar</span>
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={handleLoadClick}
                            title="Carregar projeto de XML"
                        >
                            <FolderOpen size={18} />
                            <span>Carregar</span>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xml"
                            onChange={handleLoadXML}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>

            {/* Mensagens */}
            {message && (
                <div className={`message message-${message.type}`}>
                    {message.type === 'error' && <AlertCircle size={16} />}
                    {message.type === 'success' && <CheckCircle size={16} />}
                    {message.type === 'info' && <AlertCircle size={16} />}
                    {message.type === 'warning' && <AlertCircle size={16} />}
                    <span>{message.text}</span>
                </div>
            )}

            {/* Barra de progresso */}
            {isUploading && (
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
