import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import { save } from '../../../common/tokenSlice';
import Swal from "sweetalert2";
import theme from '../../../common/theme';

const login = async (phone, password, setLoginFail, dispatch) => {
    let flag = false;
    try {
        const { data: {statusCode, accessToken}} = await axios({
            method: 'post',
            url: apiPath.auth.login(),
            data: {
                phone,
                password
            },
            withCredentials: true
        });
        if (statusCode === 200) {
            dispatch(save({
                phone,
                accessToken
            }));
            setLoginFail(false);
            localStorage.setItem('isLogin', true);
            // window.alert('로그인에 성공했습니다.');
            // return true;
            Swal.fire({
                title: '성공!',
                text: '로그인에 성공하였습니다!',
                width: 300,
                imageUrl: '/assets/Swal_image/corn.png',
                imageHeight: 150,
                confirmButtonColor: theme.colors.green3, 
            })
            return true;
        }

    } catch (e) {
        const { status } = e.response;
        if (status === 401 || status === 404)
            setLoginFail(true);
        
        else 
            alertError(e);
        return false;
    }
}

export default login;