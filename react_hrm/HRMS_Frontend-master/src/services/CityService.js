import axios from "axios";
import AuthService from "./AuthService";
export default class CityService {
  getCities(token) {
    return axios.get("http://localhost:8080/api/cities/getAll",AuthService(token));
  }
}