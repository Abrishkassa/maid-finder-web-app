import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.137.108:8000/api",
    headers: {
        'content-type': 'application/json',
    },
});

export default instance;