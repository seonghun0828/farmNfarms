import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const loadImage = async (idx) => {
    console.log(idx, '넣었음')
  try {
    console.log('이미지 부르기')
    const { data } = await axios({
      method: 'POST',
      url: apiPath.room.loadImg(),
      params: {
        idx: idx,
      }
    });
    console.log(data)
    return data;
  } catch (error) {
    alertError();
    console.log(error);
  }
};

export default loadImage;