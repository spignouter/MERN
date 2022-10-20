// модели создаються для работы с базой данных, 

// такая запись позволяет забирать или подлючать поля и методы определенные в пакетах
const {Schema, model, Types} = require('mongoose')

// создаем схему через конструктор
const shema = new Schema({
    email:{type: String, required: true, unique: true},
    password:{type:String, required:true},
    links:[{type: Types.ObjectId, ref: 'Link'}]
})

// экспорт модели
module.exports = model('User', schema)