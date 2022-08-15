import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import Swal from "sweetalert2";
import theme from '../../../common/theme';

const sendVerificationNum = async (confirmNumber, id, setErrorType) => {
  try {
    const { data: { isSuccess } } = await axios({
      method: 'post',
      url: apiPath.verification.send(id),
      data: {
        confirmNumber
      }
    });
    if (isSuccess === 200) {
      // window.alert('인증에 성공했습니다!');
      Swal.fire({
        title: '성공',
        text: '인증에 성공했습니다!',
        width: 300,
        imageUrl: '/assets/Swal_image/corn.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
      })
      return true;
    } else if (isSuccess === 401) {
      // window.alert('인증에 성공했습니다!'); // 일단 성공 회원가입할 떄 중복 체크 할 것
      Swal.fire({
        title: '성공',
        text: '인증에 성공했습니다!',
        width: 300,
        imageUrl: '/assets/Swal_image/corn.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
      })
      setErrorType(1); // 중복 아이디
      // window.alert('중복된 아이디 입니다.'); // 나중에 setErrorType으로 error 띄워주기
      return true;
    }
    else {
      setErrorType(2); // 나머지 오류
      return false;
    }
  } catch (e) {
    alertError();
    return false;
  }
}

export default sendVerificationNum;