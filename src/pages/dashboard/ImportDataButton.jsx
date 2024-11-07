import React, { useState } from 'react';
import axios from 'axios';
import './ImportDataButton.css';

const dataTypes = [
  { value: 'weights', label: 'Pesos' },
  { value: 'heights', label: 'Alturas' },
  { value: 'body_composition', label: 'Composición Corporal' },
  { value: 'body_fat_percentage', label: 'Porcentaje de Grasa Corporal' },
  { value: 'water_consumption', label: 'Consumo de Agua' },
  { value: 'daily_steps', label: 'Pasos Diarios' },
  { value: 'exercises', label: 'Ejercicios' }
];

export default function ImportDataButton({ onDataImported }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDataType('');
    setFile(null);
    setError('');
    setSuccess('');
  };

  const handleDataTypeChange = (e) => setSelectedDataType(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDataType || !file) {
      setError('Por favor, selecciona un tipo de datos y un archivo CSV.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado. Por favor, inicia sesión.');
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/import-data?data_type=${selectedDataType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.status === 'success') {
        setSuccess('Datos importados correctamente.');
        if (onDataImported) {
          onDataImported();
        }
      } else {
        setError('Error al importar los datos.');
      }
    } catch (error) {
      if (error.response) {
        setError('Error al importar los datos: ' + (error.response.data.detail || error.message));
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Por favor, asegúrate de que el backend está encendido.');
      } else {
        setError('Error inesperado: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="import-data-button" onClick={handleOpenModal}>
        Importar Datos
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Importar Datos</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="dataType">Tipo de Datos:</label>
                <select
                  id="dataType"
                  value={selectedDataType}
                  onChange={handleDataTypeChange}
                  required
                >
                  <option value="">Selecciona un tipo de datos</option>
                  {dataTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="file">Archivo CSV:</label>
                <input
                  type="file"
                  id="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <div className="button-group">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Importando...' : 'Importar'}
                </button>
                <button type="button" onClick={handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
