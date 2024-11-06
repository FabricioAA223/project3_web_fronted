import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });

      if (response.data && response.data.access_token) {
        // Almacena el token y user_id en el almacenamiento local
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_id", response.data.user_id); // Asumimos que el user_id viene con la respuesta

        // Simula el inicio de sesión del usuario
        login({ username, email: 'example2@mail.com', profileImage: '/path/to/profile-image.jpg' });

        // Muestra el mensaje de éxito
        setSuccessMessage("Login exitoso, redirigiendo...");

        // Redirige al dashboard con el user_id
        setTimeout(() => {
          navigate(`/dashboard/view?user_id=${response.data.user_id}`);
        }, 2000);
      }
    } catch (error) {
      setError("No se logró iniciar sesión. Por favor verifica tu nombre de usuario y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToIndex = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Iniciar Sesión</button>
      </form>
      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="links">
        <p>¿Necesitas Registrarte? <button onClick={() => navigate('/signup')}>Registrate</button></p>
        <button onClick={handleBackToIndex} className="back-button">Regresar al Inicio</button>
      </div>
    </div>
  );
};

export default Login;
