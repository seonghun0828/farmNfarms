import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const pay = async (auctionResultId) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: apiPath.pay.pay(),
      data: {
        auctionResultId
      }
    });
    console.log(data);
    return true;
  } catch (e) {
    alertError(e);
    return false;
  }
}

export default pay;