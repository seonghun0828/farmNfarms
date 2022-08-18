import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const uploadFile = async (formData) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: apiPath.room.saveImg(),
            data: formData
        });
        // idx 리턴하기
        return data;
    } catch (e) {
        alertError(e);
    }
}

export default uploadFile;