import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Welcome.css';

const WelcomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si no hay usuario autenticado, mostrar el formulario de registro
  if (!user) {
    return (
      <div className="welcome-container">
        <div className="left-section">
          <div className="image-container">
          <img src={require('../../img/WP.jpg')} alt="Welcome" />
          </div>
        </div>
        <div className="right-section">
          <h2>Bienvenido</h2>
          <p>Inicia sesion para acceder a tu dashboard</p>
          <div className="button-container">
            <button onClick={() => navigate('/login')}>Inicia sesión</button>
          </div>
          <p>¿No tienes cuenta? Registrate ahora</p>
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
      {/* Tu sidebar y contenido principal aquí */}
    </div>
  );
};

export default WelcomePage;
