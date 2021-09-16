import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ children, ...restOfProps }) => {
    const isLoggedIn = localStorage.getItem('token')
    return (
        <Route {...restOfProps}>
            {isLoggedIn ? children : <Redirect to='/login' />}
        </Route>
    )
}

export default ProtectedRoute
