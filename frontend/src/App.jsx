import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import GlassSignUpPage from "./pages/GlassSignUpPage.jsx";
// import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Waves from "./components/extraa/Waves.jsx";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth &&!authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      < Navbar/ >
      < Waves/ >
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login"/> } />
        <Route path="/signup" element={ !authUser ? <GlassSignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login"/> } />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      < Toaster />
    </div>
  )
}

 
export default App