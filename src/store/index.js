import { createStore } from 'vuex'
import auth from '@/modules/auth/store'
import films from '@/modules/films/store'

export default createStore({
  modules: {
    auth,
    films
  }
})
