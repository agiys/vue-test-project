import { createRouter, createWebHistory } from 'vue-router'
import BookCatalog from '../views/BookCatalog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BookCatalog,
    },
    {
      path: '/book-page',
      name: 'book-page',
      component: () => import('../components/BookPage.vue'),
    },
  ],
})

export default router
