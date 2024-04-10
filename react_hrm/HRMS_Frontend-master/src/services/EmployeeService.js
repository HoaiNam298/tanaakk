import axios from "axios";
import AuthService from "./AuthService";
export default class EmployeeService {
   
  getEmployees(token) {
    return axios.get("http://localhost:8080/employees/getAll", AuthService(token));
  }

  getEmployeeById(id,token) {
    return axios.get("http://localhost:8080/employees/" + id,AuthService(token))
  }

  getEmployeeByEmail(email,token) {
    return axios.get("http://localhost:8080/employees/findbyemail?email=" + email,AuthService(token))
  }

  addEmployees(employer,token) {
    return axios.post("http://localhost:8080/employees/add", employer,AuthService(token));
  }

  updateEmployees(id, employer,token) {
    return axios.post("http://localhost:8080/employees/update/" + id, employer,AuthService(token));
  }

  deleteEmployees(id,token) {
    return axios.get("http://localhost:8080/employees/delete/" + id,AuthService(token))
  }
}