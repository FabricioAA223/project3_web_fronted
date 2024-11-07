import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Asegúrate de enviar los datos en formato JSON
      const response = await axios.post(
        'http://localhost:8000/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Si el login es exitoso, redirigir al perfil del usuario
      const userId = response.data.id;
      navigate(`/profile/${userId}`);
    } catch (error) {
      setLoading(false);
      // Si hay un error, mostrar un mensaje de error
      if (error.response && error.response.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Error desconocido');
      }
    }
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
        <button type="submit" disabled={loading}>
          Iniciar Sesión
        </button>
      </form>
      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;
