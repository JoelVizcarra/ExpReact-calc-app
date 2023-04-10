import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginUserMutation } from '../redux/services/authApi';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import FormInput from '../components/FormInput';

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

const Login = () => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success('User logged in successfully');
      navigate('/');
    }

    if (isError) {
      console.error(error);
      toast.error(error.data.message, {
        position: 'top-right',
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (values) => {
    loginUser(values);
  };

  return (
    <React.Fragment>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormInput name="email" label="Email Address" type="email" />
            </Grid>
            <Grid item xs={12}>
              <FormInput name="password" label="Password" type="password" />
            </Grid>
          </Grid>
          <LoadingButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}
          >
            Log In
          </LoadingButton>
          <RouterLink to="/signup">
            <Link component="span" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </RouterLink>
        </Box>
      </FormProvider>
    </React.Fragment>
  );
};

export default Login;
