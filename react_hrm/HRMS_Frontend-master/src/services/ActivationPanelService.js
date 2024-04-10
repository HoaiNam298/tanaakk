import axios from "axios";
import AuthService from "./AuthService";
export default class ActivationPanelService {
  setApproved(panelForJob,token) {
    return axios.post("http://localhost:8080/api/activationpanel/setapproved",panelForJob,AuthService(token));
  }
  setUnapproved(panelForJob,token) {
    return axios.post("http://localhost:8080/api/activationpanel/setunapproved",panelForJob,AuthService(token));
  }
}