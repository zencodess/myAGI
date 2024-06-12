import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const StackCreationPage = () => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showAgents, setShowAgents] = useState(true);
    const [showTools, setShowTools] = useState(true);
    const [showLLMS, setShowLLMS] = useState(true);
    const [selectedLLM, setSelectedLLM] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 10, 50));
    };

    const handleLLMClick = (llm) => {
        setSelectedLLM(llm);
        setSelectedTool(null);
        setSelectedAgent(null);
    };

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
        setSelectedLLM(null);
        setSelectedAgent(null);
    };

    const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
        setSelectedLLM(null);
        setSelectedTool(null);
    };

    return (
        <div className="stack-creation-container">
            <header className="stack-creation-header">
                <h1>GenAI Stack</h1>
                <button className="save-button">Save</button>
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
                    {selectedLLM && (
                        <div className="llm-configuration">
                            <h2>{selectedLLM}</h2>
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
                    {selectedTool && (
                        <div className="tool-configuration">
                            <h2>{selectedTool}</h2>
                            <div className="tool-configuration-grid">
                                <label>
                                    API Key
                                    <input type="password" placeholder="Type something" />
                                </label>
                                <label>
                                    Search Base URL
                                    <input type="text" placeholder="Type something" />
                                </label>
                                {/* Add more configuration fields as needed */}
                            </div>
                        </div>
                    )}
                    {selectedAgent && (
                        <div className="agent-configuration">
                            <h2>{selectedAgent}</h2>
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
                                    <select>
                                        <option value="llm_task_executor">llm_task_executor</option>
                                        <option value="search_executor">search_executor</option>
                                    </select>
                                </label>
                                {/* Add more configuration fields as needed */}
                            </div>
                        </div>
                    )}
                    {!selectedLLM && !selectedTool && !selectedAgent && (
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
                        <FontAwesomeIcon icon={faPlay} /> Build Stack
                    </button>
                </div>
            </main>
        </div>
    );
};

export default StackCreationPage;
