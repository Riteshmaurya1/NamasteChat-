import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./home/Home";
import { Toaster } from 'react-hot-toast';
import Profile from "./pages/Profile";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Always accessible routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/home"
          element={
            token ? (
              <Home />
            ) : (
              // Redirect to login if no token
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            token ? (
              <Profile />
            ) : (
              // Redirect to login if no token
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Optional catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
