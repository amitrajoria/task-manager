import axios from 'axios';
import * as actions from './actionTypes';

const getTasks = () => dispatch => {
    dispatch({type : actions.TASKS_REQUEST});
    return axios.get(`http://localhost:5000/tasks`)
            .then((res) => dispatch({type: actions.TASKS_SUCCESS, payload: res.data}))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE}))
}

const getTags = () => dispatch => {
    return axios.get(`http://localhost:5000/tagList`)
            .then((res) => dispatch({type: actions.TAGS_SUCCESS, payload: res.data}))
            .catch((err) => dispatch({type: actions.TAGS_FAILURE}))
}

const updateSubTaskStatus = (id, payload) => dispatch => {
    return axios.patch(`http://localhost:5000/tasks/${id}`, payload)
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE}))
}

const updateTask = (id, payload) => (dispatch) => {
    dispatch({type : actions.UPDATE_TASK_REQUEST});
    return axios.patch(`http://localhost:5000/tasks/${id}`, payload)
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE}))
}

const addTag = (payload) => (dispatch) => {
    return axios.post(`http://localhost:5000/tagList`, payload)
            .then((res) => dispatch(getTags()))
            .catch((err) => dispatch({type: actions.TAGS_FAILURE}))
}

const createTask = (payload) => (dispatch) => {
    dispatch({type : actions.TASKS_REQUEST});
    return axios.post(`http://localhost:5000/tasks`, payload)
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE}))
}

const deleteTask = (id) => (dispatch) => {
    dispatch({type : actions.TASKS_REQUEST});
    return axios.delete(`http://localhost:5000/tasks/${id}`)
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE}))
}

export {
    getTasks,
    getTags,
    updateSubTaskStatus,
    updateTask,
    addTag,
    createTask,
    deleteTask
} 