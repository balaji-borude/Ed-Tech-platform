//import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    
    // to get token from redux 
    const {token} = useSelector((state)=>state.auth);
    
    // if token is present
    if(token !== null)
        return children
    else
        return <Navigate to = "/login"/>
}

export default PrivateRoute