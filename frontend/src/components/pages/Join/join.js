import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';
import Swal from "sweetalert2";
import theme from '../../../common/theme';

const join = async (payload) => {
  try {
    const { data: {statusCode} } = await axios({
      method: 'post',
      url: apiPath.user.join(),
      data: {
        ...payload,      
      }
    });
    if (statusCode === 200) {
      // window.alert('회원가입에 성공했습니다.');
      Swal.fire({
        title: '성공!',
        text: '회원가입에 성공하였습니다',
        width: 300,
        imageUrl: '/assets/Swal_image/corn.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
      })
      return true;
    }
  } catch (e) {
    if (e.response.status === 401) {
      // window.alert('중복된 아이디 입니다.');
      Swal.fire({
        title: '에러!',
        text: '이미 가입된 핸드폰 번호 입니다.',
        width: 300,
        imageUrl: '/assets/Swal_image/먹힌사과.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
      })
      return false;
    }
    alertError(e);
    return false;
  }
}

export default join;