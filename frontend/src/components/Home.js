import React, { useState } from 'react';
import CreateStackModal from './CreateStackModal';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <h1>My Stacks</h1>
            <div className="create-stack">
                <h2>Create New Stack</h2>
                <p>Start building your generative AI apps with our essential tools and frameworks</p>
                <button onClick={openModal}>+ New Stack</button>
            </div>
            <CreateStackModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Home;
