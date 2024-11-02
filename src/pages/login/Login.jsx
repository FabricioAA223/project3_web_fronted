import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    setError('');

    axios.post('http://localhost:8000/login', { username, password })
       .then((response) => {
         console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
