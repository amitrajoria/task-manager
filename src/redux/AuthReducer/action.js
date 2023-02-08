import axios from 'axios';
import * as actions from './actionTypes'

const login = (params) => dispatch => {
    dispatch({type: actions.LOGIN_REQUEST});
    return axios.post(`https://reqres.in/api/login`, params)
            .then((res) => dispatch({type: actions.LOGIN_SUCCESS, payload: res.data.token}))
            .catch((err) => dispatch({type: actions.LOGIN_FAILURE}))
}

export {
    login
} 