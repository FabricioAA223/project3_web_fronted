import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      
      if (response.data && response.data.access_token) {
        // Almacena el token en el almacenamiento local
        localStorage.setItem("token", response.data.access_token);
        
        // Simula el inicio de sesión del usuario con datos ficticios para este ejemplo
        login({ username, email: 'example2@mail.com', profileImage: '/path/to/profile-image.jpg' });
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
