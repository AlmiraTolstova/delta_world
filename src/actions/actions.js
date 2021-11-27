import {CREATE_USER, LOAD_POSTS, LOAD_USERS, LOGIN_IN, LOGIN_OUT} from "../constants/actions/actions_const";


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

export const loginOut = ()=>({
    type: LOGIN_OUT,
})

export const createUser =(firstName, male, dateOfBirth, email, phone)=>({
    type: CREATE_USER,
    firstName,
    male,
    dateOfBirth,
    email,
    phone
})