<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Crear Cuenta</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" placeholder="Ingrese su usuario" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Repetir Contraseña:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Repita su contraseña" required />
        </div>
        <button type="submit" class="register-button">Crear Cuenta</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="success" class="success-message">Usuario creado correctamente. Redirigiendo...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser, getAllUsers } from '../service/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)

const handleRegister = async () => {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }
  if (username.value.length < 3 || password.value.length < 3) {
    error.value = 'El usuario y la contraseña deben tener al menos 3 caracteres.'
    return
  }
  // Verificar si el usuario ya existe
  const users = await getAllUsers()
  if (users.some(u => u.name === username.value)) {
    error.value = 'El usuario ya existe.'
    return
  }
  try {
    await createUser(username.value, password.value)
    // Loguear automáticamente
    await authStore.login(username.value, password.value)
    router.push('/perfil')
  } catch (e) {
    error.value = 'Error al crear el usuario.'
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.register-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.register-box h2 {
  color: #000;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #000;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #000;
}

input::placeholder {
  color: #666;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.register-button:hover {
  background-color: #45a049;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}
.success-message {
  color: #4CAF50;
  margin-top: 1rem;
  text-align: center;
}
</style> 