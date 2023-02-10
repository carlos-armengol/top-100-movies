import store from "@/store"



const isAuthtenticatedGuard = async (to, from, next) => {

    const {ok} = await store.dispatch('auth/checkAuthentication')
    if(ok) next()
    else next({name: 'login'})

   return {

   }
}
export default isAuthtenticatedGuard