import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Card = ({ children, sx }) => (
  <Box
    sx={{
      boxShadow: '0 5px 10px 0 rgba(0,0,0,0.25);',
      p: 1.5,
      backgroundColor: 'background.paper',
      ...sx,
    }}
  >
    {children}
  </Box>
);

Card.propTypes = {
  childen: PropTypes.node,
  sx: PropTypes.object,
};

export default Card;
