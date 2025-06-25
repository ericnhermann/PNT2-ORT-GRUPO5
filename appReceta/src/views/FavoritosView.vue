<template>
  <div class="container py-4">
    <div class="favoritos-header">
      <h2>Mis Recetas Favoritas</h2>
      <div v-if="recetasFavoritas.length" class="buscador-wrapper">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar en favoritos..."
          class="form-control buscador"
        />
      </div>
    </div>

    <div v-if="favoritosFiltrados.length" class="recetas-grid">
      <div
        v-for="receta in favoritosFiltrados"
        :key="receta.id"
        class="recetas-card"
        @click="irADetalle(receta.id)"
      >
        <button
          class="favorito-btn activa"
          @click.stop="eliminarDeFavoritos(receta.id)"
          aria-label="Quitar de favoritos"
        >★</button>

        <img
          v-if="receta.enlaceImagen"
          :src="receta.enlaceImagen"
          alt="Imagen receta"
          class="receta-img"
        />

        <div class="receta-body">
          <h3 class="receta-titulo">{{ receta.nombreReceta }}</h3>
          <p class="receta-texto">
            <strong>Categoría:</strong>
            {{ receta.categoria || "Sin categoría" }}
          </p>
          <p class="receta-texto">
            <strong>Puntaje:</strong> {{ getEstrellas(receta.puntajeReceta) }}
          </p>
          <p class="receta-texto">
            <strong>Ingredientes:</strong> {{ countIngredientes(receta) }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="!recetasFavoritas.length" class="text-center py-5">
      <i class="fas fa-heart mb-3" style="font-size:4rem;color:#ccc"></i>
      <h4 class="text-muted mb-3">No tienes recetas favoritas</h4>
      <p class="text-muted mb-4">
        Explora nuestras recetas y márcalas con la estrella ★
      </p>
      <router-link to="/recetas" class="btn btn-success btn-lg">
        Ver Recetas
      </router-link>
    </div>

    <div v-else class="text-center py-3">
      <p class="text-muted">
        No se encontraron recetas favoritas que coincidan con tu búsqueda.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getAllRecetas, updateUserFavoritos } from "../service/api";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const recetas = ref([]);
const favoritos = ref([]);
const busqueda = ref("");
const authStore = useAuthStore();

onMounted(async () => {
  recetas.value = await getAllRecetas();
  favoritos.value = Array.isArray(authStore.user?.favoritos)
    ? [...authStore.user.favoritos]
    : [];
});

const recetasFavoritas = computed(() =>
  recetas.value.filter(r => favoritos.value.includes(r.id))
);

const favoritosFiltrados = computed(() => {
  const t = busqueda.value.toLowerCase().trim();
  return t
    ? recetasFavoritas.value.filter(r =>
        r.nombreReceta.toLowerCase().includes(t)
      )
    : recetasFavoritas.value;
});

async function eliminarDeFavoritos(id) {
  const idx = favoritos.value.indexOf(id);
  if (idx !== -1) {
    favoritos.value.splice(idx, 1);
    await updateUserFavoritos(authStore.user.id, favoritos.value);
    authStore.user.favoritos = [...favoritos.value];
    localStorage.setItem("user", JSON.stringify(authStore.user));
  }
}

function countIngredientes(r) {
  return [
    r.ingrediente1,
    r.ingrediente2,
    r.ingrediente3,
    r.ingrediente4,
    r.ingrediente5,
  ].filter(i => i && i.trim()).length;
}

function getEstrellas(score) {
  const llenas = Math.round(score);
  return Array.from({ length: 5 }, (_, i) => (i < llenas ? "★" : "☆")).join("");
}

function irADetalle(id) {
  router.push({ name: "RecetaDetalleView", params: { id: id.toString() } });
}
</script>

<style scoped>
.favoritos-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.favoritos-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: #fff;
}

.buscador-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;  
}
.buscador {
  width: 100%;
  max-width: 500px;
  padding: 0.6rem 1rem;
  font-size: 1.1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.recetas-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
}
@media (min-width: 576px) {
  .recetas-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .recetas-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .recetas-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.recetas-card {
  background: #fff;
  border: 2px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.recetas-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.receta-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.receta-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.receta-titulo {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #222;
}
.receta-texto {
  color: #444;
  margin-bottom: 0.4rem;
  line-height: 1.3;
}
.receta-texto:last-child {
  margin-bottom: 0;
}

.favorito-btn {
  position: absolute;
  top: 6px;
  right: 10px;
  width: 38px;
  height: 38px;
  background: rgba(0,0,0,0.6);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  line-height: 1;
  color: #fff;
  transition: background 0.2s, color 0.2s;
}
.favorito-btn:hover {
  background: rgba(0,0,0,0.8);
}
.favorito-btn.activa {
  color: gold;
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
