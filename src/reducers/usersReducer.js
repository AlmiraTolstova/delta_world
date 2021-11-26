import produce from "immer";
import {LOADING_USERS, LOADING_USERS_ERROR} from "../constants/actions/actions_const";
const {LOAD_USERS} = require("../constants/actions/actions_const");


const initialState = {
    usersList : [],
    loading: false,
    error : null
};

// const load =(draft, resp)=>{
//     draft.usersList = resp || [];
//     return draft;
// }

const usersReducer = (state = initialState, action)=> {
    console.log("выполнен usersReducer")
    switch (action.type) {
        case LOADING_USERS: return{
                loading : true,
                error : null,
                usersList : []
        }
        case LOADING_USERS_ERROR: return{
                loading: false,
                error: action.payload,
                usersList:[]
        }
        case LOAD_USERS:
            return {
                loading : false,
                error : null,
                usersList : action.payload
            }
        default:
            return state;
    }
}

export default usersReducer;