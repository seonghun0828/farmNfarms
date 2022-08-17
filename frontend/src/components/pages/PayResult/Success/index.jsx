import React from 'react';
import Button from '../../../atoms/Button';
import paySuccess from './paySuccess';
import Swal from "sweetalert2";
import theme from '../../../../common/theme';

const Success = () => {
  const params = new URLSearchParams(window.location.search);
  const pg_token = params.get('pg_token');
  paySuccess(pg_token).then(() => {
  //   Swal.fire({
  //     text: '결제가 성공되었습니다! 홈으로 이동합니다.',
  //     confirmButtonColor: theme.colors.green3, 
  //   }).then(() => {
  //     window.location.href = '/';
  //   })
    window.alert('결제가 성공했습니다. 홈으로 이동합니다.')
    window.location.href = '/';
  });
  return (
    <>
    </>
  );
};

export default Success;
