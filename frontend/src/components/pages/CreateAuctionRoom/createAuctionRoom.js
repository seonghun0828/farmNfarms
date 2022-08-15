import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import { changeStatus } from '../../../common/hostSlice';

const createAuctionRoom = async (title, description, thumbnailIdx, items, phone, dispatch) => {
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
        if (AuctionRoomId !== 0) {
            dispatch(changeStatus(true));
        }
        return AuctionRoomId;
    } catch (e) {
        alertError(e);
    }
}

export default createAuctionRoom;