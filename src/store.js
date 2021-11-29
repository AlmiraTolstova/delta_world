import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import thunk from "redux-thunk";
import personalAreaReducer from "./reducers/personalAreaReducer";
import postsByUserReducer from "./reducers/postsByUserReducer";
import commentReducer from "./reducers/commentReducer";


const store = createStore(
    combineReducers({
        loginReducer,
        usersReducer,
        personalAreaReducer,
        postsByUserReducer,
        commentReducer,
    }), applyMiddleware(thunk)

);

export default store;