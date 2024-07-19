<script setup>
import { useAstrosStore } from '@/stores/astros.js';
import { computed } from "vue";

//Este archivo renderiza lo que son las tarjetas de los astros, recorre el array obtenido de la API
//y va mostrando la información

const props = defineProps({
  astro: {
    type: Object,
    required: true,
  },
});

const store = useAstrosStore();
const imageUrl = computed(() => store.images[props.astro.englishName] || '/img/home/bg-inicio.jpg');
</script>

<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
          class="astro-image hover:scale-125 transition-transform hover:rotate-2"
          :src="imageUrl"
          alt="Imagen de astro"
      >
    </div>

    <div class="p-5 bg-black">
      <h2 class="text-2xl truncate font-extrabold text-white">{{ astro.englishName }}</h2>
      <button
          type="button"
          class="bg-red-900 hover:bg-red-950 mt-5 w-full p-3 font-bold text-white text-lg"
          @click="store.seleccionarAstro(astro.id)"
      >
        Más información
      </button>
    </div>
  </div>
</template>

<style scoped>
.astro-image {
  width: 100%;
  height: 300px; /* Ajusta este valor según el tamaño deseado */
  object-fit: cover; /* Esto asegura que la imagen se recorte para llenar el contenedor */
}
</style>