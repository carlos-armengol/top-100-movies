/* eslint-disable no-unused-vars */
// export const myAction = async ({commit}) => {
// }


import authApi, { secureTokenApi } from "@/api/authApi"
import fillMoviesTemplate from "@/helpers/fillMoviesTemplate"
import * as dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const createUser = async ({ commit }, user) => {
    commit('onAuthenticating');
    const { name, email, password } = user
    try {
        const { data: { idToken, refreshToken, expirationIn } } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const expirationToken = dayjs().add(expirationIn, 'second')
        const { data: { localId } } = await authApi.post(':update', { idToken, displayName: name })

        user.uid = localId

        delete user.password // const {password, ...user} = user
        await fillMoviesTemplate(user.uid)
        commit('loginUser', { user, idToken, refreshToken, expirationToken })
        return { ok: true }

    } catch (error) {
        commit('logOut')
        return { ok: false, message: error.response.data.error.message }
    }
}

export const signInUser = async ({ commit }, user) => {
    commit('onAuthenticating');
    const { email, password } = user
    try {
        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        const { idToken, refreshToken, displayName, localId, expiresIn } = data

        user.name = displayName
        user.uid = localId

        const expirationToken = dayjs().add(expiresIn, 'second')

        delete user.password // const {password, ...user} = user
        commit('loginUser', { user, idToken, refreshToken, expirationToken })

        return { ok: true }

    } catch (error) {
        commit('logOut')
        console.error(error)
        return { ok: false, message: error?.response?.data?.error?.message}
    }
}

export const checkAuthentication = async ({ commit }) => {
    let idToken = localStorage.getItem('idToken')
    let refreshToken = localStorage.getItem('refreshToken')
    let expirationToken = localStorage.getItem('expirationToken')

    if (!idToken) {
        commit('logOut')
        return { ok: false, message: 'No hay token' }
    }
    try {
        let user
        if (checkTokenExpiration(expirationToken)) {
            const { data } = await secureTokenApi.post('/token', { grant_type: 'refresh_token', refresh_token: refreshToken })
            idToken = data.id_token
            refreshToken = data.refresh_token
            expirationToken = dayjs().add(data.expires_in, 'seconds')
        }

        const { data } = await authApi.post(':lookup', { idToken })
        const { users: [{ displayName: name, email, localId }] } = data
        user = { name, email, uid: localId }


        commit('loginUser', { user, idToken, refreshToken, expirationToken })
        return { ok: true }
    } catch (error) {
        commit('logOut')
        console.error(error)
        return { ok: false, message: error.response.data.error.message }
    }
}

/**
 * checkTokenExpiration
 * @param string expirationToken 
 * @returns bool true the token needs to be updated
 */
const checkTokenExpiration = (expirationToken) => {
    const now = dayjs()
    expirationToken = dayjs(expirationToken)
    const leftTimeToken = expirationToken.diff(now, 'seconds')

    return (leftTimeToken > 0 && leftTimeToken <= 900)
}