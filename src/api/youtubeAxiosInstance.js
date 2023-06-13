import axios from "axios";

const youtubeAxiosInstance = axios.create({
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json",  },
});

export default youtubeAxiosInstance;
