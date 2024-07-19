import axios from 'axios'

//Este archivo centraliza la url base para las peticiones de la API Solar System OpenData

const api = axios.create({
   baseURL: 'https://api.le-systeme-solaire.net/rest/bodies',
})

export default api