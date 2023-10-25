import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        "api-key":process.env.API_KEY,
    },
});