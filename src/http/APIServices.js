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

  getStudentInfo(studentID)  {
    const url = `${API_URL}api/students/` + studentID;
    console.log(url);
    // const response =  axios.get(url, studentId);
    const response =   axios.get(url, {
      auth: {
        username: 'admin',
        password: 'admin'
      }
    });
    console.log(response);
    return response;
  }
}
