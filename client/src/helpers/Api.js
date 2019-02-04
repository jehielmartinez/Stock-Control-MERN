import axios from 'axios';

const endpoint = 'http://localhost:4000';

export function saveProvider(provider) {

    return axios.post(`${endpoint}/api/saveprovider`, {provider})
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            return err;
        })

}

        