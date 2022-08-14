import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const get_price = async (date, product) => {
    console.log(date, product)
    try {
        const { data : { datePrice } } = await axios({
            method: 'post',
            url: apiPath.price.all(),
            data: {
                date,
                product,
        }
    });
    console.log(datePrice);
        // return data;
    } catch (e) {
        alertError(e);
        return null;
    }
}

export default get_price;