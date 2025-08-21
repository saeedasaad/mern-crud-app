import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const UserTable = ({ users, onEdit, onDelete, deletingId, currentPage, usersPerPage }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">S/No</th>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Phone</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">Birthday</th>
            <th className="px-3 py-2 text-left">Address</th>
            <th className="px-3 py-2 text-left">Job Title</th>
            <th className="px-3 py-2 text-left">Company</th>
            <th className="px-3 py-2 text-left">Gender</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="border-t border-gray-200 hover:bg-gradient-to-r hover:from-[#f3f3f3] hover:to-[#e6e6e6] transition-colors duration-300"
            >
              <td className="px-4 py-2">
                {index + 1 + (currentPage - 1) * usersPerPage}
              </td>
              <td className="px-3 py-2 text-sm">{user.name}</td>
              <td className="px-3 py-2 text-xs">{user.phone}</td>
              <td className="px-2 py-2 text-sm">{user.email}</td>
              <td className="px-3 py-2 text-xs">{formatDate(user.birthday)}</td>
              <td className="px-3 py-2 text-xs">{user.address}</td>
              <td className="px-3 py-2 text-sm">{user.jobTitle || '-'}</td>
              <td className="px-3 py-2 text-sm">{user.companyName || '-'}</td>
              <td className="px-3 py-2 text-sm">{user.gender || '-'}</td>
              <td className="px-3 py-2 text-sm text-center">
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => onEdit(user._id)}
                    className="px-3 py-1 rounded-lg text-black font-semibold cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                    />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    disabled={deletingId === user._id}
                    className={`px-3 py-1 rounded-lg text-black font-semibold cursor-pointer ${
                      deletingId === user._id ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

