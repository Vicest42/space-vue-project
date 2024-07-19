<script setup>

/*En este archivo se renderiza la ventana modal, y se muestran la informacion de los astros
obtenida de la API Solar System, asi como las imagenes obtenidas de la API NASA Image */

import { computed, watch } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useModalStore } from "@/stores/modal.js";
import { useAstrosStore } from "@/stores/astros.js";

const modalStore = useModalStore();
const astrosStore = useAstrosStore();

const imageUrl = computed(() => astrosStore.images[astrosStore.astro?.englishName] || '/img/home/bg-inicio.jpg');

function isMoon() {
  return astrosStore.astro?.bodyType === 'Moon';
}

function hasMoons() {
  return astrosStore.astro?.bodyType === 'Planet' && astrosStore.astro?.moons?.length > 0;
}

watch(() => modalStore.modal, (newVal) => {
  if (!newVal) {
    astrosStore.astro = null; // Restablecer el estado del astro cuando se cierra el modal
  }
});
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.modal">
    <Dialog as="div" class="relative z-10" @close="modalStore.handleClickModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div>
                <div class="mt-3">
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    {{ astrosStore.astro?.englishName }}
                  </DialogTitle>

                  <img
                      v-if="astrosStore.astro"
                      class="astro-image"
                      :src="imageUrl"
                      :alt="'Imagen de ' + astrosStore.astro.englishName"
                  />

                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Características
                  </DialogTitle>

                  <div v-if="astrosStore.astro">
                    <p class="text-lg"><span class="font-bold">Aphelion: </span>{{ astrosStore.astro.aphelion }} KM</p>
                    <p class="text-lg"><span class="font-bold">Gravity: </span>{{ astrosStore.astro.gravity }} m/s²</p>
                    <p class="text-lg"><span class="font-bold">Body Type: </span>{{ astrosStore.astro.bodyType }}</p>
                    <p class="text-lg"><span class="font-bold">Mass: </span>{{ astrosStore.astro.mass.massValue }}exp{{ astrosStore.astro.mass.massExponent }} KG</p>
                    <p v-if="isMoon()" class="text-lg"><span class="font-bold">Around Planet: </span>{{ astrosStore.astro.aroundPlanet.planet }}</p>

                    <!-- Mostrar la lista de lunas si el astro es un planeta y tiene lunas -->
                    <div v-if="hasMoons()" class="mt-4">
                      <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                        Lunas
                      </DialogTitle>
                      <ul class="list-disc ml-5">
                        <li v-for="moon in astrosStore.astro.moons" :key="moon.moon" class="list-none text-lg">{{ moon.moon }}</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                    type="button"
                    class="w-full rounded bg-red-900 p-3 font-bold uppercase text-white shadow hover:bg-red-950"
                    @click="modalStore.handleClickModal()"
                >
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.astro-image {
  width: 100%;
  height: 450px; /* Ajusta este valor según el tamaño deseado */
  object-fit: cover; /* Esto asegura que la imagen se recorte para llenar el contenedor */
}
</style>