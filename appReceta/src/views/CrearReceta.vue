<template>
  <div class="crear-receta">
    <h1>Crear Nueva Receta</h1>
    <form class="receta-form">
      <div class="form-group">
        <label for="titulo">Título</label>
        <input type="text" id="titulo" v-model="receta.titulo" required>
      </div>
      
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="receta.descripcion" rows="4" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="ingredientes">Ingredientes</label>
        <textarea id="ingredientes" v-model="receta.ingredientes" rows="4" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="instrucciones">Instrucciones</label>
        <textarea id="instrucciones" v-model="receta.instrucciones" rows="6" required></textarea>
      </div>
      
      <button type="submit" class="btn-submit">Crear Receta</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const receta = reactive({
  titulo: '',
  descripcion: '',
  ingredientes: '',
  instrucciones: ''
})

// Aquí irá la lógica para enviar la receta a la API
</script>

<style scoped>
.crear-receta {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.receta-form {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style> 