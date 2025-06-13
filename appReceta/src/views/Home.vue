<template>
  <div class="home">
    <h1>Bienvenido a AppReceta</h1>
    <p>Tu lugar para descubrir y compartir las mejores recetas</p>
    <div class="features">
      <router-link to="/recetas" class="feature-card-link">
        <div class="feature-card">
          <h3>Explora Recetas</h3>
          <p>Descubre nuevas recetas de todo el mundo</p>
        </div>
      </router-link>
      <div class="feature-card">
        <h3>Comparte</h3>
        <p>Comparte tus propias recetas con la comunidad</p>
      </div>
      <div class="feature-card">
        <h3>Guarda Favoritos</h3>
        <p>Guarda tus recetas favoritas para acceder fácilmente</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente Home
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #4caf50;
  margin-bottom: 1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
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
}
</style>
