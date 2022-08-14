import React from 'react';

const Cancel = () => {
  window.alert('결제를 취소하였습니다. 홈으로 이동합니다.')
  window.location.href = '/';
  return (
    <>
    </>
  );
};

export default Cancel;
