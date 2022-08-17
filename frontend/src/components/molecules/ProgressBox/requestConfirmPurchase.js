import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const requestConfirmPurchase = async (auctionResultId) => {
  try {
    const { data: { status } } = await axios({
      method: 'GET',
      url: apiPath.result.create(),
      params: {
        auctionResultId,
      }
    });
    if (status === 200)
      return true
    
    return false;
  } catch (error) {
    alertError(error);
  }
};

export default requestConfirmPurchase;
