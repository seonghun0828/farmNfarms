import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const join = async (payload) => {
  try {
    const { data: {statusCode} } = await axios({
      method: 'post',
      url: apiPath.user.join(),
      data: {
        ...payload,      
      }
    });
    console.log(statusCode);
    if (statusCode === 200) {
      window.alert('회원가입에 성공했습니다.');
      return true;
    }
    else {
      return false;
    }
  } catch (e) {
    alertError(e);
    return false;
  }
}

export default join;