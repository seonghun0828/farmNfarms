import React from "react";
import { PlayCircleFilled } from '@mui/icons-material'
import styled from "styled-components";

const StyledDiv = styled.div`
  background: #019267;
  width: 120px;
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

const SessionStartButton = ({ startAuction }) => {
  return (
    <StyledDiv onClick={startAuction}>
      <PlayCircleFilled />
      세션 시작
    </StyledDiv>
  )
}

export default SessionStartButton;