import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const payReady = async (auctionResultId) => {
  try {
    const { data : { next_redirect_mobile_url }} = await axios({
      method: 'POST',
      url: apiPath.pay.pay(),
      data: {
        auctionResultId,
      }
    });

    return next_redirect_mobile_url;
  } catch (error) {
    alertError(error);
  }
};

export default payReady;
