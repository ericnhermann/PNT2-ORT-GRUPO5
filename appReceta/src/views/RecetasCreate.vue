<script setup>
import RecetaForm from '../components/RecetaForm.vue';
import { createReceta } from '../service/api';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const mensaje = ref('');

function guardarEnLocalStorage(receta) {

  if (!receta.id) {
    receta.id = Date.now().toString();
  }
  const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
  recetasGuardadas.push(receta);
  localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));
}

const crear = async (receta) => {
  try {
  
    await createReceta(receta);
   
    guardarEnLocalStorage(receta);
    mensaje.value = 'Receta guardada con éxito';
    router.push('/MisRecetas');
  } catch (e) {

    guardarEnLocalStorage(receta);
    mensaje.value = 'Receta guardada localmente';
    router.push('/MisRecetas');
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