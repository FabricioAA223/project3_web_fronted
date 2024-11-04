// src/pages/dashboard/components/CompositionChart.jsx
import React from 'react';
import { Chart } from 'react-google-charts';
import './CompositionChart.css';

const CompositionChart = ({ fat, muscle, water }) => {
  return (
    <div className="chart-container">
      <h3>Composición Corporal</h3>
      {fat !== null ? (
        <Chart
          chartType="PieChart"
          data={[
            ["Elemento", "Porcentaje"],
            ["Grasa", fat],
            ["Músculo", muscle],
            ["Agua", water],
          ]}
          options={{
            title: "Composición Corporal",
            pieHole: 0.4,
            is3D: false,
          }}
          width="100%"
          height="400px"
        />
      ) : (
        <p>Sin datos</p>
      )}
    </div>
  );
};

export default CompositionChart;