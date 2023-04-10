import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const AuthLayout = () => {
  const { user } = useSelector((state) => state.userState);
  if (user !== null) return <Navigate to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'action.hover',
          borderRadius: 3,
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
