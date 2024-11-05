import React from 'react';

const WaterIntakeTotal = ({ data }) => {
  // Calcular la cantidad total de vasos de agua
  const totalGlasses = data.reduce((acc, entry) => acc + entry["Vasos de agua"], 0);
  
  // Convertir a litros
  const totalLiters = (totalGlasses * 0.25).toFixed(2); // 250 ml por vaso = 0.25 L

  return (
    <div className='total-water-container'>
      <h2>Consumo Total de Agua</h2>
      <div className='total-water-card'>
        <h3>{totalGlasses} vasos de agua</h3>
        <p>Equivale a {totalLiters} Litros</p>
      </div>
    </div>
  );
};

export default WaterIntakeTotal;
