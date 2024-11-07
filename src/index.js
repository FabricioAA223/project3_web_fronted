import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login';
import UserProfile from './pages/user profile/UserProfile';
import { NotFound } from './pages/404 not found/NotFound';
import SignUp from './pages/sign up/SignUp'; 
import { AuthProvider } from './context/AuthContext'; 
import WelcomePage from './pages/welcomePage/Welcome';
import Dashboard  from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    // Ruta modificada para aceptar un userId dinámico
    path: "/profile/:userId", 
    element: <UserProfile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Envuelve RouterProvider con AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
