import React from 'react';
import { Handle, Position } from 'reactflow';
import { getBlockDefinition } from '../utils/blockDefinitions';
import './CustomNode.css';

const CustomNode = ({ data, selected }) => {
    const blockDef = getBlockDefinition(data.type);

    if (!blockDef) {
        return (
            <div className="custom-node custom-node-error">
                <div className="node-content">
                    <span>❌</span>
                    <span>Bloco desconhecido</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`custom-node ${selected ? 'selected' : ''}`}
            style={{ borderLeftColor: blockDef.color }}
        >
            {/* Handle de entrada */}
            {blockDef.inputs > 0 && (
                <Handle
                    type="target"
                    position={Position.Top}
                    className="custom-handle handle-input"
                />
            )}

            {/* Conteúdo do nó */}
            <div className="node-header" style={{ background: blockDef.color }}>
                <span className="node-icon">{blockDef.icon}</span>
                <span className="node-title">{blockDef.label}</span>
            </div>

            <div className="node-body">
                {/* Exibir propriedades se existirem */}
                {blockDef.properties && blockDef.properties.length > 0 && (
                    <div className="node-properties">
                        {blockDef.properties.slice(0, 2).map((prop) => {
                            const value = data[prop.name] !== undefined ? data[prop.name] : prop.default;
                            let displayValue = value;

                            // Formatar valor para exibição
                            if (prop.type === 'select' && Array.isArray(prop.options)) {
                                const option = prop.options.find(o =>
                                    (typeof o === 'string' ? o : o.value) === value
                                );
                                displayValue = typeof option === 'string' ? option : (option?.label || value);
                            }

                            return (
                                <div key={prop.name} className="node-property">
                                    <span className="prop-label">{prop.label}:</span>
                                    <span className="prop-value">{displayValue}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Handle de saída */}
            {blockDef.outputs > 0 && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="custom-handle handle-output"
                    id="output"
                />
            )}

            {/* Handle adicional para blocos com múltiplas saídas (como If) */}
            {blockDef.outputs > 1 && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="custom-handle handle-output-alt"
                    id="output-alt"
                />
            )}
        </div>
    );
};

export default CustomNode;
