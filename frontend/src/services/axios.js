import axios from "axios";


export const api = axios.create({
    baseURL: "https://youtube-clone-qb22.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
})