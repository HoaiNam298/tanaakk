import axios from "axios";
import AuthService from "./AuthService";
export default class JobSeekersService {
  getJobSeekers(token) {
    return axios.get("http://localhost:8080/api/jobseekers/getall", AuthService(token));
  }

  getJobSeekerById(id, token) {
    return axios.get("http://localhost:8080/api/jobseekers/getbyid?id=" + id, AuthService(token))
  }
}