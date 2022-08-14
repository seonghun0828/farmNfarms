import React from 'react';

const Fail = () => {
  window.alert('결제를 실패하였습니다. 홈으로 이동합니다.')
  window.location.href = '/';
  return (
    <>
    </>
  );
};

export default Fail;
