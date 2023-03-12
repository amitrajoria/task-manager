import { getLoginData, saveLoginData } from "../../utils/LocalStorage";
import * as actions from './actionTypes';


const initState = {
    isAuth : (getLoginData('loginToken') ? true : false),
    token : (getLoginData('loginToken')) || "",
    isLoading : false,
    isError : false,
    response : ""
}

const reducer = (state=initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case actions.LOGIN_REQUEST : 
            return {
                ...state,
                isLoading : true,
                response : ""
            }
        case actions.LOGIN_SUCCESS : 
        saveLoginData('loginToken', payload.token);
            return {
                ...state,
                isLoading : false,
                isAuth : true,
                isError : false,
                token : payload.token,
                response : payload.msg
            }
        case actions.LOGIN_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : "",
                response : payload,
                isError : true
            }
        case actions.REGISTER_REQUEST : 
            return {
                ...state,
                isLoading : true,
                response : ""
            }
        case actions.REGISTER_SUCCESS : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                response : payload,
            }
        case actions.REGISTER_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : "",
                isError : true,
                response : payload,
            }
        case actions.LOGOUT_REQUEST : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : "",
                response : "",
                isError : false
            }
        default :
            return state;
    }
}

export {reducer}