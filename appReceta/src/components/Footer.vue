<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section footer-main">
        <h3>AppReceta</h3>
        <p>Tu aplicación favorita para descubrir y compartir recetas deliciosas</p>
      </div>

      <div class="footer-section footer-social-section">
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

      <div class="footer-section footer-developers">
        <h4>Desarrolladores</h4>
        <div class="footer-info">
          <p class="project-title">Trabajo Práctico PNT2</p>
          <p class="team-label">Realizado por:</p>
          <ul class="developers-list">
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
      <p>© 2025 AppReceta. Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 3rem 1rem 1rem 1rem;
  font-size: 0.9rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-section h3 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
}

.footer-section h4 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.footer-section p {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #e0e0e0;
}

.footer-main p {
  font-size: 1rem;
  max-width: 400px;
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.footer-social a {
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.footer-social a:hover {
  color: #4CAF50;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-title {
  font-weight: 600;
  color: #4CAF50;
  font-size: 1rem;
}

.team-label {
  font-weight: 500;
  margin-top: 0.5rem;
}

.developers-list {
  list-style: none;
  padding-left: 0;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.developers-list li {
  color: #ccc;
  font-size: 0.9rem;
  padding: 0.2rem 0;
  transition: color 0.3s ease;
}

.developers-list li:hover {
  color: #4CAF50;
}

.footer-bottom {
  border-top: 1px solid #555;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  text-align: center;
  color: #bbb;
  font-size: 0.85rem;
}

@media (min-width: 768px) {
  .footer {
    padding: 4rem 2rem 1.5rem 2rem;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .footer-main {
    grid-column: 1 / -1;
    text-align: center;
    align-items: center;
  }

  .footer-social-section,
  .footer-developers {
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }

  .developers-list {
    align-items: center;
  }
}

@media (min-width: 1024px) {
  .footer {
    padding: 4rem 2rem 2rem 2rem;
  }

  .footer-content {
    grid-template-columns: 2fr 1fr 1.2fr;
    gap: 4rem;
  }

  .footer-main {
    grid-column: 1;
    text-align: left;
    align-items: flex-start;
  }

  .footer-social-section,
  .footer-developers {
    text-align: left;
  }

  .footer-social {
    justify-content: flex-start;
  }

  .developers-list {
    align-items: flex-start;
  }

  .footer-section h3 {
    font-size: 2rem;
  }

  .footer-main p {
    font-size: 1.1rem;
  }
}

@media (max-width: 767px) {
  .footer {
    padding: 2rem 1rem 1rem 1rem;
    font-size: 0.85rem;
  }

  .footer-content {
    gap: 2rem;
    text-align: center;
  }

  .footer-section h3 {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  .footer-section h4 {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }

  .footer-main p {
    font-size: 0.9rem;
    max-width: none;
  }

  .footer-social {
    justify-content: center;
    gap: 1.2rem;
  }

  .footer-social a {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .developers-list {
    align-items: center;
  }

  .developers-list li {
    font-size: 0.85rem;
  }

  .footer-bottom {
    margin-top: 2rem;
    padding-top: 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0.8rem 1rem 0.8rem;
    font-size: 0.8rem;
  }

  .footer-content {
    gap: 1.5rem;
  }

  .footer-section h3 {
    font-size: 1.3rem;
  }

  .footer-section h4 {
    font-size: 1rem;
  }

  .footer-main p {
    font-size: 0.85rem;
  }

  .footer-social {
    gap: 1rem;
  }

  .footer-social a {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .developers-list li {
    font-size: 0.8rem;
  }

  .project-title {
    font-size: 0.9rem;
  }

  .footer-bottom {
    font-size: 0.75rem;
    padding-top: 0.8rem;
    margin-top: 1.5rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .footer-social a,
  .developers-list li {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-social a {
    transition: none;
  }
  
  .footer-social a:hover {
    transform: none;
  }
}
</style>