<template>
  <div class="img-containers">
    <div class="img-container" v-for="film in filterFilms" :key="film.id">
      <img @click="onClickImg(film.id)"
        :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`" />
      <input type="checkbox" class="checkbox" v-model="film.check">
      <label class="checkmark" @click="onCheck(film)"></label>
      <span class="checkmark" v-if="film.check" @click="onCheck(film)">
        <i class="fas fa-eye "></i>
      </span>
    </div>
  </div>
</template>

<script>



import { useRouter } from 'vue-router'
import useMovies from '../composables/useMovies'
export default {
  setup(_ , context ) {
    const router = useRouter()
    const {filterFilms, onCheck} = useMovies()
    const onClickImg = (id) => {
      context.emit('OnClickImg')
      router.push({ name: 'film-detail', params: { id }})
    }

    return {
      router,
      filterFilms, 
      onCheck,
      onClickImg,
    }
  }
}
</script>

<style scoped>
img {
  width: 80px;
}

i{
  color: limegreen;
}

.img-containers {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
}

.img-container {
  position: relative;
  /* flex: 1 0 calc(10% - 20px); */
  margin: 5px;
  width: 80px;
  border: 1px solid #000;
}

.checkbox {
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
  opacity: 0;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: transparent;
  /* border: 1px solid red; */
  box-shadow: -10px -10px 5px white inset;
}

.checkbox:checked+.checkmark {
  background-color: transparent;
  border: none;
}
</style>