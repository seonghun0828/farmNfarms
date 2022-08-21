// 테스트 목적의 페이지
import React, { useState } from "react";
import { Favorite } from '@mui/icons-material';
import styled, { keyframes, css } from "styled-components";

const floating = keyframes`
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(-10deg);
  }
  66% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const StyledDiv = styled.div`
  height: 35px;
  width: 35px;
  animation: ${props => 
    props.animate && 
    css`
      ${floating} 0.5s linear 3
    `};
`

const TestPage = () => {
  const [flag, setFlag] = useState(false);

  const onChangeFlag = () => {
    setFlag((prevState) => {
      return !prevState;
    })
  }

  return (
    <div style={{ margin: '100px', position: 'relative' }}>
      <StyledDiv animate={flag} onClick={onChangeFlag}>
          <Favorite style={{ height: '35px', width: '35px', color: 'red' }}></Favorite>
      </StyledDiv>
    </div>
  ) 
}

export default TestPage;

