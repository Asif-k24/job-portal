import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { handleError } from '../utils';

export default function ProtectedRoutes() {

    const user = localStorage.getItem('token');
    const errorMsg = "Login Required"

    return (
        <div>
            {
                user ? <Outlet /> : <Navigate to="/" /> && handleError(errorMsg)
            }
        </div>
    )
}