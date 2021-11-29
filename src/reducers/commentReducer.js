import {GET_LIST_COMMENTS_BY_POST_ID, LOGIN_IN} from "../constants/actions/actions_const";


const initialState = {
    listComments: []
}


const commentReducer=(state=initialState, action) => {
    switch (action.type){
        case GET_LIST_COMMENTS_BY_POST_ID: return{
            listComments : action.payload,
        }
        default:
            return state;
    }

};

export default commentReducer;