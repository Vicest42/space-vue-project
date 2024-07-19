import { createRouter, createWebHistory } from 'vue-router'
import InicioView from "@/views/InicioView.vue";

//Este archivo es el encargado de manejar las rutas de la aplicación web 

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
   {
     path: '/',
     name: 'inicio',
     component: InicioView
   },
 ]
})


export default router