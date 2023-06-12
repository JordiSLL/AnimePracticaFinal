import axios from 'axios' 
export default {
  registerUserApi(userData) {
    return axios.post("http://localhost:3000/api/users/register",userData);
  },
  loginUserApi(userData){
    return axios.post("http://localhost:3000/api/users/login",userData);
  }
}