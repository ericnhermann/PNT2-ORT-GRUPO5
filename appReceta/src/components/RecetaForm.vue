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
   router.push('/MisRecetas'); 
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
  background-color: #1e1e1e; 
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 600px;
  margin: 3rem auto;
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2); 
  color: #fff;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  color: #ffffff; 
}

.form-control {
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #fff;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
}

.form-control::placeholder {
  color: #bbb;
}

.form-control:focus {
  border-color: #fdfdfd;
  outline: none;
  box-shadow: 0 0 0 2px rgba(12, 15, 14, 0.576);
}

.btn-success {
  background-color: #575f68;
  border: none;
  padding: 0.6rem 2rem;
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #61b26e;
}

img {
  border-radius: 12px;
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
</style>









