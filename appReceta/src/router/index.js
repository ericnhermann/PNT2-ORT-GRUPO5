import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recetas from "../views/Recetas.vue";
import LoginView from "../views/LoginView.vue";
import PerfilView from "../views/PerfilView.vue";
import { useAuthStore } from "../stores/auth";
import RecetaDetalleView from "../views/RecetaDetalleView.vue";

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
  path: '/favoritos',
  name: 'Favoritos',
  component: () => import('../views/Favoritos.vue')
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
