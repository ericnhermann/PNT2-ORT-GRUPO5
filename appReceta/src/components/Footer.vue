<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 AppReceta. Todos los derechos reservados.</p>
      <div class="footer-links">
        <a href="#" class="footer-link">Términos y Condiciones</a>
        <a href="#" class="footer-link">Política de Privacidad</a>
        <a href="#" class="footer-link">Contacto</a>
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