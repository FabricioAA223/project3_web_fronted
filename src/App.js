import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import LoginPage from './pages/login/Login';
import SignUp from './pages/sign up/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
