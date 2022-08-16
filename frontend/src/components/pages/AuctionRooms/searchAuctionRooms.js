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
        mode: '1', // 제목으로만 일단 검색하기 (항목까지 검색하면 현재 중복제거가 안됨)
        page: pageParam,
      }
    });
    return { content, nextPage: pageParam + 1, last };
  } catch (error) {
    alertError(error);
  }
};

export default searchAuctionRooms;
