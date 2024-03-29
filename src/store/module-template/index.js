
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const myCustomModule = {
    namespaced: true,   
    state,
    getters,
    mutations,
    actions
}

export default myCustomModule
