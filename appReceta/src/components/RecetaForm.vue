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

const emit = defineEmits(['submit']);

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
    <div class="form-group">
      <label class="form-label">Nombre de la receta</label>
      <input v-model="nombre" type="text" class="form-control" placeholder="Ej: Torta de chocolate" required />
    </div>

    <div class="form-group">
      <label class="form-label">Categoría</label>
      <input v-model="categoria" type="text" class="form-control" placeholder="Ej: Postres, Platos principales" required />
    </div>

    <div class="form-group">
      <label class="form-label">Imagen (URL)</label>
      <input 
        v-model="imagen" 
        type="url" 
        class="form-control" 
        placeholder="https://ejemplo.com/imagen.jpg" 
      />
    </div>

    <div class="form-group">
      <label class="form-label">Ingredientes</label>
      <input 
        v-model="ingredientesTexto" 
        type="text" 
        class="form-control" 
        placeholder="Ej: huevo, leche, azúcar, harina" 
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">Instrucciones</label>
      <textarea v-model="instrucciones" class="form-control" rows="5" placeholder="Describe paso a paso cómo preparar la receta..." required></textarea>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-submit">Crear Receta</button>
    </div>
  </form>
</template>

<style scoped>
.formulario-receta {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.95rem;
}

.form-control {
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #333;
  border-radius: 8px;
  padding: 0.875rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.form-control::placeholder {
  color: #6c757d;
  font-style: italic;
}

.form-control:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  background-color: white;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  margin-top: 2rem;
  text-align: center;
}

.btn-submit {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-weight: 600;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  min-width: 200px;
}

.btn-submit:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.btn-submit:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

@media (max-width: 768px) {
  .formulario-receta {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }
  
  .btn-submit {
    width: 100%;
    padding: 1rem;
  }
}
</style>








