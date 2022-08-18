import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';
import Swal from "sweetalert2";
import theme from '../../../common/theme';

const get_price = async (date, product) => {
    try {
        const { data : { datePrice } } = await axios({
            method: 'post',
            url: apiPath.price.all(),
            data: {
                date,
                product,
        }
    });
        return datePrice;
    } 
    catch (e) {
        if (e.response.status === 404) {
            Swal.fire({
                title: '에러!',
                text: '정확한 입력 값을 넣어주십시오.',
                width: 300,
                imageUrl: '/assets/Swal_image/먹힌사과.png',
                imageHeight: 150,
                confirmButtonColor: theme.colors.green3, 
            })
        }
        else {
            alertError(e);   
        }
        return null;
    }
}

export default get_price;