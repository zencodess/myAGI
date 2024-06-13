import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateStackModal from './CreateStackModal';

const Home = ({ stacks, addStack, deleteStack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stackName, setStackName] = useState('');
    const [stackDescription, setStackDescription] = useState('');
    const navigate = useNavigate();

    const fetchStacks = async () => {
        try {
            const response = await axios.get('/api/stacks');
            response.data.forEach(stack => addStack(stack));
        } catch (error) {
            console.error('Error fetching stacks:', error);
        }
    };

    useEffect(() => {
        fetchStacks();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCreateStack = () => {
        if (stackName.trim()) {
            const newStack = { name: stackName, description: stackDescription };
            addStack(newStack);
            setIsModalOpen(false);
            navigate(`/create-stack/${stackName}`);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>GenAI Stack</h1>
            </header>
            <main>
                <div className="stacks-header">
                    <h2>My Stacks</h2>
                </div>
                <div className="create-stack-card">
                    <h3>Create New Stack</h3>
                    <p>Start building your generative AI apps with our essential tools and frameworks</p>
                    <button className="new-stack-button" onClick={openModal}>+ New Stack</button>
                </div>
                <div className="stacks-list">
                    {stacks.map(stack => (
                        <div key={stack.name} className="stack-card">
                            <h3>{stack.name}</h3>
                            <p>{stack.description}</p>
                            <button onClick={() => deleteStack(stack.name)}>Delete Stack</button>
                        </div>
                    ))}
                </div>
            </main>
            <CreateStackModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCreate={handleCreateStack}
                setStackName={setStackName}
                setStackDescription={setStackDescription}
            />
        </div>
    );
};

export default Home;
