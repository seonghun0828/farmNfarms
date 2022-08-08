import axios from "axios";
import apiPath from '../../common/apiPath';

const send = async ({ highestPrice, bestBidder }) => {
  try {
    const { data: { statusCode } } = await axios({
      method: 'post',
      url: apiPath.room.result(),
      // 줘야하는 데이터를 전달
      data: {
        highestPrice,
        bestBidder,
      }
    });
    if (statusCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e)
    return false;
  }
}

export default send;
