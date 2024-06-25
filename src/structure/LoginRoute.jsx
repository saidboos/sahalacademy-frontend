import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import validateToken from '../auth/ValidateToken'

const LoginRoute = () => {
    let auth = validateToken()
    return (
        auth ? <Navigate to='/profile'/> : <Outlet /> 
  )
}

export default LoginRoute
