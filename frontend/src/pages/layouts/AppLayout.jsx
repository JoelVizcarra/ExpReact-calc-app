import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';

import { useLogoutUserMutation } from '../../redux/services/authApi';
import Navbar from '../../components/Navbar';

const AppLayout = () => {
  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    if (isSuccess) {
      toast.success('User logged out successfully');
    }

    if (isError) {
      console.error(error);
      toast.error(error.data.message, {
        position: 'top-right',
      });
    }
  }, [isLoading]);

  if (user == null) return <Navigate to="/login" />;

  return (
    <React.Fragment>
      <Navbar logout={logoutUser} />
      <Container maxWidth="lg" component="main" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default AppLayout;
