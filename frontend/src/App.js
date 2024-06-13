import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import StackCreationPage from './components/StackCreationPage';

const App = () => {
    const [stacks, setStacks] = useState([]);

    const addStack = (newStack) => {
        setStacks((prev) => [...prev, newStack]);
    };

    const deleteStack = (stackName) => {
        setStacks((prev) => prev.filter((stack) => stack.name !== stackName));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home stacks={stacks} addStack={addStack} deleteStack={deleteStack} />} />
                <Route path="/create-stack/:stackName" element={<StackCreationPage addStack={addStack} />} />
            </Routes>
        </Router>
    );
};

export default App;
