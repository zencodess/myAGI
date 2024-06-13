import React from 'react';

const CreateStackModal = ({ isOpen, onClose, onCreate, setStackName, setStackDescription }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Stack</h2>
                <input
                    type="text"
                    placeholder="Stack Name"
                    onChange={(e) => setStackName(e.target.value)}
                />
                <textarea
                    placeholder="Stack Description"
                    onChange={(e) => setStackDescription(e.target.value)}
                ></textarea>
                <button onClick={onCreate}>Create</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CreateStackModal;
