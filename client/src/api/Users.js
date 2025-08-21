import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all users
export const getUsers = () => api.get("/users");

// Get single user by ID
export const getUser = (id) => api.get(`/users/${id}`);

// Create new user
export const createUser = (data) => api.post("/users", data);

// Update user
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

// Delete user
export const deleteUser = (id) => api.delete(`/users/${id}`);
