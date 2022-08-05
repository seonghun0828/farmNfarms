import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const getAuctionRooms = async (pageParam) => {
  try {
    const {
      data: { content, last },
    } = await axios({
      method: 'GET',
      url: apiPath.room.rooms() + '?page=' + pageParam,
    });
    return { content, nextPage: pageParam + 1, last };
  } catch (error) {
    alertError(error);
  }
};

export default getAuctionRooms;
