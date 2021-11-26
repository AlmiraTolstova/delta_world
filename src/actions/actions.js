import {LOAD_POSTS, LOAD_USERS, LOGIN_IN} from "../constants/actions/actions_const";


export const loadUsers = () => ({
    type: LOAD_USERS,
});

export const loadPosts = () => ({
    type: LOAD_POSTS,
});

export const loginIn = (userId)=>({
    type: LOGIN_IN,
    userId,
})