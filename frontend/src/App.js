import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StackCreationPage from './components/StackCreationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-stack" element={<StackCreationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
