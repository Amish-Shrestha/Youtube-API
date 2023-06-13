import axios from "axios";

const localAxiosInstance = axios.create({
  baseURL: " http://localhost:3004",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
});

export default localAxiosInstance;
