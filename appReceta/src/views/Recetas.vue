<template>
  <div class="container py-4">
      <div class="acciones-superiores mb-4">
        <button class="btn btn-outline-success" @click="irAMisRecetas">Mis Recetas</button>
        <button class="btn btn-success" @click="irACrearReceta">Subir Receta</button>
    </div>
    <!-- Buscador -->
    <div class="mb-4 buscador-wrapper">
      <input
        type="text"
        v-model="busqueda"
        placeholder="Buscar..."
        class="form-control buscador"
      />
    </div>

    <div class="row">
      <div
        v-for="receta in recetasFiltradas"
        :key="receta.id"
        class="col-12 col-sm-6 col-md-4 mb-4"
      >
        <div
          class="card border border-light border-2 position-relative"
          style="cursor: pointer"
          @click="irADetalle(receta.id)"
        >
          <button
            class="favorito-btn"
            @click.stop="toggleFavorita(receta)"
            :class="{ activa: esFavorita(receta.id) }"
            :title="esFavorita(receta.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
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

    <p v-if="!recetasFiltradas.length" class="text-muted text-center">
      No se encontraron recetas.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getAllRecetas } from "../service/api";

const router = useRouter();
const recetas = ref([]);
const busqueda = ref("");
const favoritos = ref([]);

onMounted(async () => {
  try {
    const data = await getAllRecetas();
    recetas.value = data;
    cargarFavoritos();
  } catch (error) {
    console.error("Error al obtener recetas:", error);
  }
});

function cargarFavoritos() {
  const favoritosGuardados = localStorage.getItem("favoritos");
  if (favoritosGuardados) {
    favoritos.value = JSON.parse(favoritosGuardados);
  } else {
    favoritos.value = [];
  }
}

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
}

function esFavorita(recetaId) {
  return favoritos.value.includes(recetaId);
}

function toggleFavorita(receta) {
  const indice = favoritos.value.indexOf(receta.id);
  
  if (indice === -1) {
    favoritos.value.push(receta.id);
  } else {
    favoritos.value.splice(indice, 1);
  }
  
  // Guardar cambios en localStorage
  guardarFavoritos();
}

const recetasFiltradas = computed(() => {
  const texto = busqueda.value.toLowerCase().trim();
  if (!texto) return recetas.value;
  return recetas.value.filter((receta) =>
    receta.nombreReceta?.toLowerCase().includes(texto)
  );
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

function irADetalle(id) {
  router.push({ name: "RecetaDetalleView", params: { id: id.toString() } });
}

const irAMisRecetas = () => {
  router.push('/MisRecetas');
};

const irACrearReceta = () => {
  router.push('/CrearReceta');
};

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
  outline: none;
}

.favorito-btn:focus {
  outline: none;
  box-shadow: none;
}

.favorito-btn.activa {
  color: gold;
}

.buscador-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buscador {
  max-width: 500px;
  width: 100%;
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
}

.acciones-superiores {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.acciones-superiores button {
  background-color: #1e1e1e;
  color: #fff;
  border: 2px solid #00c97e;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.acciones-superiores button:hover {
  background-color: #00c97e;
  color: #1e1e1e;
}

</style>