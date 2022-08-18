import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const getFullHistory = async (phoneNumber, isSalesHistory) => {
  if (!phoneNumber)
    return {
      data: []
    }
  const path = isSalesHistory ? apiPath.result.sell() : apiPath.result.buy();
  try {
    const { data } = await axios({
      method: 'GET',
      url: path,
      params: {
        phoneNumber
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    alertError(error);
  }
};

export default getFullHistory;
