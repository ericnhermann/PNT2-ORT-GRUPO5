import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginView from "../views/LoginView.vue";
import PerfilView from "../views/PerfilView.vue";
import { useAuthStore } from "../stores/auth";
import RecetaDetalleView from "../views/RecetaDetalleView.vue";
import RegisterView from "../views/RegisterView.vue";
import FavoritosView from '../views/FavoritosView.vue';
import AdminView from '../views/AdminView.vue';
import AcercaView from '../views/Acerca.vue';

 
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: '/MisRecetas',
    name: 'mis Recetas',
    component: () => import ('../views/MisRecetas.vue')
  },
   
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: PerfilView,
    meta: { requiresAuth: true },
  },
  {
    path: "/receta/:id",
    name: "RecetaDetalleView",
    component: RecetaDetalleView,
    props: true,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },

  {
  path: '/favoritos',
  name: 'FavoritosView',
  component: FavoritosView
},
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/acerca',
    name: 'Acerca',
    component: AcercaView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login");
  } else if (to.meta.requiresAdmin) {
    if (authStore.user && authStore.user.role === 'admin') {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
