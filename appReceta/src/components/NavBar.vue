<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">

      <router-link class="navbar-brand" to="/">
        <i class="fas fa-utensils me-2"></i>
        RecetasApp
      </router-link>


      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/recetas">Recetas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/categorias">Categorías</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contacto">Contacto</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffc107 !important;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.4rem;
}
</style>
