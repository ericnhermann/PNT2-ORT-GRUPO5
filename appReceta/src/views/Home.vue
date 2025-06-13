<template>
  <div class="home">
    <h1>Bienvenido a AppReceta</h1>
    <p>Tu lugar para descubrir y compartir las mejores recetas</p>

    <div class="features">
      <div class="feature-card">
        <h3>Explora Recetas</h3>
        <p>Descubre nuevas recetas de todo el mundo</p>
      </div>
      <div class="feature-card">
        <h3>Comparte</h3>
        <p>Compartí tus propias recetas con la comunidad</p>
      </div>
      <div class="feature-card">
        <h3>Guarda Favoritos</h3>
        <p>Accedé fácil a tus recetas favoritas</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background-color: #f5f5f5;
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #4CAF50;
}
</style>
