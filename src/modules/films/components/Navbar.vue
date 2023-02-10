<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="navbar bg-primary sticky-top">

        <nav class="container-xxl flex-wrap flex-lg-nowrap">
            <a class="navbar-brand text-white d-flex align-items-center  p-0 me-0 me-lg-2">
                <img src="@/assets/logo.png" alt="Vue Logo" height="50" class="d-inline-block align-text-top mx-2">
                Top 100 Movies [{{ username }}]
            </a>

            <button class="navbar-toggler d-flex d-lg-none order-3 p-2 text-success" type="button"
                data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar"
                aria-label="Toggle navigation" @click="show = true">
                <i class="fa-solid fa-bars"></i>
            </button>

            <div class="offcanvas-lg offcanvas-end flex-grow-1 bg-primary" :class="{show}" tabindex="-1" id="bdNavbar"
                aria-labelledby="bdNavbarOffcanvasLabel" data-bs-scroll="true">
                <div class="offcanvas-header px-4 pb-0">
                    <h5 class="offcanvas-title text-white" id="bdNavbarOffcanvasLabel">Top-100-Movies</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close" data-bs-target="#bdNavbar" @click="show = false"></button>
                </div>

                <div class="offcanvas-body p-4 pt-0 p-lg-0">
                    <hr class="d-lg-none text-white-50">
                    <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav">
                        <li class="nav-item col-12 col-lg-auto">
                            <!-- <a class="nav-link py-2 px-0 px-lg-2" href="/docs/5.3/getting-started/introduction/"
                                onclick="ga('send', 'event', 'Navbar', 'Community links', 'Docs');">Docs</a> -->
                            <select class="form-select form-select-md select-genres" v-model="genreSearch"
                                placeholder="Filtrar por genero" @change="onclickFilters(genreSearch, 'genre')">
                                <option disabled value="">Filtrar por genero</option>
                                <option v-for="genre in $store.state.films.genresList" :key="genre.id"
                                    :value="genre.name">
                                    <i :class="['fas ', genre.icon]"></i> {{ genre.name }}
                                </option>
                            </select>
                        </li>
                        <li class="nav-item col-12 col-lg-auto">
                            <!-- <a class="nav-link py-2 px-0 px-lg-2" href="/docs/5.3/examples/"
                                onclick="ga('send', 'event', 'Navbar', 'Community links', 'Examples');">Examples</a> -->
                            <form class="form-inline my-2 my-lg-0 d-flex "
                                @submit.prevent="onclickFilters(textSearch, 'search')">
                                <div class="col-8 ">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search"
                                        v-model="textSearch" aria-label="Search">
                                </div>
                                <div class="col">
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </div>
                            </form>
                        </li>
                        <li class="nav-item col-12 col-lg-auto">
                            <!-- <a class="nav-link py-2 px-0 px-lg-2" href="https://icons.getbootstrap.com/"
                                onclick="ga('send', 'event', 'Navbar', 'Community links', 'Icons');" target="_blank"
                                rel="noopener">Icons</a> -->
                            <button type="button" class="btn btn-outline-success"
                                :class="{ 'btn-success text-dark': checkType === 'all' }"
                                @click="onclickFilters('all', 'check')">Todas</button>
                            <button type="button" class="btn btn-outline-success"
                                :class="{ 'btn-success text-dark': checkType === 'checked' }"
                                @click="onclickFilters('checked', 'check')">Vistas ({{ numChecked }})</button>
                            <button type="button" class="btn btn-outline-success"
                                :class="{ 'btn-success text-dark': checkType === 'unchecked' }"
                                @click="onclickFilters('unchecked', 'check')">Pendientes ({{ numUnchecked }})</button>
                        </li>
                        <li class="nav-item col-12 col-lg-auto">
                            <!-- <a class="nav-link py-2 px-0 px-lg-2" href="https://themes.getbootstrap.com/"
                                onclick="ga('send', 'event', 'Navbar', 'Community links', 'Themes');" target="_blank"
                                rel="noopener">Themes</a> -->
                            <div class="d-flex">
                                <button @click="onLogout" class="btn btn-outline-info mx-2">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <hr class="d-lg-none text-white-50"/>
                    <movie-list class="d-sm-flex d-lg-none" @on-click-img="show=false"/>
                </div>
            </div>

            <!-- <div class="d-flex justify-content-end"> -->
            <!-- <select class="form-select form-select-md select-genres" v-model="genreSearch"
                placeholder="Filtrar por genero" @change="onclickFilters(genreSearch, 'genre')">
                <option disabled value="">Filtrar por genero</option>
                <option v-for="genre in $store.state.films.genresList" :key="genre.id" :value="genre.name">
                    <i :class="['fas ', genre.icon]"></i> {{ genre.name }}
                </option>
            </select> -->

            <!-- <form class="form-inline my-2 my-lg-0 d-flex" @submit.prevent="onclickFilters(textSearch, 'search')">
                <div class="col-8">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="textSearch"
                        aria-label="Search">
                </div>
                <div class="col">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </div>
            </form> -->

            <!-- <button type="button" class="btn btn-outline-success"
                :class="{ 'btn-success text-dark': checkType === 'all' }"
                @click="onclickFilters('all', 'check')">Todas</button>
            <button type="button" class="btn btn-outline-success"
                :class="{ 'btn-success text-dark': checkType === 'checked' }"
                @click="onclickFilters('checked', 'check')">Vistas ({{ numChecked }})</button>
            <button type="button" class="btn btn-outline-success"
                :class="{ 'btn-success text-dark': checkType === 'unchecked' }"
                @click="onclickFilters('unchecked', 'check')">Pendientes ({{ numUnchecked }})</button> -->
            <!-- </div> -->

            <!-- <div class="d-flex">
                <button @click="onLogout" class="btn btn-outline-info mx-2">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div> -->

        </nav>
    </header>
</template>

<script lang="js">
import MovieList from '../components/MovieList.vue';
import useMovies from '../composables/useMovies'
import useAuth from '@/modules/auth/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
export default {
    components: {MovieList},
    setup() {
        const router = useRouter()
        const { username, logout } = useAuth()
        const {
            textSearch, genreSearch, checkType,
            numUnchecked, numChecked, onclickFilters,
        } = useMovies()

        const show = ref(false)

        return {
            username,
            textSearch,
            genreSearch,
            checkType,
            onLogout: () => {
                router.push({ name: 'login' })
                logout()
            },
            numUnchecked,
            numChecked,
            onclickFilters,
            show
        }

    },
}
</script>

<style lang="scss" scoped>
.select-genres {
    width: auto;
    margin-right: 15px;
}

// .margin-top-body{
//     margin-top: $navbar-brand-height;
// }
</style>