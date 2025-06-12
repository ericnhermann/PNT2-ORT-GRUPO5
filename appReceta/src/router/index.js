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
    path: '/crear',
    name: 'CrearReceta',
    component: () => import('../views/CrearReceta.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 