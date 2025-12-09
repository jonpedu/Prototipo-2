import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Header from './components/Header';
import BlockLibrary from './components/BlockLibrary';
import PropertiesPanel from './components/PropertiesPanel';
import CustomNode from './components/CustomNode';
import './App.css';

const nodeTypes = {
    start: CustomNode,
    read_temperature: CustomNode,
    read_humidity: CustomNode,
    read_pressure: CustomNode,
    read_accelerometer: CustomNode,
    read_battery: CustomNode,
    led_white: CustomNode,
    led_rgb: CustomNode,
    buzzer: CustomNode,
    wait: CustomNode,
    if: CustomNode,
    save_sd: CustomNode,
    send_wifi: CustomNode,
};

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

function FlowCanvas() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    // Callback quando conexão é criada
    const onConnect = useCallback(
        (params) => {
            setEdges((eds) => addEdge({ ...params, animated: true }, eds));
        },
        [setEdges]
    );

    // Callback para drag over
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Callback para drop de blocos
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const blockDefString = event.dataTransfer.getData('application/reactflow');

            if (!blockDefString) {
                return;
            }

            const blockDef = JSON.parse(blockDefString);
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode = {
                id: getNodeId(),
                type: blockDef.type,
                position,
                data: {
                    ...blockDef.defaultData,
                    type: blockDef.type,
                    label: blockDef.label,
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    // Selecionar nó
    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    // Desselecionar ao clicar no pano de fundo
    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    // Atualizar propriedades do nó
    const onUpdateNode = useCallback(
        (nodeId, newData) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                ...newData,
                            },
                        };
                    }
                    return node;
                })
            );
        },
        [setNodes]
    );

    // Fechar painel de propriedades
    const onCloseProperties = useCallback(() => {
        setSelectedNode(null);
    }, []);

    // Carregar projeto
    const onLoadProject = useCallback(
        (flowData) => {
            if (flowData.nodes) {
                setNodes(flowData.nodes);
            }
            if (flowData.edges) {
                setEdges(flowData.edges);
            }
            setSelectedNode(null);
        },
        [setNodes, setEdges]
    );

    // Deletar nó ou edge ao pressionar Delete
    const onKeyDown = useCallback(
        (event) => {
            if (event.key === 'Delete' && selectedNode) {
                setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
                setEdges((eds) =>
                    eds.filter(
                        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
                    )
                );
                setSelectedNode(null);
            }
        },
        [selectedNode, setNodes, setEdges]
    );

    return (
        <div className="app" onKeyDown={onKeyDown} tabIndex={0}>
            <Header nodes={nodes} edges={edges} onLoadProject={onLoadProject} />

            <div className="app-main">
                <BlockLibrary />

                <div className="flow-container" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes}
                        fitView
                        attributionPosition="bottom-left"
                    >
                        <Background color="#e5e7eb" gap={16} />
                        <Controls />
                        <MiniMap
                            nodeColor={(node) => {
                                const type = node.type;
                                if (type === 'start') return '#10b981';
                                if (type.startsWith('read_')) return '#3b82f6';
                                if (type.startsWith('led_') || type === 'buzzer') return '#ec4899';
                                if (type === 'wait' || type === 'if') return '#a855f7';
                                if (type === 'save_sd' || type === 'send_wifi') return '#0ea5e9';
                                return '#6b7280';
                            }}
                            maskColor="rgba(0, 0, 0, 0.1)"
                        />
                    </ReactFlow>

                    {/* Overlay de boas-vindas quando não há nós */}
                    {nodes.length === 0 && (
                        <div className="welcome-overlay">
                            <div className="welcome-content">
                                <div className="welcome-icon">🛰️</div>
                                <h2>Bem-vindo ao IVP-SAT</h2>
                                <p>Arraste blocos da biblioteca para começar a programar seu satélite</p>
                                <div className="welcome-steps">
                                    <div className="step">
                                        <span className="step-number">1</span>
                                        <span>Arraste o bloco "Iniciar Missão"</span>
                                    </div>
                                    <div className="step">
                                        <span className="step-number">2</span>
                                        <span>Adicione sensores e atuadores</span>
                                    </div>
                                    <div className="step">
                                        <span className="step-number">3</span>
                                        <span>Conecte os blocos</span>
                                    </div>
                                    <div className="step">
                                        <span className="step-number">4</span>
                                        <span>Envie para o satélite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {selectedNode && (
                    <PropertiesPanel
                        selectedNode={selectedNode}
                        onUpdateNode={onUpdateNode}
                        onClose={onCloseProperties}
                    />
                )}
            </div>
        </div>
    );
}

function App() {
    return (
        <ReactFlowProvider>
            <FlowCanvas />
        </ReactFlowProvider>
    );
}

export default App;
