<template>

  <div v-if="!film" class="row justify-content-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere por favor...
      <h3>
        <i class="fa-solid fa-spin fa-rotate"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex flex-column align-items-center">

    <div class="d-flex flex-column justify-content-center">
      <h1>{{ film.title }} ({{ film.year }})</h1>
      <h4>({{ film.titleEs }})</h4>
    </div>

    <div class="card my-card-width" @click="flipped = !flipped, first=false">
      <div class="front" :class="{ flipped: flipped }">
        <img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`" class="card-img-top" alt="...">
        <div class="corner-fold"></div>
      </div>
      <div class="back" :class="{ 'flipped': flipped, 'd-none': !flipped }">
        <img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`" class="card-img-top inverted-image" alt="..."/>
        <div class="card-body text-overlay" ref="textOverlay">
          <div class="card-text">
            <h5 class="d-block">{{ film.overview }}</h5>
            <h5 class="d-flex">Director: {{ film.director }}</h5>
            <h5 class="d-flex">Generos:
              <div class="pad-left-5" v-for="genre in film.genres" :key="genre.name" v-tooltip="genre.name">
                <i :class="['fas ', genre.icon]">
                </i>
              </div>

            </h5>
            <h5 class="d-flex ">
              Produccion:
              <div class="pad-left-5" v-for="pc in film.production_countries" :key="pc.code" v-tooltip="pc.name">
                <img :src="`https://flagcdn.com/32x24/${pc.code.toLowerCase()}.png`" alt="">
              </div>
            </h5>
            <a v-if="film.justWatch" :href="film.justWatch.link" target="_blank" rel="noopener noreferrer">{{
              film.justWatch.link
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {

    
    
    let film = computed(() => store.getters['films/getFilmById'](props.id))
    const store = useStore()
    const flipped = ref(false)
    const first = ref(true)
    const textOverlay = ref(null)
    
    watch (() => props.id, () => {
      flipped.value = false
      first.value = true
      if (film.value?.id && !film.value?.justWatch) {
        store.dispatch('films/justWatch', film.value)
      } 
      if(textOverlay.value?.scrollTop > 0){
        textOverlay.value.scrollTop = 0
      }
    })

    return {
      flipped,
      film,
      textOverlay
    }
  }

}
</script>

<style lang="scss" scoped>

@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.pad-left-5 {
  padding-left: 5px;
}

.card {
  position: relative;
  perspective: 1000px;
  display: inline-block;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: all 0.6s ease-in-out;
}

.front {
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
  height: fit-content;
}

.front.flipped {
  transform: rotateY(180deg);
}

.back.flipped {
  transform: rotateY(0deg);
}

.inverted-image {
  transform: scaleX(-1);
  opacity: 0.2;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  text-align: center;
  overflow: auto;
  height: 100%;
}

.corner-fold {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-left: 40px solid rgba(255, 255, 255, 0.8);
  position: absolute; 
}



@media (min-width: 0) { 
  .my-card-width{
    width: 18rem;
  }
}
@include media-breakpoint-up(sm) {
  .my-card-width{
    width: 20rem;
  }
}
@include media-breakpoint-up(md) { 
  .my-card-width{
    width: 25rem;
  }
 }
@include media-breakpoint-up(lg) { 
  .my-card-width{
    width: 25rem;
  }
 }
@include media-breakpoint-up(xl) { 
  .my-card-width{
    width: 30rem;
  }
 }
@include media-breakpoint-up(xxl) { 
  .my-card-width{
    width: 32rem;
  }
 }




</style>