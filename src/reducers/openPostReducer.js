import {
    GET_LIST_COMMENTS_BY_POST_ID,
    HIDE_POST_WITH_COMMENTS,
    SHOW_POST_WITH_COMMENTS
} from "../constants/actions/actions_const";
import {useEffect} from "react";
import {getUsersList} from "../api/dumMyApi";


const initialState = {
    showPostComments: false,
}



const openPostReducer=(state=initialState, action) => {
    switch (action.type){
        case SHOW_POST_WITH_COMMENTS: return{
            showPostComments : action.payload,
        }
        case HIDE_POST_WITH_COMMENTS: return{
            showPostComments : action.payload,
        }
        default:
            return state;
    }

};

export default openPostReducer;