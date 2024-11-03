import React, { useState } from 'react';
import './SignUp.css'; // Asegúrate de tener estilos para el formulario

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // Agrega más campos según sea necesario
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8000/api/register', { // Ajusta la URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const data = await response.json();
      setSuccess('Registro exitoso! Puedes iniciar sesión ahora.');
      // Puedes redirigir a otra página o limpiar el formulario aquí si es necesario

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SignUp;
