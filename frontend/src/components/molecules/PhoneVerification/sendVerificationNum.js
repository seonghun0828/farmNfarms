import axios from 'axios';
import { alertError } from '../../../common/alertError';

const getVerificationNum = async (confirmNumber, id, setErrorType) => {
  try {
    console.log(confirmNumber);
    const { data: { isSuccess } } = await axios({
      method: 'post',
      url: `https://i7b203.p.ssafy.io:8080/apis/verifications/${id}`,
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
      window.alert('중복 아이디를 여기서 체크해야하나?');
      return true;
    }
    else {
      setErrorType(2); // 나머지 오류
      return false;
    }
  } catch (e) {
    return false;
  }
}

export default getVerificationNum;