import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../../common/apiPath';

const paySuccess = async (pg_token) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: apiPath.pay.success(),
      params: {
        pg_token,
      }
    });

    return data;
  } catch (error) {
    alertError(error);
  }
};

export default paySuccess;
