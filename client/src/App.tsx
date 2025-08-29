import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToasterProvider } from "./context/ToasterContext";
import Toaster from "./components/Toaster/Toaster";
import { router } from "./router/Router";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <ToasterProvider>
        <div className="app">
          <Suspense fallback={<div>Chargement de l'application...</div>}>
            <AppContent />
          </Suspense>
          <Toaster />
        </div>
      </ToasterProvider>
    </AuthProvider>
  );
}

export default App;
