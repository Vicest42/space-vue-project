<script setup>

//Este archivo muestra lo que es el encabezado de la pagina, el cual contiene la imagen de fondo y el buscador

import {computed} from "vue";
import {RouterLink, useRoute} from "vue-router";
import {useAstrosStore} from "@/stores/astros.js";

const route = useRoute();
const store = useAstrosStore();
const paginaInicio = computed(() => route.name === 'inicio')

const handleSubmit = () => {
  // TODO: Validar

  store.obtenerAstros()
  console.log('Se ejecuta el handle...');
}
</script>

<template>
  <header
      class="bg-slate-800"
      :class="{header : paginaInicio}"
  >
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink
              :to="{name: 'inicio'}"
          >
            <img class="w-20" src="/img/shared/logo.svg" alt="logotipo" />
          </RouterLink>
        </div>
      </div>

      <form
          v-if="paginaInicio"
          class="md:w-1/2 2xl:w-1/3 my-32 bg-black p-10 rounded-lg shadow space-y-6"
          @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
              class="block text-white uppercase font-extrabold text-lg"
              for="astro"
          >
            Nombre
          </label>
          <input
              type="text"
              id="astro"
              class="p-3 w-full rounded-lg focus:outline-none bg-gray-800 placeholder-gray-200 text-white"
              placeholder="Nombre coloquial o científico"
              v-model="store.busqueda.nombre"
          >
        </div>

        <div class="space-y-4">
          <label
              class="block text-white uppercase font-extrabold text-lg"
              for="categoria"
          >
            Categoría
          </label>
          <select
              id="categoria"
              class="p-3 w-full rounded-lg focus:outline-none bg-gray-800 text-white"
              v-model="store.busqueda.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option
                v-for="categoria in store.categorias"
                :key="categoria.categoria"
                :value="categoria.categoria"
            >{{categoria.categoria}}</option>
          </select>
        </div>

        <input
            type="submit"
            class="bg-red-900 hover:bg-red-950 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
            value="Buscar"
        />
      </form>
    </div>
  </header>
</template>

<style>

.header {
  background-image: url('/img/home/bg-marte.jpg');
  background-size: cover;
  background-position: center;
}

</style>