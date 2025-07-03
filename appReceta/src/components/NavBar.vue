<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-title">AppReceta</router-link>

    <button
      class="hamburguesa"
      @click="toggleMenu"
      :class="{ activo: isMenuOpen }"
      aria-label="Menú"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div 
      v-if="isMenuOpen" 
      class="menu-overlay" 
      @click="closeMenu"
    ></div>

    <div class="navbar-menu" :class="{ activo: isMenuOpen }">
      <router-link to="/" class="navbar-item" @click="closeMenu">
        Inicio
      </router-link>
      <router-link to="/recetas" class="navbar-item" @click="closeMenu">
        Recetas
      </router-link>
      <router-link
        v-if="user?.role === 'user'"
        to="/favoritos"
        class="navbar-item"
        @click="closeMenu"
      >
        Favoritos
      </router-link>
      <router-link to="/acerca" class="navbar-item" @click="closeMenu">
        Acerca De
      </router-link>
      <router-link
        v-if="user?.role === 'admin'"
        to="/admin"
        class="navbar-item"
        @click="closeMenu"
      >
        Admin
      </router-link>
    </div>

    <div class="navbar-right" :class="{ 'menu-open': isMenuOpen }">
      <div v-if="!isLoggedIn" class="navbar-auth">
        <router-link to="/login" class="auth-button" @click="closeMenu">
          Iniciar Sesión
        </router-link>
        <router-link to="/register" class="auth-button" @click="closeMenu">
          Crear Cuenta
        </router-link>
      </div>
      <div v-else class="navbar-auth">
        <router-link to="/perfil" class="auth-button" @click="closeMenu">
          Mi Perfil
        </router-link>
        <button class="auth-button logout-button" @click="logout">
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleResize = () => {
  if (window.innerWidth > 768 && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  document.body.style.overflow = '';
});

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
  min-height: 70px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-title {
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  z-index: 1001;
  transition: color 0.3s ease;
}

.navbar-title:hover {
  color: #e8f5e8;
}

/* Menú hamburguesa */
.hamburguesa {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.hamburguesa:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hamburguesa span {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s ease;
  border-radius: 2px;
}

.hamburguesa.activo span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburguesa.activo span:nth-child(2) {
  opacity: 0;
}

.hamburguesa.activo span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.navbar-item {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  min-width: 90px;
  text-align: center;
  white-space: nowrap;
}

.navbar-item:hover,
.navbar-item.router-link-activo {
  background-color: white;
  color: #4caf50;
  border-color: white;
  transform: translateY(-1px);
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
  padding: 0.5rem 1rem;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
  font-size: 0.9rem;
}

.auth-button:hover {
  background-color: white;
  color: #4caf50;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

@media (max-width: 1024px) {
  .navbar {
    padding: 1rem 1.5rem;
  }
  
  .navbar-menu {
    gap: 1rem;
  }
  
  .navbar-item {
    min-width: 80px;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .auth-button {
    min-width: 90px;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
    position: relative;
  }

  .hamburguesa {
    display: flex;
  }

  .menu-overlay {
    display: block;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    background-color: #4caf50;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0;
    transition: left 0.3s ease;
    z-index: 1000;
    padding: 80px 0 20px 0;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    overflow-y: auto;
  }

  .navbar-menu.activo {
    left: 0;
  }

  .navbar-item {
    font-size: 1.1rem;
    padding: 1rem 2rem;
    min-width: auto;
    width: 100%;
    text-align: left;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .navbar-item:hover {
    background-color: rgba(255,255,255,0.1);
    color: white;
    transform: none;
    padding-left: 2.5rem;
  }

  .navbar-right {
    position: fixed;
    bottom: 20px;
    left: -100%;
    width: 280px;
    transition: left 0.3s ease;
    z-index: 1000;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .navbar-right.menu-open {
    left: 0;
  }

  .navbar-auth {
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }

  .auth-button {
    width: 100%;
    min-width: auto;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.8rem;
  }

  .navbar-title {
    font-size: 1.4rem;
  }

  .navbar-menu {
    width: 100%;
  }

  .navbar-right {
    width: 100%;
    padding: 0 15px;
  }

  .navbar-item {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .auth-button {
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .navbar-item,
  .auth-button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>