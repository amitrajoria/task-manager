import axios from 'axios';
import * as actions from './actionTypes'

const login = (params) => dispatch => {
    dispatch({type: actions.LOGIN_REQUEST});
    return axios.post(`https://taskmanager-backend.onrender.com/auth/login`, params)
            .then((res) => dispatch({type: actions.LOGIN_SUCCESS, payload: res.data}))
            .catch((err) => dispatch({type: actions.LOGIN_FAILURE, payload: err?.response?.data?.msg}))
}

const googleLogin = (params) => dispatch => {
    dispatch({type: actions.LOGIN_REQUEST});
    return axios.post(`https://taskmanager-backend.onrender.com/auth/google/login`, params)
            .then((res) => dispatch({type: actions.LOGIN_SUCCESS, payload: res.data}))
            .catch((err) => dispatch({type: actions.LOGIN_FAILURE, payload: err?.response?.data?.msg}))
}

const register = (params) => dispatch => {
    dispatch({type: actions.REGISTER_REQUEST});
    return axios.post(`https://taskmanager-backend.onrender.com/auth/signup`, params)
        .then((res) => dispatch({type: actions.REGISTER_SUCCESS, payload: res.data.msg}))
        .catch((err) => dispatch({type: actions.REGISTER_FAILURE, payload: err?.response?.data?.msg}))
}

export {
    login,
    googleLogin,
    register
} 