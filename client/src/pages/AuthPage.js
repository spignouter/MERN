import React, { useState } from "react"
import { useHttp } from "../hooks/http.hook"
export const AuthPage = () => {
  // получение (импорт палей)
  const {loading, error, request} = useHttp()
  // отправка данных на сервер осуществляеться в два этапа, обработка формы и запросы на сервер.
  // Создание переменных формы
  const [form, setForm] = useState({
    email: '', password: ''
  })
  // обработка формы. event это обертка reacta над нативным event javaScript
  const changeHandler = event => {
    // изменение поле в форме
     setForm({...form, [event.target.name]: event.target.value})
    }

    // запросы на сервер
    const registerHandler = async () => {
      try{
        const data = await request('/api/auth/register', 'POST', {...form})
        console.log('Data', data)

      }catch(e){}
    }
return (
  <div className="row">
    <div className="col s6 offset-s3"> 
    <h1></h1>
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">Авторизация</span>
        <div>

          <div className="input-field">
            {/* onChange это событие возникающие при вводе нового текста или поле теряет фокус  */}
            <input 
            placeholder="Введите email" 
            id="email" 
            type="text" 
            name="email"
            onChange = {changeHandler}/>
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            {/* onChange это событие возникающие при вводе нового текста или поле теряет фокус  */}
            <input 
            placeholder="Введите пароль" 
            id="password" 
            type="password" 
            name="password"
            onChange = {changeHandler}/>
            <label htmlFor="email">Email</label>
          </div>

        </div>
      </div>
      <div className="card-action">
        <button className="btn yllow darken-4"
        disabled = {loading}
        > Войти</button>
        <button className="btn yllow darken-4" 
        onClick={registerHandler}
        disabled = {loading}
        > Регистрация</button>
      </div>
      </div>
    </div>
  </div>
)
}