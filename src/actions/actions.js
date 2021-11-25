import {LOAD_POSTS, LOAD_USERS} from "../constants/actions/actions_const";


export const loadUsers = () => ({
    type: LOAD_USERS,
});

export const loadPosts = () => ({
    type: LOAD_POSTS,
});