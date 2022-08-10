import axios from "axios";

const url = "https://ranking-os-backend-production.up.railway.app";
export const api = axios.create({
  baseURL: url,
});

//https://ranking-os-backend-production.up.railway.app