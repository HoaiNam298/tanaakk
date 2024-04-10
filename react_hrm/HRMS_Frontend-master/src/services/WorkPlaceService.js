import axios from "axios";
import AuthService from "./AuthService";

export default class WorkPlaceService {
  getWorkPlaces(token) {
    return axios.get("http://localhost:8080/api/workplaces/getall",AuthService(token));
  }
}