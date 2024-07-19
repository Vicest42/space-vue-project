import { defineStore } from "pinia";
import {ref} from "vue";

//En este archivo se maneja las funciones de la ventana modal
export const useModalStore = defineStore("modal", () => {

    const modal = ref(false)

    function handleClickModal() {
        modal.value = !modal.value;
    }

    return {
        modal,
        handleClickModal
    }
})