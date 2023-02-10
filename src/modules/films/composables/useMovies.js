import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const useMovies = () => {

    const router = useRouter()
    const store = useStore()
    const textSearch = ref('')
    const genreSearch = ref('')
    const checkType = ref('all')
    const filterFilms = computed(() => {
        return store.getters['films/getFilterList']()
    })
    const onclickFilters = (filterText, filterType) => {
        switch (filterType) {
            case 'search':
                genreSearch.value = ''
                checkType.value = ''
                break;
            case 'genre':
                textSearch.value = ''
                checkType.value = ''
                break;
            case 'check':
            default:
                checkType.value = filterText
                genreSearch.value = ''
                textSearch.value = ''
                break;
        }
        store.commit('films/setFilterText', { filterText, filterType })
        router.push({ name: 'film-detail', params: { id: filterFilms.value[0]?.id } })
    }


    return {
        textSearch,
        genreSearch,
        checkType,
        numUnchecked: computed(() => store.getters['films/getOnlyUnchecked'].length),
        numChecked: computed(() => store.getters['films/getOnlyChecked'].length),
        filterFilms,
        onCheck(filmSelect) {
            store.dispatch('films/toggleCheckFilm', { filmSelect, user: store.state.auth.user })
          },
        onclickFilters,
    }
}

export default useMovies