import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const createAuctionRoom = async (title, description, thumbnailIdx, items, phone) => {
    try {
        const result = await axios({
            method: 'post',
            url: apiPath.room.createRoom(phone),
            data: {
                title,
                description,
                thumbnail: thumbnailIdx,
                details: items
            }
        });
        // 데이터 받으면 idx 빼서 리턴하기
        console.log(result);

    } catch (e) {
        alertError(e);
    }
}

export default createAuctionRoom;