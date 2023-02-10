
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const filmsModule = {
    namespaced: true,   
    state,
    getters,
    mutations,
    actions
}

export default filmsModule
