// создание маршрутов в приложени. Его можно назвать мидлваре
const {Router} = require('express')

// подключаем криптографию, позволяет хешировать пароли и сравнивать их друг с другом
const bcrypt = require('bcryptjs')

//  подключение jwt
const jwt = require('jsonwebtoken')

// подключение модели
const User = require('../models/User')

//   подключение модуля валидации
const { check, validationResult } = require('express-validator')

// подключение  
const router = Router()

// подключения файла конфигурации
const config = require('config')

// добовляем несколько запросов
// имееться префикс /api/auth все что написано далее будет конкотенироваться с этим путем
// подключение массива валидаторов, проверки правильности введеных данных
router.post('/register', 
    [
        check('email','некоректный email').isEmail(),
        check('password', 'Минимальная длина паролья 6 символов')
        .isLength({min:6})
    ],
    async (req, res)=>{
    try{
        // експресс валидатор проверяет 
        const errors = validationResult(req)

        // если еррорс не пустой, а это значит что еррос заполнен ошибками функция остонавливаеться и отправляет ответ клиенту
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        // это будет отпровляться с фронт энда
        // получаем из реквеста емаил и пароль
        const{email, password} = req.body

        //  логика регистрации
        // поиск пользователя по емейлу и запись ег ов переменную
        const candidate = await User.findOne({email:email})
        
        // если кандидат не пустой, то сервер отправляет ответ клиенту код 400
        if (candidate){
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashadPassword = await bcrypt.hash(password, 12)

        // создаем нового пользователя.Создаем и сохроняем модель User
        const user = new User({email, password: hashadPassword})
        await user.save()

        // ответ ползователю что пользователь успешно создан
        res.status(201).json({message: 'Полозователь создан'})
        // Если условие выше не отработало то мы можем зарегистрировать пользователя
        // но перед этим захешируем его пароль для этого понадобиться библиотека bcryptjs
    }catch(e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
})

router.post(
    '/login',
    [
        check('email','Введите корректные email').normalizeEmail().isEmail(),
        check('password','Введите пароль').exists()
    ],
     async (req, res)=>{
        try{
            // експресс валидатор проверяет 
            const errors = validatorResult(req)
    
            // если еррорс не пустой, а это значит что еррос заполнен ошибками функция остонавливаеться и отправляет ответ клиенту
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            // получаем данные из запроса 
            const {email, password} = req.body
            // проверка есть ли такой пользователь в базе данных
            const user = await User.findOne({email})
            // если нет такого пользователя то возвращаем ошибку на клиент
            if (!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }
            // проверяем совподают ли пароли
            const isMatch  = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message:'Неверный пользователь или пароль, поробуй еще раз'})
            }

            // Наконец то JWT, первый параметр данные которые нужно зашифровать (можно добавть не только ид пользователя но и емаил)
            // Второй параметр добавляем секретный ключ, шифрование судя по всему симметричное.
            // третий параметр, то значение отражающие время жизни токена
            const token = jwt.sign(
                {userId : user.id},
                config.get('jwtSecret'),
                {expiresIn : '1h'}
            )
            // ответ пользователю
            res.json({ token, userId: user.id})

 
        }catch(e){
            res.status(500).json({message: 'Что то пошло не так'})
        }
     })



module.exports = router