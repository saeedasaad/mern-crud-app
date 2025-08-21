import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import bgImg from './assets/background-img.jpg'; 

function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddUserPage />} />
          <Route path="/edit/:id" element={<EditUserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
