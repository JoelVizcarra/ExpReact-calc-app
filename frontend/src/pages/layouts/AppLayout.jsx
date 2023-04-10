import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';

import { logout } from '../../redux/features/userSlice';
import Navbar from '../../components/Navbar';

const AppLayout = () => {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  if (user == null) return <Navigate to="/login" />;

  return (
    <React.Fragment>
      <Navbar logout={handleLogout} />
      <Container maxWidth="lg" component="main" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default AppLayout;
