import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const RecordItem = ({
  id,
  operation,
  amount,
  response,
  createdAt,
  onDelete,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          data-id={id}
          edge="end"
          aria-label="delete"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={operation.type} secondary={`amount: ${amount}`} />
    </ListItem>
  );
};

RecordItem.propTypes = {
  id: PropTypes.string,
  operation: PropTypes.object,
  amount: PropTypes.number,
  createdAt: PropTypes.string,
};

export default RecordItem;
