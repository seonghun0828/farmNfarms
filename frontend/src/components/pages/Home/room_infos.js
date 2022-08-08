import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const room_infos = async () => {
  try {
    console.log('방정보내놔~~')
    const { data : { content }} = await axios({
      method: 'GET',
      url: apiPath.room.rooms() + '?page=0',
    });
    console.log(content)
    return content;
  } catch (error) {
    alertError(error);
  }
};

export default room_infos;