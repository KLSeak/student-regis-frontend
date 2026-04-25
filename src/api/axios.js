import axios from 'axios'

const API = axios.create({
  baseURL: 'https://student-registration-4zn2.onrender.com/api',
  timeout: 30000
})

export const BASE_URL = 'https://student-registration-4zn2.onrender.com'

// Change localStorage to sessionStorage
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token') // 👈 change this
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API