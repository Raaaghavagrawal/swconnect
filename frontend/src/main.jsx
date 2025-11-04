import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorDash from './pages/DoctorDash';
import UserDash from './pages/UserDash';
import RuralUserDash from './pages/RuralUserDash';
import OfficialDash from './pages/OfficialDash';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/doctor', element: <DoctorDash /> },
  { path: '/user', element: <RuralUserDash /> },
  { path: '/user/advanced', element: <UserDash /> },
  { path: '/official', element: <OfficialDash /> },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);

