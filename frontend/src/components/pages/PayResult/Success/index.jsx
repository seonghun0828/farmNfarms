import React from 'react';
import Button from '../../../atoms/Button';

const Success = () => {
  const clickHandler = () => {
    window.location.href = 'https://i7b203.p.ssafy.io:3000/';
  }
  // window.alert('결제가 성공했습니다. 홈으로 이동합니다.')
  return (
    <>
      <Button onClick={clickHandler} >홈으로 돌아가기</Button>
    </>
  );
};

export default Success;
