import axios from 'axios'
import { BASE_URL } from '../const/api'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 1000,
})
