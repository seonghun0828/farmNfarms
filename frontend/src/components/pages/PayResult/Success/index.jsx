import React from 'react';
import Button from '../../../atoms/Button';

const Success = () => {
  const clickHandler = () => {
    window.location.href = '/';
  }
  // window.alert('결제가 성공했습니다. 홈으로 이동합니다.')
  return (
    <>
      <Button onClick={clickHandler} >홈으로 돌아가기</Button>
    </>
  );
};

export default Success;
