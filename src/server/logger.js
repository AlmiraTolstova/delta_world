const options = {
    logDirectory:'./logs', // Директория для хранения логгов (должна существовать)
    fileNamePattern: '<DATE>.log', // Паттерн файла логов
    dateFormat: 'DD.MM.YYYY' // Формат даты
}

module.exports = require('simple-node-logger').createRollingFileLogger(options) // Создание логгера


