import axios from "axios";

const filmsApi = axios.create({
    baseURL: 'https://top-100-films-bf317-default-rtdb.europe-west1.firebasedatabase.app'
})

filmsApi.interceptors.request.use( (config) => {

    config.params = {
        auth: localStorage.getItem('idToken')
    }
    return config
} )

export default filmsApi