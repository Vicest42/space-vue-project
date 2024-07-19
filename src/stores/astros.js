//NASA API
// src/stores/astros.js
import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import APIService from '@/services/APIService.js';
import NASAService from '@/services/NASAService.js';


export const useAstrosStore = defineStore('astros', () => {
   const busqueda = reactive({
       nombre: '',
       categoria: ''
   });


   const astros = ref([]);
   const images = ref({}); // Nueva ref para almacenar imágenes


   const categorias = [
       { categoria: 'All' },
       { categoria: 'Star' },
       { categoria: 'Planet' },
       { categoria: 'Dwarf Planet' },
       { categoria: 'Asteroid' },
       { categoria: 'Comet' },
       { categoria: 'Moon' }
   ];


   async function obtenerAstros() {
       if (busqueda.nombre === '') {
           try {
               const { data } = await APIService.catalogoAstros();
               if (data && data.bodies) {
                   astros.value = data.bodies;
                   // Obtén imágenes para cada cuerpo celeste
                   for (const astro of data.bodies) {
                       await obtenerImagen(astro.englishName);
                   }
               } else {
                   astros.value = [];
               }
           } catch (error) {
               console.error('Error al obtener astros:', error);
               astros.value = [];
           }
       } else {
           try {
               const { data } = await APIService.buscarAstros(busqueda);
               if (data) {
                   astros.value = [data];
                   // Obtén imagen para el cuerpo celeste buscado
                   await obtenerImagen(data.englishName);
               } else {
                   astros.value = [];
               }
           } catch (error) {
               console.error('Error al obtener astros:', error);
               astros.value = [];
           }
       }
   }


   async function obtenerImagen(nombre) {
       try {
           const { data } = await NASAService.searchImages(nombre);
           if (data && data.collection && data.collection.items.length > 0) {
               images.value[nombre] = data.collection.items[0].links[0].href;
           } else {
               images.value[nombre] = '/img/home/bg-inicio.jpg'; // Imagen por defecto
           }
       } catch (error) {
           console.error('Error al obtener imagen:', error);
           images.value[nombre] = '/img/home/bg-inicio.jpg'; // Imagen por defecto
       }
   }


   async function seleccionarAstro(id) {
       const { data } = await APIService.buscarPorID(id)
       console.log(data);
   }


   return {
       categorias,
       busqueda,
       obtenerAstros,
       astros,
       images,
       seleccionarAstro
   };
});
