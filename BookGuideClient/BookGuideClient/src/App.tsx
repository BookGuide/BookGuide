import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import MainMenu from './pages/mainmenu/MainMenu';
import HistoryPage from './pages/historypage/HistoryPage'
import MyProfile from './pages/myprofile/MyProfile';
import RecommendationPage from './pages/recommendation/RecommendationPage';



// Modern router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
    {
    path: '/recommendation',
    element: <RecommendationPage />,
  },
    {
    path: '/history',
    element: <HistoryPage />,
  },

    {
    path: '/myprofile',
    element: <MyProfile />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

    {
    path: '/mainmenu',
    element: <MainMenu />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;