import axios from 'axios';
import { alertError } from '../../../common/alertError';

const login = async (phone, password, setLoginFail) => {
    try {
        const { data: {statusCode, accessToken}} = await axios({
            method: 'post',
            url: '/api/v1/auth/login',
            data: {
                phone,
                password
            }
        });
        console.log(statusCode, accessToken);
        if (statusCode === 200) {
            setLoginFail(false);
            window.alert('로그인 성공!');
            return true;
        } else {
            setLoginFail(true);
            return false;
        }

    } catch (e) {
        alertError(e);
        return false;
    }
}

export default login;