import axios from 'axios';
import { useSelector } from 'react-redux';
import { getLoginData } from '../../utils/LocalStorage';
import * as actions from './actionTypes';



const getTasks = () => async dispatch => {
    dispatch({type : actions.TASKS_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://taskmanager-backend.onrender.com/tasks`, { headers })
            .then((res) => dispatch({type: actions.TASKS_SUCCESS, payload: res.data?.tasks}))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE}))
}

const getSubTasks = (id) => dispatch => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.SUBTASK_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://taskmanager-backend.onrender.com/subtasks/${id}`, { headers })
            .then((res) => {return res?.data?.subTasks})
            // .then((res) => dispatch({type: actions.SUBTASK_SUCCESS, payload : res?.data?.subTasks}))
            .catch((err) => dispatch({type: actions.SUBTASK_FAILURE, payload : err?.response?.data?.msg}))
}

const getTags = () => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://taskmanager-backend.onrender.com/tags`, { headers })
            .then((res) => dispatch({type: actions.TAGS_SUCCESS, payload: res.data?.tags}))
            .catch((err) => dispatch({type: actions.TAGS_FAILURE}))
}

const getProfile = () => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://taskmanager-backend.onrender.com/profile`, { headers })
            .then((res) => {return res?.data?.user})
            .catch((err) => {return err?.response?.data?.msg})
}


const updateTask = (id, payload) => (dispatch) => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.UPDATE_TASK_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                method : "PATCH",
                url : `https://taskmanager-backend.onrender.com/tasks/edit/${id}`,
                headers,
                data : payload
            })
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE, payload : err?.response?.data?.msg}))
}

const addTag = (payload) => (dispatch) => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                method : "POST",
                url : `https://taskmanager-backend.onrender.com/tags/create`,
                headers,
                data : payload
            })
            .then((res) => dispatch(getTags()))
            .catch((err) => dispatch({type: actions.TAGS_FAILURE, payload : err?.response?.data?.msg}))
}

const createTask = (payload) => (dispatch) => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.TASKS_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
            method : "POST",
            url : `https://taskmanager-backend.onrender.com/tasks/create`,
            headers,
            data : payload
            })
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE, payload : err?.response?.data?.msg}))
}

const createSubTask = (id, payload) => (dispatch) => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.SUBTASK_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
            method : "POST",
            url : `https://taskmanager-backend.onrender.com/subtasks/${id}/create`,
            headers,
            data : payload
            })
            .then((res) => dispatch(getSubTasks(id)))
            .catch((err) => dispatch({type: actions.SUBTASK_FAILURE, payload : err?.response?.data?.msg}))
}

const deleteTask = (taskId) => (dispatch) => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.TASKS_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`https://taskmanager-backend.onrender.com/tasks/delete/${taskId}`, { headers })
            .then((res) => dispatch(getTasks()))
            .catch((err) => dispatch({type: actions.TASKS_FAILURE, payload : err?.response?.data?.msg}))
}

const deleteSubTask = (taskId, subTaskId) => (dispatch) => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.SUBTASK_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`https://taskmanager-backend.onrender.com/subtasks/${taskId}/delete/${subTaskId}`, { headers })
            .then((res) => dispatch(getSubTasks(taskId)))
            .catch((err) => dispatch({type: actions.SUBTASK_FAILURE, payload : err?.response?.data?.msg}))
}

const updateSubTaskStatus = (taskId, subTaskId, payload) => (dispatch) => {
    const token = getLoginData('loginToken');
    dispatch({type : actions.SUBTASK_REQUEST});
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
        method : "PATCH",
        url : `https://taskmanager-backend.onrender.com/subtasks/${taskId}/edit/${subTaskId}`,
        headers,
        data : payload
        })
        .then((res) => dispatch(getSubTasks(taskId)))
        .catch((err) => dispatch({type: actions.SUBTASK_FAILURE, payload : err?.response?.data?.msg}))
}

export {
    getTasks,
    getSubTasks,
    getTags,
    getProfile,
    updateSubTaskStatus,
    updateTask,
    addTag,
    createTask,
    createSubTask,
    deleteSubTask,
    deleteTask
} 