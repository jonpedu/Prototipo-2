import { XMLBuilder, XMLParser } from 'fast-xml-parser';

/**
 * Utilitário para salvar e carregar projetos em XML
 */
export const xmlUtils = {
    /**
     * Converte o fluxo para XML e faz download
     * @param {Object} flowData - Dados do fluxo (nodes e edges)
     * @param {string} filename - Nome do arquivo
     */
    exportToXML(flowData, filename = 'projeto-ivpsat.xml') {
        try {
            // Estrutura XML
            const xmlData = {
                '?xml': {
                    '@_version': '1.0',
                    '@_encoding': 'UTF-8'
                },
                project: {
                    '@_version': '1.0',
                    '@_generator': 'IVP-SAT',
                    '@_date': new Date().toISOString(),
                    metadata: {
                        title: filename.replace('.xml', ''),
                        description: 'Projeto de programação visual para CanSat',
                        hardware: 'ESP32 - PION CanSat'
                    },
                    nodes: {
                        node: flowData.nodes.map(node => ({
                            '@_id': node.id,
                            '@_type': node.type,
                            position: {
                                x: node.position.x,
                                y: node.position.y
                            },
                            data: node.data ? {
                                property: Object.entries(node.data).map(([key, value]) => ({
                                    '@_name': key,
                                    '@_value': String(value)
                                }))
                            } : {}
                        }))
                    },
                    edges: {
                        edge: flowData.edges.map(edge => ({
                            '@_id': edge.id,
                            '@_source': edge.source,
                            '@_target': edge.target,
                            '@_sourceHandle': edge.sourceHandle || '',
                            '@_targetHandle': edge.targetHandle || ''
                        }))
                    }
                }
            };

            // Converter para XML
            const builder = new XMLBuilder({
                ignoreAttributes: false,
                format: true,
                indentBy: '  ',
                suppressEmptyNode: true
            });

            const xmlContent = builder.build(xmlData);

            // Criar blob e fazer download
            const blob = new Blob([xmlContent], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('Erro ao exportar XML:', error);
            throw new Error('Falha ao exportar projeto: ' + error.message);
        }
    },

    /**
     * Carrega projeto de arquivo XML
     * @param {File} file - Arquivo XML
     * @returns {Promise<Object>} Dados do fluxo
     */
    async importFromXML(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const xmlContent = e.target.result;

                    // Parser XML
                    const parser = new XMLParser({
                        ignoreAttributes: false,
                        attributeNamePrefix: '@_',
                        parseAttributeValue: true
                    });

                    const result = parser.parse(xmlContent);

                    if (!result.project) {
                        throw new Error('Formato de arquivo inválido');
                    }

                    const project = result.project;

                    // Reconstruir nodes
                    let nodes = [];
                    if (project.nodes && project.nodes.node) {
                        const nodeArray = Array.isArray(project.nodes.node)
                            ? project.nodes.node
                            : [project.nodes.node];

                        nodes = nodeArray.map(node => {
                            const nodeData = {};

                            // Reconstruir data
                            if (node.data && node.data.property) {
                                const properties = Array.isArray(node.data.property)
                                    ? node.data.property
                                    : [node.data.property];

                                properties.forEach(prop => {
                                    nodeData[prop['@_name']] = prop['@_value'];
                                });
                            }

                            return {
                                id: node['@_id'],
                                type: node['@_type'],
                                position: {
                                    x: parseFloat(node.position.x),
                                    y: parseFloat(node.position.y)
                                },
                                data: nodeData
                            };
                        });
                    }

                    // Reconstruir edges
                    let edges = [];
                    if (project.edges && project.edges.edge) {
                        const edgeArray = Array.isArray(project.edges.edge)
                            ? project.edges.edge
                            : [project.edges.edge];

                        edges = edgeArray.map(edge => ({
                            id: edge['@_id'],
                            source: edge['@_source'],
                            target: edge['@_target'],
                            sourceHandle: edge['@_sourceHandle'] || null,
                            targetHandle: edge['@_targetHandle'] || null
                        }));
                    }

                    resolve({ nodes, edges });
                } catch (error) {
                    console.error('Erro ao processar XML:', error);
                    reject(new Error('Falha ao importar projeto: ' + error.message));
                }
            };

            reader.onerror = () => {
                reject(new Error('Erro ao ler arquivo'));
            };

            reader.readAsText(file);
        });
    },

    /**
     * Valida se o arquivo é um XML válido do IVP-SAT
     * @param {File} file - Arquivo a ser validado
     * @returns {Promise<boolean>}
     */
    async validateXML(file) {
        try {
            const data = await this.importFromXML(file);
            return data.nodes && Array.isArray(data.nodes);
        } catch (error) {
            return false;
        }
    }
};
