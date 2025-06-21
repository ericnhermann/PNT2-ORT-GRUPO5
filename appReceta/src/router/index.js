import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MisRecetas from '../views/MisRecetas.vue'
 
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
  },
  {
    path: '/mis-Recetas',
    name: 'mis Recetas',
    component: () => import ('../views/MisRecetas.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 