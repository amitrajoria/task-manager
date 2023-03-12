import { legacy_createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {reducer as AuthReducer} from "./AuthReducer/reducer";
import {reducer as AppReducer} from "./AppReducer/reducer";
import { subTaskReducer } from "./AppReducer/subTaskReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({AppReducer, AuthReducer, subTaskReducer});

const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;