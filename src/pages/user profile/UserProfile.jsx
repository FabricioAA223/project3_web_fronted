import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el parámetro userId
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';  // Necesitas importar useNavigate para redirigir

const UserProfile = () => {
  const {  token } = useAuth(); // Obtén el token de contexto de autenticación
  const { userId } = useParams(); // Obtén el userId de la URL
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();  // Para redirigir en caso de error o perfil no encontrado

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Token:', token); // Verifica el token
        console.log('User ID:', userId); // Verifica el userId

        const response = await fetch(`http://localhost:8000/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Si la respuesta no es correcta (ej. 404 o 500), lanza un error
          throw new Error('Perfil no encontrado');
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          // Si los datos están vacíos, significa que el perfil no existe
          navigate('/not-found');  // Redirige a una página de error (opcional)
          return;
        }

        setProfileData(data);  // Guarda los datos recibidos en el estado
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        navigate('/not-found');  // Redirige si ocurre un error
      }
    };

    if (token) {
      fetchProfile();  // Solo llama a fetchProfile si hay un token
    }
  }, [token, userId, navigate]);  // Dependencias: token y userId

  // Si no hay datos de perfil aún (por ejemplo, mientras se carga)
  if (!profileData) {
    return <div>Cargando...</div>;  // Puedes mostrar un cargando o un mensaje aquí
  }

  return (
    <div className="profile-page">
      <div className="profile-overlay"></div>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <FaUserCircle className="profile-avatar" />
          </div>
          <div className="profile-info">
            <h1>{profileData?.username || 'Nombre Usuario'}</h1>
            <p>@{profileData?.username}</p>
            <p><strong>Email:</strong> {profileData?.email}</p>
            <p><strong>Birthdate: </strong> {profileData?.birthday || ''}</p>
            <p><strong>Gender: </strong> {profileData?.gender || ''}</p>
          </div>
          <div className="profile-buttons">
            <button className="btn">Log out</button>
            <button className="btn">Update Profile</button>
            <button className="btn">Back to dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
