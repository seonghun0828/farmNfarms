import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const getMyInfo = async (phoneNumber) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: apiPath.user.get(phoneNumber),
    });
    // console.log(data);
    return data;
  } catch (error) {
    alertError(error);
  }
};

export default getMyInfo;
