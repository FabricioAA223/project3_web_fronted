import React from 'react';

export default function BMICard({ weight, height }) {
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidad';
  };

  const bmi = calculateBMI(weight, height);

  return (
    <div className="dashboard-card bmi-card">
      <h2 className="card-title">Índice de Masa Corporal (IMC)</h2>
      {bmi ? (
        <>
          <p className="bmi-value">{bmi.toFixed(1)}</p>
          <p className="bmi-category">{getBMICategory(bmi)}</p>
        </>
      ) : (
        <p>Datos insuficientes para calcular el IMC</p>
      )}
    </div>
  );
}