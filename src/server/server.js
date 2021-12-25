const ws = require('ws');
const fs = require('fs');
const fetch = require('node-fetch');


const express = require('express');
const logger = require('./logger');
const {DUM_POST_URL, METHOD_GET, APP_ID_VALUE, DUM_USER_URL, METHOD_POST, METHOD_PUT, POST_URL, USER_URL,
    DUM_COMMENT_URL, COMMENT_URL
} = require("./constants/constants");
const {METHOD_DELETE} = require("./constants/constants");
const app = express();
const host = '127.0.0.1'
const port = 4000


app.use(express.json()) // Необходимо для парсинга body в соответствуюзих запросах в формате JSON
app.use((req, res, next) => {
    res.type('application/json') // Установка заголовка type
        .set( // Установка заголовка
            'Access-Control-Allow-Origin', // Заголовок
            '*' // Значение заголовка
        )
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
        .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next() // Если не вызвпать то запрос не пройдёт дальше
})

//getPostsListFromProxy Маршрут к списку постов
app.route(`${POST_URL}/postlist`)
    .get((req, res) => {
        console.log("getPostsListFromProxy",req.query);
        const page=req.query['page'].toString();
        const limit=req.query['limit'].toString();
        logger.info("getPostsListFromProxy",req.query);
        fetch(`${DUM_POST_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
            method: METHOD_GET,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                resp.json().then(out => {
                    //console.log(out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error.text);
            })

    })

//getCommentsByPostIDFromProxy Маршрут для комментариев к посту
app.route(`${POST_URL}/comment`)
    .get((req, res) => {
        console.log("getCommentsByPostIDFromProxy",req.query);
        logger.info("getCommentsByPostIDFromProxy",req.query)
        const id=req.query['id'].toString();
        const page=req.query['page'].toString();
        const limit=req.query['limit'].toString();
        //console.log(`${DUM_POST_URL}?page=${page.toString()}&limit=${limit.toString()}`);
        fetch(`${DUM_POST_URL}/${id}/comment?page=${page.toString()}&limit=${limit.toString()}`, {
            method: METHOD_GET,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                resp.json().then(out => {
                    //console.log(out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })
//getUsersByIDFromProxy
app.route(`${USER_URL}/id`)
    .get((req, res) => {
        console.log("getUsersByIDFromProxy",req.query);
        logger.info("getUsersByIDFromProxy",req.query);
        const id=req.query['id'].toString();
        fetch(`${DUM_USER_URL}/${id}`, {
            method: METHOD_GET,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                resp.json().then(out => {
                    // console.log(out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error')
            })

    })

//getUsersFullInfoByIDFromProxy
app.route(`${USER_URL}/finfo`)
    .get((req, res) => {
        console.log("getUsersFullInfoByIDFromProxy",req.query);
        logger.info("getUsersFullInfoByIDFromProxy",req.query);
        const id=req.query['id'].toString();
        fetch(`${DUM_USER_URL}/${id}`, {
            method: METHOD_GET,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                resp.json().then(out => {
                    // console.log(out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

//getPostsByUserIdFromProxy
app.route(`${USER_URL}/post`)
    .get((req, res) => {
        console.log("getPostsByUserIdFromProxy",req.query);
        logger.info("getPostsByUserIdFromProxy",req.query);
        const id=req.query['id'].toString();
        const page=req.query['page'].toString();
        const limit=req.query['limit'].toString();
        fetch(`${DUM_USER_URL}/${id}/post?page=${page.toString()}&limit=${limit.toString()}`, {
            method: METHOD_GET,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                resp.json().then(out => {
                    //console.log(out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.route(USER_URL)//getUsersListFromProxy
    .get((req, res) => {
         console.log('getUsersListFromProxy',req.query);
        logger.info('getUsersListFromProxy',req.query);
        // console.log("our query: ", DUM_USER_URL);
        const page=req.query['page'].toString();
        const limit=req.query['limit'].toString();
        fetch(`${DUM_USER_URL}?page=${page.toString()}&limit=${limit.toString()}`, {
                    method: METHOD_GET,
                    headers: {
                        'app-id': APP_ID_VALUE,
                        'Content-Type': 'application/json',
                    },
        })
            .then(resp => {
                resp.json().then(out => {
                    // console.log(out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.route(`${USER_URL}/create`)//createUserToProxy
    .post((req, res) => {
        console.log('createUserToProxy',req.query);
        console.log("our query: ", `${DUM_USER_URL}/create/`);
        logger.info('createUserToProxy',req.query);
        const firstName=req.query['firstName'].toString();
        const lastName=req.query['lastName'].toString();
        const email=req.query['email'].toString();
        const male=req.query['gender'].toString();
        const dateOfBirth=req.query['dateOfBirth'].toString();
        const phone=req.query['phone'].toString();
        fetch(`${DUM_USER_URL}/create`, {
            method: METHOD_POST,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'firstName':firstName,'lastName':lastName,'email':email, 'gender':male, 'dateOfBirth':dateOfBirth, 'phone':phone})
        })
            .then(resp => {
                resp.json().then(out => {
                    console.log("создание пользователя, ответ от сервера: ",out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.route(`${USER_URL}/update`)//updateUserToProxy
    .put((req, res) => {
        console.log('updateUserToProxy',req.query);
        console.log("our query: ", `${DUM_USER_URL}/update/`);
        logger.info('updateUserToProxy',req.query);
        const id=req.query['id'].toString();
        const firstName=req.query['firstName'].toString();
        const lastName=req.query['lastName'].toString();
        const dateOfBirth=req.query['dateOfBirth'].toString();
        const phone=req.query['phone'].toString();
        const img=req.query['img'].toString();
        fetch(`${DUM_USER_URL}/${id}`, {
            method: METHOD_PUT,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'firstName':firstName,'lastName':lastName, 'dateOfBirth':dateOfBirth, 'phone':phone, 'picture':img})
        })
            .then(resp => {
                resp.json().then(out => {
                    console.log("создание пользователя, ответ от сервера: ",out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.route(`${POST_URL}/create`)//createPostToProxy
    .post((req, res) => {
        console.log('createPostToProxy',req.query);
        console.log("our query: ", `${DUM_POST_URL}/create/`);
        logger.info('createPostToProxy',req.query);
        const userId=req.query['id'].toString();
        const text=req.query['text'].toString();
        const img=req.query['img'].toString();
        fetch(`${DUM_POST_URL}/create`, {
            method: METHOD_POST,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'owner':userId,'text':text,'image':img})
        })
            .then(resp => {
                resp.json().then(out => {
                    console.log("создание поста, ответ от сервера: ",out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.route(`${COMMENT_URL}/create`)//createCommentToProxy
    .post((req, res) => {
        console.log('createCommentToProxy',req.query);
        console.log("our query: ", `${DUM_COMMENT_URL}/create/`);
        logger.info('createCommentToProxy',req.query);
        const userId=req.query['userId'].toString();
        const text=req.query['text'].toString();
        const postId=req.query['postId'].toString();
        fetch(`${DUM_COMMENT_URL}/create`, {
            method: METHOD_POST,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'owner':userId,'message':text,'post':postId})
        })
            .then(resp => {
                resp.json().then(out => {
                    console.log("создание комментарии, ответ от сервера: ",out);
                    res.status(200).send(JSON.stringify(out));
                });
                //res.status(200).send(resp);
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.route(`${POST_URL}/delete`)//deletePostToProxy
    .delete((req, res) => {
        console.log('deletePostToProxy',req.query);

        logger.info('deletePostToProxy',req.query);
        const postId=req.query['postId'].toString();
        console.log(`${DUM_POST_URL}/${postId}`)
        fetch(`${DUM_POST_URL}/${postId}`, {
            method: METHOD_DELETE,
            headers: {
                'app-id': APP_ID_VALUE,
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({'owner':userId,'text':text,'image':img})
        })
            .then(resp => {
                resp.json().then(out => {
                    console.log("удаление поста, ответ от сервера: ",out);
                    res.status(200).send(JSON.stringify(out));
                });
            })
            .catch(error => {
                res.status(500).send('third-party api error');
                logger.info(error, 'third-party api error');
            })

    })

app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`));



















