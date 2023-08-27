import axios from "axios";

export const API_URL = 'https://ongoings.adaptable.app/'



const $api = axios.create ( {
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Autorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.owner = localStorage.getItem('owner');
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const responce = await axios.get(`https://ongoings.adaptable.app/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', responce.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }
    throw error;
})

export default $api;
