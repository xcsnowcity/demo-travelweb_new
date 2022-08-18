import { getJSON } from './ajax/index.js';

const getData = (url, options) => {
    return getJSON(url, {
        timeoutTime: 30000,
        ...options
    })
        .then(response=>{
            if(response.code!==200) throw new Error(`出错了:${response.code}`);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}

export default getData;

