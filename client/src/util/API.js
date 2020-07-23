import axios from "axios";

export default {
  submitLogin: (loginData) => {
    return axios.post("/api/users/login", loginData);
  },
  submitCreateAccount: (createData) => {
    return axios.post("/api/users", createData);
  },
};
