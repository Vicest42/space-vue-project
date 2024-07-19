import api from "@/lib/axios.js";

export default {
   catalogoAstros(){
       return api('/')
   },
   buscarAstros(busqueda){
       return api(`/${busqueda.nombre}`)
   },
   buscarPorID(id){
       return api(`/${id}`)
   }
};