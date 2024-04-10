import axios from "axios";
import AuthService from "./AuthService";
export default class EmployerService {
   
  getEmployers(token) {
    return axios.get("http://localhost:8080/employers/getall", AuthService(token));
  }

  getEmployerById(id,token) {
    return axios.get("http://localhost:8080/employers/getbyid?id=" + id,AuthService(token))
  }

  getEmployerByEmail(email,token) {
    return axios.get("http://localhost:8080/employers/findbyemail?email=" + email,AuthService(token))
  }

  addEmployers(employer,token) {
    return axios.post("http://localhost:8080/employers/add", employer,AuthService(token));
  }

  updateEmployers(id, employer,token) {
    return axios.post("http://localhost:8080/employers/update?id=" + id, employer,AuthService(token));
  }

  deleteEmployers(id,token) {
    return axios.get("http://localhost:8080/employers/delete?id=" + id,AuthService(token))
  }
}