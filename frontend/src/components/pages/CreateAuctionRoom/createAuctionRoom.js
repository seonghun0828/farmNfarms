import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const createAuctionRoom = async (title, description, thumbnailIdx, items, phone) => {
    try {
        const { data: { AuctionRoomId }} = await axios({
            method: 'post',
            url: apiPath.room.createRoom(phone),
            data: {
                title,
                description,
                thumbnail: thumbnailIdx,
                details: items
            }
        });
        return AuctionRoomId;
    } catch (e) {
        alertError(e);
    }
}

export default createAuctionRoom;