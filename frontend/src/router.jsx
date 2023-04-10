import { createBrowserRouter, Outlet } from 'react-router-dom';

import AuthLayout from './pages/layouts/AuthLayout';
import AppLayout from './pages/layouts/AppLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';

const ContextWrapper = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <Signup /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
