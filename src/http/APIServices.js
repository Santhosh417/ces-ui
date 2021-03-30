/* eslint-disable */
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/';
export class APIService {
  constructor() {
  }
  authenticateLogin(credentials) {
    const url = `${API_URL}api/login/`;
    return axios.post(url, credentials);
  }
}
