// utils/axiosInstance.js
import axios from "axios"
import { URI } from "../const"

const axiosInstance = axios.create({
  baseURL: URI, 
  withCredentials: true, 
})

export default axiosInstance
