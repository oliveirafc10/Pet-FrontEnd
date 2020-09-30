import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sospet.herokuapp.com'
})

export default api;