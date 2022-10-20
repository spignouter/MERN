// создание маршрутов в приложени. Его можно назвать мидлваре
const {Router} = require('express')
// подключение модели
const User = require('../models/User')
const router = Router()

// добовляем несколько запросов
// имееться префикс /api/auth все что написано далее будет конкотенироваться с этим путем
router.post('/registr', async (req, res)=>{
    try{
        // это будет отпровляться с фронт энда
        const{email, password} = req.body

        
    }catch(e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
})

router.post('/login', async (req, res)=>{})


module.exports = router