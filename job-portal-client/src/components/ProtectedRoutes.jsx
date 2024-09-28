import React, { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoutes() {

    const user = null;

    return (
        <div>
            user ? <Outlet /> : <Navigate to="/auth/login" />
        </div>
    )
}
