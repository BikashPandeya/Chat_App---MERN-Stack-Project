import React from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Login from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";  
import ProfilePage from "./pages/ProfilePage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Loader} from "lucide-react"


const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log("Auth User:", authUser);

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
        &nbsp;
        <span className="ml-2 text-gray-700">Loading...</span>
      </div>
    );
  }
  
  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ?<HomePage /> : <Navigate to="/login" /> }/>

        <Route path='/signup' element={!authUser ?  
        <SignUpPage /> : <Navigate to="/" />}/>

        <Route path='/login' element={!authUser ?  <Login /> : <Navigate to="/" />}/>

        <Route path='/settings' element={<SettingsPage />}/>

        <Route path='/profile' element={authUser ?<ProfilePage /> : <Navigate to="/login" />}/>
        
      </Routes>

    </div>
  );
};

export default App;
