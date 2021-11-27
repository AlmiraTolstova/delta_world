import {GET_POSTS_BY_USER_ID} from "../constants/actions/actions_const";


const initialState = {
    postsList:[]                      //массив постов под пользователя

}


const postsByUserReducer=(state=initialState, action)=>{
    switch (action.type){
        case GET_POSTS_BY_USER_ID: return {
            postsList: action.payload,
        }
        default:
            return state;
    }
}

export default postsByUserReducer;