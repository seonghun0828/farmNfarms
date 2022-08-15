import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const updateUserInfo = async ({ phone, ...updateData }) => {
  console.log(updateData);
  try {
    const { data : {isSuccess}} = await axios({
      method: 'put',
      url: apiPath.user.update(phone),
      data: updateData
    });
    if (isSuccess) {
      window.alert('회원정보가 성공적으로 수정되었습니다.');
      return true;
    } else {
      return false;
    }
  } catch (e) {
    alertError();
  }
}

export default updateUserInfo;