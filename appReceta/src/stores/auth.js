import { defineStore } from 'pinia'
import { loginUser } from '../service/api'

// Credenciales de prueba
const USERS = [
  { username: 'admin', password: 'admin' }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user')
  }),
  
  actions: {
    async login(username, password) {
      const user = await loginUser(username, password)
      if (user) {
        this.user = { username: user.name, id: user.id }
        this.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
    }
  },
  
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  }
}) 