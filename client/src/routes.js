import React from "react"
import {Routes, Route, Navigate } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { CretePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"

// Проверка авторизован ли пользоваетель, в зависимости от этого решаеться какие данные, тоесть какие роуты ему доступны
export const useRoutes = isAuthenticated =>{
    // если пользователь имеет авторизован, значит он имеет токен.
    if(isAuthenticated){
        return(
            // Switch был переименован в Routes
            <Routes>
                {/* передаем компоненту Router пропс path="/links" */}
                {/* Далее перечислины маршруту по которым будет переходить пользователь  */}
                <Route path="/links" element={<LinksPage />} />
                <Route path="/create" element={<CretePage/>}/>
                <Route path="/detail/:id" element={<DetailPage/>}/>
                {/*Redirect был переименован в Navigate,  */}
                <Navigate to="/create" />
            </Routes>
        )
    }
    return(
        <Routes>
            {/* Судя по всему компонетны должны передоваться как пропсы в элементы ReactDom */}
            <Route path="/" element={<AuthPage/>} />
        </Routes>
    )
}