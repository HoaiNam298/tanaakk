import axios from 'axios';
import AuthService from './AuthService';
export default class JobPositionService {
  getJobPositions(token) {
    return axios.get("http://localhost:8080/api/jobpositions", AuthService(token));
  }
  getByIdJobPosition(id,token){
    return axios.get("http://localhost:8080/api/jobpositions-by-id?id="+id,AuthService(token))
  }
  deleteByIdJobPosition(id,token){
    return axios.delete("http://localhost:8080/api/jobpositions-by-id?id="+id,AuthService(token))
  }

  addJobPosition(id, positionName,token) {
    return axios.post("http://localhost:8080/api/jobpositions", {id: id, positionName: positionName },AuthService(token));

  }
  
  updateJobPosition(id,positionName,token)
  {
    return axios.post("http://localhost:8080/api/jobpositions", { id: id, positionName: positionName },AuthService(token));

  }

}
