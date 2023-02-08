import { getLoginData, saveLoginData } from "../../utils/LocalStorage";
import * as actions from './actionTypes';


const initState = {
    isAuth : (getLoginData('token') ? true : false),
    token : (getLoginData('token')) || "",
    isLoading : false,
    isError : false,
}

const reducer = (state=initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case actions.LOGIN_REQUEST : 
            return {
                ...state,
                isLoading : true
            }
        case actions.LOGIN_SUCCESS : 
        saveLoginData('token', payload);
            return {
                ...state,
                isLoading : false,
                isAuth : true,
                token : payload,
            }
        case actions.LOGIN_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : "",
                isError : true
            }
        case actions.LOGOUT_REQUEST : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : "",
                isError : false
            }
        default :
            return state;
    }
}

export {reducer}