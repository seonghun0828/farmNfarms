import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import Swal from "sweetalert2";
import theme from '../../../common/theme';

const updateUserInfo = async ({ phone, ...updateData }) => {
  console.log(updateData);
  try {
    const { data : {isSuccess}} = await axios({
      method: 'put',
      url: apiPath.user.update(phone),
      data: updateData
    });
    if (isSuccess) {
      // window.alert('회원정보가 성공적으로 수정되었습니다.');
      Swal.fire({
        title: '성공!',
        text: '회원정보가 성공적으로 수정되었습니다.',
        width: 300,
        imageUrl: '/assets/Swal_image/corn.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
      })
      return true;
    } else {
      // window.alert('올바르지 않은 비밀번호 입니다.');
      Swal.fire({
        title: '에러!',
        text: '올바르지 않은 비밀번호 입니다.',
        width: 300,
        imageUrl: '/assets/Swal_image/먹힌사과.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
      })
      return false;
    }
  } catch (e) {
    alertError();
  }
}

export default updateUserInfo;