const ws = require('ws');
const fs = require('fs')
const fetch = require('node-fetch')

const express = require('express')


const app = express()

const APP_ID_VALUE = '618684006232a15b6abb4385';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const APP_ID_FIELD = 'app-id';
const PAGE_FIELD = 'page';
const LIMIT_FIELD = 'limit';
const DUM_BASE_URL = 'https://dummyapi.io/data/v1/';
const DUM_POST_URL = `${DUM_BASE_URL}post`;
const DUM_USER_URL = `${DUM_BASE_URL}user`;

const host = '127.0.0.1'
const port = 4000


const POST_URL = `/post`;
const USER_URL = `/user`;



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

app.route(`${USER_URL}/id`)
    .get((req, res) => {
        console.log("getUsersByIDFromProxy",req.query);
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
            .catch(error => res.status(500).send('third-party api error'))

    })

app.route(USER_URL)//getUsersListFromProxy
    .get((req, res) => {
         console.log('getUsersListFromProxy',req.query);
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
            .catch(error => res.status(500).send('third-party api error'))

    })//getUsersByIDFromProxy

    //
    //
    // .post((req, res) => {
    //     res.status(200)
    //         .send('POST echo')
    // })
    // .put((req, res) => {
    //     res.status(200)
    //         .send('PUT echo')
    // })
    // .delete((req, res) => {
    //     res.status(200)
    //         .send('DELETE echo')
    // })
    // .options((req, res) => {
    //     res.status(200)
    //         .end()
    // })


app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`));





















// const server = new ws.Server(
//     {
//         port:9000
//     }
// )
//
//
//
// server.on('connection',(client)=>{
//     client.send(JSON.stringify({
//         type: 'message',
//         text: "you'r connected to proxy server"
//     }))
//
//     client.on('close',()=>console.log("close connection"))
//
//     client.on('message',(json)=>{
//         const message = JSON.parse(json)
//         if(message.type==='sendMessage'){
//
//         }
//     })
// })

