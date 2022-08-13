import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const getDetailHistory = async (auctionResultId, isSalesHistory) => {
  const path = isSalesHistory ? apiPath.result.sellDetail() : apiPath.result.buyDetail();
  try {
    const { data } = await axios({
      method: 'GET',
      url: path,
      params: {
        auctionResultId,
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    alertError(error);
  }
};

export default getDetailHistory;
