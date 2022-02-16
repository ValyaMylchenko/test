import * as axios from 'axios';

export const getInfo = () => {
    return axios.get("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
    .then(response => response.data)
}