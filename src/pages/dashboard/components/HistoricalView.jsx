
import { useEffect, useState } from 'react';
import LineChartMUI from './LineChartMUI';
import axios from 'axios';
import StackBars from './StackBars';
import WaterIntakeTotal from './WaterIntakeTotal';

const dataTypes = [
  { value: 'weights', label: 'Peso' },
  { value: 'muscle', label: 'Músculo' },
  { value: 'body_fat_percentage', label: 'Porcentaje de Grasa Corporal' },  
  { value: 'water_consumption', label: 'Consumo de Agua' },
  { value: 'steps', label: 'Pasos' },
  { value: 'exercises', label: 'Ejercicios' }
];

const timePeriod = [
  { value: 'week', label: 'Última semana' },
  { value: 'month', label: 'Último mes' },
  { value: 'three_months', label: 'Últimos tres meses' },  
  { value: 'six_months', label: 'Últimos seis meses' },
  { value: 'year', label: 'Último año' },
];

export const HistoricalView = ({newData}) => {
    const [error, setError] = useState(null);

    const [selectedDataType, setSelectedDataType] = useState('');
    const handleDataTypeChange = (e) => setSelectedDataType(e.target.value);
    const [timePeriodSelected, settimePeriodSelected] = useState('');
    const handleTimePeriodChange = (e) => settimePeriodSelected(e.target.value);
    const [data, setData] = useState([])



    useEffect(() => {  
      const fetchDashboardData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setError('No estás autenticado. Por favor, inicia sesión.');
            return;
          }
          const response = await axios.get(`http://127.0.0.1:8000/dashboard/history?data_type=${selectedDataType}&period=${timePeriodSelected}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
          });
          setData(response.data.data);
        } catch (err) {
          setError('Error al cargar los datos del dashboard');
          console.log(err)
        }
      }
        


      if (selectedDataType && timePeriodSelected){
        fetchDashboardData()
      }

    }, [selectedDataType, timePeriodSelected, newData]);

    // if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
      <div>
        <div className="selects-group">
              <div className="div-select">
                <select
                  id="historyType"
                  value={selectedDataType}
                  onChange={handleDataTypeChange}
                  required
                >
                  <option value="" disabled>Selecciona un tipo de datos</option>
                  {dataTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="div-select">
                <select
                  id="timePeriod"
                  value={timePeriodSelected}
                  onChange={handleTimePeriodChange}
                  required
                >
                  <option value="" disabled>Selecciona un periodo de tiempo</option>
                  {timePeriod.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
        </div>
        {selectedDataType && timePeriodSelected?
          (
            data.length > 0 ?
              (
                selectedDataType === 'exercises' ?
                  <StackBars data={data} />
                  :
                  <div>
                    <LineChartMUI data={data}/>
                    {selectedDataType === 'water_consumption' && <WaterIntakeTotal data={data} />}
                  </div>
              )
              :
              <h4 className='msg-alert'>No se han encontrado datos</h4>
          )
          :
          <h4 className='msg-alert'>Por favor seleccione un tipo de dato y un periodo de tiempo</h4> 
        }
      </div>
    )
}