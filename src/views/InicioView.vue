<script setup>
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