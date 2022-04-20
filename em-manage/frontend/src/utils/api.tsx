import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use(
    req => {
        return req;
    },
    err => {
        return Promise.reject(err);
    }
);
API.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        return Promise.reject(err);
    }
);

export default API;