<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Mis Recetas Favoritas</h2>
    
    <!-- Buscador - Solo se muestra si hay favoritos -->
    <div class="mb-4 buscador-wrapper" v-if="recetasFavoritas.length > 0">
      <input
        type="text"
        v-model="busqueda"
        placeholder="Buscar en favoritos..."
        class="form-control buscador"
      />
    </div>

    <!-- Lista de recetas favoritas -->
    <div class="row" v-if="favoritosFiltrados.length > 0">
      <div
        v-for="receta in favoritosFiltrados"
        :key="receta.id"
        class="col-12 col-sm-6 col-md-4 mb-4"
      >
        <div
          class="card border border-light border-2 position-relative"
          style="cursor: pointer"
          @click="irADetalle(receta.id)"
        >
          <!-- Estrella de favorito - siempre activa en esta vista -->
          <button
            class="favorito-btn activa"
            @click.stop="eliminarDeFavoritos(receta.id)"
            title="Quitar de favoritos"
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

    <!-- Mensaje cuando no hay favoritos -->
    <div v-else-if="recetasFavoritas.length === 0" class="text-center py-5">
      <div class="mb-4">
        <i class="fas fa-heart" style="font-size: 4rem; color: #ccc;"></i>
      </div>
      <h4 class="text-muted mb-3">No tienes recetas favoritas</h4>
      <p class="text-muted mb-4">
        Explora nuestras recetas y marca las que más te gusten con la estrella ★
      </p>
      <router-link to="/recetas" class="btn btn-success btn-lg">
        Ver Recetas
      </router-link>
    </div>

    <!-- Mensaje cuando no hay resultados de búsqueda -->
    <div v-else class="text-center py-3">
      <p class="text-muted">
        No se encontraron recetas favoritas que coincidan con tu búsqueda.
      </p>
    </div>
  </div>
</template>

<script setup>
// FavoritosView.vue
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllRecetas } from "../service/api";

const router = useRouter();
const recetas = ref([]); // Todas las recetas
const favoritos = ref([]); // IDs de recetas favoritas
const busqueda = ref("");

// Cargar recetas y favoritos al montar el componente
onMounted(async () => {
  try {
    const data = await getAllRecetas();
    recetas.value = data;
    cargarFavoritos();
  } catch (error) {
    console.error("Error al obtener recetas:", error);
  }
});

// Cargar favoritos desde localStorage
function cargarFavoritos() {
  const favoritosGuardados = localStorage.getItem("favoritos");
  if (favoritosGuardados) {
    favoritos.value = JSON.parse(favoritosGuardados);
  } else {
    favoritos.value = [];
  }
}

// Guardar favoritos en localStorage
function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
}

// Computed: recetas que están en favoritos
const recetasFavoritas = computed(() => {
  return recetas.value.filter(receta => favoritos.value.includes(receta.id));
});

// Computed: filtrar favoritos según búsqueda
const favoritosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim();
  if (!texto) return recetasFavoritas.value;
  return recetasFavoritas.value.filter((receta) =>
    receta.nombreReceta?.toLowerCase().includes(texto)
  );
});

// Eliminar receta de favoritos
function eliminarDeFavoritos(recetaId) {
  const indice = favoritos.value.indexOf(recetaId);
  if (indice !== -1) {
    favoritos.value.splice(indice, 1);
    guardarFavoritos();
  }
}

// Métodos auxiliares
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

.favorito-btn:hover {
  color: #ff6b6b;
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

.btn-success {
  background-color: #4caf50;
  border-color: #4caf50;
}

.btn-success:hover {
  background-color: #45a049;
  border-color: #45a049;
}
</style>