import React from "react";
import { Button } from '@mui/material';
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% {
    opacity: .3;
  }

  33% {
    opacity: .5;
  }

  66% {
    opacity: .8;
  }

  100% {
    opacity: 1;
  }
`

const BlinkDiv = styled.div`
  animation: ${blink} 1.5s linear infinite;
`

const OnAirButton = () => {
  return (
    <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', padding: '0px' }}>
      <BlinkDiv>
        <span style={{ fontSize: 'medium', fontWeight: 'bold', padding: '0px' }}>
          Live
        </span>
      </BlinkDiv>
    </Button>
  )
}

export default OnAirButton;