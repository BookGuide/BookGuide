import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import MainMenu from './pages/mainmenu/MainMenu';
import HistoryPage from './pages/historypage/HistoryPage'
import MyProfile from './pages/myprofile/MyProfile';
import RecommendationPage from './pages/recommendation/RecommendationPage';
import AdminPage from './pages/adminpage/AdminPage';
import BookList from './pages/booklist/BookList';
import LibraryList from './pages/librarylist/LibraryList';
import BorrowList from './pages/borrowlist/BorrowList';
import LibraryPage from './pages/librarypage/LibraryPage';
import LibraryBorrowPage from './pages/libraryborrowpage/LibraryBorrowPage';
import LibraryBookList from './pages/librarybooklist/LibraryBookList';
import ViewAllBooks from './pages/viewallbooks/ViewAllBooks';
import BookDetail from './pages/bookdetail/BookDetail';







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

  
    {
    path: '/adminpage',
    element: <AdminPage />,
  },
    { // Yeni eklenen rota
    path: '/booklist',
    element: <BookList />,
  },
      { // Yeni eklenen rota
    path: '/librarylist',
    element: <LibraryList />,
  },
        { // Yeni eklenen rota
    path: '/borrowlist',
    element: <BorrowList />,
  },
          { // Yeni eklenen rota
    path: '/librarypage',
    element: <LibraryPage />,
  },
            { // Yeni eklenen rota
    path: '/libraryborrowpage',
    element: <LibraryBorrowPage />,
  },
              { // Yeni eklenen rota
    path: '/librarybooklist',
    element: <LibraryBookList />,
  },
                { // Yeni eklenen rota
    path: '/viewallbooks',
    element: <ViewAllBooks />,
  },
    {
    path: "/book/:id",
    element: <BookDetail />,
  }

  
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;