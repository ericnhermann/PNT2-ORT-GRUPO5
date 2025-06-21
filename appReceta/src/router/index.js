import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recetas',
    name: 'Recetas',
    component: () => import('../views/Recetas.vue')
  },
    {
    path: '/CrearReceta',
    name: 'FormCreate',
    component: () => import('../views/RecetasCreate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 