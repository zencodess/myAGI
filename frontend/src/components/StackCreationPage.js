import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const StackCreationPage = () => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showAgents, setShowAgents] = useState(true);
    const [showTools, setShowTools] = useState(true);
    const [showLLMS, setShowLLMS] = useState(true);
    const [selectedLLM, setSelectedLLM] = useState(null);

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 10, 50));
    };

    const handleLLMClick = (llm) => {
        setSelectedLLM(llm);
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
                                    <li>Agent 1</li>
                                    <li>Agent 2</li>
                                </ul>
                            )}
                            <li onClick={() => setShowTools(!showTools)}>
                                Tools <FontAwesomeIcon icon={showTools ? faCaretUp : faCaretDown} />
                            </li>
                            {showTools && (
                                <ul>
                                    <li>Tool 1</li>
                                    <li>Tool 2</li>
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
                    {selectedLLM ? (
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
                    ) : (
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
