import axios from 'axios';

const endpoint = 'http://localhost:4000';

//Save Item
export function saveItem(item){
    return axios.post(`${endpoint}/inventory/saveitem`, {item});
  }

//Get all Items
export function getItems(){
    return axios.get(`${endpoint}/inventory/getitems`);
}

//delete Item
export function deleteItem(id){
    return axios.delete(`${endpoint}/inventory/delete/${id}`);
}

//edit Item
export function editItem(item, id){
    return axios.post(`${endpoint}/inventory/edit/${id}`, {item});
}

export function selectItem(id){
    return axios.get(`${endpoint}/inventory/${id}`);
}