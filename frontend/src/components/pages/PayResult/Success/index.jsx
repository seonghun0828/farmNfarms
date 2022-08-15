import React from 'react';
import Button from '../../../atoms/Button';
import paySuccess from './paySuccess';

const Success = () => {
  const params = new URLSearchParams(window.location.search);
  const pg_token = params.get('pg_token');
  paySuccess(pg_token).catch(() => {
    window.alert('결제가 성공했습니다. 홈으로 이동합니다.')
    window.location.href = '/';
  });
  return (
    <>
    </>
  );
};

export default Success;
