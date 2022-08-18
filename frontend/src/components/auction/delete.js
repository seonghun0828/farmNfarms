import axios from "axios";
import apiPath from '../../common/apiPath';

const deleteRoom = async (roomId) => {
  try {
    const { data: { success } } = await axios({
      method: 'delete',
      url: apiPath.room.deleteRoom(roomId),
    });
    if (success === true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e)
    return false;
  }
}

export default deleteRoom;
