import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0F9749',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#0F9749',
    },
  }
});

const Input = ({  
  label, 
  type, 
  isReadOnly=false,
  error=false,
  size,
  ...rest
}) => {
  if (error) {
    return (
    <div>
      <TextField
        label={label}
        type={type}
        InputProps={{readOnly: isReadOnly}}
        {...rest}
        error
        size={size}
        fullWidth
      />
    </div>);
  }
  return (
  <div>
    <CssTextField
      label={label}
      type={type}
      InputProps={{readOnly: isReadOnly}}
      {...rest}
      error
      size={size}
      fullWidth
    />
  </div>
  );
};

export default Input;
