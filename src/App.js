import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/sign up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import WelcomePage from './pages/welcome/Welcome'; 
import Profile from './pages/user profile/UserProfile';

const App = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  // Función de autenticación para manejar el inicio de sesión
  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login login={handleLogin} />} /> {/* Pasar handleLogin a Login */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:userId" element={<Profile />} /> {/* Ruta del perfil */}
      </Routes>
    </Router>
  );
};

export default App;
