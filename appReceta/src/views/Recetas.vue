<template>
  <div class="container py-4">
    <div class="row">
      <div
        v-for="receta in recetas"
        :key="receta.id"
        class="col-12 col-sm-6 col-md-4 mb-4"
      >
        <div class="card border border-light border-2">
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
    recetas.value = await getAllRecetas();
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
  const estrellasLlenas = Math.round(puntaje); // Si querés redondear
  const totalEstrellas = 5;
  const estrellas = [];

  for (let i = 1; i <= totalEstrellas; i++) {
    estrellas.push(i <= estrellasLlenas ? "★" : "☆");
  }

  return estrellas.join("");
}
</script>
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* centra horizontalmente los items */
  gap: 2rem; /* espacio entre cards */
}

.card {
  margin: 10px; /* espacio alrededor de cada card */
  border: 2px solid white !important;
  border-radius: 0 !important;
}
</style>
