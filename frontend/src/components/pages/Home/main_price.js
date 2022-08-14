import axios from 'axios';
import { alertError } from '../../../common/alertError';
import apiPath from '../../../common/apiPath';

const main_price = async () => {
    try {
        const { data } = await axios({
            method: 'get',
            url: apiPath.price.main()
        });
        return data.products;
    } catch (e) {
        alertError(e);
        return null;
    }
}

export default main_price;