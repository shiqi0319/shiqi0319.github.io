import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";

import BuildingSimulation from "../views/BuildingSimulation.vue";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },

  {
    path: "/",
    name: "BuildingSimulation",
    component: BuildingSimulation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
