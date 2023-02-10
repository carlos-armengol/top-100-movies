<template>
  <div class="d-flex flex-column">
    <Navbar />
    <div class="d-flex flex-lg-row justify-content-around">
      <div class="col-12 col-lg-5">
        <div class="container-detail">
          <router-view />
        </div>
      </div>
      <div class="d-none d-lg-flex col-6">
        <movie-list />
      </div>
    </div>
  </div>
</template>

<script>
import MovieList from "@/modules/films/components/MovieList.vue"
import { useStore } from 'vuex'
import Navbar from '../components/Navbar.vue'
import { onUnmounted } from '@vue/runtime-core'



export default {
  components: { MovieList, Navbar },
  setup() {
    const store = useStore()
    const loadFilms = () => {
      store.dispatch('films/loadFilms', store.state.auth.user)
      store.dispatch('films/getAllGenres')
    }
    loadFilms()

    const checkAuth = () => {
      store.dispatch('auth/checkAuthentication')
    }
    let checkAuthInterval = null
    setTimeout(() => {
      checkAuth()
      checkAuthInterval = setInterval(checkAuth, /*1000*/ 600000);
    }, /*1000*/ 600000); 

    onUnmounted(() => {
      clearInterval(checkAuthInterval)
    })

    return {

    }
  }
}
</script>

<style>
.container-detail {
  width: inherit;
  position: fixed;
  /* top: 10px; */
  left: 10px;
}

</style>