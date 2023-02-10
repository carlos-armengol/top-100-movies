import axios from "axios";

const key = process.env.VUE_APP_FIREBASE_KEY

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: { key }
});

export const secureTokenApi = axios.create({
    baseURL: 'https://securetoken.googleapis.com/v1',
    params: { key }
})

export default authApi