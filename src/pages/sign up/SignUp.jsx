import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    birthday: '',  // Este debe coincidir con el nombre del input
    gender: '',
    weight: '',
    height: '',
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

    // Validación de la contraseña
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    if (!passwordPattern.test(formData.password)) {
      setError('La contraseña debe tener al menos 10 caracteres, incluir letras, números y un símbolo.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en el registro'); // Maneja el mensaje de error de la respuesta
      }

      setSuccess('¡Registro exitoso! Puedes iniciar sesión ahora.');
      setFormData({
        email: '',
        username: '',
        password: '',
        birthday: '',  // Restablece el valor de birthday
        gender: '',
        weight: '',
        height: '',
      });
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
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Peso actual (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            step="0.1"
          />
        </div>
        <div>
          <label>Altura actual (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            step="0.1"
          />
        </div>
        <div>
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            name="birthday"  // Cambiado de birthdate a birthday
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Género:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMENINO">FEMENINO</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SignUp;
