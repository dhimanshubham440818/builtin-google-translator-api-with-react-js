import React from 'react'
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'

const Protected = () => {
    const user = window.localStorage.getItem("user")
    return (
        user ? <Outlet/> : <Navigate to='/login'/> 
    )   
}

export default Protected