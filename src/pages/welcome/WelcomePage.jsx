import React from 'react';
import './WelcomePage.css'; // Asegúrate de crear este archivo CSS

const WelcomePage = ({ onLogin, onSignUp }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>¡Bienvenido a la Aplicación!</h1>
        <p>Una experiencia de seguimiento de salud personalizada.</p>
        <div className="button-container">
          <button className="btn" onClick={onLogin}>Iniciar Sesión</button>
          <button className="btn btn-signup" onClick={onSignUp}>Registrarse</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
