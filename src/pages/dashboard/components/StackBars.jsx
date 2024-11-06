import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// Función para agrupar y sumar minutos por ejercicio en cada fecha
const groupDataByDate = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = new Date(item.fecha).toLocaleDateString("es-ES", { month: "short", day: "numeric"}); // Formato de fecha legible
    if (!groupedData[date]) {
      groupedData[date] = {};
    }

    // Sumar los minutos al ejercicio correspondiente en la fecha
    Object.keys(item).forEach((key) => {
      if (key !== "fecha") {
        groupedData[date][key] = (groupedData[date][key] || 0) + item[key];
      }
    });
  });

  console.log(groupedData)
  // Convertir el objeto agrupado en un array de objetos para el gráfico
  return Object.entries(groupedData).map(([fecha, exercises]) => ({
    fecha,
    ...exercises,
  }));
};

export default function StackBars({ data }) {
  // Agrupar y sumar los datos por fecha
  const formattedData = groupDataByDate(data);

  // Obtener nombres únicos de ejercicios para definir las series
  const exercises = Array.from(
    new Set(data.flatMap((item) => Object.keys(item).filter((key) => key !== "fecha")))
  );

  // Configuración de series para el gráfico apilado
  const series = exercises.map((exercise) => ({
    dataKey: exercise,
    stack: 'minutes', // Para apilar ejercicios en cada fecha
    label: exercise,
  }));

  return (
    <BarChart
      dataset={formattedData}
      series={series}
      xAxis={[{ scaleType: 'band', dataKey: 'fecha', label: 'Fecha' }]}
      yAxis={[{ label: 'Minutos' }]}
      height={400}
      slotProps={{ legend: { hidden: false } }} // Mostrar la leyenda para identificar cada ejercicio
      
    />
  );
}
