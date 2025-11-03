import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorDash from './pages/DoctorDash';
import UserDash from './pages/UserDash';
import OfficialDash from './pages/OfficialDash';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/doctor', element: <DoctorDash /> },
  { path: '/user', element: <UserDash /> },
  { path: '/official', element: <OfficialDash /> },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

