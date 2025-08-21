import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, updateUser } from '../api/Users';

const UserList = ({ users, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await updateUser(id, updatedData);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user._id} className="p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-gray-600">{user.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${user._id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;