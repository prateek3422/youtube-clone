import axios from "axios";


export const api = axios.create({
    baseURL: "https://youtube-clone-qb22.onrender.com",
    // baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
})