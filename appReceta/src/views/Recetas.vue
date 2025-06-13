<template>
  <div class="container py-4">
    <div class="row">
      <div
        v-for="receta in recetas"
        :key="receta.id"
        class="col-12 col-sm-6 col-md-4 mb-4"
      >
        <div class="card border border-light border-2 position-relative">
          <!-- Estrella de favorito -->
          <button
            class="favorito-btn"
            @click="toggleFavorita(receta)"
            :class="{ activa: receta.favorita }"
          >
            ★
          </button>

          <img
            v-if="receta.enlaceImagen"
            :src="receta.enlaceImagen"
            class="card-img-top"
            alt="Imagen receta"
            style="height: 220px; object-fit: cover"
          />
          <div class="card-body">
            <h3 class="card-title text-truncate text-decoration-underline">
              {{ receta.nombreReceta }}
            </h3>

            <p class="card-text mb-1">
              <strong>Categoría:</strong> {{ receta.Categoria }}
            </p>
            <p class="card-text mb-1">
              <strong>Puntaje:</strong> {{ getEstrellas(receta.puntajeReceta) }}
            </p>
            <p class="card-text mb-0">
              <strong>Ingredientes:</strong> {{ countIngredientes(receta) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <p v-if="!recetas.length" class="text-muted">No se encontraron recetas.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllRecetas } from "../service/api";

const recetas = ref([]);

onMounted(async () => {
  try {
    const data = await getAllRecetas();
    // Agregamos propiedad `favorita` a cada receta
    recetas.value = data.map((r) => ({ ...r, favorita: false }));
  } catch (error) {
    console.error("Error al obtener recetas:", error);
  }
});

function countIngredientes(receta) {
  const ingredientes = [
    receta.ingrediente1,
    receta.ingrediente2,
    receta.ingrediente3,
    receta.ingrediente4,
    receta.ingrediente5,
  ];
  return ingredientes.filter((i) => i && i.trim() !== "").length;
}

function getEstrellas(puntaje) {
  const estrellasLlenas = Math.round(puntaje);
  const totalEstrellas = 5;
  const estrellas = [];

  for (let i = 1; i <= totalEstrellas; i++) {
    estrellas.push(i <= estrellasLlenas ? "★" : "☆");
  }

  return estrellas.join("");
}

function toggleFavorita(receta) {
  receta.favorita = !receta.favorita;
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.card {
  margin: 10px;
  border: 2px solid white !important;
  border-radius: 0 !important;
  position: relative;
}

.favorito-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s;
  padding: 0;
  line-height: 1;
  outline: none; /* quita el contorno del foco */
}

.favorito-btn:focus {
  outline: none;
  box-shadow: none; /* elimina cualquier sombra al hacer clic */
}

.favorito-btn.activa {
  color: gold;
}
</style>
