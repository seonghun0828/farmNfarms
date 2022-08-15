import axios from 'axios';
import apiPath from '../../../common/apiPath';
import { alertError } from '../../../common/alertError';
import Swal from "sweetalert2";

const CreateVerification = async (phoneNumber) => {
  try {
    const { data  } = await axios({
      method: 'post',
      url: apiPath.verification.create(),
      data: {
        phoneNumber,
      }
    });
    // window.alert('메세지를 보냈습니다!');
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })

    Toast.fire({
      icon: 'success',
      title: '인증 번호를 전송하였습니다.'
    })
    return data;
  } catch (e) {
    alertError(e);
    return false;
  }
}

export default CreateVerification;