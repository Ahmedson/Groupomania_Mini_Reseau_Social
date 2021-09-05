import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import HomeM from '../views/HomeM.vue'
import Profil from '../views/Profil.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta : { hasGotToken : true}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta : { needToken : true}
  },
  {
    path: '/home/multimedia',
    name: 'HomeM',
    component: HomeM,
    meta : { needToken : true}
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    meta : { needToken : true}
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta : { hasGotToken : true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Mise en place de la vérification pour chaque route
router.beforeEach(to => {
  if (to.meta.needToken && !localStorage.getItem('token')) {
    return '/'
  }
})

// router.beforeEach((to) => {
//   if (to.meta.hasGotToken && localStorage.getItem('token')) {
//     return '/home'
//   }
// })


export default router
