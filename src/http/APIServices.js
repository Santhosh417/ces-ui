/* eslint-disable */
import axios from 'axios';
// const API_URL = 'http://127.0.0.1:8000/';
// const API_URL = 'https://ces-service.herokuapp.com/';
const API_URL = 'https://ces-service-test.herokuapp.com/';
export class APIService {
  constructor() {
  }
  authenticateLogin(credentials) {
    const url = `${API_URL}api/login/`;
    return axios.post(url, credentials);
  }

  getStudentInfo(param_pk) {
    const url = `${API_URL}api/students/${param_pk}`;
    let token = localStorage.getItem('token');
    console.log(":::token:::::"+token);
    const response = axios.get(url, {headers: {
      'Authorization': 'Token ' + token
    }});
    console.log(":::response:::::"+response);

    return response;
  }

   getEnrollment(param_pk) {
    const url = `${API_URL}api/enrollments/${param_pk}`;
    let token = localStorage.getItem('token');
    console.log(":::token:::::"+token);
    const response = axios.get(url, {headers: {
      'Authorization': 'Token ' + token
    }});
    console.log(":::response:::::"+response);

    return response;
  }

  updateEnrollment(param_pk, body){
    console.log('Hi');
    const url = `${API_URL}api/enrollments/${param_pk}`;
    let token = localStorage.getItem('token');
     console.log(":::url:::::"+url);
     const response = axios.put(url, body, {headers: {
         'Authorization': 'Token ' + token
       }});
     console.log(":::response:::::"+response);
    return response;
  }
  deleteEnrollment(param_pk) {
    const url = `${API_URL}api/enrollments/${param_pk}`;
    let token = localStorage.getItem('token');
    console.log(":::url:::::"+url);
    const response = axios.delete(url, {headers: {
        'Authorization': 'Token ' + token
      }});
    console.log(":::response:::::"+response);

    return response;
  }

  getCourses(param_pk){
    const url = `${API_URL}api/getCourses/${param_pk}`;
    let token = localStorage.getItem('token');
    console.log(":::url:::::"+url);
    const response = axios.get(url, {headers: {
        'Authorization': 'Token ' + token
      }});
    console.log(":::response:::::"+response);

    return response;
  }

  addEnrollment(enrollment) {
    const url = `${API_URL}api/enrollments/`;
    let token = localStorage.getItem('token');
    console.log(":::url:::::" + url);
    const response = axios.post(url, enrollment, {headers: {
        'Authorization': 'Token ' + token
      } });
    console.log(":::response:::::"+response);

    return response;
  }
}
