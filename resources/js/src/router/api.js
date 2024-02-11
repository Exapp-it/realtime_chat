import axios from "axios";
import router from './router';

const api = axios.create();

api.interceptors.request.use(async config => {
    const token = localStorage.accessToken;
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, async error => {
    if (error.message === 'Network Error' && !error.config.retry) {
        error.config.retry = true;
        return axios.request(error.config);
    }
    return Promise.reject(error);
});

const handleTokenExpired = async (error) => {
    try {
        const response = await axios.post('api/auth/refresh', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.accessToken}`
            },
        });
        localStorage.accessToken = response.data.access_token;
        error.config.headers.authorization = `Bearer ${response.data.access_token}`;
        return api.request(error.config);
    } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        router.push({ name: 'auth.login' });
        return Promise.reject(refreshError);
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.data.message === 'Token has expired') {
            return handleTokenExpired(error);
        }

        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login page.');
            router.push({ name: 'auth.login' });
        }

        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export default api;
