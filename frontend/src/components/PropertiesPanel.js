import React from 'react';
import { X } from 'lucide-react';
import { getBlockDefinition } from '../utils/blockDefinitions';
import './PropertiesPanel.css';

const PropertiesPanel = ({ selectedNode, onUpdateNode, onClose }) => {
    if (!selectedNode) {
        return null;
    }

    const blockDef = getBlockDefinition(selectedNode.type);

    if (!blockDef) {
        return (
            <aside className="properties-panel">
                <div className="panel-header">
                    <h3>Propriedades</h3>
                    <button className="btn-close" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>
                <div className="panel-content">
                    <p className="no-properties">Bloco desconhecido</p>
                </div>
            </aside>
        );
    }

    const handlePropertyChange = (propertyName, value) => {
        const updatedData = {
            ...selectedNode.data,
            [propertyName]: value
        };

        onUpdateNode(selectedNode.id, updatedData);
    };

    return (
        <aside className="properties-panel">
            <div className="panel-header">
                <div className="panel-header-content">
                    <span className="panel-icon">{blockDef.icon}</span>
                    <div>
                        <h3 className="panel-title">{blockDef.label}</h3>
                        <p className="panel-subtitle">{blockDef.description}</p>
                    </div>
                </div>
                <button className="btn-close" onClick={onClose}>
                    <X size={18} />
                </button>
            </div>

            <div className="panel-content">
                {blockDef.properties && blockDef.properties.length > 0 ? (
                    <div className="properties-list">
                        {blockDef.properties.map((property) => (
                            <div key={property.name} className="property-item">
                                <label className="property-label" htmlFor={`prop-${property.name}`}>
                                    {property.label}
                                </label>

                                {property.type === 'text' && (
                                    <input
                                        id={`prop-${property.name}`}
                                        type="text"
                                        className="property-input"
                                        value={selectedNode.data[property.name] || property.default || ''}
                                        onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                                        placeholder={property.placeholder || ''}
                                    />
                                )}

                                {property.type === 'number' && (
                                    <input
                                        id={`prop-${property.name}`}
                                        type="number"
                                        className="property-input"
                                        value={selectedNode.data[property.name] || property.default || 0}
                                        onChange={(e) => handlePropertyChange(property.name, parseFloat(e.target.value))}
                                        min={property.min}
                                        max={property.max}
                                        step={property.step || 1}
                                    />
                                )}

                                {property.type === 'select' && (
                                    <select
                                        id={`prop-${property.name}`}
                                        className="property-select"
                                        value={selectedNode.data[property.name] || property.default || ''}
                                        onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                                    >
                                        {Array.isArray(property.options) && property.options.map((option) => {
                                            // Suporta tanto strings quanto objetos {value, label}
                                            const optionValue = typeof option === 'string' ? option : option.value;
                                            const optionLabel = typeof option === 'string' ? option : option.label;

                                            return (
                                                <option key={optionValue} value={optionValue}>
                                                    {optionLabel}
                                                </option>
                                            );
                                        })}
                                    </select>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-properties">Este bloco não possui propriedades configuráveis.</p>
                )}

                <div className="block-info-section">
                    <h4 className="info-section-title">Informações do Bloco</h4>
                    <div className="info-item">
                        <span className="info-label">Tipo:</span>
                        <span className="info-value">{blockDef.type}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Categoria:</span>
                        <span className="info-value">{blockDef.category}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Entradas:</span>
                        <span className="info-value">{blockDef.inputs}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Saídas:</span>
                        <span className="info-value">{blockDef.outputs}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default PropertiesPanel;
