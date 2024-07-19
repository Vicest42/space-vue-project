import api from "@/lib/axios.js";


export default {


   catalogoAstros(){
       return api('/')
   },
   buscarAstros(busqueda){
       return api(`/${busqueda}`)
   },
   buscarPorID(id){
       return api(`/${id}`)
   },
   buscarPorCategoria(categoria){
       return api(`?filter[]=bodyType,eq,${categoria}`)
   }
};