import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import SignUp from './pages/sign up/SignUp';
import UserProfile from './pages/user profile/UserProfile';
import { NotFound } from './pages/404 not found/NotFound';
import { AuthProvider } from './context/AuthContext';
import WelcomePage from './pages/Welcome/Welcome';

// Helper function to check if the user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica si hay un token en localStorage
};

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Configuración del router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,  // Aquí se carga WelcomePage solo si el usuario no está autenticado
        element: isAuthenticated() ? <Navigate to="/dashboard" replace /> : <WelcomePage />,
      },
      {
        path: "login",
        element: isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />,
      },
      {
        path: "signup",
        element: isAuthenticated() ? <Navigate to="/dashboard" replace /> : <SignUp />,
      },
      {
        path: "my_profile",
        element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
