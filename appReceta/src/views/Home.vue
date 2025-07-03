<script setup>
import CarruselSugerenciasHome from '../components/CarruselSugerenciasHome.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="home">
    <div class="home-header">
      <h1>Bienvenido a AppReceta</h1>
      <p>Tu lugar para descubrir y compartir las mejores recetas</p>
    </div>

    <div class="features">
      <div class="feature-card">
        <router-link to="/recetas" class="feature-card-link">
          <h3>Explora Recetas</h3>
          <p>Descubre nuevas recetas de todo el mundo</p>
        </router-link>
      </div>

      <div class="feature-card">
        <router-link to="/CrearReceta" class="feature-card-link">
          <h3>Comparte</h3>
          <p>Compartí tus propias recetas con la comunidad</p>
        </router-link>
      </div>

      <div class="feature-card">
        <div class="feature-card-link">
          <h3>Guarda Favoritos</h3>
          <p>Accedé fácil a tus recetas favoritas</p>
        </div>
      </div>
    </div>
    
    <div class="carousel-wrapper">
      <CarruselSugerenciasHome />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.home-header {
  text-align: center;
  padding: 1.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
}

.home-header h1 {
  color: #4caf50;
  margin-bottom: 1rem;
  font-size: 2rem;
  line-height: 1.2;
  margin-top: 0;
}

.home-header p {
  margin: 0;
  font-size: 1rem;
  color: #666;
  line-height: 1.4;
}

.features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.2rem 0;
  flex-wrap: wrap;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
}

.feature-card {
  background-color: #f5f5f5;
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 280px;
  text-align: center;
  box-sizing: border-box;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #4caf50;
  margin-bottom: 1rem;
  margin-top: 0;
  font-size: 1.2rem;
}

.feature-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
}

.feature-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.carousel-wrapper {
  width: 100%;
  margin-top: 2rem;
  box-sizing: border-box;
}

/* ===== DESKTOP ===== */
@media (min-width: 1025px) {
  .home-header h1 {
    font-size: 2.5rem;
  }
  
  .home-header p {
    font-size: 1.1rem;
  }
  
  .features {
    gap: 2.5rem;
    max-width: 1200px;
    margin: 1.2rem auto;
  }
  
  .feature-card {
    width: 300px;
  }
  
  .carousel-wrapper {
    max-width: 1200px;
    margin: 2rem auto;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .home-header {
    padding: 1.5rem 2rem;
  }
  
  .features {
    gap: 1.5rem;
    padding: 0 2rem;
    max-width: 1000px;
    margin: 1.2rem auto;
  }
  
  .feature-card {
    width: 260px;
    padding: 1.8rem;
  }
  
  .carousel-wrapper {
    margin: 2rem auto;
  }
}

@media (max-width: 768px) {
  .home {
    width: 100%;
    overflow-x: hidden;
  }
  
  .home-header {
    padding: 1rem;
  }
  
  .home-header h1 {
    font-size: 1.8rem;
  }
  
  .home-header p {
    font-size: 0.95rem;
  }
  
  .features {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 0 1rem;
    margin: 1rem 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .feature-card {
    width: 100%;
    max-width: 350px;
    padding: 1.5rem;
  }
  
  .feature-card h3 {
    font-size: 1.1rem;
  }
  
  .feature-card p {
    font-size: 0.9rem;
  }
  
  .carousel-wrapper {
    margin-top: 1.5rem;
    width: 100vw; 
    margin-left: calc(-50vw + 50%); 
    padding: 0; 
    box-sizing: border-box;
    overflow-x: hidden; 
  }
}

@media (max-width: 480px) {
  .home-header {
    padding: 0.8rem;
  }
  
  .home-header h1 {
    font-size: 1.6rem;
  }
  
  .home-header p {
    font-size: 0.9rem;
  }
  
  .features {
    padding: 0 0.8rem;
    gap: 1.2rem;
  }
  
  .feature-card {
    padding: 1.2rem;
    max-width: none;
  }
  
  .feature-card h3 {
    font-size: 1rem;
  }
  
  .feature-card p {
    font-size: 0.85rem;
  }
  
  .carousel-wrapper {
    margin-top: 1rem;
  }
}

@media (max-width: 360px) {
  .home-header {
    padding: 0.5rem;
  }
  
  .home-header h1 {
    font-size: 1.4rem;
  }
  
  .features {
    padding: 0 0.5rem;
  }
  
  .feature-card {
    padding: 1rem;
  }
}
</style>