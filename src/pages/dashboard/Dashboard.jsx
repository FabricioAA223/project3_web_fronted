import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from '../login/Login';
import SignUp from '../sign up/SignUp'; 
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('Inicio');

  // Si no hay usuario autenticado, mostrar opciones de login o registro
  if (!user) {
    return (
      <div className="welcome-container">
        <h1>¡Bienvenido a la Aplicación!</h1>
        <p>Por favor, inicia sesión o regístrate para continuar.</p>
        <div className="button-container">
          <button className="btn" onClick={() => setCurrentPage('Login')}>Iniciar Sesión</button>
          <button className="btn btn-signup" onClick={() => setCurrentPage('SignUp')}>Registrarse</button>
        </div>
      </div>
    );
  }

  // Renderizar el contenido del dashboard para el usuario autenticado
  const renderContent = () => {
    switch (currentPage) {
      case 'Inicio':
        return <HomePage userData={user} />;
      case 'Perfil':
        return <UserProfile userData={user} onLogout={logout} />;
      case 'Login':
        return <LoginPage />;
      case 'SignUp':
        return <SignUp />;
      default:
        return <HomePage userData={user} />;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <button onClick={() => setCurrentPage('Inicio')}>Inicio</button>
        <button onClick={() => setCurrentPage('Perfil')}>Perfil</button>
        <button onClick={logout}>Cerrar Sesión</button>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

// Componente HomePage
const HomePage = ({ userData }) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="home">
      <div className="welcome-section">
        <h1>Hola, {userData.username} 👋</h1>
        <p>{currentDate}</p>
      </div>
      <div className="user-info">
        <img src={userData.profileImage} alt="User profile" className="profile-image" />
        <div>
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
        </div>
      </div>
    </div>
  );
};

// Componente UserProfile
const UserProfile = ({ userData, onLogout }) => {
  return (
    <div className="profile">
      <h2>Perfil de Usuario</h2>
      {/* Aquí puedes reutilizar el formulario editable de perfil */}
      <button onClick={onLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
