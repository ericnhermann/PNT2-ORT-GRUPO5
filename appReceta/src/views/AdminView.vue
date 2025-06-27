<template>
  <div class="admin-container">
    <h2>Vista de Administrador</h2>
    <p>¡Bienvenido, admin! Solo tú puedes ver esta página.</p>

    <!-- Gráficos -->
    <div class="charts-grid">
      <div class="chart-card">
        <h3>Recetas por Categoría</h3>
        <Pie v-if="categoryData" :data="categoryData" :options="pieOptions" />
      </div>
      <div class="chart-card">
        <h3>Recetas con más favoritos</h3>
        <Bar v-if="favData" :data="favData" :options="barOptions" />
      </div>
      <div class="chart-card">
        <h3>Usuarios registrados por mes</h3>
        <Bar v-if="usersByMonthData" :data="usersByMonthData" :options="barOptions" />
      </div>
    </div>

    <!-- Gestión de Recetas -->
    <div class="admin-section">
      <h3>Gestión de Recetas</h3>
      <div class="recetas-grid">
        <div v-for="receta in recetas" :key="receta.id" class="receta-card">
          <div class="receta-info">
            <h4>{{ receta.nombreReceta }}</h4>
            <p class="receta-categoria">{{ receta.categoria }}</p>
            <p class="receta-descripcion">{{ receta.instrucciones.substring(0, 100) }}...</p>
          </div>
          <button @click="borrarReceta(receta.id)" class="btn-borrar">
            <i class="fas fa-trash"></i> Borrar
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Usuarios -->
    <div class="admin-section">
      <h3>Usuarios Registrados y sus Favoritos</h3>
      <div class="usuarios-grid">
        <div v-for="usuario in usuarios" :key="usuario.id" class="usuario-card">
          <div class="usuario-header">
            <h4>{{ usuario.name }}</h4>
            <span class="usuario-role">{{ usuario.role || 'Usuario' }}</span>
          </div>
          <div class="favoritos-section">
            <h5>Recetas Favoritas:</h5>
            <div v-if="usuario.favoritos && usuario.favoritos.length > 0" class="favoritos-list">
              <div v-for="favoritoId in usuario.favoritos" :key="favoritoId" class="favorito-item">
                <span v-if="getRecetaName(favoritoId)" class="favorito-nombre">
                  {{ getRecetaName(favoritoId) }}
                </span>
                <span v-else class="favorito-no-encontrada">
                  Receta eliminada (ID: {{ favoritoId }})
                </span>
              </div>
            </div>
            <p v-else class="sin-favoritos">No tiene recetas favoritas</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Pie, Bar } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { getAllRecetas, getAllUsers, deleteReceta } from '../service/api';

Chart.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const categoryData = ref(null);
const favData = ref(null);
const usersByMonthData = ref(null);
const recetas = ref([]);
const usuarios = ref([]);

const pieOptions = { responsive: true, plugins: { legend: { position: 'bottom' } } };
const barOptions = { responsive: true, plugins: { legend: { display: false } } };

const cargarDatos = async () => {
  try {
    // Obtener recetas y usuarios
    const recetasData = await getAllRecetas();
    const usuariosData = await getAllUsers();
    
    recetas.value = recetasData;
    usuarios.value = usuariosData;

    // --- Recetas por categoría ---
    const categorias = {};
    recetasData.forEach(r => {
      const cat = r.categoria || 'Sin categoría';
      categorias[cat] = (categorias[cat] || 0) + 1;
    });
    categoryData.value = {
      labels: Object.keys(categorias),
      datasets: [{
        label: 'Cantidad',
        data: Object.values(categorias),
        backgroundColor: [
          '#4caf50', '#ff9800', '#2196f3', '#e91e63', '#9c27b0', '#ffc107', '#00bcd4', '#8bc34a', '#f44336'
        ]
      }]
    };

    // --- Recetas con más favoritos (de todos los usuarios) ---
    const favCount = {};
    usuariosData.forEach(u => {
      if (Array.isArray(u.favoritos)) {
        u.favoritos.forEach(id => {
          favCount[id] = (favCount[id] || 0) + 1;
        });
      }
    });
    // Top 5 recetas más favoritas
    const topFavs = recetasData
      .map(r => ({ nombre: r.nombreReceta, count: favCount[r.id] || 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    favData.value = {
      labels: topFavs.map(r => r.nombre),
      datasets: [{
        label: 'Favoritos',
        data: topFavs.map(r => r.count),
        backgroundColor: '#4caf50'
      }]
    };

    // --- Usuarios registrados por mes (usando createdAt) ---
    const usersByMonth = {};
    usuariosData.forEach(u => {
      if (u.createdAt) {
        let date;
        if (typeof u.createdAt === 'number') {
          date = new Date(u.createdAt * 1000);
        } else {
          date = new Date(u.createdAt);
        }
        const key = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}`;
        usersByMonth[key] = (usersByMonth[key] || 0) + 1;
      }
    });
    // Ordenar por fecha
    const sortedMonths = Object.keys(usersByMonth).sort();
    usersByMonthData.value = {
      labels: sortedMonths,
      datasets: [{
        label: 'Usuarios registrados',
        data: sortedMonths.map(m => usersByMonth[m]),
        backgroundColor: '#e91e63'
      }]
    };
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
};

const borrarReceta = async (id) => {
  if (confirm('¿Estás seguro de que quieres borrar esta receta? Esta acción no se puede deshacer.')) {
    try {
      await deleteReceta(id);
      // Recargar datos después de borrar
      await cargarDatos();
      alert('Receta borrada exitosamente');
    } catch (error) {
      console.error('Error borrando receta:', error);
      alert('Error al borrar la receta');
    }
  }
};

const getRecetaName = (recetaId) => {
  const receta = recetas.value.find(r => r.id == recetaId);
  return receta ? receta.nombreReceta : null;
};

onMounted(cargarDatos);
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 60vh;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);
  max-width: 1400px;
  margin: 0 auto;
}

.admin-container h2 {
  color: #4caf50;
  margin-bottom: 1rem;
}

.admin-container > p {
  color: #666;
  margin-bottom: 2rem;
}

/* Gráficos */
.charts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
  justify-content: center;
  width: 100%;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  min-width: 320px;
  max-width: 400px;
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-card h3 {
  margin-bottom: 1rem;
  color: #333;
}

/* Secciones de administración */
.admin-section {
  width: 100%;
  margin-bottom: 3rem;
}

.admin-section h3 {
  color: #4caf50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 0.5rem;
}

/* Grid de recetas */
.recetas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.receta-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;
}

.receta-card:hover {
  transform: translateY(-2px);
}

.receta-info h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.receta-categoria {
  color: #4caf50;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.receta-descripcion {
  color: #666;
  line-height: 1.4;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.btn-borrar {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  align-self: flex-end;
}

.btn-borrar:hover {
  background: #d32f2f;
}

/* Grid de usuarios */
.usuarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.usuario-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.usuario-card:hover {
  transform: translateY(-2px);
}

.usuario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.usuario-header h4 {
  color: #333;
  margin: 0;
  font-size: 1.2rem;
}

.usuario-role {
  background: #4caf50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.favoritos-section h5 {
  color: #666;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.favoritos-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.favorito-item {
  background: #f8f9fa;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #4caf50;
}

.favorito-nombre {
  color: #333;
  font-weight: 500;
}

.favorito-no-encontrada {
  color: #999;
  font-style: italic;
}

.sin-favoritos {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .recetas-grid,
  .usuarios-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    min-width: 280px;
  }
  
  .usuario-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 