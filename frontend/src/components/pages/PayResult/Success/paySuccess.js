import axios from 'axios';
import { alertError } from '../../../../common/alertError';
import apiPath from '../../../../common/apiPath';

const paySuccess = async (pg_token) => {
    window.alert('함수 안에서 pg토큰이에용: '+pg_token);
  try {
    const result = await axios({
      method: 'GET',
      url: apiPath.pay.success(),
      params: {
        pg_token,
      }
    });
    console.log(result);
    return result;
  } catch (error) {
    window.alert('여기 paySuccess.js catch에용')
    alertError(error);
  }
};

export default paySuccess;
