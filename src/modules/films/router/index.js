export default {
    name: 'top100Films',
    component: () => import(/* webpackChunkName: "top100Films" */ '@/modules/films/layouts/FilmsLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-detail',
            component: () => import(/* webpackChunkName: "no-entry" */ '@/modules/films/views/EmptyDetails.vue'),
        },
        {
            path: ':id',
            name: 'film-detail',
            component: () => import( /* webpackChunkName: "entry" */ '@/modules/films/views/FilmDetails.vue'),
            props: (route) => {
                return {
                    id: route.params.id
                }
            },

        }        
    ]      
}