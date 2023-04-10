import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { FormProvider, useForm } from 'react-hook-form';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

import { OPERATION_FORM_MAP, OPERATION_INITIAL_VALUES_MAP } from '../constants';
import {
  useFetchOperationsQuery,
  usePerformOperationMutation,
} from '../redux/services/appApi';
import AutocompleteInput from '../components/AutocompleteInput';
import FormInput from '../components/FormInput';

const Home = () => {
  const [form, setForm] = useState([]);
  const [result, setResult] = useState(null);
  const [operator, setOperator] = useState(null);
  //TODO: add dynamic validation
  const methods = useForm({});
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  const {
    data: operations,
    isLoading: operationsLoading,
    error: operationsError,
  } = useFetchOperationsQuery();
  const [performOperation, { isLoading, isSuccess, error, isError }] =
    usePerformOperationMutation();

  useEffect(() => {
    if (isError) {
      console.error(error);
      toast.error(error.data.message, {
        position: 'top-right',
      });
      setResult(null);
    }
  }, [isLoading]);

  const handleChangeOperation = (e, item) => {
    setOperator(item.type);
    setForm(OPERATION_FORM_MAP[item.type]);
    reset(OPERATION_INITIAL_VALUES_MAP[item.type]);
  };

  const onSubmitHandler = async (values, e) => {
    for (let prop in values) {
      values[prop] = Number(values[prop]);
    }
    try {
      const { data } = await performOperation({ ...values, operator });
      setResult(data.result);
    } catch (error) {}
  };

  return (
    <Container spacing={2} maxWidth="sm">
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AutocompleteInput
                options={operations?.results}
                label="Operation"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.type}
                loading={operationsLoading}
                onChange={handleChangeOperation}
              />
            </Grid>
            {form.map(({ name, type, label, inputProps }) => (
              <Grid item xs={12} key={name}>
                <FormInput
                  name={name}
                  label={label}
                  type={type}
                  inputProps={inputProps}
                />
              </Grid>
            ))}
          </Grid>
          <LoadingButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}
          >
            Perform Operation
          </LoadingButton>
        </Box>
      </FormProvider>
      {result != null && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="h5">Result: </Typography>
          <Typography variant="h4">{result}</Typography>
        </Stack>
      )}
    </Container>
  );
};

export default Home;
