import { defineStore } from 'pinia'

// Credenciales de prueba
const USERS = [
  { username: 'admin', password: 'admin' }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  actions: {
    login(username, password) {
      // Buscar usuario en las credenciales de prueba
      const user = USERS.find(u => 
        u.username === username && u.password === password
      )
      
      if (user) {
        this.user = { username: user.username }
        this.isAuthenticated = true
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  },
  
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  }
}) 