import React from 'react';

export default function StepCountCard({ stepCount }) {
  const dailyGoal = 10000; // Meta diaria de pasos
  const progress = stepCount !== null ? (stepCount / dailyGoal) * 100 : 0;

  return (
    <div className="dashboard-card step-count-card">
      <h2 className="card-title">Pasos Diarios</h2>
      <div className="step-progress-circle">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path className="circle"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">{stepCount !== null ? stepCount : 0}</text>
        </svg>
      </div>
      <p className="step-goal">Meta: {dailyGoal} pasos</p>
    </div>
  );
}