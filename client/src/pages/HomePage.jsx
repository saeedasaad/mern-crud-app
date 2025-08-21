import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../api/Users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import UserTable from '../components/UserTable';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load contacts. Please try again.');
        toast.error('Failed to load contacts.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    setDeletingId(id);

    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user._id !== id));
      toast.success('Contact deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error(err.response?.data?.message || 'Failed to delete contact');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-[#95a6b3]" />
        <span className="ml-3 text-gray-600">Loading contacts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-4xl text-[#878b8e] mb-4" />
        <p className="text-xl text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-lg text-white font-semibold shadow-xl bg-gradient-to-r from-[#9ab1c1] to-[#828282] hover:from-[#828282] hover:to-[#9ab1c1] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-[85%] rounded-lg shadow-xl bg-white border border-gray-200 p-6 mx-auto my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-shadow-lg/20">
          User Information Table
        </h1>
        <Link
          to="/add"
          className="px-5 py-2.5 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-[#9ab1c1] to-[#828282] hover:from-[#828282] hover:to-[#9ab1c1] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Contact
        </Link>
      </div>

      {/* Table */}
      <UserTable
        users={currentUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingId={deletingId}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-1 rounded-md ${
              currentPage === i + 1 ? 'bg-[#838484] text-white' : 'bg-[#e4e4e4] text-gray-700'
            } hover:bg-[#e4e4e4] hover:text-black transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

