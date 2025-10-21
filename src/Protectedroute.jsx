import React from 'react'
import { Navigate } from 'react-router-dom'

function Protectedroute({children}){
    const isAuth = localStorage.getItem("auth")
    if(!isAuth){
        return <Navigate to="/" replace  />
    }
    return children
}

export default Protectedroute
