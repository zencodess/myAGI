import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStackModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        if (name && description) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [name, description]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/stacks', { name, description });
            console.log('Stack created:', response.data);
            onCreate();
        } catch (error) {
            console.error('Error creating stack:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create New Stack</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </label>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={!isButtonEnabled} style={{ backgroundColor: isButtonEnabled ? '#4CAF50' : '#ccc', color: 'white' }}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStackModal;
