<template>
  <div class="recetas">
    <h1>Recetas</h1>
    <div class="recetas-grid">
      <!-- Aquí irá el listado de recetas cuando tengamos la API -->
      <div class="receta-card">
        <h3>Receta de ejemplo</h3>
        <p>Descripción de la receta...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica para obtener las recetas de la API
</script>

<style scoped>
.recetas {
  padding: 2rem;
}

.recetas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.receta-card {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.receta-card h3 {
  color: #4CAF50;
  margin-bottom: 1rem;
}
</style> 