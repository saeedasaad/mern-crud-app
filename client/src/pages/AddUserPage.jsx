import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/Users';
import UserForm from '../components/UserForm';
import toast from 'react-hot-toast';

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      const response = await createUser(formData);
      if (response.data) {
        toast.success('User created successfully!');
        navigate('/');
      } else {
        toast.error('No data returned from server');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.response?.data?.message || 'Failed to create user');
    }
  };

  return <UserForm onSubmit={handleFormSubmit} />;
};

export default AddUserPage;
