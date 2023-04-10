import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

const FormInput = ({ name, defaultValue, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <TextField
            {...field}
            fullWidth
            sx={{ borderRadius: '1rem' }}
            error={!!errors[name]}
            {...otherProps}
          />
          <FormHelperText error={!!errors[name]}>
            {errors[name] ? errors[name].message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default FormInput;
