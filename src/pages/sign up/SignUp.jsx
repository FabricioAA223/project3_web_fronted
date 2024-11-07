import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    weight: '',
    height: '',
    birthdate: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Correo electrónico inválido';
      case 'username':
        return value.length >= 3 ? '' : 'El nombre de usuario debe tener al menos 3 caracteres';
      case 'password':
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(value)
          ? ''
          : 'La contraseña debe tener al menos 10 caracteres, incluir mayúsculas, minúsculas, números y símbolos';
      case 'weight':
        return !isNaN(value) && parseFloat(value) > 0 ? '' : 'Peso inválido';
      case 'height':
        return !isNaN(value) && parseFloat(value) > 0 ? '' : 'Altura inválida';
      case 'birthdate':
        return value ? '' : 'Selecciona tu fecha de nacimiento';
      case 'gender':
        return ['MASCULINO', 'FEMENINO'].includes(value) ? '' : 'Selecciona un género válido';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error en el registro');
      }

      navigate('/login');
    } catch (err) {
      setErrors({ general: 'Error en el registro. Por favor, intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="app-title">FitTrack</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Crear Cuenta</h2>
          {errors.general && <p className="error-message general-error">{errors.general}</p>}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="TuUsuario123"
              className={errors.username ? 'error-input' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••••"
                className={errors.password ? 'error-input' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="weight">Peso (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              placeholder="75.5"
              step="0.1"
              className={errors.weight ? 'error-input' : ''}
            />
            {errors.weight && <span className="error-text">{errors.weight}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="height">Altura (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              placeholder="180.0"
              step="0.1"
              className={errors.height ? 'error-input' : ''}
            />
            {errors.height && <span className="error-text">{errors.height}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Fecha de Nacimiento</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className={errors.birthdate ? 'error-input' : ''}
            />
            {errors.birthdate && <span className="error-text">{errors.birthdate}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Género</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={errors.gender ? 'error-input' : ''}
            >
              <option value="">Selecciona un género</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMENINO">Femenino</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;