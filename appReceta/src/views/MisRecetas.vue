<script setup>
import { ref, onMounted } from 'vue';
import { getAllRecetas } from '../service/api';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const recetas = ref([]);
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  const todas = await getAllRecetas();
  recetas.value = todas.filter(r => r.userId == authStore.user?.id);
});

const eliminarReceta = (id) => {
  recetas.value = recetas.value.filter(r => r.id !== id);
};

function irADetalle(id) {
  router.push({ name: 'RecetaDetalleView', params: { id: id.toString() } });
}
</script>

<template>
  <div class="contenedor-recetas">
    <h1 class="titulo">Mis Recetas</h1>
  
    <div v-if="recetas.length === 0" class="mensaje-vacio">
      No hay recetas guardadas aún.
    </div>

    <div v-else class="grid-recetas">
      <div v-for="receta in recetas" :key="receta.id" class="card-receta">
        <img :src="receta.enlaceImagen" alt="Imagen receta" class="img-receta" />

        <div class="contenido">
          <h3>{{ receta.nombreReceta }}</h3>
          <p><strong>Categoría:</strong> {{ receta.categoria }}</p>
          <p><strong>Ingredientes:</strong> {{ receta.ingrediente1 }}, {{ receta.ingrediente2 }}, {{ receta.ingrediente3 }}, {{ receta.ingrediente4 }}, {{ receta.ingrediente5 }}</p>

          <div class="acciones">
            <button class="btn-detalle" @click="irADetalle(receta.id)">Ver</button>
            <button class="btn-eliminar" @click="eliminarReceta(receta.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contenedor-recetas {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  color: #fff;
}

.titulo {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.grid-recetas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card-receta {
  background-color: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 255, 100, 0.2);
  display: flex;
  flex-direction: column;
}

.img-receta {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.contenido {
  padding: 1rem;
}

.acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn-detalle,
.btn-eliminar {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-detalle {
  background-color: #00c97e;
  color: #fff;
}

.btn-detalle:hover {
  background-color: #00a96a;
}

.btn-eliminar {
  background-color: #ff4d4d;
  color: #fff;
}

.btn-eliminar:hover {
  background-color: #d93636;
}

.mensaje-vacio {
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.7;
}


</style>
