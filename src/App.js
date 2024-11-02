import React, { useState } from 'react';
import Login from './pages/login/Login'; // Asegúrate de que la ruta sea correcta
import Register from './pages/sign up/SignUp'; // Asegúrate de que esta también sea correcta

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login />
      ) : (
        <Register />
      )}
      <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  );
};

export default App;
