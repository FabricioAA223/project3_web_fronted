import React from 'react';

export default function WaterIntakeCard({ waterIntake }) {
  const dailyGoal = 8; // 8 vasos al día como meta
  const progress = waterIntake !== null ? Math.min((waterIntake / dailyGoal) * 100, 100) : 0;

  return (
    <div className="dashboard-card water-intake-card">
      <h2 className="card-title">Consumo de Agua</h2>
      <div className="water-progress">
        <div 
          className="water-fill" 
          style={{height: `${progress}%`}}
        ></div>
      </div>
      <p className="water-info">
        <span className="current-intake">{waterIntake !== null ? waterIntake : 0}</span>
        <span className="intake-goal">/ {dailyGoal} vasos</span>
        {waterIntake > dailyGoal && (
          <span className="goal-exceeded">¡Meta alcanzada!</span>
        )}
      </p>
    </div>
  );
}