import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const CreateVerification = async (phoneNumber) => {
  try {
    const { data  } = await axios({
      method: 'post',
      url: apiPath.verification.create(),
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

export default CreateVerification;