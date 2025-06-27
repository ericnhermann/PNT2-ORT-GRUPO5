<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-title">AppReceta</router-link>

    <!-- Menú hamburguesa para móviles -->
    <button
      class="hamburger"
      @click="toggleMenu"
      :class="{ active: isMenuOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="navbar-menu" :class="{ active: isMenuOpen }">
      <router-link to="/" class="navbar-item" @click="closeMenu"
        >Inicio</router-link
      >
      <router-link to="/recetas" class="navbar-item" @click="closeMenu"
        >Recetas</router-link
      >
      <router-link
        v-if="user?.role === 'user'"
        to="/favoritos"
        class="navbar-item"
        >Favoritos</router-link
      >
      <router-link to="/acerca" class="navbar-item" @click="closeMenu"
        >Acerca De</router-link
      >
      <router-link
        v-if="user?.role === 'admin'"
        to="/admin"
        class="navbar-item"
        @click="closeMenu"
        >Admin</router-link
      >
    </div>

    <div class="navbar-right">
      <div v-if="!isLoggedIn" class="navbar-auth">
        <router-link to="/login" class="auth-button" @click="closeMenu"
          >Iniciar Sesión</router-link
        >
        <router-link to="/register" class="auth-button" @click="closeMenu"
          >Crear Cuenta</router-link
        >
      </div>
      <div v-else class="navbar-auth">
        <router-link to="/perfil" class="auth-button" @click="closeMenu"
          >Mi Perfil</router-link
        >
        <button class="auth-button logout-button" @click="logout">
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const busqueda = ref("");
const authStore = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.getUser);

const logout = () => {
  authStore.logout();
  router.push("/");
  closeMenu();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const buscar = () => {
  console.log("Buscando:", busqueda.value);
};
</script>

<style scoped>
.navbar {
  position: relative;
  width: 100%;
  background-color: #4caf50;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.navbar-title {
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  z-index: 1001;
}

/* Menú hamburguesa */
.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.navbar-item {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  padding: 0.4rem 0.8rem;
  border: 2px solid transparent;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  min-width: 110px;
  text-align: center;
}

.navbar-item:hover {
  background-color: white;
  color: #4caf50;
  border-color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-auth {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.auth-button {
  padding: 0.4rem 0.8rem;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 110px;
  text-align: center;
  display: inline-block;
}

.auth-button:hover {
  background-color: white;
  color: #4caf50;
}

.logout-button {
  background-color: #e57373;
  border-color: #e57373;
  color: white;
}

.logout-button:hover {
  background-color: #c62828;
  color: white;
  border-color: #c62828;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .hamburger {
    display: flex;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100vh;
    background-color: #4caf50;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: left 0.3s ease;
    z-index: 1000;
  }

  .navbar-menu.active {
    left: 0;
  }

  .navbar-item {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
    min-width: 150px;
  }

  .navbar-right {
    gap: 0.5rem;
  }

  .navbar-auth {
    flex-direction: column;
    gap: 0.5rem;
  }

  .auth-button {
    min-width: 120px;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .navbar-title {
    font-size: 1.4rem;
  }

  .navbar-item {
    min-width: 120px;
    font-size: 1.1rem;
  }

  .auth-button {
    min-width: 100px;
    font-size: 0.9rem;
  }
}
</style>
