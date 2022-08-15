import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const searchAuctionRooms = async (key, pageParam) => {
  console.log(pageParam)
  try {
    const {
      data: { content, last },
    } = await axios({
      method: 'GET',
      url: apiPath.room.search(),
      params: {
        key: key,
        mode: '3', // 일단 통합검색(제목 + 상품명)으로 통일
        page: pageParam,
      }
    });
    return { content, nextPage: pageParam + 1, last };
  } catch (error) {
    alertError(error);
  }
};

export default searchAuctionRooms;
