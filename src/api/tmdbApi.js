import axios from "axios";

const api_key = process.env.VUE_APP_TMDB_KEY

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key,
        language:'es-ES'
    }
})

export default tmdbApi