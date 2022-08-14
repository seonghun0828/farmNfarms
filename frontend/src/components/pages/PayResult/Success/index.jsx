import React from 'react';

const Success = () => {
  window.alert('결제가 성공했습니다. 홈으로 이동합니다.')
  window.location.href = '/';
  return (
    <>
    </>
  );
};

export default Success;
