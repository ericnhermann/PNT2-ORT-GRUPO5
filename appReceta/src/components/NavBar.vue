<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-title">AppReceta</router-link>

    <div class="navbar-menu">
      <router-link to="/" class="navbar-item">Inicio</router-link>
      <router-link to="/recetas" class="navbar-item">Recetas</router-link>
      <router-link to="/cuenta" class="navbar-item">Cuenta</router-link>
      <router-link to="/acerca" class="navbar-item">Acerca De</router-link>
    </div>

    <div class="navbar-search">
      <input v-model="busqueda" type="text" placeholder="Buscar receta..." />
      <button @click="buscar">Buscar</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: relative;
  width: 100%;
  background-color: #4CAF50;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.navbar-title {
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
}

.navbar-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1.5rem;       
}

.navbar-item {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.navbar-search {
  display: flex;
  gap: 0.5rem;
}

.navbar-search input {
  padding: 0.4rem 0.8rem;
  border: 2px solid white;
  background-color: white;
  color: black;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.navbar-search input:focus {
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
}

.navbar-search button {
  padding: 0.4rem 0.8rem;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.navbar-search button:hover {
  background-color: white;
  color: #4CAF50;
}
</style>
