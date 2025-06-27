<template>
  <div class="perfil-container">
    <div class="perfil-box">
      <h2>Mi Perfil</h2>
      <div class="perfil-info">
        <p><strong>Usuario:</strong> {{ user?.username }}</p>
        <p v-if="user?.email"><strong>Email:</strong> {{ user.email }}</p>
        <p v-if="user?.createdAt"><strong>Miembro desde:</strong> {{ formatDate(user.createdAt) }}</p>
        <p><strong>Favoritos:</strong> {{ favoritosCount }}</p>
      </div>
      <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.getUser)

// Contador de favoritos desde localStorage
const favoritosCount = ref(0)

function cargarFavoritos() {
  const userData = localStorage.getItem("user")
  if (userData) {
    try {
      const parsed = JSON.parse(userData)
      favoritosCount.value = Array.isArray(parsed.favoritos) ? parsed.favoritos.length : 0
    } catch (e) {
      favoritosCount.value = 0
    }
  } else {
    favoritosCount.value = 0
  }
}

onMounted(() => {
  cargarFavoritos()
  // Escuchar cambios en localStorage (por si se modifican en otra pestaña)
  window.addEventListener('storage', cargarFavoritos)
})

onUnmounted(() => {
  window.removeEventListener('storage', cargarFavoritos)
})

// Formatear fecha
function formatDate(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-AR', options)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.perfil-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.perfil-box h2 {
  color: #000;
  margin-bottom: 1.5rem;
  text-align: center;
}

.perfil-info {
  margin: 1.5rem 0;
  color: #000;
}

.perfil-info p {
  margin: 0.5rem 0;
}

.perfil-info strong {
  color: #000;
}

.logout-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.logout-button:hover {
  background-color: #da190b;
}
</style>