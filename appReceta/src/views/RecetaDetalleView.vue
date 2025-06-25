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
const ingredientes = ref([]);

// Busca en localStorage
function buscarRecetaLocal(id) {
  const guardadas = JSON.parse(localStorage.getItem('recetas')) || [];
  return guardadas.find(r => r.id === id) || null;
}

function extraerIngredientes(receta) {
  // Si la receta es propia, los ingredientes ya son un array
  if (Array.isArray(receta.ingredientes)) {
    return receta.ingredientes;
  }
  // Si viene de la API, extrae los campos individuales
  return [
    receta.ingrediente1,
    receta.ingrediente2,
    receta.ingrediente3,
    receta.ingrediente4,
    receta.ingrediente5,
  ].filter((i) => i && i.trim() !== "");
}

async function fetchReceta(id) {
  loading.value = true;
  error.value = null;
  receta.value = null;
  try {
    // 1. Busca primero en localStorage
    const local = buscarRecetaLocal(id);
    if (local) {
      receta.value = local;
      ingredientes.value = local.ingredientes;
    } else {
      // 2. Si no está, busca en la API
      const data = await getRecetaById(id);
      receta.value = data;
      ingredientes.value = extraerIngredientes(data);
    }
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

<template>
  <div class="container py-4">
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else class="receta-detalle-grid">
      <div class="imagen-col">
        <img
          v-if="receta.enlaceImagen || receta.imagen"
          :src="receta.enlaceImagen || receta.imagen"
          alt="Imagen receta"
          class="imagen-receta"
        />
      </div>

      <div class="detalle-col">
        <p><strong>Nombre:</strong> {{ receta.nombreReceta || receta.nombre }}</p>
        <p><strong>Categoría:</strong> {{ receta.categoria }}</p>
        <p><strong>Puntaje:</strong> {{ receta.puntajeReceta || '-' }}</p>

        <div>
          <strong>Ingredientes:</strong>
          <ul>
            <li v-for="(ing, index) in ingredientes" :key="index">{{ ing }}</li>
          </ul>
        </div>

        <div>
          <strong>Instrucciones:</strong>
          <p style="margin-top: 0.5rem">{{ receta.instrucciones || receta.instruccion }}</p>
        </div>

        <p style="margin-top: 1rem">
          <strong>Fecha de Modificación:</strong> {{ receta.fechaModificacion || '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.receta-detalle-grid {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.imagen-col {
  flex: 1 1 50%;
}

.imagen-receta {
  max-width: 100%;
  border-radius: 8px;
  display: block;
}

.detalle-col {
  flex: 1 1 50%;
}

.detalle-col > p,
.detalle-col > div {
  margin-bottom: 1.5rem;
}
</style>