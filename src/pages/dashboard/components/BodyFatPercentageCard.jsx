import React from 'react';

export default function BodyFatPercentageCard({ bodyFatPercentage }) {
  return (
    <div className="dashboard-card body-fat-percentage-card">
      <h2 className="card-title">Porcentaje de Grasa Corporal</h2>
      {bodyFatPercentage ? (
        <p className="body-fat-value">{bodyFatPercentage.toFixed(1)}%</p>
      ) : (
        <p>Dato no disponible</p>
      )}
    </div>
  );
}