import {
    APP_ID_FIELD, APP_ID_VALUE, COMMENT_URL, LIMIT_FIELD, PAGE_FIELD, POST_URL, USER_URL,
} from '../constants/api/dumMyApi';
import { METHOD_GET } from '../constants/api/common';
import {Dispatch} from "redux";
import {
    LOAD_USERS,
    LOADING_USERS,
    LOADING_USERS_ERROR,
    LOGIN_IN,
    LOGIN_IN_ERROR
} from "../constants/actions/actions_const";
import {loginIn} from "../actions/actions";

export const getPostsList = (
    page,
    limit,
    callback,
    errorCallback,
) => {
    fetch(POST_URL, {
        method: METHOD_GET,
        headers: new Headers({
            [APP_ID_FIELD]: APP_ID_VALUE,
            [PAGE_FIELD]: '0',//page.toString(),
            [LIMIT_FIELD]: '6',//limit.toString(),
        }),
    }).then((response) => response.json())
        .then((response) => callback(response.data))
        .catch(errorCallback);
};

// export const getUsersList = (
//     page,
//     limit,
//     callback,
//     errorCallback,
// ) => {
//     fetch(`${USER_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
//         method: METHOD_GET,
//         headers: new Headers({
//             [APP_ID_FIELD]: APP_ID_VALUE,
//             [PAGE_FIELD]: page.toString(),
//             [LIMIT_FIELD]: limit.toString(),
//         }),
//     }).then((response) => response.json())
//         .then((response) => callback(response.data))
//         .catch(errorCallback);
// };

export const getUsersList = (
    page,
    limit
) => {
    return async (Dispatch) => {
        console.log("запускаем запрос пользователей")
        try{
            const response = await fetch(`${USER_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE,
                    [PAGE_FIELD]: page.toString(),
                    [LIMIT_FIELD]: limit.toString(),
                }),
            })
            const resp = await response.json();
            console.log(resp.data);
            //Dispatch((response) => response.json())
            Dispatch( {type: LOAD_USERS, payload: resp.data})
        }
        catch(error){
            console.log("получили ошибку выполнения запроса пользователей"+error.text);
            (Dispatch({type: LOADING_USERS_ERROR, payload:"Произошла какая то ошибка при загрузке пользователей"}))
        }




    }

}

export const getUsersByID = (
    id,
) => {

    return async (Dispatch) => {
        console.log("запрос проверки данных юзера");
        try {
            const response = await fetch(`${USER_URL}/${id}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: LOGIN_IN, payload: resp})
        } catch (error){
            console.log("получили ошибку выполнения запроса проверки пользователя"+error.text);
            (Dispatch({type: LOGIN_IN_ERROR, payload:"Произошла какая то ошибка при проверке пользователя"}))
        }
    }
};
// export const getUsersByID = (
//     id,
//     callback,
//     errorCallback,
// ) => {
//     fetch(`${USER_URL}/${id}`, {
//         method: METHOD_GET,
//         headers: new Headers({
//             [APP_ID_FIELD]: APP_ID_VALUE
//         }),
//     }).then((response) => response.json())
//         .then((response) => {
//             callback(response);
//             //console.log(response.id);
//         })
//         .catch(errorCallback);
// };