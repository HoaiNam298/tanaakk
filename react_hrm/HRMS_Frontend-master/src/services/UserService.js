import axios from "axios";
import AuthService from "./AuthService";
export default class UserService {
  getUsers(token) {
    return axios.get("http://localhost:8080/admin/users/getAll",AuthService(token));
  }
  getRoles(token) {
    return axios.get("http://localhost:8080/admin/users/roles",AuthService(token));
  }
  saveUsers(users,token) {
    return axios.post("http://localhost:8080/admin/users/grant",users,AuthService(token));
  }
<<<<<<< Updated upstream
  findById(userId,token) {
    return axios.post("http://localhost:8080/admin/users/"+userId,AuthService(token));
  }
  refreshToken(refreshToken){
    return axios.post("http://localhost:8080/api/refreshToken",refreshToken);
  }
=======
>>>>>>> Stashed changes
}