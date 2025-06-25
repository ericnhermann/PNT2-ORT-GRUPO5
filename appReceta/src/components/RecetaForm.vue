<script setup>
import { ref, watch } from 'vue';

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

  const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
  recetaFinal.id = Date.now(); 
  recetasGuardadas.push(recetaFinal);
  localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));
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
  background-color: #f5f5f5; 
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 600px;
  margin: 3rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  color: #333;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  color: #4caf50; 
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.form-control::placeholder {
  color: #999;
}

.form-control:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
}

.btn-success {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.6rem 2rem;
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-success:hover {
  background-color: #45a049;
}

img {
  border-radius: 12px;
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>








