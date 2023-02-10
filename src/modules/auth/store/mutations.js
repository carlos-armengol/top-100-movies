
// export const myMutation =  (state) => {
// }

export const loginUser =  (state, {user, idToken, refreshToken, expirationToken}) => {
    if(idToken){
        localStorage.setItem('idToken', idToken)
        state.idToken = idToken 
    }
    if(refreshToken){
        localStorage.setItem('refreshToken', refreshToken)
        state.refreshToken = refreshToken 
    }
    if(expirationToken){
        localStorage.setItem('expirationToken', expirationToken)
        state.expirationToken = expirationToken
    }

    state.user = user
    state.status = 'authenticated'
}

export const onAuthenticating = (state) =>{
    state.status = 'authenticating'
}

export const logOut =  (state) => {
    state.user=null
    state.idToken = null
    state.refreshToken = null
    state.expirationToken = null
    state.status = 'not-authenticated'
    localStorage.clear()
}