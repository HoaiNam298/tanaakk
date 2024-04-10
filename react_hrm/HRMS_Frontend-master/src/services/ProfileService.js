import axios from "axios";
import AuthService from "./AuthService";
export default class ProfileService {
  saveProfile(userId,profile,token) {
    return axios.post("http://localhost:8080/profile/insert/"+userId,profile,AuthService(token));
  }
  findById(userId,token) {
    return axios.get("http://localhost:8080/profile/"+userId,AuthService(token));
  }
}