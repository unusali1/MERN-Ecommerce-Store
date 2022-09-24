import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate } from 'react-router-dom';


const ProtectedRoute = ({isAdmin}) => {

    const navigate =useNavigate()
    const {loading, isAuthenticated, user} = useSelector((state) => state.user);

    return (
       <>
        {loading === false && (

                    isAuthenticated ? isAuthenticated : navigate("/login")
                       )}
       </>
    )
}

export default ProtectedRoute;