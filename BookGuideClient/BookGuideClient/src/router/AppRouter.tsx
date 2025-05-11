import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../pages/login/LoginPage"
import RegisterPage from "../pages/register/RegisterPage"



const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ana sayfa açıldığında doğrudan LoginPage'e yönlendir */}
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Burada diğer sayfalar için rotalar eklenebilir */}
      </Routes>
    </Router>
  );
};

export default AppRouter;