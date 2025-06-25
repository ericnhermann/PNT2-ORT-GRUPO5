<script setup>

import CarruselSugerenciasHome from '../components/CarruselSugerenciasHome.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="home">
    <h1>Bienvenido a AppReceta</h1>
    <p>Tu lugar para descubrir y compartir las mejores recetas</p>

    <div class="features">

        <div class="feature-card">
          <router-link to="/recetas" class="feature-card-link">
          <h3>Explora Recetas</h3>
          <p>Descubre nuevas recetas de todo el mundo</p>
          </router-link>
        </div>

      <div class="feature-card">
    <router-link to="/CrearReceta" class="feature-card-link">
    <h3>Comparte</h3>
    <p>Compartí tus propias recetas con la comunidad</p>
      </router-link>
</div>

      <div class="feature-card">
        <h3>Guarda Favoritos</h3>
        <p>Accedé fácil a tus recetas favoritas</p>
      </div>
    </div>
    <CarruselSugerenciasHome />
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 1.5rem 1rem;
}

h1 {
  color: #4caf50;
  margin-bottom: 1rem;
}

.features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
}

.feature-card {
  background-color: #f5f5f5;
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 280px;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #4caf50;
  margin-bottom: 1rem;
}

.feature-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
