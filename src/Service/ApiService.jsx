import axios from "axios";
import config from "../Utils/config.js";

const api = axios.create(
    {
        baseURL: config.BASE_URL,
        headers: {
            "Content-Type": "application/json"
        }
    }
)

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('accessToken');

    if(config.authenticate === true && token){
        console.log("Inside Authenticate")
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>Promise.reject(error))

api.interceptors.response.use((response)=>{
    
    return response;
}, (error)=>{
    // toast.error(error.response.data.message) || "Error occured, Please try again"
    return Promise.reject(error)
})

export default api;