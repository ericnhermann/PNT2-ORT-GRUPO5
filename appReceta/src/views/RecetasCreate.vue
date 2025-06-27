<script setup>
import RecetaForm from '../components/RecetaForm.vue';
import { createReceta } from '../service/api';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const mensaje = ref('');
const authStore = useAuthStore();

const crear = async (receta) => {
  try {
    const recetaApi = {
      nombreReceta: receta.nombre,
      categoria: receta.categoria,
      enlaceImagen: receta.imagen,
      instrucciones: receta.instrucciones,
      ingrediente1: receta.ingredientes[0] || "",
      ingrediente2: receta.ingredientes[1] || "",
      ingrediente3: receta.ingredientes[2] || "",
      ingrediente4: receta.ingredientes[3] || "",
      ingrediente5: receta.ingredientes[4] || "",
      puntajeReceta: 0,
      fechaModificacion: new Date().toISOString().slice(0, 10),
      userId: authStore.user.id
    };
    await createReceta(recetaApi); 
    mensaje.value = 'Receta guardada con éxito';
    router.push('/MisRecetas'); 
  } catch (e) {
    mensaje.value = 'Error al guardar receta';
  }
};
</script>

<template>
  <div class="create-container">
    <div class="create-content">
      <h1 class="create-title">Crear nueva receta</h1>
      <p class="create-subtitle">¡Acá podés crear tus nuevas recetas y compartirlas con el resto!</p>
      <RecetaForm @submit="crear" />
      <div v-if="mensaje" class="alert alert-info mt-3">{{ mensaje }}</div>
    </div>
  </div>
</template>

<style scoped>
.create-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.create-content {
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.create-title {
  color: #4caf50;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.create-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.alert {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

@media (max-width: 768px) {
  .create-container {
    padding: 1rem;
  }
  
  .create-title {
    font-size: 2rem;
  }
  
  .create-subtitle {
    font-size: 1rem;
  }
}
</style>

