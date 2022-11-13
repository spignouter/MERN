// бекенд устанавливаеться на експрессе
const express = require('express')

//  за подключения переменной среды config отвечает пакет config
const config = require('config')

// подключение к mongodb
const mongoose = require('mongoose')

// создание приложение
const app = express()

// создаем роуты это концепт мидлвере в экспрессе 
app.use('/api/auth', require('./routes/auth.routers'))

//  подключение переменной port  из файла конфигурации
const PORT = config.get('port') || 5000

// конект к mongo возвращает промис. Опции в 6 версии устарели: useNewUrlParser , useUnifiedTopology , useFindAndModify 
async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'))
        app.listen(5000, ()=> console.log(`App has been started on port ${PORT}...`))
    }catch(e){
        console.log('Что то не так', e.message)
        process.exit(1)
    }
}

start()
