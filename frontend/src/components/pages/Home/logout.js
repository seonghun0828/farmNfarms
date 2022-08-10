import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const logout = async () => {
    try {
        const { data : { message, statusCode } } = await axios({
            method: 'post',
            url: apiPath.auth.logout(),
            withCredentials: true
        });
        if (statusCode === 200) {
            localStorage.removeItem('isLogin');
            window.alert('로그아웃 되었습니다.');
            window.location.href = '/';
        }
        else {
            throw new Error(message);
        }
    } catch (e) {
        alertError(e);
    }
}

export default logout;