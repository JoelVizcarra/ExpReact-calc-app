import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const AutocompleteInput = ({ options = [], label, loading, ...props }) => {
  return (
    <Autocomplete
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

AutocompleteInput.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  loading: PropTypes.bool,
};

export default AutocompleteInput;
