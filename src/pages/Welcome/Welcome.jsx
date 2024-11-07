import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Hook personalizado
import './Welcome.css';

const WelcomePage = () => {
  const { isAuthenticated } = useAuth(); // Cambiar a isAuthenticated
  const navigate = useNavigate();

  // Si no hay usuario autenticado, mostrar el formulario de registro
  if (!isAuthenticated) {
    return (
      <div className="welcome-container">
        <div className="left-section">
          <div className="image-container">
            <img src={require('../../img/WP.jpg')} alt="Welcome" />
          </div>
        </div>
        <div className="right-section">
          <h2>Bienvenido</h2>
          <p>Inicia sesión para acceder a tu dashboard</p>
          <div className="button-container">
            <button onClick={() => navigate('/login')}>Inicia sesión</button>
          </div>
          <p>¿No tienes cuenta? Regístrate ahora</p>
          <div className="button-container">
            <button onClick={() => navigate('/signup')}>Regístrate</button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar el contenido del dashboard para el usuario autenticado
  return (
    <div className="dashboard">
      <h2>Bienvenido de nuevo al Dashboard</h2>
      {/* Aquí iría el contenido del dashboard para el usuario autenticado */}
    </div>
  );
};

export default WelcomePage;
