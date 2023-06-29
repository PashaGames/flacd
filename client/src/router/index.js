import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue';
import RegisterView from '../views/RegisterView.vue';
import FlashcardView from '../views/FlashcardView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: {
        requiresAuth: true
      }
    },
    
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        disableIfLoggedIn: true
      }
    },
       
    {
      path: '/flashcards',
      name: 'flashcards',
      component: FlashcardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        disableIfLoggedIn: true
      }

    }
  ]
})

export default router
