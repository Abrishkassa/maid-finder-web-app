import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.8.168:8000/api",
  headers: {
    "content-type": "application/json",
    withCredentials: true,
  },
  // timeout: 10000,
});

export default instance;
