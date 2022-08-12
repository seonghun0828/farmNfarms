import React from "react";
import { TouchApp, Forward } from '@mui/icons-material';
import { Button } from '@mui/material';

const SwipeButton = () => {
  return (
    <Button
      variant='contained'
      style={{ width: '50px', fontSize: '16px', fontWeight: 'bold', padding: '4px', marginTop: '4px', marginBottom: '4px', marginRight: '4px' }}
    >
      <TouchApp></TouchApp>
      <Forward></Forward>
    </Button> 
  )
}

export default SwipeButton;