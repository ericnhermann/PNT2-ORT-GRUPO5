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
  <div class="detalle-container">
    <div v-if="loading" class="estado-mensaje">Cargando...</div>
    <div v-else-if="error" class="estado-mensaje error">{{ error }}</div>
    <div v-else class="receta-detalle">
      <div class="imagen-seccion">
        <img
          v-if="receta.enlaceImagen || receta.imagen"
          :src="receta.enlaceImagen || receta.imagen"
          alt="Imagen receta"
          class="imagen"
        />
      </div>

      <div class="info-seccion">
        <h2 class="titulo">{{ receta.nombreReceta || receta.nombre }}</h2>
        <p><strong>Categoría:</strong> {{ receta.categoria }}</p>
        <p><strong>Puntaje:</strong> {{ receta.puntajeReceta || 'Sin puntaje' }}</p>

        <div class="bloque">
          <h4>Ingredientes:</h4>
          <ul class="lista-ingredientes">
            <li v-for="(ing, index) in ingredientes" :key="index">{{ ing }}</li>
          </ul>
        </div>

        <div class="bloque">
          <h4>Instrucciones:</h4>
          <p class="instrucciones">{{ receta.instrucciones || receta.instruccion }}</p>
        </div>

        <p class="fecha">
          <strong>Modificada:</strong> {{ receta.fechaModificacion || 'Sin fecha' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General */
.detalle-container {
  
  color: #2c3e50;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  max-width: 1000px;
  margin: 2rem auto;
}


/* Estado */
.estado-mensaje {
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
  color: #2c3e50;
}
.estado-mensaje.error {
  color: #e74c3c;
}

/* Layout */
.receta-detalle {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
@media (min-width: 768px) {
  .receta-detalle {
    flex-direction: row;
    align-items: flex-start;
  }
}

/* Imagen */
.imagen-seccion {
  flex: 1;
  display: flex;
  justify-content: center;
}
.imagen {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

/* Detalles */
.info-seccion {
  flex: 2;
  padding: 0 1rem;
}
.titulo {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}
.subtitulo {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.bloque {
  margin: 1.2rem 0;
}

.lista-ingredientes {
  padding-left: 1.2rem;
  list-style: disc;
  color: #34495e;
  line-height: 1.6;
}

.instrucciones {
  background: #f9f9f9;
  padding: 1rem;
  border-left: 4px solid #00b894;
  border-radius: 6px;
  color: #2d3436;
  line-height: 1.6;
  font-size: 1rem;
}

/* Fecha */
.fecha {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 1.5rem;
  font-style: italic;
}
</style>
