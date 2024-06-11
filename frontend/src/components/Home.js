import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateStackModal from './CreateStackModal';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stacks, setStacks] = useState([]);
    const navigate = useNavigate();

    const fetchStacks = async () => {
        try {
            const response = await axios.get('/api/stacks');
            setStacks(response.data);
        } catch (error) {
            console.error('Error fetching stacks:', error);
        }
    };

    useEffect(() => {
        fetchStacks();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        fetchStacks();  // Refresh stacks after closing the modal
    };

    const handleCreateStack = () => {
        setIsModalOpen(false);
        navigate('/create-stack');  // Navigate to the stack creation page
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
                        <div key={stack.id} className="stack-card">
                            <h3>{stack.name}</h3>
                            <p>{stack.description}</p>
                            <button>Edit Stack</button>
                        </div>
                    ))}
                </div>
            </main>
            <CreateStackModal isOpen={isModalOpen} onClose={closeModal} onCreate={handleCreateStack} />
        </div>
    );
};

export default Home;
