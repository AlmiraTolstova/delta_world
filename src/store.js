import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import thunk from "redux-thunk";


const store = createStore(
    combineReducers({
        loginReducer,
        usersReducer,
    }), applyMiddleware(thunk)

);

export default store;