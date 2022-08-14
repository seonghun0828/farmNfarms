import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import logo404 from '../../../assets/fruits.png';
import logo from "../../../assets/로고.svg";

const BackDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 40px 10px 10px 10px;
  text-align: center;
`

const ContentDiv = styled.div`
  
  color: #0F9749;
`

const StyledTextDiv = styled.div` 
  font-size: 60px;
  font-weight: 700;
`

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goMain = () => {
    navigate('/');
  };

  return (
    <BackDiv>
      <img src={logo404}></img>
      <Typography style={{ color: 'gray' }}>
        <a 
        href="https://www.flaticon.com/free-icons/fruits" 
        title="fruits icons"
        style={{textDecoration: 'none', color: 'gray'}}
        target="_blank"
        >
          Fruits icons created by Freepik - Flaticon
        </a>
      </Typography>
      <ContentDiv>
        <StyledTextDiv>
          Oops!...
        </StyledTextDiv>
        <div>
          <p style={{fontSize: '20px', fontWeight: 'bold'}}>
          {pathname}은 존재하지 않는 페이지이거나
          <br></br>
          잘못된 요청입니다.
          </p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <img onClick={goMain} src={logo} style={{width: '100px', height: '100px'}}></img>
          <span onClick={goMain}>메인으로 이동하기</span>
        </div>
      </ContentDiv>
    </BackDiv>
    );
}

export default NotFound;