import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {

    let token = sessionStorage.getItem('accessToken')

    return token ? children : <Navigate to='/login'/>
}

export default ProtectedRoutes