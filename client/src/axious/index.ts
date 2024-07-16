import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    token
      ? (config.headers["Authorization"] = `Bearer ${token}`)
      : (config.headers["Authorization"] = null);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
