// This will allow only authenticated users to access this route
// Only Logged In user can go to this Route
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    
    // to get token from redux 
    const {token} = useSelector((state)=>state.auth);
    
    // if token is present (if token is not null --> means tokenis present )
    if(token !== null)
        return children
    else
        return <Navigate to = "/login"/>
}

export default PrivateRoute