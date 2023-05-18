import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Admin from "./pages/Admin.vue";
import Login from "./pages/Login.vue";
import Movie from "./pages/Movie.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/admin", component: Admin },
  { path: "/login", component: Login },
  { path: "/404", component: NotFound },
  { path: "/:movieSlug", component: Movie }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;