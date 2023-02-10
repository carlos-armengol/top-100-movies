
export const getAllFilms = (state) => {
    return { ...state.films }
}

export const getFilmById = (state) => (id) => {
    return state.films.find(f => f.id === id)
}

export const getIsLoading = (state) => {
    return state.isLoading
}

export const getOnlyChecked = (state) => {
    return state.films.filter(f => f.check)
}

export const getOnlyUnchecked = (state) => {
    return state.films.filter(f => !f.check)
}

export const getSearchFilter = (state) => (text) => {

    const listFilter = state.films.filter(f => {
        return (f.title.toLowerCase().includes(text) || f.titleEs.toLowerCase().includes(text))
    })

    return listFilter
}

export const getFilterList = (state, getters) => () => {

    const { filterText, filterType } = state
    if (filterType === 'search') {
        return getters.getSearchFilter(filterText)
    } else if (filterType === 'genre') {
        return getters.getFilmsByGenre(filterText)
    } else /* if (filterType === 'check') */ {
        switch (filterText) {
            case 'checked':
                return getters.getOnlyChecked
            case 'unchecked':
                return getters.getOnlyUnchecked
            default:
                return getters.getAllFilms
        }
    }
}

export const getFilmsByGenre = (state) => (genre) => {
    
    const filterByGenre = state.films.filter( f => f.genres.filter(g => g.name === genre).length > 0 )
    return filterByGenre.length > 0 ? filterByGenre : state.films
}