import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import thunk from "redux-thunk";
import personalAreaReducer from "./reducers/personalAreaReducer";
import postsByUserReducer from "./reducers/postsByUserReducer";
import commentReducer from "./reducers/commentReducer";
import openPostReducer from "./reducers/openPostReducer";
import postAdderReducer from "./reducers/postAdderReducer";


const store = createStore(
    combineReducers({
        loginReducer,
        usersReducer,
        personalAreaReducer,
        postsByUserReducer,
        commentReducer,
        openPostReducer,
        postAdderReducer,
    }), applyMiddleware(thunk)

);

export default store;