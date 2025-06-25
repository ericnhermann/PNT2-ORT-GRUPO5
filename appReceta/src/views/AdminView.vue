<template>
  <div class="admin-container">
    <h2>Vista de Administrador</h2>
    <p>¡Bienvenido, admin! Solo tú puedes ver esta página.</p>

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
import { getAllRecetas, getAllUsers } from '../service/api';

Chart.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const categoryData = ref(null);
const favData = ref(null);
const usersByMonthData = ref(null);

const pieOptions = { responsive: true, plugins: { legend: { position: 'bottom' } } };
const barOptions = { responsive: true, plugins: { legend: { display: false } } };

onMounted(async () => {
  // Obtener recetas y usuarios
  const recetas = await getAllRecetas();
  const users = await getAllUsers();

  // --- Recetas por categoría ---
  const categorias = {};
  recetas.forEach(r => {
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
  users.forEach(u => {
    if (Array.isArray(u.favoritos)) {
      u.favoritos.forEach(id => {
        favCount[id] = (favCount[id] || 0) + 1;
      });
    }
  });
  // Top 5 recetas más favoritas
  const topFavs = recetas
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
  users.forEach(u => {
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
});
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
}
.admin-container h2 {
  color: #4caf50;
  margin-bottom: 1rem;
}
.charts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
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
</style> 