import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const getDetailHistory = async (auctionResultId, isSalesHistory) => {
  const path = isSalesHistory ? apiPath.result.sellDetail() : apiPath.result.buyDetail();
  try {
    const result = await axios({
      method: 'GET',
      url: path,
      params: {
        auctionResultId,
      }
    });
    if (result.status !== 200)
      throw new Error(result.statusText);

    console.log('ss',result)
    return result;
  } catch (error) {
    alertError(error);
  }
};

export default getDetailHistory;
