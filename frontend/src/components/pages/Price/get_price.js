import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

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
            alert('정확한 입력 값을 넣어주십시오');
        }
        else {
            alertError(e);   
        }
        return null;
    }
}

export default get_price;