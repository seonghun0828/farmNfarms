import axios from 'axios';
import apiPath from './apiPath';
import { alertError } from './alertError';
import { save } from './tokenSlice';

const reissue = async (dispatch) => {
    try {
        const { data: { message, statusCode, phone, accessToken } } = await axios({
            method: 'post',
            url: apiPath.auth.reissue(),
        });
        if (statusCode === 200) {
            console.log('success reissue!');
            dispatch(save({
                isLogin: true,
                phone,
                accessToken
            }));
            // 5분마다 다시 reissue 요청
            setTimeout(() => reissue(dispatch), 1000 * 60 * 5);
        } else {
            console.log('fail reissue!');
            throw new Error(message);
        }

    } catch (e) {
        alertError(e);
    }
}

export default reissue;