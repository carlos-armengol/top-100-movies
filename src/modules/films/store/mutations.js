
// export const myMutation =  (state) => {

import setGenreIcons from "@/helpers/setGenreIcons"

// }

export const setFilms =  (state, films) => {
    state.films = films
    state.isLoading = false
}

export const updateFilm = (state, film) => {
    state.films = state.films.map(f => f.id===film.id ? film : f)
}

export const setFilterText = (state, {filterText, filterType}) => {
    state.filterText = filterText
    state.filterType = filterType
}

export const setGenresList = (state, genresList) => {
    genresList = setGenreIcons(genresList)
    state.genresList = [...genresList]
}