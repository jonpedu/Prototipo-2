import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { blockDefinitions, blockCategories } from '../utils/blockDefinitions';
import './BlockLibrary.css';

const BlockLibrary = ({ onAddBlock }) => {
    const [expandedCategories, setExpandedCategories] = useState(
        Object.values(blockCategories)
    );

    const toggleCategory = (category) => {
        if (expandedCategories.includes(category)) {
            setExpandedCategories(expandedCategories.filter(c => c !== category));
        } else {
            setExpandedCategories([...expandedCategories, category]);
        }
    };

    const handleDragStart = (event, blockDef) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(blockDef));
        event.dataTransfer.effectAllowed = 'move';
    };

    // Agrupar blocos por categoria
    const blocksByCategory = blockDefinitions.reduce((acc, block) => {
        if (!acc[block.category]) {
            acc[block.category] = [];
        }
        acc[block.category].push(block);
        return acc;
    }, {});

    return (
        <aside className="block-library">
            <div className="library-header">
                <h2 className="library-title">📦 Biblioteca de Blocos</h2>
                <p className="library-subtitle">Arraste os blocos para o canvas</p>
            </div>

            <div className="library-content">
                {Object.entries(blocksByCategory).map(([category, blocks]) => {
                    const isExpanded = expandedCategories.includes(category);

                    return (
                        <div key={category} className="category-section">
                            <button
                                className="category-header"
                                onClick={() => toggleCategory(category)}
                            >
                                <span className="category-icon">
                                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </span>
                                <span className="category-name">{category}</span>
                                <span className="category-count">{blocks.length}</span>
                            </button>

                            {isExpanded && (
                                <div className="category-blocks">
                                    {blocks.map((block) => (
                                        <div
                                            key={block.id}
                                            className="block-item"
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, block)}
                                            style={{ borderLeftColor: block.color }}
                                        >
                                            <div className="block-icon">{block.icon}</div>
                                            <div className="block-info">
                                                <div className="block-label">{block.label}</div>
                                                <div className="block-description">{block.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="library-footer">
                <div className="footer-info">
                    <strong>Hardware:</strong> PION CanSat / ESP32
                </div>
                <div className="footer-info">
                    <strong>Total:</strong> {blockDefinitions.length} blocos
                </div>
            </div>
        </aside>
    );
};

export default BlockLibrary;
