import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recetas from "../views/Recetas.vue";
import LoginView from "../views/LoginView.vue";
import PerfilView from "../views/PerfilView.vue";
import { useAuthStore } from "../stores/auth";
import RecetaDetalleView from "../views/RecetaDetalleView.vue";
import RegisterView from "../views/RegisterView.vue";
import FavoritosView from '../views/FavoritosView.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recetas",
    name: "Recetas",
    component: Recetas,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
