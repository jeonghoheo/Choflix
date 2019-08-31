import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "3dc06843128bf389d4131f57221ed170",
    language: "ko"
  }
});

export default api;
