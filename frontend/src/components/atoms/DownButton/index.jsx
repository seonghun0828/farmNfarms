import React from "react";
import { Paid, Download } from '@mui/icons-material';
import { Button } from '@mui/material';

const DownButton = ({ priceDownHandler }) => {
  return (
    <Button
      variant='contained'
      style={{ width: '50px', fontSize: '16px', fontWeight: 'bold', padding: '4px', marginTop: '4px', marginBottom: '4px', marginRight: '10px' }}
      onClick={priceDownHandler}
    >
      <Paid></Paid>
      <Download></Download>
    </Button>
  )
}

export default DownButton;