import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.API_URL2,
    headers: {
        "Content-Type": "application/json",
        "secret":process.env.API_KEY2,
    },
});