import axios from "axios";

const instance = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
<<<<<<< HEAD
  baseURL: "http://192.168.137.153:8000/api",
=======
  baseURL: "http://192.168.43.217:8000/api",
>>>>>>> e6c587a3662bfe54f2d3f94cbc16f6b2718b1d74
  headers: {
    "content-type": "application/json",
    withCredentials: true,
  },
  // timeout: 10000,
});

export default instance;
