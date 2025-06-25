<template>
  <div class="container py-4">
    <div class="acciones-superiores mb-4">
      <button class="btn btn-outline-success" @click="irAMisRecetas">
        Mis Recetas
      </button>
      <button class="btn btn-success" @click="irACrearReceta">
        Subir Receta
      </button>
    </div>

    <div class="mb-4 buscador-wrapper">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar..."
        class="form-control buscador"
      />
    </div>

    <div class="recetas-grid">
      <div
        v-for="receta in recetasFiltradas"
        :key="receta.id"
        class="recetas-card"
        @click="irADetalle(receta.id)"
      >
        <button
          class="favorito-btn"
          @click.stop="toggleFavorita(receta)"
          :class="{ activa: receta.favorita }"
          aria-label="Favorita"
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

    <p v-if="!recetasFiltradas.length" class="text-center text-muted mt-4">
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
const favoritos = ref([]);      
const busqueda = ref("");

onMounted(async () => {
  try {
    const data = await getAllRecetas();
    recetas.value = data.map((r) => ({ ...r, favorita: false }));
    cargarFavoritos();
    recetas.value.forEach((r) => {
      if (favoritos.value.includes(r.id)) {
        r.favorita = true;
      }
    });
  } catch (e) {
    console.error("Error al cargar recetas:", e);
  }
});

function cargarFavoritos() {
  const salvos = localStorage.getItem("favoritos");
  favoritos.value = salvos ? JSON.parse(salvos) : [];
}

// Guardar en localStorage
function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
}

function toggleFavorita(receta) {
  receta.favorita = !receta.favorita;
  const idx = favoritos.value.indexOf(receta.id);
  if (receta.favorita && idx === -1) {
    favoritos.value.push(receta.id);
  } else if (!receta.favorita && idx !== -1) {
    favoritos.value.splice(idx, 1);
  }
  guardarFavoritos();
}

const recetasFiltradas = computed(() => {
  const t = busqueda.value.toLowerCase().trim();
  return recetas.value.filter((r) =>
    r.nombreReceta?.toLowerCase().includes(t)
  );
});

function countIngredientes(r) {
  return [
    r.ingrediente1,
    r.ingrediente2,
    r.ingrediente3,
    r.ingrediente4,
    r.ingrediente5,
  ].filter((i) => i && i.trim()).length;
}

function getEstrellas(score) {
  const llenas = Math.round(score);
  return Array.from({ length: 5 }, (_, i) => (i < llenas ? "★" : "☆")).join("");
}

function irADetalle(id) {
  router.push({ name: "RecetaDetalleView", params: { id: id.toString() } });
}
const irAMisRecetas = () => router.push("/MisRecetas");
const irACrearReceta = () => router.push("/CrearReceta");
</script>

<style scoped>
.acciones-superiores {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.acciones-superiores button {
  background: #1e1e1e;
  color: #fff;
  border: 2px solid #00c97e;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.acciones-superiores button:hover {
  background: #00c97e;
  color: #1e1e1e;
}

.buscador-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.recetas-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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
  background: rgba(0, 0, 0, 0.6);
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
  background: rgba(0, 0, 0, 0.8);
}
.favorito-btn.activa {
  color: gold;
}
</style>
