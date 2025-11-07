import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles.css';
import Landing from './pages/Landing';
import PatientLoginRedirect from './pages/PatientLoginRedirect';
import DoctorLoginRedirect from './pages/DoctorLoginRedirect';
import RMPLoginRedirect from './pages/RMPLoginRedirect';
import Signup from './pages/Signup';
import DoctorDash from './pages/DoctorDash';
import UserDash from './pages/UserDash';
import RuralUserDash from './pages/RuralUserDash';
import OfficialDash from './pages/OfficialDash';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <PatientLoginRedirect /> },
  { path: '/doctor-login', element: <DoctorLoginRedirect /> },
  { path: '/rmp-login', element: <RMPLoginRedirect /> },
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
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);

