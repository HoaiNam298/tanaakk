import axios from "axios";
import AuthService from "./AuthService";
export default class JobService {
  getJobs(token) {
    return axios.get("http://localhost:8080/api/jobs/getall",AuthService(token));
  }
  addJob(job,token) {
    return axios.post("http://localhost:8080/api/jobs/add",job,AuthService(token))
  }
  updateJob(id, job,token) {
    return axios.post("http://localhost:8080/api/jobs/update?id=" + id, job,AuthService(token))
  }

  deleteJob(id,token) {
    return axios.get("http://localhost:8080/api/jobs/delete?id="+id,AuthService(token))
  }
  getJobById(id,token){
    return axios.get("http://localhost:8080/api/jobs/getjobbyid?id="+id,AuthService(token));
  }
}