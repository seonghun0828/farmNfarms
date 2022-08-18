import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import theme from '../../../common/theme';
import Swal from "sweetalert2";

const logout = async () => {
    try {
        const { data : { message, statusCode } } = await axios({
            method: 'post',
            url: apiPath.auth.logout(),
            withCredentials: true
        });
        if (statusCode === 200) {
            Swal.fire({
                title: '성공!',
                text: '성공적으로 로그아웃 되었습니다.',
                width: 300,
                imageUrl: '/assets/Swal_image/corn.png',
                imageHeight: 150,
                confirmButtonColor: theme.colors.green3, 
              })
              .then(() => {
                  localStorage.removeItem('isLogin');
                  window.location.href = '/';
              })
        }
        else {
            throw new Error(message);
        }
    } catch (e) {
        alertError(e);
    }
}

export default logout;