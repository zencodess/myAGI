import React from 'react';

const StackCreationPage = () => {
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
                            <li>Agents</li>
                            <li>Tools</li>
                            <li>LLMS</li>
                        </ul>
                    </div>
                </aside>
                <section className="stack-workspace">
                    <div className="workspace-placeholder">
                        <div className="placeholder-icon"></div>
                        <p>Drag & drop to get started</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StackCreationPage;
