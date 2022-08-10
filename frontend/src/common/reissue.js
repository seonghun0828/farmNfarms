import axios from 'axios';
import apiPath from './apiPath';
import { alertError } from './alertError';
import { save } from './tokenSlice';

const reissue = async (dispatch) => {
    if (!localStorage.getItem('isLogin'))
        return;
    try {
        const { data: { message, statusCode, phone, accessToken } } = await axios({
            method: 'post',
            url: apiPath.auth.reissue(),
            withCredentials: true
        });
        if (statusCode === 200) {
            console.log('success reissue!');
            dispatch(save({
                phone,
                accessToken
            }));
            
            localStorage.setItem('isLogin', true);
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