import React from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Login from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";  
import ProfilePage from "./pages/ProfilePage.jsx";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log("Auth User:", authUser);
  
  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/settings' element={<SettingsPage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
      </Routes>

    </div>
  );
};

export default App;
