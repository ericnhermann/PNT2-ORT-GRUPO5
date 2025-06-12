<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        AppReceta
      </router-link>
    </div>
    <div class="navbar-menu">
      <router-link to="/" class="navbar-item">Inicio</router-link>
      <router-link to="/recetas" class="navbar-item">Recetas</router-link>
      <router-link to="/crear" class="navbar-item">Crear Receta</router-link>
    </div>
  </nav>
</template>

<script setup>
// Componente NavBar
</script>

<style scoped>
.navbar {
  background-color: #4CAF50;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
}

.navbar-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
