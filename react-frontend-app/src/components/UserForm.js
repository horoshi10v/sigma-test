import React, { useState, useEffect, useReducer } from 'react';

const userFormReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, name: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'RESET_FORM':
            return { name: '', email: '' };
        default:
            return state;
    }
};

const initialFormState = {
    name: '',
    email: '',
};

const UserForm = ({ onAddUser }) => {
    const [formState, dispatch] = useReducer(userFormReducer, initialFormState);

    useEffect(() => {
        console.log('UserForm component mounted');

        // componentWillUnmount equivalent (cleanup)
        return () => {
            console.log('UserForm component will unmount');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: formState.name,
            email: formState.email,
        };

        dispatch({ type: 'RESET_FORM' });
        onAddUser(newUser);
    };

    return (
        <div className="container mt-4">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={formState.name}
                        onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formState.email}
                        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
};

export default UserForm;