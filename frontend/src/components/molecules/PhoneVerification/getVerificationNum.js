import axios from 'axios';
import { alertError } from '../../../common/alertError';

const getVerificationNum = async (phoneNumber) => {
  try {
    const { data  } = await axios({
      method: 'post',
      url: 'https://i7b203.p.ssafy.io:8080/apis/verifications',
      data: {
        phoneNumber,
      }
    });
    console.log(data);
    window.alert('메세지를 보냈습니다!');
    return data;
  } catch (e) {
    alertError(e);
    return false;
  }
}

export default getVerificationNum;