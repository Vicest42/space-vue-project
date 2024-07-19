import { createRouter, createWebHistory } from 'vue-router'
import InicioView from "@/views/InicioView.vue";


const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
   {
     path: '/',
     name: 'inicio',
     component: InicioView
   },
   {
     path: '/catalogo',
     name: 'catalogo',
     component: () => import('@/views/CatalogoView.vue')
   }
 ]
})


export default router