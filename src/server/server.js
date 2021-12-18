const ws = require('ws');
const fs = require('fs')
const express = require('express')
const app = express()


const host = '127.0.0.1'
const port = 3000


const POST_URL = `/post`;
const USER_URL = `/user`;

app.use(express.json()) // Необходимо для парсинга body в соответствуюзих запросах в формате JSON
app.use((req, res, next) => {
    res.type('text/plain') // Установка заголовка type
        .set( // Установка заголовка
            'Access-Control-Allow-Origin', // Заголовок
            '*' // Значение заголовка
        )
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
        .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next() // Если не вызвпать то запрос не пройдёт дальше
})

app.route(USER_URL)
    .get((req, res) => {
        console.log(req);
        res
            // .sendStatus(405) // Отправить пустой ответ с указанным статусом
            .status(200) // Установка статуса
            .json('GET echo') // Отправить ответ с указанными параметрами.
        //.redirect('localhost:2000') // Перенаправить на url (отправить 302-й статус)
        //.json({ key: 'value'}) // Отправить объект (производится преобразование в JSON)
    })
    .post((req, res) => {
        res.status(200)
            .send('POST echo')
    })
    .put((req, res) => {
        res.status(200)
            .send('PUT echo')
    })
    .delete((req, res) => {
        res.status(200)
            .send('DELETE echo')
    })
    .options((req, res) => {
        res.status(200)
            .end()
    })

app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))





















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

