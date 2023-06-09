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
      component: HomeView
    },
    {
      path: '/globalChat',
      name: 'globalChat',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/globalChat.vue')
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: PokesView
    },
    {
      path: "/pokemon/:id",
      name: "singleview",
      component: SingleView,
      props: true,
    },
    {
      path: '/OpeningAnime',
      name: 'OpeningAnime',
      component: OpeningAnime
    },{
      path: '/RandomAnime',
      name: 'RandomAnime',
      component: RandomAnime
    },{
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister
    }
  ]
})

export default router
