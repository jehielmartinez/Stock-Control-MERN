import axios from 'axios';

const endpoint = 'http://localhost:4000';

//get All Providers
export function getProviders(){
    return axios.get(`${endpoint}/providers/getproviders`);
  }

  //Save New Provider
export function saveProvider(provider){
    return axios.post(`${endpoint}/providers/saveprovider`, {provider});
  }

export function editProvider(provider, id){
    return axios.post(`${endpoint}/providers/edit/${id}`, {provider});
}

  //Delete One Provider
export function deleteProvider(id){
      return axios.delete(`${endpoint}/providers/delete/${id}`);
  }

  //Select Provider
export function selectProvider(id){
    return axios.get(`${endpoint}/providers/${id}`);
}