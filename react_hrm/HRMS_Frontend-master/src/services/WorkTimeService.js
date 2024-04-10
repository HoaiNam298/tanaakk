import axios from "axios";
import AuthService from "./AuthService";

export default class WorkTimeService {
  getWorkTimes(token) {
    return axios.get("http://localhost:8080/api/worktimes/getall", AuthService(token));
  }
}