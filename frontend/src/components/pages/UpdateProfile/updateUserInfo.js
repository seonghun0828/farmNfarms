import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const updateUserInfo = async ({ phone, ...updateData }) => {
  try {
    const { data } = await axios({
      method: 'put',
      url: apiPath.user.update(phone),
      data: updateData
    });
    console.log(data);
  } catch (e) {
    alertError();
  }
}

export default updateUserInfo;