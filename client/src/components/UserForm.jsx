import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBirthdayCake,
  faTimes,
  faSave,
  faBriefcase,
  faBuilding,
  faVenusMars
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const UserForm = ({ initialData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    jobTitle: '',
    companyName: '',
    gender: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        birthday: initialData.birthday
          ? new Date(initialData.birthday).toISOString().split('T')[0]
          : '',
        jobTitle: initialData.jobTitle || '',
        companyName: initialData.companyName || '',
        gender: initialData.gender || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success('User saved successfully!');
      console.log('User created:', res.data);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error('Failed to save user. Check console!');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      birthday: '',
      jobTitle: '',
      companyName: '',
      gender: ''
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex justify-start items-start mt-6 ml-6">
        <form
          onSubmit={handleSubmit}
          className="w-[600px] p-6 bg-white rounded-lg shadow-xl border border-gray-200 relative"
        >
          <div className='flex justify-between items-center mb-8'>

            <h2 className="text-2xl font-bold text-gray-800 text-shadow-lg/20">
              {initialData ? 'Edit User' : 'Add New User'}
            </h2>


            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-800 hover:text-gray-500"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
              />
            </div>

            <div className="flex justify-center items-start gap-4">
            {/* Phone */}
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
              />
            </div>

            {/* Address */}
            <div className="flex-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
              />
            </div>
            </div>

            <div className="flex justify-center items-start gap-4">
              {/* Job Title */}
              <div className="flex-1">
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-gray-500" />
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
                />
              </div>

              {/* Company Name */}
              <div className="flex-1">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2 text-gray-500" />
                  Company
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
                />
              </div>
            </div>

            <div className="flex justify-center items-start gap-4">
              {/* Birthday */}
              <div className="flex-1">
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon icon={faBirthdayCake} className="mr-2 text-gray-500" />
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
                />
              </div>

              {/* Gender */}
              <div className="flex-1">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon icon={faVenusMars} className="mr-2 text-gray-500" />
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#97abb9] focus:border-[#97abb9]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>


            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-2.5 rounded-lg text-gray-800 font-semibold shadow-md bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faTimes} />
                Clear
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-[#9ab1c1] to-[#828282] hover:from-[#828282] hover:to-[#9ab1c1] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faSave} />
                {initialData ? 'Update Contact' : 'Save Contact'}
              </button>
            </div>
          </div>
        </form >
      </div >
    </>
  );
};

export default UserForm;
