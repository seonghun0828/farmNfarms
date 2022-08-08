import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const get_price = async (date, product) => {
    console.log('fff')
    try {
        const { data } = await axios({
            method: 'get',
            url: apiPath.price.all(),
            data: {
                date,
                product,
        }
    });
        return data.data;
    } catch (e) {
        alertError(e);
        return null;
    }
}

export default get_price;