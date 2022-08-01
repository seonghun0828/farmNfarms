import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const sendVerificationNum = async (confirmNumber, id, setErrorType) => {
  try {
    console.log(confirmNumber);
    const { data: { isSuccess } } = await axios({
      method: 'post',
      url: apiPath.verification.send(id),
      data: {
        confirmNumber
      }
    });
    console.log(isSuccess);
    if (isSuccess === 200) {
      window.alert('인증에 성공했습니다!');
      return true;
    } else if (isSuccess === 401) {
      setErrorType(1); // 중복 아이디
      window.alert('중복된 아이디 입니다.'); // 나중에 setErrorType으로 error 띄워주기
      return false;
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