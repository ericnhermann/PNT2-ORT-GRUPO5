<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-social">
        <a href="https://www.facebook.com/ortargentina" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook fa-lg"></i>
        </a>
        <a href="https://www.instagram.com/ortargentina/" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram fa-lg"></i>
        </a>
        <a href="https://x.com/ORTArgAlumni" target="_blank" aria-label="Twitter/X">
          <i class="fab fa-twitter fa-lg"></i>
        </a>
      </div>

      <div class="footer-info">
        <p>
          Trabajo Práctico PNT2 · Realizado por: Hermann Eric Nicolás, Smith Matías Ezequiel, Sosa Gian Axel, Suckewer Tobías, Ventre Julieta
        </p>
      </div>

      <div class="footer-rights">
        <p>© Todos los derechos reservados</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 1.5rem 2rem;
  font-size: 0.9rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.footer-social a {
  color: white;
  margin: 0 0.5rem;
  transition: color 0.3s;
}

.footer-social a:hover {
  color: #4CAF50;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }

  .footer-info {
    max-width: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
