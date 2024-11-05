import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import SignUp from './pages/sign up/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<welcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
