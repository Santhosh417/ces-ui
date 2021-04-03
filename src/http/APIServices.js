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

  getStudentInfo(param_pk) {
    const url = `${API_URL}api/students/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    const response = axios.get(url, {headers: headers});
    console.log(":::response:::::"+response);

    return response;
  }
}
