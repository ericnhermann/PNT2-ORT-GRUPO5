<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>AppReceta</h3>
        <p>Tu aplicación favorita para descubrir y compartir recetas deliciosas</p>
      </div>

      <div class="footer-section">
        <h4>Síguenos</h4>
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
      </div>

      <div class="footer-section">
        <h4>Desarrolladores</h4>
        <div class="footer-info">
          <p>Trabajo Práctico PNT2</p>
          <p>Realizado por:</p>
          <ul>
            <li>Hermann Eric Nicolás</li>
            <li>Smith Matías Ezequiel</li>
            <li>Sosa Gian Axel</li>
            <li>Suckewer Tobías</li>
            <li>Ventre Julieta</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2024 AppReceta. Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 2rem 1rem 1rem 1rem;
  font-size: 0.9rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section h3 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.footer-section h4 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.footer-social a {
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
}

.footer-social a:hover {
  color: #4CAF50;
  background-color: rgba(255, 255, 255, 0.2);
}

.footer-info ul {
  list-style: none;
  padding-left: 0;
  margin: 0.5rem 0;
}

.footer-info li {
  margin: 0.3rem 0;
  color: #ccc;
  font-size: 0.85rem;
}

.footer-bottom {
  border-top: 1px solid #555;
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  color: #ccc;
}

/* Responsive */
@media (min-width: 768px) {
  .footer {
    padding: 3rem 2rem 1.5rem 2rem;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4rem;
  }

  .footer-section:first-child {
    grid-column: 1;
    text-align: left;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 1rem 1rem 1rem;
    font-size: 0.8rem;
  }

  .footer-section h3 {
    font-size: 1.3rem;
  }

  .footer-section h4 {
    font-size: 1.1rem;
  }

  .footer-social {
    gap: 0.8rem;
  }

  .footer-social a {
    width: 35px;
    height: 35px;
    font-size: 1.3rem;
  }

  .footer-info li {
    font-size: 0.8rem;
  }
}
</style>
