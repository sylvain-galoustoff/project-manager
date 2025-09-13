import { createBrowserRouter, Navigate } from "react-router";
import Login from "../views/Login/Login";
import Signin from "../views/Signin/Signin";
import { useAuth } from "../context/AuthContext";
import NotFound from "../views/NotFound/NotFound";
import type { JSX } from "react";
import Layout from "../views/Layout/Layout";
import Dashboard from "../views/Dashboard/Dashboard";
import AddProject from "../views/AddProject/AddProject";
import Profile from "../views/Profile/Profile";
import AddUser from "../views/AddUser/AddUser";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { authToken, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // ou un vrai loader
  }

  if (!authToken) {
    return <Navigate to="/login" replace />;
  } else return children;
}

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <NotFound />,
      },
      {
        path: "project/add",
        element: <AddProject />,
        errorElement: <NotFound />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <NotFound />,
      },
      {
        path: "create-user",
        element: <AddUser />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate replace to="/login" />,
    errorElement: <NotFound />,
  },
]);
