import axios from "axios";

const API_BASE_URL = `https://guarded-ocean-66324.herokuapp.com/api`;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
