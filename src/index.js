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

// Helper function to check if the user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "login",
        element: isAuthenticated() ? <Navigate to="/" replace /> : <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
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
