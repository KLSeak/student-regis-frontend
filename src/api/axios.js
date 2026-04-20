import axios from 'axios'

const API = axios.create({
  baseURL: 'http://https://student-regis-frontend.leangseakkong.workers.dev/api'
})
export const BASE_URL = 'http://localhost:8000'  // ✅ must be exported!
// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API