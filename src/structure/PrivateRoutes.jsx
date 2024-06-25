import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import validateToken from '../auth/ValidateToken'
import { AuthData } from '../auth/AuthWrapper'

const PrivateRoutes = () => {
    let auth = validateToken()

    const { logout } = AuthData()
    return (
        auth ? <Outlet /> : logout()
  )
}

export default PrivateRoutes
