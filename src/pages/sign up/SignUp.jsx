import './SignUp.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        weight: '',
        height: '',
        birthdate: '',
        gender: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const { email, password, weight, height } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        if (!emailRegex.test(email)) return "Ingrese un correo electrónico válido.";
        if (!passwordRegex.test(password)) return "La contraseña debe tener al menos 10 caracteres, incluyendo letras, números y un símbolo.";
        if (isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) return "Ingrese un peso válido.";
        if (isNaN(parseFloat(height)) || parseFloat(height) <= 0) return "Ingrese una altura válida.";
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register', formData);
            if (response.status === 201) {
                setSuccess('Cuenta creada exitosamente. Redirigiendo al inicio de sesión...');
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err) {
            setError('Error al registrar. Verifique los datos e intente de nuevo.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleRegister}>
                <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                <input type="text" name="username" placeholder="Nombre de Usuario" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                <input type="number" name="weight" placeholder="Peso Actual (kg)" value={formData.weight} onChange={handleChange} required />
                <input type="number" name="height" placeholder="Altura Actual (cm)" value={formData.height} onChange={handleChange} required />
                <input type="date" name="birthdate" placeholder="Fecha de Nacimiento" value={formData.birthdate} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Seleccionar Género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default SignUp;
