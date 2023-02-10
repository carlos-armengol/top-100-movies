// export const myAction = async ({commit}) => {
// }

import filmsApi from "@/api/FilmsApi"
import tmdbApi from "@/api/tmdbApi"


export const loadFilms = async ({commit}, user) => {
    const films = []
    try {
        const {data} = await filmsApi.get(`/users/${user.uid}/films.json`)
        if (data){
            for ( let id of Object.keys(data)){
                films.push({
                    code: id,
                    ...data[id]
                })
            }
        }  
        films.sort((a,b) => a.id - b.id ) 

    } catch (error) {
        console.error(error)
    }
    commit('setFilms', films)
}


export const toggleCheckFilm = async ({commit}, {filmSelect, user}) => {
    filmSelect.check = !filmSelect.check
    try {
        filmsApi.put(`/users/${user.uid}/films/${filmSelect.code}.json`, filmSelect)
    } catch (error) {
        console.error(error)
    }
    commit('updateFilm', filmSelect)
}

export const justWatch = async ({commit}, film) => {
    if (film.justWatch) return
    try {
        const {data: {results}} = await tmdbApi.get(`/movie/${film.idTmdb}/watch/providers`)
        film.justWatch = (results['ES'])
    } catch (error) {
        console.error(error)
    }
    commit('updateFilm', film)
    return film
}

export const getAllGenres = async ({commit}) => {
    let res
    try {
        const {data} = await tmdbApi.get('/genre/movie/list')
        res = data;
    } catch (error) {
        console.error(error)
    }
    commit('setGenresList', res.genres);
}