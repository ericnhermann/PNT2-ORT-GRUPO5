<template>
  <div class="perfil-container">
    <div class="perfil-box">
      <!-- Header con avatar -->
      <div class="perfil-header">
        <div class="avatar">
          <i class="fas fa-user"></i>
        </div>
        <h2>Mi Perfil</h2>
      </div>

      <!-- Información del usuario -->
      <div class="perfil-info">
        <div class="info-item">
          <i class="fas fa-user-circle"></i>
          <div>
            <label>Usuario</label>
            <p>{{ user?.username || 'No disponible' }}</p>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <div>
            <label>Email</label>
            <p>{{ user?.email || 'No disponible' }}</p>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-calendar-alt"></i>
          <div>
            <label>Miembro desde</label>
            <p>{{ formatDate(user?.createdAt) || 'No disponible' }}</p>
          </div>
        </div>
      </div>

      <!-- Estadísticas (opcional) -->
      <div class="stats-section" v-if="showStats">
        <h3>Estadísticas</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{ user?.recipesCount || 0 }}</span>
            <span class="stat-label">Recetas</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user?.favoritesCount || 0 }}</span>
            <span class="stat-label">Favoritas</span>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="actions-section">
        <button @click="editProfile" class="edit-button">
          <i class="fas fa-edit"></i>
          Editar Perfil
        </button>
        <button @click="handleLogout" class="logout-button">
          <i class="fas fa-sign-out-alt"></i>
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showStats = ref(true) // Cambiá esto según tu lógica

const user = computed(() => authStore.getUser)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const editProfile = () => {
  // Implementá la lógica para editar perfil
  router.push('/perfil/editar')
}

const formatDate = (dateString) => {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #23272f; /* Gris oscuro */
  padding: 0;
}

.perfil-box {
  background: #23272f; /* Mismo gris oscuro */
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  border: 1px solid #23272f;
  box-sizing: border-box;
  overflow-x: auto;
}

/* Header */
.perfil-header {
  min-width: 220px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 2rem;
}

.perfil-header h2 {
  color: #fff;
  margin: 0;
  font-weight: 600;
}

/* Información */
.perfil-info {
  flex: 1;
  margin-right: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #2c2f36;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-item i {
  color: #667eea;
  width: 20px;
  margin-right: 1rem;
  font-size: 1.1rem;
}

.info-item div {
  flex: 1;
}

.info-item label {
  display: block;
  font-size: 0.85rem;
  color: #bbb;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.info-item p {
  margin: 0;
  color: #fff;
  font-weight: 500;
}

/* Estadísticas */
.stats-section {
  flex: 0.7;
  margin-right: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #353945;
}

.stats-section h3 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: #2c2f36;
  border-radius: 8px;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  font-size: 0.9rem;
  color: #bbb;
}

/* Acciones */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 180px;
}

.edit-button, .logout-button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.edit-button {
  background-color: #667eea;
  color: white;
}

.edit-button:hover {
  background-color: #5a67d8;
  transform: translateY(-1px);
}

.logout-button {
  background-color: #f44336;
  color: white;
}

.logout-button:hover {
  background-color: #da190b;
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 1100px) {
  .perfil-box {
    flex-direction: column;
    width: 100vw;
    height: auto;
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
  .perfil-info, .stats-section {
    margin-right: 0;
  }
  .actions-section {
    min-width: 100px;
  }
}

@media (max-width: 600px) {
  .perfil-box {
    padding: 1rem 0.5rem;
  }
  .avatar {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>