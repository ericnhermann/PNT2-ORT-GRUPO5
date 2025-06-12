<template>
    <footer class ="bg-dark text-white py-4 mt-5">
        <div class = "Container text-center">
            <p class = "mb-1 fs-5"> Trabajo Práctico PNT2 </p>
            <p class = "mb-1 fs-5">Realizado por Hermann Eric Nicolas, Smith Matias Ezequiel, Sosa Gian Axel, Suckewer Tobias, Ventre Julieta  </p>
          <div class="d-flex justify-content-center gap-3">
            <a href="https://www.facebook.com/ortargentina" target="_blank" class="text-white">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://www.instagram.com/ortargentina/" target="_blank" class="text-white">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
            <a href="https://x.com/ORTArgAlumni" target="_blank" class="text-white">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </template>

<script setup>
// Componente Footer
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.footer-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #4CAF50;
}
</style>