import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Burada diğer sayfalar için rotalar eklenebilir */}
    </Routes>
  );
};

export default AppRouter;