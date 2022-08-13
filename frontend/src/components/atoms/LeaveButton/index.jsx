import React from "react";
import { Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material'

const LeaveButton = ({leaveSession}) => {
  return (
    <Button onClick={leaveSession} variant="contained">
      나가기
      <ExitToApp />
    </Button>
  )
}

export default LeaveButton;