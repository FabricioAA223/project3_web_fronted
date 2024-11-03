import React, { useState } from 'react';
import axios from 'axios';

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

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        const { email, username, password, weight, height, birthdate, gender } = formData;
        if (!email || !username || !password || !weight || !height || !birthdate || !gender) {
            return "Todos los campos son obligatorios.";
        }
        if (weight <= 0 || height <= 0) {
            return "El peso y la altura deben ser valores positivos.";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Por favor, introduce un correo electrónico válido.";
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register', {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
                birthdate: formData.birthdate,
                gender: formData.gender
            });
            setSuccess(response.data.message);
            // Limpiar el formulario después del registro
            setFormData({
                email: '',
                username: '',
                password: '',
                weight: '',
                height: '',
                birthdate: '',
                gender: ''
            });
        } catch (error) {
            setError(error.response.data.detail || 'Error al registrarse. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Nombre de Usuario" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="weight" 
                    placeholder="Peso (kg)" 
                    value={formData.weight} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="height" 
                    placeholder="Altura (cm)" 
                    value={formData.height} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="date" 
                    name="birthdate" 
                    value={formData.birthdate} 
                    onChange={handleChange} 
                    required 
                />
                <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Selecciona tu género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>
                <button type="submit">Registrarse</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default SignUp;
