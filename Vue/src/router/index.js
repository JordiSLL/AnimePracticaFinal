import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokesView from '../views/PokesView.vue'
import SingleView from '../views/SingleView.vue'
import RandomAnime from '../views/RandomAnime.vue'
import OpeningAnime from '../views/OpeningAnime.vue'
import LoginRegister from '../views/LoginRegister.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/globalChat',
      name: 'globalChat',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/globalChat.vue')
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: PokesView,
      meta: { requiresAuth: true }
    },
    {
      path: "/pokemon/:id",
      name: "singleview",
      component: SingleView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/OpeningAnime',
      name: 'OpeningAnime',
      component: OpeningAnime,
      meta: { requiresAuth: true }
    },{
      path: '/RandomAnime',
      name: 'RandomAnime',
      component: RandomAnime,
      meta: { requiresAuth: true }
    },{
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem('usuario'));
  if (to.meta.requiresAuth && !user) {
    // Si la ruta requiere autenticación y no hay token en el SessionnStorage,
    // redirige al usuario a la página de inicio de sesión u otra página adecuada.
    next('/');
  } else if (!to.matched.length) {
    // Si el path no existe, redirige al usuario a la ruta "/"
    next('/');
  } else {
    // Si la ruta no requiere autenticación o el token está presente,
    // permite la navegación al destino solicitado.
    next();
  }
});

export default router
