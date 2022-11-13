// подключение фреймворка, который использует большое количество стилей, компонентов, анимаций и конечно принцыпы материального дизайна от google
import 'materialize-css'
import React from 'react';
import { useRoutes } from './routes'

import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  // Передача флага авторизованного пользователя, не авторизованый пользователь не меняет флаг
  const routes = useRoutes(false)
  return (
    <Router>
        {/* // className залдает элементу class="" для работы в css */}
        <div className="container">
          {/* Для исп */}
          {routes}
        </div>
    </Router>
  )
}

export default App
