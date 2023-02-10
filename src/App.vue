<template>
  <div  v-if="authStatus === 'authenticating'" class="authenticating-container">
    <div class="d-flex flex-column flex-wrap h-100 justify-content-center aling-items-center align-content-center">
      <div>
        <img src="@/assets/logo.png" alt="Vue Logo" height="400" class="d-inline-block mx-2"/>
      </div>
      <div>
        <h1 class="d-flex align-content-center flex-wrap justify-content-center">
          {{ authStatus }}
        </h1>
      </div>
    </div>
  </div>
  <router-view v-else/>
</template>

<script>
import useAuth from './modules/auth/composables/useAuth';

export default {
  setup(){
    const {authStatus, checkStatus} = useAuth()
    checkStatus()

    return {
      authStatus
    }
  }
}
</script>

<style scoped>
  img {
    height: 300px;
    width: fit-content;
  }
  .authenticating-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
