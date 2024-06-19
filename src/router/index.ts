// main.js (o donde configures tu Vue Router)
import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import ListadoPeliculas from '../views/ListadoPeliculas.vue';
import MoviDetail from '../views/MoviDetail.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/listado/:genreId',
    name: 'listado',
    component: ListadoPeliculas,
    props: true
  },
  {
    path: '/detail/:movieId',
    name: 'movidetail',
    component: MoviDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
