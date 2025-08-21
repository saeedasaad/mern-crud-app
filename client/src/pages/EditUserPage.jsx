import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../api/Users';
import UserForm from '../components/UserForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        if (response?.data && response.data._id) {
          setUser(response.data);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);


  const handleSubmit = async (formData) => {
    try {
      const dataToUpdate = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        birthday: formData.birthday,
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        gender: formData.gender,
      };

      const data = new FormData();
      Object.entries(dataToUpdate).forEach(([key, value]) => data.append(key, value));
      if (formData.profilePicture instanceof File) data.append('profilePicture', formData.profilePicture);
      if (formData.resumePdf instanceof File) data.append('resumePdf', formData.resumePdf);

      await updateUser(id, data); 
      toast.success('User updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Failed to update user.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-[#95a6b3]" />
        <div className="ml-3 text-gray-600">Loading user...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-black-600">{error}</div>;
  }

  return (
    <div className="container p-4 mx-auto flex items-center justify-center">
      {user && <UserForm onSubmit={handleSubmit} initialData={user} />}
    </div>
  );
};

export default EditUserPage;
