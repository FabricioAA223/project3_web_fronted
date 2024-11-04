import React from 'react';

export default function ExerciseList({ exercises }) {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="dashboard-card exercise-list-card">
        <h2 className="card-title">Ejercicios Realizados Hoy</h2>
        <p>No hay ejercicios registrados para hoy</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card exercise-list-card">
      <h2 className="card-title">Ejercicios Realizados Hoy</h2>
      <ul className="exercise-list">
        {exercises.map((exercise, index) => (
          <li key={index} className="exercise-item">
            <span className="exercise-name">{exercise.name}</span>
            <span className="exercise-duration">{exercise.duration} min</span>
          </li>
        ))}
      </ul>
    </div>
  );
}