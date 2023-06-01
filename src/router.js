import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import AdminIndex from "./pages/Admin/Index.vue";
import AdminBookingsIndex from "./pages/Admin/Bookings.vue"
import AdminMoviesIndex from "./pages/Admin/Movies/Index.vue";
import AdminMoviesCreate from "./pages/Admin/Movies/Create.vue";
import AdminMoviesUpdate from "./pages/Admin/Movies/Update.vue";
import AdminCreateUser from "./pages/Admin/CreateUser.vue";
import Login from "./pages/Login.vue";
import Movie from "./pages/Movie.vue";
import NotFound from "./pages/NotFound.vue";
import Booking from "./pages/Booking.vue";

const routes = [
  { path: "/", component: Home, name: 'Home' },
  { path: "/admin", component: AdminIndex, name: 'AdminIndex' },
  { path: "/admin/bookings", component: AdminBookingsIndex, name: 'AdminBookingsIndex' },
  { path: "/admin/create-user", component: AdminCreateUser, name: 'AdminCreateUser' },
  { path: "/admin/movies", component: AdminMoviesIndex, name: 'AdminMoviesIndex' },
  { path: "/admin/movies/create", component: AdminMoviesCreate, name: 'AdminMoviesCreate' },
  { path: "/admin/movies/update", component: AdminMoviesUpdate, name: 'AdminMoviesUpdate' },
  { path: "/login", component: Login, name: 'Login' },
  { path: "/reservas/:bookingUuid", component: Booking, name: 'Booking' },
  { path: "/:movieSlug", component: Movie, name: 'Movie' },
  { path: "/:pathMatch(.*)*", component: NotFound, name: 'NotFound' }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;