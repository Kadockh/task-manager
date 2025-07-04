import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://task-manager-api-alpha-ten.vercel.app",
})