import React, { useEffect, useReducer, useState } from 'react';
import UserForm from '../components/UserForm';
import EditUserModal from '../components/EditUserModal';

const userListReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return { ...state, users: action.payload, loading: false };
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => (user.id === action.payload.id ? action.payload : user)),
            };
        case 'DELETE_USER':
            return { ...state, users: state.users.filter(user => user.id !== action.payload) };
        default:
            return state;
    }
};

const initialState = {
    users: [],
    loading: true,
};

const UserList = () => {
    const [state, dispatch] = useReducer(userListReducer, initialState);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'FETCH_USERS', payload: data });
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleAddUser = newUser => {
        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'ADD_USER', payload: data });
            })
            .catch(error => console.error('Error adding user:', error));
    };

    const handleUpdateUser = updatedUser => {
        fetch(`http://localhost:8080/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'UPDATE_USER', payload: data });
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const handleDeleteUser = id => {
        fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                dispatch({ type: 'DELETE_USER', payload: id });
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const openModal = user => {
        setModalOpen(true);
        setSelectedUser(user);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <h2>User List</h2>
            {state.loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-bordered table-striped" style={{ margin: '10px' }}>
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => openModal(user)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <UserForm onAddUser={handleAddUser} />
            <EditUserModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onUpdateUser={handleUpdateUser}
                user={selectedUser}
            />
        </div>
    );
};

export default UserList;
