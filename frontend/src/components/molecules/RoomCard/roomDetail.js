import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const roomDetail = async (roomNumber) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: apiPath.room.detail(roomNumber),
    });
    console.log(data)
    return(data)
  } catch (e) {
    alertError();
    return null;
  }
}

export default roomDetail;