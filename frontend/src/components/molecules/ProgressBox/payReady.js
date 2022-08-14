import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const payReady = async (auctionResultId) => {
  try {
    const result = await axios({
      method: 'POST',
      url: apiPath.pay.pay(),
      data: {
        auctionResultId,
      }
    });
    console.log(result);
    // if (result.status !== 200)
    //   throw new Error(result.statusText);

    return result;
  } catch (error) {
    alertError(error);
  }
};

export default payReady;
