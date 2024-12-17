import axios from "axios";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
});