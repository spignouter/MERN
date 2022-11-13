// Создание своего собственного хука, который позволит работать с асинхронными запросами  на сервер используя нативных API браузера featch только в формате хука 
// Данный хук позволить работать с сервермо и экспортировать определенные сущности которые сгруперуем в данном модуле
// По сути хук это функция и главное ее предназночение исползование в компонентах, каждый хук выполняет свою задачу, но можно 
// на основе базового хука сделать свой и задать ему другие пераметры
// useState взаимодействует с объектом state в reacte. Как параметр useState принимает начальне состояние, но возвращает кортеж, где первый элемент это начальное состояние
// а второй это функция изменяющая это состояние.

// useCallback этот хук нужен для производительности, и выполняет своего рода кеширование, предотврощая рекурсию функции
import { useState, useCallback } from "react"

export const useHttp = () =>{
    // по сути будем узнавить иудут ли вычисления на сервере прямо сейчас 
    // И ошибки если они есть
    // первый параметр это флаг, а второй функция изменение флага
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // работа с браузерным методом fetch
    const request = useCallback ( async (url, method = 'GET', body = null, headers ={} ) =>{
        setLoading(true)
        try{
            const response = await fetch(url,{method, body, headers})
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'что-то пошло не так')
            }
            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[] )

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}