import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(sessionStorage.getItem('token') || null)

  const login = (token) => {
    sessionStorage.setItem('token', token)
    setToken(token)
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)