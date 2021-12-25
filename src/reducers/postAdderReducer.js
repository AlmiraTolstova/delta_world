import {HIDE_POST_ADDER, SHOW_POST_ADDER} from "../constants/actions/actions_const";


const initialState = {
    showPostAdder: false,
}



const postAdderReducer=(state=initialState, action) => {
    switch (action.type){
        case SHOW_POST_ADDER: return{
            showPostAdder : action.payload,
        }
        case HIDE_POST_ADDER: return{
            showPostAdder : action.payload,
        }
        default:
            return state;
    }

};

export default postAdderReducer;