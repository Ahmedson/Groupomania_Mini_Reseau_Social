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
    meta : { dontNeedToken : true}
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
    meta : { dontNeedToken : true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Mise en place de la vérification pour chaque route
router.beforeEach(async (to, from) => {
    if(( to.meta.dontNeedToken || from.meta.dontNeedToken  )&& localStorage.getItem('token')){
      let token = JSON.parse(localStorage.getItem('token')).token;
      const response = await fetch('http://localhost:3000/auth/redirection', {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {return res})
      .catch((error) => console.log(error));

      if (response.ok){
        return '/home'
      } else if(!response.ok) {
        localStorage.removeItem('token');
      }
    }
    if (to.meta.needToken && !localStorage.getItem('token')) {
      return '/'
    }
  
})

export default router
