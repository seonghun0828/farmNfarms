import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import { save } from '../../../common/tokenSlice';

const logout = async () => {
    try {
        const { data : { message, statusCode } } = await axios({
            method: 'post',
            url: apiPath.auth.logout(),
            withCredentials: true
        });
        console.log(message);
        console.log(statusCode);
        if (statusCode === 200) {
            console.log('로그아웃 되었습니다.');
        }
        // if (statusCode === 200) {
        //     dispatch(save({
        //         phone,
        //         accessToken
        //     }));
        //     setLoginFail(false);
        //     localStorage.setItem('isLogin', true);
        //     window.alert('로그인에 성공했습니다.');
        //     return true;
        // }

    } catch (e) {
        console.log(e);
        // const { status } = e.response;
        // if (status === 401 || status === 404)
        //     setLoginFail(true);
        
        // else 
        //     alertError(e);
        // return false;
    }
}

export default logout;