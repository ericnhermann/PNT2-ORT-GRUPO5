import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recetas from "../views/Recetas.vue";
// import RecetaDetalleView from "../views/RecetaDetalleView.vue";

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
  // {
  //   path: "/receta/:id",
  //   name: "RecetaDetalleView",
  //   component: RecetaDetalleView,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
