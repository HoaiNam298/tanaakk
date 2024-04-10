import axios from "axios";
import AuthService from "./AuthService";
export default class VacationService {
   
  createVacation(vacation,empId,token) {
    return axios.post("http://localhost:8080/api/vacation/insert/"+empId,vacation, AuthService(token));
  }
  updateVacation(vacation,empId,id,token) {
    return axios.post(`http://localhost:8080/api/vacation/update/${empId}/${id}`,vacation, AuthService(token));
  }

  deleteVacation(id,token) {
    return axios.get("http://localhost:8080/api/vacation/delete/" + id,AuthService(token))
  }
  findVacation(id,token) {
    return axios.get("http://localhost:8080/api/vacation/" + id,AuthService(token))
  }
}