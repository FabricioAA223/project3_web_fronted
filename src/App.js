import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './pages/dashboard/components/NavBar';
import './App.css';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthenticated && <NavBar />}  {/* Muestra el NavBar solo si el usuario está autenticado */}
      <Outlet />  {/* Carga el contenido según la ruta */}
    </div>
  );
}

export default App;
