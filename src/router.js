import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Admin from "./pages/Admin.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/admin", component: Admin },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;