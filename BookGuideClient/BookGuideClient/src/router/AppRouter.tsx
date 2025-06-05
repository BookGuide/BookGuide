import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import AdminPage from '../pages/adminpage/AdminPage';
import MainMenu from '../pages/mainmenu/MainMenu';
import LibraryPage from '../pages/librarypage/LibraryPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/mainmenu" element={<MainMenu />} />
      <Route path="/librarypage" element={<LibraryPage />} />
    </Routes>
  );
};

export default AppRouter;