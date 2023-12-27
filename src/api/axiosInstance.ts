import axios from "axios";
const { REACT_APP_BACKEND_BASE_URL } = process.env;
const axiosInstance = axios.create({
  baseURL: REACT_APP_BACKEND_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;