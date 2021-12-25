import {
    APP_ID_FIELD,
    APP_ID_VALUE,
    COMMENT_URL,
    LIMIT_FIELD,
    PAGE_FIELD,
    POST_URL, PROXY_COMMENT_URL,
    PROXY_POST_URL,
    PROXY_USER_URL,
    USER_URL,
} from '../constants/api/dumMyApi';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../constants/api/common';
import {Dispatch} from "redux";
import {
    CREATE_USER, CREATE_USER_ERROR, GET_LIST_COMMENTS_BY_POST_ID, GET_POSTS_BY_USER_ID, GET_USER_FULL_INFO,
    LOAD_USERS,
    LOADING_USERS,
    LOADING_USERS_ERROR,
    LOGIN_IN,
    LOGIN_IN_ERROR
} from "../constants/actions/actions_const";
import {loginIn} from "../actions/actions";




export const getPostsList = (   //заменена на прокси
    page,
    limit,
    callback,
    errorCallback,
) => {
    fetch(`${POST_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
        method: METHOD_GET,
        headers: new Headers({
            [APP_ID_FIELD]: APP_ID_VALUE,
            [PAGE_FIELD]: '0',//page.toString(),
            [LIMIT_FIELD]: '6',//limit.toString(),
        }),
    }).then((response) => response.json())
        .then((response) => {callback(response.data);
            console.log(response.data);})
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

export const getUsersList = (   //заменена на запрос от прокси
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

//--------------------Запросы от прокcи сервера----------------------------------------
export const getPostsListFromProxy = (
    page,
    limit,
    callback,
    errorCallback,
) => {
    console.log("запускаем запрос списка постов от прокси сервера: ", `${PROXY_POST_URL}/postlist?page=${page.toString()}&limit=${limit.toString()}`);
    fetch(`${PROXY_POST_URL}/postlist?page=${page.toString()}&limit=${limit.toString()}`, {
        method: METHOD_GET,
        headers: new Headers({
            [APP_ID_FIELD]: APP_ID_VALUE,
            [PAGE_FIELD]: '0',//page.toString(),
            [LIMIT_FIELD]: '6',//limit.toString(),
        }),
    }).then((response) => response.json())
        .then((response) => {callback(response.data);
            console.log("получен список постов от прокси ",response.data);})
        .catch(errorCallback);
};

export const getUsersListFromProxy = (
    page,
    limit
) => {
    return async (Dispatch) => {
        console.log("запускаем запрос пользователей от прокси сервера: ", PROXY_USER_URL)
        try{
            const response = await fetch(`${PROXY_USER_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
                method: METHOD_GET,
                //
                headers: new Headers({
                    'content-type': 'application/json'
                }),
            })
            const resp = await response.json();
            console.log('полученные данные от прокси сервера: ',resp.data);
            Dispatch( {type: LOAD_USERS, payload: resp.data})
        }
        catch(error){
            console.log("получили ошибку выполнения запроса пользователей"+error);
        }
    }
}

export const getUsersByIDFromProxy = (
    id,
) => {

    return async (Dispatch) => {
        console.log("запрос проверки данных юзера от прокси", `${PROXY_USER_URL}/id?id=${id}`);
        try {
            const response = await fetch(`${PROXY_USER_URL}/id?id=${id}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: LOGIN_IN, payload: resp})
        } catch (error){
            console.log("получили ошибку выполнения запроса проверки пользователя от прокси"+error.text);
            (Dispatch({type: LOGIN_IN_ERROR, payload:"Произошла какая то ошибка при проверке пользователя от прокси"}))
        }
    }
};

export const getUsersFullInfoByIDFromProxy = (
    id,
) => {

    return async (Dispatch) => {
        console.log("запрос проверки данных юзера от прокси");
        try {
            const response = await fetch(`${PROXY_USER_URL}/finfo?id=${id}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: GET_USER_FULL_INFO, payload: resp})
        } catch (error){
            console.log("получили ошибку выполнения запроса проверки пользователя от прокси"+error.text);
        }
    }
};

export const getPostsByUserIdFromProxy = (
    id,
    page,
    limit
) => {

    return async (Dispatch) => {
        console.log("запрос списка постов по id юзера от прокси",`${PROXY_USER_URL}/post?id=${id}&page=${page.toString()}&limit=${limit.toString()}`);
        try {
            const response = await fetch(`${PROXY_USER_URL}/post?id=${id}&page=${page.toString()}&limit=${limit.toString()}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: GET_POSTS_BY_USER_ID, payload: resp.data})
        } catch (error){
            console.log("получили ошибку выполнения запроса постов пользователя от прокси"+error.text);
        }
    }
};

export const getCommentsByPostIDFromProxy = (
    id,
    page,
    limit
) => {

    return async (Dispatch) => {
        console.log("запрос списка комментов по id поста от прокси", id);//?page=${page.toString()}&limit=${limit.toString()}
        try {
            const response = await fetch(`${PROXY_POST_URL}/comment?id=${id}&page=${page.toString()}&limit=${limit.toString()}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log("получили список комментариев от прокси", resp.data)
            Dispatch( {type: GET_LIST_COMMENTS_BY_POST_ID, payload: resp.data})
        } catch (error){
            console.log("получили ошибку выполнения запроса постов пользователя"+error.text);
        }
    }
};


export const createUserToProxy = (
    firstName,
    lastName,
    male,
    dateOfBirth,
    email,
    phone
)=>{
    return async (Dispatch) => {
        console.log("запрос создания юзера");
        console.log(JSON.stringify({'firstName':firstName,'lastName':lastName,'email':email}));
        try {
            const response = await fetch(`${PROXY_USER_URL}/create?firstName=${firstName}&lastName=${lastName}&email=${email}&gender=${male}&dateOfBirth=${dateOfBirth}&phone=${phone}`, {
                method: METHOD_POST,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE,
                    'Content-Type': 'application/json;charset=utf-8'
                }),
                //приходят данные вида: firstName, secondName, male, dateOfBirth, email, phone
                //body: JSON.stringify({'firstName':firstName,'lastName':lastName,'email':email, 'gender':male, 'dateOfBirth':dateOfBirth, 'phone':phone})
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: CREATE_USER, payload: resp})
        } catch (error){
            console.log("получили ошибку выполнения запроса создания нового пользователя");
            (Dispatch({type: CREATE_USER_ERROR, payload:"Произошла ошибка выполнения запроса создания нового пользователя"}))
        }
    }
}

export const updateUserToProxy = (
    id,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    img
)=>{
    return async (Dispatch) => {
        console.log("запрос обновления юзера");
        console.log(JSON.stringify({'firstName':firstName,'lastName':lastName}));
        try {
            const response = await fetch(`${PROXY_USER_URL}/update?id=${id}&firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dateOfBirth}&phone=${phone}&img=${img}`, {
                method: METHOD_PUT,
                headers: new Headers({
                    //[APP_ID_FIELD]: APP_ID_VALUE,
                    'Content-Type': 'application/json;charset=utf-8'
                }),
                //приходят данные вида: firstName, secondName, male, dateOfBirth, email, phone
                body: JSON.stringify({'firstName':firstName,'lastName':lastName, 'dateOfBirth':dateOfBirth, 'phone':phone})
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: CREATE_USER, payload: resp})
            Dispatch(getUsersFullInfoByIDFromProxy(id));
        } catch (error){
            console.log("получили ошибку выполнения запроса обновления пользователя");

        }
    }
}

export const createPostToProxy = (
    userId,
    text,
    img
)=>{
    return async (Dispatch) => {
        console.log("запрос создания поста");
        console.log(JSON.stringify({'userId':userId,'text':text,'img':img}));
        try {
            const response = await fetch(`${PROXY_POST_URL}/create?id=${userId}&text=${text}&img=${img}`, {
                method: METHOD_POST,
                headers: new Headers({
                //    'Content-Type': 'application/json;charset=utf-8'
                }),
            })
            const resp = await response.json();
            console.log(resp);


        } catch (error){
            console.log("получили ошибку выполнения запроса создания нового поста");

        }
    }
}

export const createCommentToProxy = (
    userId,
    text,
    postId
)=>{
    return async (Dispatch) => {
        console.log("запрос создания комментария");
        console.log(JSON.stringify({'userId':userId,'text':text,'postId':postId}));
        try {
            const response = await fetch(`${PROXY_COMMENT_URL}/create?userId=${userId}&text=${text}&postId=${postId}`, {
                method: METHOD_POST,
                headers: new Headers({
                }),
            })
            const resp = await response.json();
            console.log(resp);
            Dispatch(getCommentsByPostIDFromProxy(postId, 0, 5));

        } catch (error){
            console.log("получили ошибку выполнения запроса создания нового комментария");

        }
    }
}

//-------------------------------------------------------------------------------------

export const getUsersByID = (//заменена на функцию от прокси
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


export const getUsersFullInfoByID = (   //заменена на от прокси
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

            Dispatch( {type: GET_USER_FULL_INFO, payload: resp})
        } catch (error){
            console.log("получили ошибку выполнения запроса проверки пользователя"+error.text);
        }
    }
};

export const getPostsByUserId = (   //заменена на прокси
    id,
    page,
    limit
) => {

    return async (Dispatch) => {
        console.log("запрос списка постов по id юзера");//?page=${page.toString()}&limit=${limit.toString()}
        try {
            const response = await fetch(`${USER_URL}/${id}/post?page=${page.toString()}&limit=${limit.toString()}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: GET_POSTS_BY_USER_ID, payload: resp.data})
        } catch (error){
            console.log("получили ошибку выполнения запроса постов пользователя"+error.text);
        }
    }
};

export const createUser = ( //заменена на прокси
        firstName,
        lastName,
        male,
        dateOfBirth,
        email,
        phone
)=>{
    return async (Dispatch) => {
        console.log("запрос создания юзера");
        console.log(JSON.stringify({'firstName':firstName,'lastName':lastName,'email':email}));
        try {
            const response = await fetch(`${USER_URL}/create/`, {
                method: METHOD_POST,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE,
                    'Content-Type': 'application/json;charset=utf-8'
                }),
                //приходят данные вида: firstName, secondName, male, dateOfBirth, email, phone
                body: JSON.stringify({'firstName':firstName,'lastName':lastName,'email':email, 'gender':male, 'dateOfBirth':dateOfBirth, 'phone':phone})
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: CREATE_USER, payload: resp})
        } catch (error){
            console.log("получили ошибку выполнения запроса создания нового пользователя");
            (Dispatch({type: CREATE_USER_ERROR, payload:"Произошла ошибка выполнения запроса создания нового пользователя"}))
        }
    }
}

export const updateUser = ( //замена на прокси
    id,
    firstName,
    lastName,
    dateOfBirth,
    phone
)=>{
    return async (Dispatch) => {
        console.log("запрос обновления юзера");
        console.log(JSON.stringify({'firstName':firstName,'lastName':lastName}));
        try {
            const response = await fetch(`${USER_URL}/${id}`, {
                method: METHOD_PUT,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE,
                    'Content-Type': 'application/json;charset=utf-8'
                }),
                //приходят данные вида: firstName, secondName, male, dateOfBirth, email, phone
                body: JSON.stringify({'firstName':firstName,'lastName':lastName, 'dateOfBirth':dateOfBirth, 'phone':phone})
            })
            const resp = await response.json();
            console.log(resp);

            Dispatch( {type: CREATE_USER, payload: resp})
            Dispatch(getUsersFullInfoByID(id));
        } catch (error){
            console.log("получили ошибку выполнения запроса обновления пользователя");

        }
    }
}

export const getCommentsByPostID = (    //заменена на прокси
    id,
    page,
    limit
) => {

    return async (Dispatch) => {
        console.log("запрос списка комментов по id поста ", id);//?page=${page.toString()}&limit=${limit.toString()}
        try {
            const response = await fetch(`${POST_URL}/${id}/comment?page=${page.toString()}&limit=${limit.toString()}`, {
                method: METHOD_GET,
                headers: new Headers({
                    [APP_ID_FIELD]: APP_ID_VALUE
                })
            })
            const resp = await response.json();
            console.log(resp.data);
            console.log("мы внутри запроса данных комментов")
            Dispatch( {type: GET_LIST_COMMENTS_BY_POST_ID, payload: resp.data})
        } catch (error){
            console.log("получили ошибку выполнения запроса постов пользователя"+error.text);
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