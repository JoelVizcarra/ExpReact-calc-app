import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignupUserMutation } from '../redux/services/authApi';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import FormInput from '../components/FormInput';

const signupSchema = object({
  name: string().min(1, 'Name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

const Signup = () => {
  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  const [signupUser, { isLoading, isSuccess, error, isError }] =
    useSignupUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success('User registered successfully');
      navigate('/');
    }

    if (isError) {
      console.error(error);
      toast.error(error.data, {
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
    signupUser(values);
  };

  return (
    <React.Fragment>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormInput name="name" label="Name" />
            </Grid>
            <Grid item xs={12}>
              <FormInput name="email" label="Email Address" type="email" />
            </Grid>
            <Grid item xs={12}>
              <FormInput name="password" label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
              />
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
            Sign Up
          </LoadingButton>
          <RouterLink to="/login">
            <Link component="span" variant="body2">
              Already have an account? Log in
            </Link>
          </RouterLink>
        </Box>
      </FormProvider>
    </React.Fragment>
  );
};

export default Signup;
