import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtected = () => {
    const user = window.localStorage.getItem("user")
    return (
        user.split(' ')[0]==='admin' ? <Outlet/> : <Navigate to='/'/> 
    )
}

export default AdminProtected;