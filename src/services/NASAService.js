// src/services/NASAService.js
import axios from 'axios';

//como su nombre lo indica este archivo maneja la interacción directa con la API de la NASA

const nasaApi = axios.create({
   baseURL: 'https://images-api.nasa.gov',
   headers: {
       'Content-Type': 'application/json',
   },
});


export default {
   searchImages(query) {
       return nasaApi.get(`/search`, {
           params: {
               q: query,
               media_type: 'image',
               // Agrega cualquier otro parámetro necesario, como tu API key si es necesario
           }
       });
   },
};