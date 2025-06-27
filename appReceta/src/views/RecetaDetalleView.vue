<template>
  <div class="container py-4" v-cloak>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else class="receta-detalle">
      <div class="header-row">
        <div class="imagen-col">
          <img
            v-if="receta.enlaceImagen"
            :src="receta.enlaceImagen"
            alt="Imagen receta"
            class="imagen-receta"
          />
        </div>
        <div class="nombre-col">
          <h2>{{ receta.nombreReceta }}</h2>
          <p><strong>Categoría:</strong> {{ receta.categoria }}</p>
          <p><strong>Puntaje:</strong> {{ receta.puntajeReceta }}</p>
          <p class="fecha-modificacion">
            <strong>Fecha de Modificación:</strong>
            {{ receta.fechaModificacion }}
          </p>
        </div>
      </div>

      <section class="seccion-ingredientes">
        <h3>Ingredientes</h3>
        <ul class="lista-ingredientes">
          <li v-for="(ing, index) in ingredientes" :key="index">{{ ing }}</li>
        </ul>
      </section>

      <section class="seccion-instrucciones">
        <h3>Instrucciones</h3>
        <p>{{ receta.instrucciones }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getRecetaById } from "../service/api";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const receta = ref(null);
const loading = ref(true);
const error = ref(null);

function extraerIngredientes(receta) {
  return [
    receta.ingrediente1,
    receta.ingrediente2,
    receta.ingrediente3,
    receta.ingrediente4,
    receta.ingrediente5,
  ].filter((i) => i && i.trim() !== "");
}

const ingredientes = ref([]);

async function fetchReceta(id) {
  loading.value = true;
  error.value = null;
  receta.value = null;
  try {
    const data = await getRecetaById(id);
    receta.value = data;
    ingredientes.value = extraerIngredientes(data);
  } catch (e) {
    error.value = "Error al cargar la receta.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchReceta(props.id);
});

watch(
  () => props.id,
  (newId) => {
    fetchReceta(newId);
  }
);
</script>

<style scoped>
.container {
  max-width: 1100px; /* Más ancho */
  margin: 2rem auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 15px rgb(0 0 0 / 0.15);
  padding: 3rem 4rem; /* Más padding para espacio */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.loading {
  font-style: italic;
  color: #666;
  text-align: center;
  padding: 2rem 0;
}

.text-danger {
  color: #b00020;
  font-weight: 600;
  text-align: center;
  margin: 2rem 0;
}

.receta-detalle {
  display: flex;
  flex-direction: column;
  gap: 3rem; /* Más espacio vertical */
}

.header-row {
  display: flex;
  gap: 3rem; /* Más separación */
  align-items: center;
}

.imagen-col {
  flex: 0 0 320px; /* Imagen un poco más grande */
  max-width: 320px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.15);
}

.imagen-receta {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.imagen-receta:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.nombre-col h2 {
  margin: 0 0 0.5rem;
  font-weight: 700;
  font-size: 2rem; /* Más grande */
  color: #222;
}

.nombre-col p {
  margin: 0.4rem 0;
  font-size: 1.1rem;
  color: #555;
}

.fecha-modificacion {
  font-style: italic;
  font-size: 1rem;
  color: #777;
  margin-top: 1rem;
}

.seccion-ingredientes h3,
.seccion-instrucciones h3 {
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.3rem;
  color: #444;
}

.lista-ingredientes {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding: 0;
  margin: 0;
}

.lista-ingredientes li {
  background: #e2f0d9;
  color: #2a5d24;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 1px 4px rgb(42 93 36 / 0.3);
  user-select: none;
  transition: background-color 0.3s ease;
}

.lista-ingredientes li:hover {
  background: #c1dbb1;
  cursor: default;
}

.seccion-instrucciones p {
  font-size: 1.1rem;
  line-height: 1.7;
  white-space: pre-line;
  color: #333;
}
</style>
