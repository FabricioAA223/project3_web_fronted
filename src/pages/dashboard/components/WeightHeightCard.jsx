import React from 'react';

export default function WeightHeightCard({ weight, height }) {
  return (
    <div className="dashboard-card weight-height-card">
      <h2 className="card-title">Peso y Altura</h2>
      <div className="card-content">
        <p className="metric">
          <span className="metric-value">{weight !== null ? weight.toFixed(1) : 'N/A'}</span>
          <span className="metric-unit">kg</span>
        </p>
        <p className="metric">
          <span className="metric-value">{height !== null ? height.toFixed(1) : 'N/A'}</span>
          <span className="metric-unit">cm</span>
        </p>
      </div>
    </div>
  );
}