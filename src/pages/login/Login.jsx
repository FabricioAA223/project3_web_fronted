import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilizar el componente
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = ({ login, onChangePage }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Para mostrar un indicador de carga

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Comienza el indicador de carga
    setError(null); // Reinicia el error antes de intentar iniciar sesión

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      
      if (response.data && response.data.access_token) {
        // Almacena el token en el almacenamiento local
        localStorage.setItem("token", response.data.access_token);
        
        // Simula el inicio de sesión del usuario
        login({ username, email: 'example2@mail.com', profileImage: '/path/to/profile-image.jpg' });

        // Cambia la página a "Inicio" después del inicio de sesión
        onChangePage('Inicio');
      }
    } catch (error) {
      setError("No se logró iniciar sesión. Por favor verifica tu nombre de usuario y contraseña.");
    } finally {
      setLoading(false); // Finaliza el indicador de carga
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
          required // Campo obligatorio
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Campo obligatorio
        />
        <button type="submit" disabled={loading}>Iniciar Sesión</button>
      </form>
      {loading && <p className="loading-message">Cargando...</p>} {/* Mensaje de carga */}
      {error && <p className="error-message">{error}</p>} {/* Mensaje de error */}
      <div className="links">
        <p>¿Necesitas Registrarte? <button onClick={() => navigate('/signup')}>Registrate</button></p>
      </div>
    </div>
  );
};

export default Login;
