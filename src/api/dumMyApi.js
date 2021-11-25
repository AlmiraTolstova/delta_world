import {
    APP_ID_FIELD, APP_ID_VALUE, COMMENT_URL, LIMIT_FIELD, PAGE_FIELD, POST_URL, USER_URL,
} from '../constants/api/dumMyApi';
import { METHOD_GET } from '../constants/api/common';


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

export const getUsersList = (
    page,
    limit,
    callback,
    errorCallback,
) => {
    fetch(USER_URL, {
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
