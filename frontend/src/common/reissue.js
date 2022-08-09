import axios from 'axios';
import apiPath from './apiPath';
import { alertError } from './alertError';
import { save } from './tokenSlice';

const reissue = async (dispatch) => {
    console.log('리이슈!');
    try {
        const { data} = await axios({
            method: 'post',
            url: apiPath.auth.reissue(),
        });
        console.log(data);
        // if (statusCode === 200) {
        //     dispatch(save({
        //         isLogin: true,
        //         phone,
        //         accessToken
        //     }));
        //     setLoginFail(false);
        //     window.alert('로그인에 성공했습니다.');
        //     return true;
        // }

    } catch (e) {
        // const { status } = e.response;
        // if (status === 401 || status === 404)
        //     setLoginFail(true);
        
        // else 
            // alertError(e);
            console.log(e);
        return false;
    }
}

export default reissue;