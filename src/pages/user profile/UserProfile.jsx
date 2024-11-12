import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        birthdate: '',
        gender: '',
        password: '',
        confirmPassword: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const date = new Date();
    // Obtener el año, el mes y el día en formato YYYY-MM-DD usando métodos locales
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    
    // Crear la fecha en formato "YYYY-MM-DD"
    const today = `${year}-${month}-${day}`;
    
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            console.log(data)
            setUserData(prevState => ({
                ...prevState,
                ...data,
                password: '',
                confirmPassword: ''
            }));
        } catch (error) {
            console.error('Error fetching profile:', error);
            setErrors({ general: 'Error al cargar el perfil. Por favor, intenta de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Cambiando: ", name, value)
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (isEditing) {
            if (userData.password && userData.password.length < 10) {
                newErrors.password = 'La contraseña debe tener al menos 10 caracteres';
            }
            if (userData.password !== userData.confirmPassword) {
                newErrors.confirmPassword = 'Las contraseñas no coinciden';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
                newErrors.email = 'Email inválido';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const dataToUpdate = { ...userData };
            console.log("Data nueva", dataToUpdate)
            delete dataToUpdate.confirmPassword;
            if (!dataToUpdate.password) delete dataToUpdate.password;

            const response = await fetch('http://127.0.0.1:8000/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dataToUpdate)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            setSuccessMessage(result.message);
            setIsEditing(false);
            fetchUserProfile(); // Refresh profile data
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrors({ general: 'Error al actualizar el perfil. Por favor, intenta de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <div className="user-profile-container">
            <div className="user-profile-content">
                <h1 className="app-title">FitTrack</h1>
                <h2>Perfil de Usuario</h2>
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="user-profile-form">
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errors.general && <p className="error-message general-error">{errors.general}</p>}
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
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
                                value={userData.username}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                max={today}
                                value={userData.birthdate}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Género</label>
                            <select
                                id="gender"
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMENINO">Femenino</option>
                            </select>
                        </div>
                        {isEditing && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="password">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        className={errors.password ? 'error-input' : ''}
                                    />
                                    {errors.password && <span className="error-text">{errors.password}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={userData.confirmPassword}
                                        onChange={handleChange}
                                        className={errors.confirmPassword ? 'error-input' : ''}
                                    />
                                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                                </div>
                            </>
                        )}
                        {isEditing ? (
                            <div className="button-group">
                                <button type="submit" className="update-button" disabled={isLoading}>
                                    {isLoading ? 'Actualizando...' : 'Guardar Cambios'}
                                </button>
                                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
                                Editar Perfil
                            </button>
                        )}
                    </form>
                )}
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default UserProfile;
