import axios from "axios";
console.log(import.meta.env.VITE_REACT_APP_API_URL);

const url = "https://ranking-os-backend-production.up.railway.app";
export const api = axios.create({
  baseURL: url,
});

//https://ranking-os-backend-production.up.railway.app