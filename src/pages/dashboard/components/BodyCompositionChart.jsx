import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BodyCompositionChart({ composition }) {
  if (!composition || composition.fat === null || composition.muscle === null || composition.water === null) {
    return (
      <div className="dashboard-card body-composition-card">
        <h2 className="card-title">Composición Corporal</h2>
        <p>Datos no disponibles</p>
      </div>
    );
  }

  const data = {
    labels: ['Grasa', 'Músculo', 'Agua'],
    datasets: [
      {
        data: [composition.fat, composition.muscle, composition.water],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard-card body-composition-card">
      <h2 className="card-title">Composición Corporal</h2>
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}