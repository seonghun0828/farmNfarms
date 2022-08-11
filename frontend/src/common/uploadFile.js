import axios from 'axios';
import apiPath from './apiPath';
import { alertError } from './alertError';

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
        console.log(e);
        alertError(e);
    }
}

export default uploadFile;