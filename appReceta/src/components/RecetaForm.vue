<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  receta: {
    type: Object,
    default: () => ({
      nombre: '',
      imagen: '',
      categoria: '',
      ingredientes: [],
      instrucciones: ''
    })
  }
});

const emit = defineEmits(['submit']);

const nombre = ref(props.receta.nombre);
const imagen = ref(props.receta.imagen);
const categoria = ref(props.receta.categoria);
const ingredientesTexto = ref(props.receta.ingredientes.join(', '));
const instrucciones = ref(props.receta.instrucciones);

watch(() => props.receta, (nueva) => {
  nombre.value = nueva.nombre;
  imagen.value = nueva.imagen;
  categoria.value = nueva.categoria;
  ingredientesTexto.value = nueva.ingredientes.join(', ');
  instrucciones.value = nueva.instrucciones;
}, { immediate: true });

const enviar = () => {
  const recetaFinal = {
    nombre: nombre.value,
    imagen: imagen.value,
    categoria: categoria.value,
    ingredientes: ingredientesTexto.value
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0),
    instrucciones: instrucciones.value
  };

  emit('submit', recetaFinal);
};
</script>

<template>
  <form @submit.prevent="enviar" class="formulario-receta">
    <div class="mb-3">
      <label class="form-label text-light">Nombre</label>
      <input v-model="nombre" type="text" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label text-light">Categoría</label>
      <input v-model="categoria" type="text" class="form-control" required />
    </div>

<div class="mb-3">
  <label class="form-label text-light">Imagen</label>
  <input 
    v-model="imagen" 
    type="url" 
    class="form-control mb-2" 
    placeholder="URL de la imagen" 
  />
  

  <input 
    type="file" 
    accept="image/*" 
    class="form-control" 
    @change="manejarArchivo" 
  />
</div>

<div class="mb-3">
  <label class="form-label text-light">Ingredientes</label>
  <input 
    v-model="ingredientesTexto" 
    type="text" 
    class="form-control" 
    placeholder="Ej: huevo, leche, azúcar" 
    required
  />
</div>

    <div class="mb-3">
      <label class="form-label text-light">Instrucciones</label>
      <textarea v-model="instrucciones" class="form-control" rows="4" required></textarea>
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-success px-4">Guardar</button>
    </div>
  </form>
</template>

<style scoped>
.formulario-receta {
  background-color: #222; /* fondo oscuro */
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 0 15px rgba(0, 255, 100, 0.2); /* sombra verde */
}
</style>
