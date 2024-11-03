import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useAuth } from '../../context/AuthContext'; 
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Usar useNavigate para redirigir

  // Si no hay usuario autenticado, mostrar opciones de login o registro
  if (!user) {
    return (
      <div className="welcome-container">
        <h1>¡Bienvenido a la Aplicación!</h1>
        <p>Por favor, inicia sesión o regístrate para continuar.</p>
        <div className="button-container">
          <button className="btn" onClick={() => navigate('/login')}>Iniciar Sesión</button>
          <button className="btn btn-signup" onClick={() => navigate('/signup')}>Registrarse</button>
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

export default Dashboard;
