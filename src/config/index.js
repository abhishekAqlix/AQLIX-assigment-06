import axios from "axios";
const BASE_URL = "http://localhost:8000/v1";

const API = axios.create({
    baseURL:BASE_URL
});

export default API
