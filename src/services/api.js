import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sospet.herokuapp.com/'
})

export default api;