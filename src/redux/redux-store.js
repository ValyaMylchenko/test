import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk" 
import { converterReducer } from "./main-reducer"



let reducers = combineReducers({
    main: converterReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;