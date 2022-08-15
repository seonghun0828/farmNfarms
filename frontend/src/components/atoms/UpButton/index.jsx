import React from "react";
import { AttachMoney } from '@mui/icons-material';
import styled from "styled-components";

const StyledDiv = styled.div`
  background: #448aff;
  width: 60px;
  padding: 4px;
  margin: 4px 4px 4px 0px;
  border-radius: 10px;
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 1px black;
`

const UpButton = ({ priceUpHandler }) => {
  return (
    <StyledDiv
      onClick={priceUpHandler}
    >
      <AttachMoney style={{color: 'white', width: '30px', height: '30px'}}></AttachMoney>
      <span style={{ color: 'white', width: '30px', height: '30px' }}>▲</span>
    </StyledDiv>
  )
}

export default UpButton;