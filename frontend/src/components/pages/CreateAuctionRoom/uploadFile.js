import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';

const uploadFile = async (formData) => {
    try {
        const result = await axios({
            method: 'post',
            url: apiPath.room.saveImg(),
            data: formData
        });
        // 데이터 받으면 idx 빼서 리턴하기
        console.log(result);
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
        console.log(e);
        // const { status } = e.response;
        // if (status === 401 || status === 404)
        //     setLoginFail(true);
        
        // else 
        //     alertError(e);
        // return false;
    }
}

export default uploadFile;