import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import { useAuth } from "../Store/auth";

function Logout()
{
    const { LogoutUser } = useAuth();
    // This is your side effect: cleaning up data like token remove from local Storage, updating state, etc.
    useEffect(()=>{
    //Side Effect Function
    LogoutUser();
    },[LogoutUser]);

    return <Navigate to="/login"/>
};
export default Logout;