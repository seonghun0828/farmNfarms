import React from "react";
import { Paid, Upload} from '@mui/icons-material';
import { Button } from '@mui/material';

const UpButton = ({ priceUpHandler }) => {
  return (
    <Button
      variant='contained'
      style={{ width: '50px', fontSize: '16px', fontWeight: 'bold', padding: '4px', marginTop: '4px', marginBottom: '4px', marginRight: '10px' }}
      onClick={priceUpHandler}
    >
      <Paid></Paid>
      <Upload></Upload>
    </Button>
  )
}

export default UpButton;