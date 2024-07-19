<script setup>
//En este archivo se ejecuta la vista de inicio la cual muestra los atros por columnas gracias a la clase grid de tailwindcss 
// y con la función v-for se recorre el arrelgo de los astros que devuelve la API 

import Astro from "@/components/Astro.vue";
import {useAstrosStore} from "@/stores/astros.js";

const store = useAstrosStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Resultados</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Astro
        v-for="astro in store.astros"
        :astro="astro"
        :key="astro.id"
    />
  </div>
</template>