import * as actions from './actionTypes'

const initState = {
    subTasks : [],
    isSubTaskLoading : false,
    isSubTaskError : false,
    response : ""
}

const subTaskReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case actions.SUBTASK_REQUEST : {
            return {
                ...state,
                isSubTaskLoading : true,
                isSubTaskError : false,
                response : ""
            }
        }
        case actions.SUBTASK_SUCCESS : {
            return {
                ...state,
                subTasks : payload,
                isSubTaskLoading : false,
                isSubTaskError : false,
                response : ""
            }
        }
        case actions.SUBTASK_FAILURE : {
            return {
                ...state,
                isSubTaskLoading : false,
                isSubTaskError : true,
                response : payload
            }
        }
        default : 
            return state
    }
}

export {subTaskReducer}