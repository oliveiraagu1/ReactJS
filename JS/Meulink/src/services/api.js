import axios from "axios";
export const key = "9d729282a34a00d1e9e03ed174eb0523468bc8f1";

const api = axios.create({
  baseURL: "https://api-ssl.bitly.com/v4/",
  headers:{
      "Authorization": `Bearer ${key}`
  }
});

export default api;
