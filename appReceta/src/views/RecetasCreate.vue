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
  <div class="container mt-4">
    <h2 class="mb-4 text-success">Crear nueva receta</h2>
    <RecetaForm @submit="crear" />
    <div v-if="mensaje" class="alert alert-info mt-3">{{ mensaje }}</div>
  </div>
</template>

