import React, { useState } from 'react';

const EditUserModal = ({ isOpen, onClose, onUpdateUser, user }) => {
    const initialUserState = user ? { name: user.name, email: user.email } : { name: '', email: '' };
    const [editedUser, setEditedUser] = useState(initialUserState);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleUpdate = () => {
        onUpdateUser({ ...user, ...editedUser });
        onClose();
    };

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            {user && (
                <>
                    <br />
                    <h3 className="mb-4">Edit {user.name} info</h3>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" name="name" value={editedUser.name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-control" name="email" value={editedUser.email} onChange={handleInputChange} />
                    </div>
                    <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default EditUserModal;
