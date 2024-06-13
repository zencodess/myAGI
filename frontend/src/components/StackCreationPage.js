import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCaretDown, faCaretUp, faHammer } from '@fortawesome/free-solid-svg-icons';

const ItemTypes = {
    CONFIG: 'config',
};

const DraggableConfig = ({ id, index, moveConfig, children }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CONFIG,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.CONFIG,
        hover(item) {
            if (item.index !== index) {
                moveConfig(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </div>
    );
};

const StackCreationPage = ({ addStack }) => {
    const { stackName } = useParams();
    const navigate = useNavigate();
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showAgents, setShowAgents] = useState(true);
    const [showTools, setShowTools] = useState(true);
    const [showLLMS, setShowLLMS] = useState(true);
    const [selectedLLMs, setSelectedLLMs] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [connections, setConnections] = useState({});

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50));
    };

    const handleLLMClick = (llm) => {
        setSelectedLLMs((prev) => [...prev, { id: llm, type: 'llm' }]);
    };

    const handleToolClick = (tool) => {
        setSelectedTools((prev) => [...prev, { id: tool, type: 'tool' }]);
    };

    const handleAgentClick = (agent) => {
        setSelectedAgents((prev) => [...prev, { id: agent, type: 'agent' }]);
    };

    const moveConfig = (fromIndex, toIndex) => {
        const allConfigs = [...selectedLLMs, ...selectedTools, ...selectedAgents];
        const item = allConfigs.splice(fromIndex, 1)[0];
        allConfigs.splice(toIndex, 0, item);

        const llms = allConfigs.filter((config) => config.type === 'llm');
        const tools = allConfigs.filter((config) => config.type === 'tool');
        const agents = allConfigs.filter((config) => config.type === 'agent');

        setSelectedLLMs(llms);
        setSelectedTools(tools);
        setSelectedAgents(agents);
    };

    const handleConnection = (agentId, targetId) => {
        setConnections((prev) => ({ ...prev, [agentId]: targetId }));
    };

    const handleSaveStack = () => {
        const newStack = {
            name: stackName,
            llms: selectedLLMs,
            tools: selectedTools,
            agents: selectedAgents,
            connections,
        };
        addStack(newStack);
        navigate('/');
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="stack-creation-container">
                <header className="stack-creation-header">
                    <h1>Create Stack: {stackName}</h1>
                    <button className="save-button" onClick={handleSaveStack}>Save</button>
                </header>
                <main className="stack-creation-main">
                    <aside className="stack-sidebar">
                        <div className="sidebar-section">
                            <h3>Chat With PDF</h3>
                            <ul>
                                <li onClick={() => setShowAgents(!showAgents)}>
                                    Agents <FontAwesomeIcon icon={showAgents ? faCaretUp : faCaretDown} />
                                </li>
                                {showAgents && (
                                    <ul>
                                        <li onClick={() => handleAgentClick('Agent 1')}>Agent 1</li>
                                        <li onClick={() => handleAgentClick('Agent 2')}>Agent 2</li>
                                    </ul>
                                )}
                                <li onClick={() => setShowTools(!showTools)}>
                                    Tools <FontAwesomeIcon icon={showTools ? faCaretUp : faCaretDown} />
                                </li>
                                {showTools && (
                                    <ul>
                                        <li onClick={() => handleToolClick('Google Search')}>Google Search</li>
                                        <li onClick={() => handleToolClick('DuckDuckGo')}>DuckDuckGo</li>
                                        <li onClick={() => handleToolClick('WikiSearch')}>WikiSearch</li>
                                    </ul>
                                )}
                                <li onClick={() => setShowLLMS(!showLLMS)}>
                                    LLMS <FontAwesomeIcon icon={showLLMS ? faCaretUp : faCaretDown} />
                                </li>
                                {showLLMS && (
                                    <ul>
                                        <li onClick={() => handleLLMClick('GPT-4')}>GPT-4</li>
                                        <li onClick={() => handleLLMClick('GPT-3.5')}>GPT-3.5</li>
                                        <li onClick={() => handleLLMClick('Azure OpenAI')}>Azure OpenAI</li>
                                    </ul>
                                )}
                            </ul>
                        </div>
                    </aside>
                    <section className="stack-workspace" style={{ transform: `scale(${zoomLevel / 100})` }}>
                        {[...selectedLLMs, ...selectedTools, ...selectedAgents].map((config, index) => (
                            <DraggableConfig
                                key={config.id}
                                id={config.id}
                                index={index}
                                moveConfig={moveConfig}
                            >
                                {config.type === 'llm' && (
                                    <div className="llm-configuration">
                                        <h2>{config.id}</h2>
                                        <div className="llm-configuration-grid">
                                            <label>
                                                Max Tokens
                                                <input type="number" placeholder="256" />
                                            </label>
                                            <label>
                                                OpenAI API Base
                                                <input type="text" placeholder="Type something" />
                                            </label>
                                            <label>
                                                OpenAI API Key
                                                <input type="password" placeholder="Type something" />
                                            </label>
                                            <label>
                                                Temperature
                                                <input type="text" placeholder="Type something" />
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {config.type === 'tool' && (
                                    <div className="tool-configuration">
                                        <h2>{config.id}</h2>
                                        <div className="tool-configuration-grid">
                                            <label>
                                                API Key
                                                <input type="password" placeholder="Type something" />
                                            </label>
                                            <label>
                                                Search Base URL
                                                <input type="text" placeholder="Type something" />
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {config.type === 'agent' && (
                                    <div className="agent-configuration">
                                        <h2>{config.id}</h2>
                                        <div className="agent-configuration-grid">
                                            <label>
                                                Agent Name
                                                <input type="text" placeholder="Agent name" />
                                            </label>
                                            <label>
                                                Role
                                                <input type="text" placeholder="Role" />
                                            </label>
                                            <label>
                                                Goal
                                                <input type="text" placeholder="Goal" />
                                            </label>
                                            <label>
                                                Backstory
                                                <input type="text" placeholder="Backstory" />
                                            </label>
                                            <label>
                                                Capability
                                                <select onChange={(e) => handleConnection(config.id, e.target.value)}>
                                                    <option value="">Select Capability</option>
                                                    <option value="llm">LLM Task Executor</option>
                                                    <option value="search">Search Executor</option>
                                                </select>
                                            </label>
                                            {connections[config.id] && (
                                                <select>
                                                    <option value="">Connect to...</option>
                                                    {connections[config.id] === 'llm' &&
                                                        selectedLLMs.map((llm) => (
                                                            <option key={llm.id} value={llm.id}>
                                                                {llm.id}
                                                            </option>
                                                        ))}
                                                    {connections[config.id] === 'search' &&
                                                        selectedTools.map((tool) => (
                                                            <option key={tool.id} value={tool.id}>
                                                                {tool.id}
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </DraggableConfig>
                        ))}
                        {!selectedLLMs.length && !selectedTools.length && !selectedAgents.length && (
                            <div className="workspace-placeholder">
                                <div className="placeholder-icon"></div>
                                <p>Drag & drop to get started</p>
                            </div>
                        )}
                    </section>
                    <div className="zoom-controls">
                        <button onClick={handleZoomOut}>-</button>
                        <span>{zoomLevel}%</span>
                        <button onClick={handleZoomIn}>+</button>
                    </div>
                    <div className="build-button">
                        <button>
                            <FontAwesomeIcon icon={faHammer} /> Build
                        </button>
                    </div>
                    <div className="run-button">
                        <button>
                            <FontAwesomeIcon icon={faPlay} /> Run
                        </button>
                    </div>
                </main>
            </div>
        </DndProvider>
    );
};

export default StackCreationPage;
