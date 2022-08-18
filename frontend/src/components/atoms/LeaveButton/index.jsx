import React from "react";
import { ExitToApp } from '@mui/icons-material'
import styled from "styled-components";

const StyledDiv = styled.div`
  background: gray;
  width: 100px;
  height: 40px;
  padding: 4px;
  margin: 4px 4px 4px 0px;
  border-radius: 10px;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 2px 2px 1px black;
`


const LeaveButton = ({leaveSession}) => {
  return (
    <StyledDiv onClick={leaveSession}>
      <ExitToApp />
      나가기
    </StyledDiv>
  )
}

export default LeaveButton;