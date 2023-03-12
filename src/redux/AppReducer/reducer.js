import * as actions from './actionTypes'

const initState = {
    tasks : [],
    tags : [],
    isLoading : false,
    isError : false ,
    response : ""
}

const reducer = (state = initState, action) => {
    const {type, payload} = action; 
    switch(type) {
        case actions.TASKS_REQUEST : 
            return {
                ...state,
                isLoading : true,
                isError : false,
                response : ""
            }
        case actions.TASKS_SUCCESS : 
            return {
                ...state,
                isLoading : false,
                tasks : payload,
                isError : false,
                response : ""
            }
        case actions.TASKS_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isError : true,
                response : payload
            }
        case actions.UPDATE_TASK_REQUEST  : 
            return {
                ...state,
                isLoading : true,
                isError : false,
                response : ""
            }
        case actions.UPDATE_TASK_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isError : true,
                response : ""
            }
        case actions.TAGS_SUCCESS: 
            return {
                ...state,
                tags : payload,
                isError : false,
                response : ""
            }
        case actions.TAGS_FAILURE : 
            return {
                ...state,
                isError : true,
                response : payload
            }
        default : 
            return state;
    }
}


export {reducer}