import axios from "axios";

export default {
  submitLogin: (loginData) => {
    return axios.post("/api/users/login", loginData);
  },
  submitCreateAccount: (createData) => {
    return axios.post("/api/users", createData);
  },
  queryGoogleBooks: (search) => {
    return axios.get("/api/books/" + search);
  },
  saveBook: (book, userId) => {
    return axios.post("api/books", { book, userId });
  },
  getAllBooks: (userId) => {
    return axios.get("api/users/books/" + userId);
  },
};
